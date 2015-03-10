// 新carousel支持ie789
(function(root, $) {
    'use strict';

    var IEVersion = root.IEVersion;

    if (!Array.prototype.each) {
        Array.prototype.each = function(func) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (func.call(this[i], i, this[i], this) === false) {
                    break;
                }
            }
        };
    }

    function toArray(arrayLike) {
        var back = [];
        for (var i = 0, l = arrayLike.length; i < l; i++) {
            back.push(arrayLike[i]);
        }
        return back;
    }

    function empty() {}

    function Carousel(option) {
        var dom = option.elem;

        if (!dom) {
            return;
        }

        var items = toArray(dom.children);

        // add toggles
        var domToggles = document.createElement('div');
        domToggles.className = 'toggles';
        dom.appendChild(domToggles);
        var togglesHtml = '';
        items.each(function() {
            togglesHtml += '<span></span>';
        });
        domToggles.innerHTML = togglesHtml;
        var toggles = toArray(domToggles.children);

        // add timebar
        var domTime = document.createElement('div');
        domTime.className = 'timebar';
        dom.appendChild(domTime);
        domTime.innerHTML = '<div class="inner"></div>';
        var timebar = domTime.children[0];

        this.items = items;
        this.toggles = toggles;
        this.timebar = timebar;
        this.currentIndex = 0;
        this.option = option;

        var _ = this;
        _.animating = true;
        _.show(_.items[_.currentIndex], empty, _.afterShowing);

        // click to change
        this.toggles.each(function(idx, item) {
            $(item).on('click', function() {
                if (_.animating) {
                    return false;
                }
                _.timebar.style.width = '0%';
                clearInterval(_.timing);
                // 隐藏当前
                _.hide(_.items[_.currentIndex], empty, function() {
                    _.nextIndex = idx;
                    _.afterHiding();
                });
            });
        });
    }

    Carousel.prototype = {
        show: function(dom, before, after) {
            var _ = this; // this 指向 Carousel 实例

            _.toggles.each(function(idx, item) {
                if (idx === _.currentIndex) {
                    item.className = 'active';
                } else {
                    item.className = '';
                }
            });
            // 如果是现代浏览器就使用css3特性显示
            // 否则就使用jQuery写法
            if (!IEVersion || IEVersion > 9) {
                before && before.call(_);
                dom.className = 'fading';
                // 当前淡入后调用
                setTimeout(function() {
                    after && after.call(_);
                }, 1000);
            } else {
                before && before.call(_);
                var $dom = $(dom);
                $dom.css({
                    'visibility': 'visible',
                    'display': 'none',
                    'opacity': 1
                });
                $dom.fadeIn(800, function() {
                    after && after.call(_);
                });
            }
        },

        hide: function(dom, before, after) {
            var _ = this; // this 指向 Carousel 实例
            _.animating = true;
            // 如果是现代浏览器就使用css3特性显示
            // 否则就使用jQuery写法
            if (!IEVersion || IEVersion > 9) {
                before && before.call(_);
                dom.className = 'leaving active';
                // 当前页下的元素消失后调用
                setTimeout(function() {
                    after && after.call(_);
                }, 800);
            } else {
                before && before.call(_);
                // 消失元素
                var $dom = $(dom);
                $dom
                    .children('.item')
                    .each(function(idx, item) {
                        var $item = $(item);
                        if (idx === 1) {
                            $item.animate({
                                'left': '100%'
                            }, 1000, function() {
                                $item.css('left', '-100%');
                                after && after.call(_);
                            });
                        } else {
                            $item.animate({
                                'left': '100%'
                            }, 1000, function() {
                                $item.css('left', '-100%');
                            });
                        }
                    });
            }
        },

        afterShowing: function() {
            // this 指向Carousel实例
            var _ = this;
            var currentItem = _.items[_.currentIndex];

            if (!IEVersion || IEVersion > 9) {
                currentItem.className = 'fading active';
                // 开始循环下一次
                setTimeout(function() {
                    _.loop();
                    _.animating = false;
                }, 700);
            } else {
                var $currentItem = $(currentItem);
                $currentItem.children('.item')
                    .css({
                        'opacity': 1
                    })
                    .each(function(idx, item) {
                        var $item = $(item);
                        $item.css('left', -1400);
                        if (idx === 1) {
                            $item.animate({
                                'left': 0
                            }, 1000, function() {
                                // 开始循环下一次
                                _.loop();
                                _.animating = false;
                            });
                        } else {
                            $item.animate({
                                'left': 0
                            }, 1000);
                        }
                    });
            }
        },

        afterHiding: function() {
            // this指向Carousel实例
            var _ = this;
            var currentItem = _.items[_.currentIndex];

            if (!IEVersion || IEVersion > 9) {
                currentItem.className = '';
                // 1秒后页面中元素右滑消失接着显示下一张
                setTimeout(function() {
                    _.currentIndex++;
                    if (_.currentIndex === _.items.length) {
                        _.currentIndex = 0;
                    }
                    if (_.nextIndex >= 0) {
                        _.currentIndex = _.nextIndex;
                        _.nextIndex = -1;
                    }
                    _.show(_.items[_.currentIndex], empty, _.afterShowing);
                }, 1000);
            } else {
                var $currentItem = $(currentItem);
                $currentItem.fadeOut(800, function() {
                    _.currentIndex++;
                    if (_.currentIndex === _.items.length) {
                        _.currentIndex = 0;
                    }
                    if (_.nextIndex >= 0) {
                        _.currentIndex = _.nextIndex;
                        _.nextIndex = -1;
                    }
                    _.show(_.items[_.currentIndex], empty, _.afterShowing);
                });
            }
        },

        loop: function() {
            var _ = this; // this 指向 Carousel 实例
            var timeBarW = 0;
            var fps = 1000 / 60;
            var totalTime = _.option.pause * 1000;
            var unitPlus = fps / totalTime;
            _.timebar.style.width = '0%';
            _.timing = setInterval(function() {
                if (_.pause) {
                    return;
                }
                timeBarW += unitPlus;
                if (timeBarW >= 1) {
                    _.timebar.style.width = '0%';
                    clearInterval(_.timing);
                    // 隐藏当前
                    _.hide(_.items[_.currentIndex], empty, _.afterHiding);
                } else {
                    _.timebar.style.width = timeBarW * 100 + '%';
                }
            }, fps);
        }
    };

    root.Oppo = Carousel;
}(this.RayCarousels, jQuery));
// RayCarousel
// mobile
// author: zhangyang
(function($, root) {
    'use strict';

    var $WIN = $(window);
    var winW = $WIN.width();

    function Carousel($elem, options) {
        var _ = this;
        _.$elem = $elem;
        _.options = options;

        winW = _.$elem.width();

        _.initTemplate();
    }

    Carousel.fn = Carousel.prototype;
    Carousel.fn.initTemplate = function() {
        var _ = this;
        var tmpl = '';
        var points = '';
        var firstItem;
        var number = 0;
        var $lastItem = _.$elem.children(':last-child');
        var temp = document.createElement('div');
        temp.appendChild($lastItem.clone()[0]);
        var lastItem = temp.innerHTML;
        _.$elem.children().each(function(idx) {
            var $item = $(this);
            var wrap = document.createElement('div');
            wrap.appendChild($item.clone()[0]);
            if (idx === 0) {
                firstItem = wrap.innerHTML;
                tmpl += '<div class="xct-inner">';
                tmpl += '<div class="xct-item">' + lastItem + '</div>';
            }
            tmpl += '<div class="xct-item">' + wrap.innerHTML + '</div>';
            if (idx === 0) {
                points += '<span class="active"></span>';
            } else {
                points += '<span></span>';
            }
            number++;
        });
        tmpl += '<div class="xct-item">' + firstItem + '</div>';
        tmpl += '</div>';
        if (number <= 1) {
            return;
        }
        tmpl += '<div class="xct-points">' + points + '</div>';
        _.$elem.html(tmpl);
        _.$inner = _.$elem.find('.xct-inner');
        _.$inner.children().width(winW);
        _.$inner.width(winW * (number + 2));
        _.$elem.height(winW/2);
        _.currentIndex = 0;
        _.move();

        _.$inner.bind('transitionend webkitTransitionEnd', function() {
            _.$inner.css({
                'transition': 'none',
                '-webkit-transition': 'none'
            });
            if (_.currentIndex === number) {
                _.currentIndex = 0;
            } else if (_.currentIndex === -1) {
                _.currentIndex = number - 1;
            }
            _.move();
            _.animating = false;
        });
        _.$points = _.$elem.find('.xct-points').children();
        _.number = number;

        _.bindEvent();
        _.autoRun();
    };
    Carousel.fn.bindEvent = function() {
        var _ = this;
        var startPosX;
        var startTime;
        _.$inner.bind('touchstart', function(e) {
            _.pause = true;
            if (_.animating) {
                return false;
            }
            startTime = new Date();
            startPosX = e.changedTouches[0].clientX;
            e.preventDefault();
            e.stopPropagation();
        }).bind('touchmove', function(e) {
            if (_.animating) {
                return false;
            }
            var posX = e.changedTouches[0].clientX;
            var moveX = posX - startPosX;
            _.$inner.css({
                '-webkit-transform': 'translate3d(' + (_.currentPosX + moveX) + 'px, 0px, 0px)',
                '-ms-transform': 'translate3d(' + (_.currentPosX + moveX) + 'px, 0px, 0px)',
                'transform': 'translate3d(' + (_.currentPosX + moveX) + 'px, 0px, 0px)'
            });
            e.preventDefault();
            e.stopPropagation();
        }).bind('touchend', function(e) {
            _.pause = false;
            if (_.animating) {
                return false;
            }
            var endTime = new Date();
            var endPosX = e.changedTouches[0].clientX;
            var moveX = endPosX - startPosX;
            if (Math.abs(moveX) > 30) {
                if (moveX < 0) {
                    _.next();
                } else {
                    _.prev();
                }
            } else {
                if (endTime.getTime() - startTime.getTime() < 150) {
                    _.options.itemTapped && _.options.itemTapped.call(_, e.target);
                    _.reset();
                } else {
                    _.reset();
                }
            }
            e.preventDefault();
            e.stopPropagation();
        });
        $WIN.resize(function() {
            _.resize();
        });
    };
    Carousel.fn.next = function() {
        var _ = this;
        if (_.animating) {
            return false;
        }
        _.currentIndex++;
        _.animating = true;
        _.moveWithTransition();
        _.activePoint(_.currentIndex);
    };
    Carousel.fn.prev = function() {
        var _ = this;
        if (_.animating) {
            return false;
        }
        _.currentIndex--;
        _.animating = true;
        _.moveWithTransition();
        _.activePoint(_.currentIndex);
    };
    Carousel.fn.reset = function() {
        var _ = this;
        _.animating = false;
        _.moveWithTransition();
    };
    Carousel.fn.activePoint = function(index) {
        var _ = this;
        var indexWill;
        if (typeof index === 'number') {
            if (index === _.number) {
                indexWill = 0;
            } else if (index === -1) {
                indexWill = _.number - 1;
            } else {
                indexWill = index;
            }
        } else {
            indexWill = _.currentIndex;
        }
        _.$points.each(function(idx) {
            if (idx === indexWill) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    };
    Carousel.fn.autoRun = function() {
        var _ = this;
        if (_.options.autoRun && _.options.pause) {
            _.timing = setInterval(function() {
                if (_.pause) {
                    return;
                }
                _.next();
            }, _.options.pause);
        }
    };
    Carousel.fn.move = function() {
        var _ = this;
        _.currentPosX = -(_.currentIndex + 1) * winW;
        _.$inner.css({
            '-webkit-transform': 'translate3d(' + _.currentPosX + 'px, 0px, 0px)',
            '-ms-transform': 'translate3d(' + _.currentPosX + 'px, 0px, 0px)',
            'transform': 'translate3d(' + _.currentPosX + 'px, 0px, 0px)'
        });
    };
    Carousel.fn.moveWithTransition = function() {
        var _ = this;
        _.currentPosX = -(_.currentIndex + 1) * winW;
        _.$inner.css({
            '-webkit-transition': 'all .5s ease',
            'transition': 'all .5s ease',
            '-webkit-transform': 'translate3d(' + _.currentPosX + 'px, 0px, 0px)',
            '-ms-transform': 'translate3d(' + _.currentPosX + 'px, 0px, 0px)',
            'transform': 'translate3d(' + _.currentPosX + 'px, 0px, 0px)'
        });
    };
    Carousel.fn.resize = function() {
        var _ = this;
        winW = _.$elem.width();
        _.$inner.children().width(winW);
        _.$inner.width(winW * (_.number + 2));
        _.$elem.height(winW/2);
        _.move();
    };

    root.Mobile = Carousel;
}(Zepto, this.RayCarousels));

(function(root){
    'use strict';

    function hide(dom, callback) {
        var i = 0.99;
        var intev;
        dom.style.zIndex = '2';
        clearInterval(intev);
        intev = setInterval(function() {
            dom.style.opacity = i;
            dom.style.filter = 'alpha(opacity=' + parseInt(i * 100) + ')';
            i -= 0.19;
            if (i <= 0) {
                i = 0;
                clearInterval(intev);
                dom.style.opacity = 0;
                dom.style.filter = 'alpha(opacity=100)';
                dom.style.display = 'none';
                callback && callback();
            }
        }, 50);
    }

    function addEvent(dom, evt, handler){
        if(document.addEventListener){
            dom.addEventListener(evt, handler, false);
            return;
        }

        if(document.attachEvent){
            dom.attachEvent('on'+evt, handler);
        }
    }

    
    var Carousel = function(option){
        var self = this;
        self.o = option;
        self.dom = option.elem;
        
        var children = self.dom.children;
        for(var i = 0,l = children.length; i<l ; i++){
            if(children[i].nodeName === 'UL'){
                self.imagesList = children[i];
                continue;
            }

            if(children[i].nodeName === 'OL'){
                self.togglesList = children[i];
                break;
            }
        }
        self.hideAll();
        self.autoRun();

        addEvent(self.dom, 'mouseover', function(){
            self.pause = true;
        });

        addEvent(self.dom, 'mouseout', function(){
            self.pause = false;
        });

        var toggles = self.togglesList.children;
        for (var j = 0, l2 = toggles.length; j < l2; j++) {
            toggles[j].onmouseover = (function(idx){
                return function(){
                    clearTimeout(self.timeout);
                    self.timeout = setTimeout(function(){
                        self.show(idx);
                        self.next = idx;
                    }, 400);
                    return false;
                };
            }(j));
            toggles[j].onmouseleave = (function(idx){
                return function(){
                    clearTimeout(self.timeout);
                    return false;
                };
            }(j));
            toggles[j].onclick = function(){
                return false;
            };
        }
    };
    Carousel.prototype = {
        autoRun : function(){
            var self = this;
            self.show(0);
            self.next = 1;

            self.autoRunFunc = setInterval(function(){
                if(self.pause){
                    return;
                }
                self.show(self.next);
                self.next++;
                if(self.next >= self.imagesList.children.length){
                    self.next = 0;
                }
            }, self.o.pause);
        },
        hideAll : function(){
            var images = this.imagesList.children;
            var toggles = this.togglesList.children;
            for(var i = 0,l = images.length; i < l ; i++){
                images[i].style.display = 'none';
                toggles[i].className = '';
            }
        },
        hide : function(){
            if(this.current >= 0){
                hide(this.imagesList.children[this.current]);
                this.togglesList.children[this.current].className = '';
            }
        },
        show : function(idx){
            if(idx === this.current){
                return;
            }

            var child = this.imagesList.children[idx];
            child.style.zIndex = '1';
            child.style.display = 'block';
            child.style.opacity = '1';
            this.togglesList.children[idx].className = 'active';

            this.hide();
            this.current = idx;
        }
    };

    root.Single = Carousel;

}(this.RayCarousels));
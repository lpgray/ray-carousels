(function(root){
    'use strict';

    var transition = root.cssSupport('transition');

    function slide(dom, position){
        var originLeft = dom.offsetLeft;
        var targetLeft = position.left;
        var direction = 1; // left
        if(targetLeft < originLeft){
            // left
            direction = 1;
        }else{
            // right
            direction = 0;
        }
        var duration = position.duration || 800;
        var unit = ((targetLeft - originLeft)/duration) * 20;
        originLeft += unit;
        dom.style.left = originLeft + 'px';
        var interval = setInterval(function(){
            originLeft += unit;
            if(direction){
                if(originLeft <= targetLeft){
                    originLeft = targetLeft;
                    clearInterval(interval);
                }
            }else{
                if(originLeft >= targetLeft){
                    originLeft = targetLeft;
                    clearInterval(interval);
                }
            }
            dom.style.left = originLeft + 'px';
        }, 20);
    }

    var Carousel2 = function(option){
        var domC2 = option.elem;

        var ul = domC2.getElementsByTagName('ul')[0];
        var ol = domC2.getElementsByTagName('ol')[0];
        var togglesWrapper = domC2.children[2];
        
        // get li number & width
        var liNumber = ul.children.length;
        var unitWidth = ul.children[0].offsetWidth;  // --- 这里可能取不到宽度
        
        // set ul width
        var ulWidth = parseInt(liNumber * unitWidth);
        ul.style.width = ulWidth + 'px';
        
        // set toggles number
        var domC2Width = domC2.offsetWidth;
        var groupNum = Math.ceil(ulWidth/domC2Width);
        var tmpl = '';
        for(var i = 0; i < groupNum; i++){
            tmpl += '<a href="###"></a>';
        }
        togglesWrapper.innerHTML = tmpl;
        var toggles = togglesWrapper.children;
        
        // calc the last left move
        this.lastLeftMove = this.calcLastLeftMove(ulWidth, domC2Width, groupNum);
        this.toggles = toggles;
        this.ul = ul;
        this.domC2Width = domC2Width;
        this.unitNumber = Math.ceil(domC2Width/unitWidth);
        this.showGroup(0);

        var leftBtn = ol.children[0];
        var rightBtn = ol.children[1];
        leftBtn.onclick = function(){
            self.showGroup(self.currentGroup - 1);
        };
        rightBtn.onclick = function(){
            self.showGroup(self.currentGroup + 1);
        };
        var self = this;
        for(i = 0, l = toggles.length; i<l; i++){
            toggles[i].onclick = (function(idx){
                return function(){
                    self.showGroup(idx);
                };
            }(i));
        }
    };
    Carousel2.prototype = {
        showGroup : function(idx){
            if(this.currentGroup === idx){
                return;
            }
            if(idx < 0){
                return;
            }
            if(idx >= this.toggles.length ){
                idx = 0;
            }

            // color toggle
            for(var i = 0, len = this.toggles.length; i < len; i++){
                if(i === idx){
                    this.toggles[i].className = 'active';
                }else{
                    this.toggles[i].className = '';
                }
            }

            var leftWill;
            // calc the moving longness
            if(idx === (this.toggles.length - 1)){
                leftWill = this.lastLeftMove;
            }else{
                leftWill = parseInt(this.domC2Width * idx);
            }

            // is it support the css3 transition attribute?
            if(transition){
                this.ul.style.left = '-' + leftWill + 'px';
            }else{
                slide(this.ul, {left : (0-leftWill), duration : 600});
            }

            this.currentGroup = idx;
            this.lazyLoadImgsAt(idx);
        },
        calcLastLeftMove : function(ulWidth, ctnWidth, groupNumber){
            return ctnWidth * (groupNumber-1) - (ctnWidth * groupNumber - ulWidth);
        },
        lazyLoadImgsAt : function(groupNumber){
            var end = (groupNumber + 1) * this.unitNumber;
            if(end >= this.ul.children.length){
                end = this.ul.children.length;
            }
            var start = end - this.unitNumber;
            var imgs = this.ul.getElementsByTagName('img');
            for(var i = start; i<end; i++){
                var src = imgs[i].getAttribute('src');
                if(!src){
                    imgs[i].src = imgs[i].getAttribute('data-src');
                }
            }
        }
    };
    
    var carousels = document.getElementsByClassName('carousel2');
    for(var i = 0, l = carousels.length; i<l ;i++){
        // var d = new Date;
        new Carousel2({
            elem : carousels[i]
        });
        // console.info('init duration:' + (((new Date).getTime()) - d.getTime()));
    }
}(this.RayCarousels));
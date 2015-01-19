// RayCarousel
// core module
// author: zhangyang
(function(root) {
    'use strict';

    console.log('welcome to use ray-carousel');

    // 浏览器版本及支持判断
    var div = document.createElement('div');
    var vendors = 'Khtml Ms O Moz Webkit'.split(' ');

    function cssSupport(prop) {
        if (prop in div.style) {
            return true;
        }

        prop = prop.replace(/^[a-z]/, function(v) {
            return v.toUpperCase();
        });

        var len = vendors.length;

        while (len--) {
            if (vendors[len] + prop in div.style) {
                return true;
            }
        }

        return false;
    }

    var IEVersion = false;
    if (!/msie/i.test(window.navigator.userAgent)) {
        IEVersion = false;
    } else {
        var v = 3;
        var div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
        IEVersion = v > 4 ? v : 10;
    }

    root.Detector = {
        isMobile: /iphone|ios|android/i.test(root.navigator.userAgent),
        ieVersion: IEVersion,
        xhr2: !!new XMLHttpRequest().upload,
        cssSupport: cssSupport
    };

    root.RayCarousel = {
        version: '0.1.0'
    };
}(this));
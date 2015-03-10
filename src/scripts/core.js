// RayCarousels
// core module
// author: zhangyang
(function(root) {
    'use strict';

    var IEVersion = false;
    var vendors = 'Khtml Ms O Moz Webkit'.split(' ');
    var div = document.createElement('div');

    if (!/msie/i.test(window.navigator.userAgent)) {
        IEVersion = false;
    } else {
        var v = 3,
            all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
        IEVersion = v > 4 ? v : 10;
    }

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

    root.RayCarousels = {
        isMobile : /iphone|ios|android/i.test(root.navigator.userAgent),
        ieVersion : IEVersion,
        cssSupport : cssSupport
    };
}(this));
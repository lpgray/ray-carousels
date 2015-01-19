ray-carousel
======
Carousel组件集合，包括mobile、oppo、pc-single、pc-multiple 4种独立的carousel效果集合，也许以后会添加更多的效果。

我的宗旨是每个组件尽可能简单，代码尽可能少，不需太多参数配置，只求得到效果即可。

## mobile
运用在移动端的carousel组件，目前使用在西祠触屏版中。源代码在mobile文件夹下。

### 特色
- touch支持
- 循环滑动
- 基于zepto.js/zepto-touch.js

### 使用步骤

#### 引用样式
```html
<link rel="stylesheet" href="../mobile/ray-carousel.mobile.min.css">
```
#### 引用JS
```html
<script src="../src/assets/zepto.js"></script>
<script src="../mobile/ray-carousel.mobile.min.js"></script>
```
#### 调用API
```javascript
new RayCarousel.Mobile($('#J_Carousel'), {
	pause: 3000,
	autoRun: true,
	itemTapped: function(target) {
		alert(target + 'is tapped');
	}
});
```

## oppo

模仿oppo官网的幻灯效果，代码在oppo文件夹下，依赖jQuery。

### 特色

- 基于jQuery
- 时间条
- 适合电商、企业站的图片交互效果

### 使用步骤

#### 引用样式
```html
<link rel="stylesheet" href="../mobile/ray-carousel.oppo.min.css">
```

#### 引用JS
```html
<script src="../src/assets/jQuery.js"></script>
<script src="../mobile/ray-carousel.oppo.min.js"></script>
```
#### HTML
```html
	<div id="J_Oppo" class="oppo-carousel">
        <a href="#" style="background-image:url(images/oppo/banner1-0.jpg);">
            <div class="no1 item" style="background-image:url(images/oppo/banner1-1.png);"></div>
            <div class="no2 item" style="background-image:url(images/oppo/banner1-2.png);"></div>
        </a>
        <a href="#" style="background-image:url(images/oppo/banner2-0.jpg);">
            <div class="no1 item" style="background-image:url(images/oppo/banner2-1.png);"></div>
            <div class="no2 item" style="background-image:url(images/oppo/banner2-2.png);"></div>
        </a>
        <a href="#" style="background-image:url(images/oppo/banner1-0.jpg);">
            <div class="no1 item" style="background-image:url(images/oppo/banner1-1.png);"></div>
            <div class="no2 item" style="background-image:url(images/oppo/banner1-2.png);"></div>
        </a>
        <a href="#" style="background-image:url(images/oppo/banner2-0.jpg);">
            <div class="no1 item" style="background-image:url(images/oppo/banner2-1.png);"></div>
            <div class="no2 item" style="background-image:url(images/oppo/banner2-2.png);"></div>
        </a>
    </div>
```

#### 调用API
```javascript
new RayCarousel.Oppo({
	domId: 'J_Oppo',
	pause: 5
});
```

## todo pc

## todo multiple
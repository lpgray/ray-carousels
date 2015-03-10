ray-carousel
======
一个图片轮播组件集合，包括`mobile`、`oppo`、`single`、`multiple`4种独立的carousel组件。宗旨是每个组件尽可能简单，代码尽可能少，不需太多参数配置，只求得到效果即可。

## mobile
运用在移动端的carousel组件，目前使用在[西祠触屏版](3g.xici.net)中。源代码在`mobile`文件夹下。

### 特色
- touch支持
- 循环滑动
- 基于zepto.js及zepto-touch.js

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
#### API
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
#### API
```javascript
new RayCarousel.Oppo({
	domId: 'J_Oppo',
	pause: 5
});
```

## single

## multiple
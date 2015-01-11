ray-carousel
======
Carousel组件集合，包括mobile、oppo、pc-single、pc-multiple 4种独立的carousel效果集合，也许以后会添加更多的效果。

我的宗旨是每个组件尽可能简单，代码尽可能少，不需太多参数配置，只求得到效果即可。

## mobile
运用在移动端的carousel组件，目前使用在西祠触屏版中。源代码在mobile文件夹下。

### 特色
- touch支持
- 循环滑动
- 基于zepto.js

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

## todo oppo

模仿oppo官网的幻灯效果。

## todo pc

## todo multiple
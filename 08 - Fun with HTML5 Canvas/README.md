# 08 - Fun with HTML5 Canvas 笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

通过[Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)以及它的一些API实现画笔的效果。

[在线查看效果](https://jeffierw.github.io/JavaScript30/Fun%20with%20HTML5%20Canvas/index-YepW.html)

## 笔记

### 实现步骤

1. 绑定`canvas`标签，并添加`mousedown`,`mousemove`,`mouseup`,`mouseout`事件
2. 创建canvas执行上下文，并设置属性，如描边和线条颜色，线条宽度，线条末端形状
3. 通过canvas路径控制API `beginPath`,`lineTo`,`moveTo`,`stroke`执行绘画
4. 运用hsl的`h`值变化累加实现线条颜色变化
5. 设置线条变化范围，使用flag控制线条粗细变化

### 相关知识点

#### [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

最基本的 Canvas 用法，就是创建一个可以绘画的环境，由对某个元素获取其用于渲染的上下文开始：

```js
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
```

然后通过ctx，设置一些基本属性：
- `lineCap`：笔触的形状，有 round | butt | square 圆、平、方三种。
- `lineJoin`：线条相较的方式，有 round | bevel | miter 圆交、斜交、斜接三种。
- `lineWidth`：线条的宽度
- `strokeStyle`：线条描边的颜色
- `fillStyle`：填充的颜色

然后通过JS绘制路径，本例中只使用到基础的[路径绘制方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#绘制路径),路径是点和线的集合，我们这次用到这些：
- `beginPath()`：新建一条路径
- `lineTo()`：路径的终点
- `moveTo()`：（此次）绘制操作的起点
- `stroke()`：绘制轮廓

#### 设置彩虹渐变颜色——[HSL](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value#hsl%E9%A2%9C%E8%89%B2)  

在这个挑战中，涉及到改变线条的颜色，如何实现彩虹的渐变效果？我们需要利用 HSL 色彩模式，首先可以去这个网站 [http://mothereffinghsl.com](http://mothereffinghsl.com/) 感受一下 HSL 不同色彩值对应的效果。
- H(hue) 代表色调，取值为 0~360，专业术语叫色相
- S 是饱和度，可以理解为掺杂进去的灰度值，取值为 0~1
- L 则是亮度，取值也是 0~1，或者百分比。

这之中 H 值从 0 到 360 的变化代表了色相的角度的值域变化，利用这一点就可以实现绘制时线条颜色的渐变了，只需要在它的值超过 360 时恢复到 0 重新累加即可。

```js
    let colorWidth = 0 // 控制绘画颜色变化
    ctx.strokeStyle = `hsl(${colorWidth},100%,50%)`
    colorWidth++
    if (colorWidth >= 360) colorWidth = 0
```

#### 线条粗细控制

涉及到线条粗细，挑战中需要做到先变细后变粗，这样反复变化。
我们可以通过设置到达临界值时让控制粗细的属性反方向变化就可以了。

```js
    let direction = true;
    ctx.lineWidth = 100;

    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    	direction = !direction;
    } 
    if (direction) {
    	ctx.lineWidth++;
    } else {
    	ctx.lineWidth--;
    }

```





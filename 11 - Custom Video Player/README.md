# 11 - Custom Video Player 笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

通过`<video>`视频标签以及其各种属性值，API实现一个自定义播放器：
* 为video元素添加自定义样式播放控制面板
    * 可点击视频画面或者播放暂停按钮来播放暂停
    * 可通过按钮点击快进和回退
    * 可滑动或点击调节音量、播放速度
    * 可点击或拖动进度条选择视频播放进度

[实现效果](https://jeffierw.github.io/JavaScript30/11%20-%20Custom%20Video%20Player/index-YepW.html)

## 解决思路

首先，HTML、CSS已经写好了，
1. 在JS中选择获取我们需要添加功能的HTML元素
2. 給获取的元素添加事件监听和回调
3. 通过video的各种属性方法和事件写好想要实现的效果

## 相关知识点

`video`的属性、方法和事件
* `paused`、`playbackRate`、`volume`
* `play()`、`pause()`
* `currentTime`、`duration`
* `timeupdate事件`

## 主要步骤

### 获取元素

```js
const video = document.querySelector('.viewer')
const toggle = document.querySelector('.toggle')
const ranges = document.querySelectorAll('.player__slider')
const skips = document.querySelectorAll('.skip')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
```

### 各种功能实现

#### 播放暂停

`video`对象有一个`paused`的属性判断视频是否在播放，还有`play()`和`pause()`方法提供播放暂停的操作

我们需要在点击视频时和点击播放按钮时触发事件,这里比较有意思的一点是作者的写法上，将触发播放暂停和切换播放暂停按钮样式变化的操作分开了，这样降低耦合，每一个事件或者说事件函数仅仅只做一件事。

```js
// 绑定点击播放暂停事件
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

function tooglePlay() {
    video.paused ? video.play() : video.pause()
}
// 或者作者的写法
function tooglePlay() {
    const method = vidoe.paused ? 'play' : 'pause';
    video[method]();
}
```

另外图标的切换事件单独操作，

如何修改toggleDOM节点的文本元素？

DOM中获取`textContent`来表示一个节点及其后代的文本内容。

```js
video.addEventListener('play', updateButton)；
video.addEventListener('pause', updateButton)；

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
```

上面的代码中，我们使用了关键字 `this`。其实在调用 `updateButton` 的时候，这个方法已经被绑定在了 `addEventListener` 的调用者上，也就是绑定到了 `video` 上。因此，`this.paused` 在这里就相当于 `video.paused`。

#### 进度条

进度条需要能在鼠标点击和拖动的时候改变视频播放的进度。我们先实现进度条随着视频播放更新进度的功能。

进度条显示进度的原理很简单，`progress__filled` 这个class绑定的元素是一个 `flex` 定位的元素，我们改变其 `flex-basis` 的百分比值就可以调节它所占父元素的宽度。`flex-basis` 值代表 `flex` 元素在**主轴**方向上的初始尺寸。

现在只要运行 `handleProgress` 这个函数就能够更新对应的进度条，但我们需要的是自动执行这个操作。也许你会想到利用 `setInterval` 设置一个定时器，其实 `video` 元素给我们提供了更好的方法—— `timeupdate` 事件。这个事件会在媒体文件的 `currentTime` 属性改变的时触发，更多信息请参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/timeupdate)

```js
function playUpdateProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

video.addEventListener('timeupdate', playUpdateProgress)
```

这样随着视频播放，进度条就会更新进度了。

接着我们可以通过点击或者鼠标拖动来修改进度，可以通过事件对象的`offsetX`属性找到，表示鼠标点击位置相对于该元素的水平位移，得到位移后，再通过DOM元素的`offsetWidth`属性获取其宽度，这样就可以得到进度的百分比。

而`video`的`duration`属性可以得到视频播放总长度，以秒单位计。更多信息请参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/duration)

```js
function playProgress(e) {
    const curTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = curTime
}
```

这仅仅只是点击切换进度，另外，还要求拖动修改进度，
这种操作可以设置一个`flag`标志来判断是否处于拖动状态，通过`mousedown`、`mousemove`、`mouseup`事件来修改标志位。

```js
let mousedown = false
// 鼠标按下修改标志位
progress.addEventListener('mousedown', () => mousedown = true)
// 鼠标拖动确认标志位并执行函数
progress.addEventListener('mousemove', (e) => {
    if (mousedown) playProgress(e)
});
// 作者的简洁写法 &&
progress.addEventListener('mousemove', (e) => mousedown && playProgress(e))
// 鼠标抬起恢复标志位
progress.addEventListener('mouseup', () => mousedown = false)
```

我们利用逻辑和操作符 `&&` 的**短路**特性来实现 “只有当 `mousedown` 为 `true`，或可类型转换为 `true` 时才执行 `playProgress(e)`” 的判断操作，由于逻辑和的判断必须两个都为真时才成立，所以若第一项不为真，那么 js 就不会去管第二项是什么，因此也就不会执行 `playProgress(e)`。这种写法在实际项目中是挺常见的，算是一个小技巧。

另外一种操作，逻辑和操作符 `||`,只有`mousedown` 为 `false`，或可类型转换为 `false` 时才执行 `playProgress(e)`” 的判断操作。 

其实包括上面作者的`video[method]()`这样的简写都蛮有意思的，平时开发我都挺少用到，可以学习看看。

#### 快进后退

首先绑定快进和后退按钮，先绑定DOM元素，本人自己添加了class`skip`,不太喜欢属性选择器，绑定到`skips`,对应的就是快退/快进两个按键。可以尝试一下，如果我们直接在命令行输出这个 `skips`，会得到一个数组。因此，我们需要用 `forEach` 来遍历一下，给每一个按钮都添加上事件监听`skipPlay`

```js
skips.forEach(button => button.addEventListener('click', skipPlay));
```

`video` 有一个属性叫 `currentTime`，可以用来设置视频当前的时间。

```js
function skipPlay() {
    video.currentTime += parseFloat(this.dataset.skip)
}
```

要注意的是，这里就不能用 `this` 来访问 `video` 对象了，因为在这里面，`this` 指向的是遍历得到的每一个 `button`，而我们是要修改 `video` 的 `currentTime` 属性。

#### 音量和播放速度

通过控制面板上两个滑动条来控制视频的音量和播放速度。这两个滑动条是 `range` 类型的 `input` 元素，在元素属性中我们指定了他们各自的最大、最小值和调节的范围。

`input`分别有一个 `volume` 和 `playbackRate` 的 `name` 属性，我们起这两个名字是因为他们是 `video` 对象里对应音量和播放速度的两个属性名。这样起名并不是必须的，但可以让我们后面 js 的操作更精简。

通过监听两个 `input` 元素的 `change` 事件和`mousemove`事件，我们就可以通过其 `value` 值改变视频属性了：

```js
function rangeUpdate() {
    video[this.name] = this.value
}

//遍历 ranges 给两个滑动条都绑定事件
ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate))
```





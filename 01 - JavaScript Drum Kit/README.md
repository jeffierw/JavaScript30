# 01 - JavaScript Drum Kit  笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

模拟打鼓效果的网页。用户敲击键盘ASDFGHJKL，页面字母对应按钮变大，对应鼓声会响。

[在线查看效果](https://jeffierw.github.io/JavaScript30/01%20-%20JavaScript%20Drum%20Kit/index-YepW.html)

## 笔记

### 步骤

1. 添加键盘事件，在BOM上绑定`keydown`事件
2. 事件处理逻辑
    1. 获取键码
    2. 用 `querySelector` 获取元素
    3. 获取 `data-key`为对应键码的元素
    4. 播放音频，添加样式。
3. 给所有的类名为`key`的div添加`transitionened`事件
4. 去除样式的事件处理

### 难点

#### 如何将键盘按键和页面按钮联系起来？

初始文件中HTML里的``keycode`的值和ASCII编码值相同，通过自定义属性`data-key`，用`querySelector` 获取元素

#### 如何保证按键按住不放，有持续的鼓声？

每次播放音频之前，设置播放时间戳为0，
```js
audio.currentTime = 0
audio.play()
```

#### 样式变化后如何让按钮恢复原状？

结合`transitionend`事件，顾名思义，会在CSS transition结束后触发；我们可以在每次样式变化后，去除相应样式。

因为页面中发生transition的样式属性不止一个 （`box-shadow, transform, border-color`）,所以需要添加判断，每发生一次按键事件，只去除一次样式。

```js
function removeClassHandler(e) {
    console.log(e);
    if (e.propertyName == 'transform') {
            e.currentTarget.classList.remov('playing')
        }
    }
```


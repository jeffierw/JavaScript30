# 03 - CSS Variables  笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

使用JS和CSS3实现拖动滑块，实时调整图片的内边距，模糊度，背景颜色，同时标题中 JS 字体的颜色也随图片背景颜色而变化。

[在线查看效果](https://jeffierw.github.io/JavaScript30/03%20-%20CSS%20Variables/index-YepW.html)

## 笔记

### 关键字

1. [:root](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
2. `var(--xx)`: [CSS变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)
3. `filter: blur()`
4. `change` `mousemove` 事件
5. `document.documentElement.style.setProperty('--base', '#fff');` JS修改CSS属性或者变量。

### CSS3部分

1. 声明全局（:root）即html的CSS变量
2. 将变量应用到页面中图片`img`和`h1`标题上

### JS

1. 获取页面上`input`元素
2. 通过forEach给每个`input`添加监听事件，触发更新操作
3. 编写事件函数
    1. 获取参数值后缀`data-sizing`
    2. 获取参数名 （blur、spacing、color）
    3. 获取参数值 （10px, #efefef）
    4. 赋值给对应的CSS变量

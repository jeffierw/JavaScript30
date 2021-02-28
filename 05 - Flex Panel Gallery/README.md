# 05 - Flex Panel Gallery 笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

通过事件触发图片文字动画效果来学习`Flex布局`、`transform`、`transition`动画效果。

[在线查看效果](https://jeffierw.github.io/JavaScript30/05%20-%20Flex%20Panel%20Gallery/index-YepW.html)

## 笔记

### 实现步骤

1. flex布局改变初始的样式
1. 绑定所有类名为`panel`的元素
2. 为每一个panel添加点击事件
3. 编写panel变大后的样式，以及文字飞入时，飞出时的样式；
3. 使用dom的`classList`的`toggle`方法切换其样式

### 相关知识点

#### Flex

flex很基础，MDN配合[这个网站](https://flexboxfroggy.com/)练习没有什么问题，就不介绍了。

#### CSS3 transform transition

`transform`变形 对元素做`rotate`旋转、`scale`缩放、`translate`移动等动作；

`transition`过渡 对上述变形做出过渡效果，一般是缩写形式`transition：需要过渡的属性 | 过渡时长 | 过渡效果 | 延时时长 `

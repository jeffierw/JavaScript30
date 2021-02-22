# 02 - JS and CSS Clock  笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

文档已经给出简单的时钟HTML和CSS样式，可以对样式做一些修改，用JS动态更新指针的状态。

[在线查看效果](https://jeffierw.github.io/JavaScript30/02%20-%20JS%20and%20CSS%20Clock/index-YepW.html)

## 笔记

### 操作步骤

1. 获取三个指针
2. 获取实时的时分秒相对正12点所走的角度
3. 重复执行，每一秒改变一次

### JS部分

主要是计算时分秒角度的函数
```js
let secondHand = document.querySelector('.second-hand')

let minHand = document.querySelector('.min-hand')
        
let hourHand = document.querySelector('.hour-hand')

function setTime() {
            const now = new Date()

            let secondsDeg = now.getSeconds() * 6 // 360/60
            let minsDeg = now.getMinutes() * 6 + (now.getSeconds() / 60) * 6 // (now.getSeconds() / 60)表示当前秒数占一圈60秒的百分比； 乘以6度（一分钟占一圈360度的6度）得到当前分钟数向前多走的百分比
            let hoursDeg = now.getHours() * 30 + (now.getMinutes() / 60) * 30 // (now.getMinutes() / 60)表示当前分钟占一圈60分钟的百分比； 乘以30度（一小时占一圈360度的30度） 得到当前小时向前多走的百分比

            secondHand.style.transform = `rotate(${secondsDeg}deg)`
            minHand.style.transform = `rotate(${minsDeg}deg)`
            hourHand.style.transform = `rotate(${hoursDeg}deg)`
        }
```

再利用定时器重复执行函数，使得指针转动。这里说下`setInterval setTimeout requestAnimationFrame` 三者的区别和用途

setInterval 设定运行间隔 一直持续运行

setTimeout 设定间隔 运行一次
而BOM的requestAnimationFrame 可以理解为专门处理页面更新的setTimeout

这里时钟变化更适合第三种 

```js
function animationHandler() {
            setTime()
            window.requestAnimationFrame(animationHandler)
        }

window.requestAnimationFrame(animationHandler)
```
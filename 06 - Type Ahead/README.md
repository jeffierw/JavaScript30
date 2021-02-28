# 06 - Type Ahead 笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

输入城市名或者州名在搜索框内，下方自动显示相关关键词的城市或者州名。

[在线查看效果](https://jeffierw.github.io/JavaScript30/06%20-%20Type%20Ahead/index-YepW.html)

### 笔记

#### 实现步骤

1. 通过`change`、`keyup`事件绑定input框
2. 使用`fetch`API获取城市json数据
3. 写个函数专门处理城市名和州名的正则匹配，通过`filter`过滤出符合条件的数组
4. 事件处理函数将正则匹配的数组通过`map`处理成HTML数组，最终通过`join`处理成一个HTML字符串

#### 相关知识点

##### [fetch API](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

fetch使用Promise,不使用XMLHttpRequest的callback,写起来更简洁。

##### [正则表达式](https://wangdoc.com/javascript/stdlib/regexp.html)

JS的RegExp对象可以构建正则表达式的功能，并提供了丰富的API方法

##### [ES6模板字符串](https://wangdoc.com/es6/string.html) [ES6解构赋值](https://wangdoc.com/es6/destructuring.html)

模板字符串让我们写字符串和变量的拼接更加方便，解构赋值可以用来从函数中返回多个值，定义函数参数时方便与变量名匹配，或者是本例中读取json数据。

#### 难点

##### 如何将匹配的数组展示在输入框下方？

主要是通过map将匹配数组的每一项按照想要的HTML格式迭代生成，最终通过`join()`转化为一个完整的字符串赋值给获取到的ul元素

```js
function changeHandler() {
            console.log(this.value);
            const matchArr = matchHandler(this.value, jsonArr)

            const html = matchArr.map(i => {
                const reg = new RegExp(this.value, 'gi')

                const cityName = i.city.replace(reg, `<span class="hl">${this.value}</span>`)
                const stateName = i.state.replace(reg, `<span class="hl">${this.value}</span>`)

                return `<li>
                        <span class="name">${cityName},${stateName}</span>
                        <span class="population">${numberWithCommas(i.population)}</span>
                    </li>`
            }).join('')
            console.log(html);
            ul.innerHTML = html
        }
```
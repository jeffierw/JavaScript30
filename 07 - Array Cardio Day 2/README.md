# 07 - Array Cardio Day 2 笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

通过一些问题介绍Array对象的另外四种方法。

[在线查看效果](https://jeffierw.github.io/JavaScript30/Array%20Cardio%20Day%202/index-YepW.html)

## 笔记

本节是第四节的下篇，又介绍了Array对象的另外四种方法，分别是`some()`,`every()`,`find()`,`findIndex()`

### 相关知识点

#### [some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

接受一个函数，测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。如果数组为空，返回false。

例如本节题目数组中至少有一人大于19岁，通过比较返回布尔值来判断。

```js
    let thisYear = new Date().getFullYear()
    let res1 = people.some(i => {
        return thisYear - i.year >= 19
    })
    console.log(res1);
```

#### [every](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

接受一个函数，测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。如果数组为空，返回false

例如本题数组中判断是否每一个人都大于19岁，通过遍历比较返回布尔值来判断。

```js
    let thisYear = new Date().getFullYear()
    let res2 = people.every(i => {
        return thisYear - i.year >= 19
    })
    console.log(res2);
```

#### [find](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

接受一个函数，返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

例如本题数组中寻找id为823423的对象，寻找到第一个对象时返回该值。

```js
    let res3 = comments.find(i => {
        if (i.id === 823423) return i
    })
    console.log(res3);
```

#### [findIndex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

接受一个函数，返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。

例如本题数组中寻找id为823423的对象，寻找到第一个对象时返回该对象的下标。

```js
    let res4 = comments.findIndex(i => {
        if (i.id === 823423) return i
    })
    console.log(res4);
```






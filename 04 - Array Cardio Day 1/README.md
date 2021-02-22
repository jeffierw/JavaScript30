# 04 - Array Cardio Day 1 笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

主要通过对一组数据的各种处理来学习JS Array的一些方法:`filter,map,sort,reduce`, 实现效果可通过打开HTML文件，通过控制台打印的结果来查看。

[在线查看效果](https://jeffierw.github.io/JavaScript30/04%20-%20Array%20Cardio%20Day%201/index-YepW.html)

## 笔记

一共八个小题目：

1. 筛选 16 世纪出生的发明家
2. 得到一个只有发明家姓名的数组
3. 将数组按照发明家出生顺序从老到年轻排序
4. 计算所有发明家活了多长时间
5. 将数组按照发明家活的岁数排序
6. 过滤出维基百科某介绍含有某个词语的标题
7. 按照字母表顺序对people数组的姓排序
8. 计算数组中各个东西的数量

### 相关知识点

#### [filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

顾名思义，对数组中的单个对象或值，通过function去做过滤得到**新数组**，对原数组不影响。

```js
const ans1 = inventors.filter(i =>
      i.year >= 1500 && i.year < 1600
)

console.table(ans1)
```

#### [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

字面意思我理解为映射，对数组每个元素通过function做出各种处理后得到**新数组**，对原数组不影响。

```js
const ans2 = inventors.map(i => i.first + ' ' + i.last)

console.table(ans2);
```

#### [sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

MDN介绍上介绍默认情况下排序是按照字符串Unicode的形式升序排列，所以在某些情况下，直接调用排序可能存在隐患；一般使用sort 通过function，接受两个参数，分别代表数组中可对比的两个元素去进行比较。

```js
const ans3 = inventors.sort((a, b) => {
    return a.year == b.year ? 0 : (a.year < b.year ? -1 : 1)
})

console.table(ans3);
```

#### [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

reduce的第一个参数是一个函数，对数组每一项作出计算，最终返回一个计算后的最终值；这个值是这个函数的第一个参数，第二个参数表示要计算的数组的每一项。

reduce第二个参数代表着计算的结果的最终形式，一般是计算的初始值。

```js
const ans4 = inventors.reduce((init, i) => init + i.passed - i.year, 0)

console.log(ans4);
```

> 理解Array的reduce，filter，map有一个很有用且有趣的图，可帮助理解使用。

![](https://github.com/jeffierw/MarkdownImages/raw/master/JavaScript30/introduce_map_reduce_filter.png)
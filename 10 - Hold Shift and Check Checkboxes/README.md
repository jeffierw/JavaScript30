# 10 - Hold Shift and Check Checkboxes 笔记

> 介绍：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。完整笔记在 [GitHub](https://github.com/jeffierw/JavaScript30)

## 实现效果

初始文档中提供了一组 `checkbox` 类型的 `input` 元素，选中某个复选框时，其 `<p>` 标签中的文字会显示删除线。最终效果是，提供按下 Shift 键后进行多选操作的功能。 [在线查看效果](https://jeffierw.github.io/JavaScript30/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index-YepW.html)

## 难点处理

思路来说，当按下 Shift 键进行多选时，发生了什么？

1. 选中 A 项
2. 按下 Shift
3. 再选中 B 项
4. A-B 之间的所有项都被选中

重点在于A,B之间的范围的CheckBox的checked也会发生改变。所以很容易想到使用Array的`slice()`来截取A,B范围内的元素。

### 解决方案

首先将获取到的 `<input>` 组转化为数组，针对每次操作，获取 A 和 B，利用 `indexOf()` 来获得 A 和 B 在数组中的索引值，由此即可确定范围，并能通过 `slice()` 来直接截取 A-B 的所有 DOM 元素，并进行状态改变的操作。

1. 转换 Nodelist 为数组  

```js
const checkboxes = Array.from(document.querySelectorAll('.item input'))
```

2. 针对按下了 Shift 键的情况，获取 A-B 范围;截取该范围内的数组元素，并改变选中状态

```js
function clickHandler(e) {
            console.log(e, this);
            if (this.checked) {
                if (e.shiftKey && lastChecked !== null) {
                    let nowChecked = checkboxes.indexOf(this)
                    checkboxes.slice(Math.min(lastChecked, nowChecked), Math.max(lastChecked, nowChecked)).forEach(input => {
                        input.checked = true
                    })
                }
                lastChecked = checkboxes.indexOf(this)
                console.log(checkboxes.indexOf(this));
            } else {
                lastChecked = null
            }
        }
```



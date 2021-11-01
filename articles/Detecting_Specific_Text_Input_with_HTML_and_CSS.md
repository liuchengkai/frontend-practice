# 使用HTML与CSS来检测特定的文本输入

> - 原文地址：[Detecting Specific Text Input with HTML and CSS](https://www.impressivewebs.com/detecting-specific-text-input-with-html-css/)
> - 原文作者：LOUIS LAZARIS
> - 译文出自：[掘金翻译计划](https://juejin.cn/translate)


原文链接：https://www.impressivewebs.com/detecting-specific-text-input-with-html-css/  
掘金翻译链接：https://juejin.cn/post/7025602711844290590

最近我看到开发者[Jane](https://propjockey.io/)在CodePen上写的一个[示例](https://codepen.io/propjockey/pen/NWjWwLo)，[Šime Vidas也在推特上进行了转发](https://twitter.com/simevidas/status/1438626075530174468)。这个示例用到了一些HTML和CSS的小技巧来完成，我觉得这很值得去认真地研究下。

在这个页面中，当输入了特定的文本后，隐藏的文本就会出现。好吧，可能你觉得这没什么大不了，但这是通过纯HTML与CSS来实现的，没有用到任何的JavaScript代码。我以前也见过类似的东西，但我还是想详细地分析一下其中的实现原理。下面是刚刚提到的示例：

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NWjWwLo" data-user="propjockey" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/propjockey/pen/NWjWwLo">
  Add secret website button codes with vanilla CSS (NO JS!)</a> by Jane 💜 (<a href="https://codepen.io/propjockey">@propjockey</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

注意页面中的说明，你的光标需要聚焦在CodePen的预览窗口里。

### HTML的`accesskey`的使用
------------------------

正如页面中隐藏的文本所提到的，这个示例用到了HTML的[`accesskey` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey)。这个属性可能会唤起一些人过去的记忆，因为它算是一个比较旧的特性了：

> 这个属性可以为对应的元素指定一个键盘快捷键。

这就意味着，用户可以通过一组浏览器或平台特定的按键，使得带有特定`accesskey`值的元素获得焦点（该属性的取值可以是键盘能够输出“打印”的任一字符）。

你可以像下面这样来设置一个accesskey值：

```
<input accesskey="c">
```

MDN关于`accesskey`的文档里有一张图表，它列出了不同浏览器及其平台上用户触发accesskey的方式。虽然触发accesskey的快捷键取决于浏览器，但大部分都是“ALT-按键”（Windows）或“CTRL-ALT-按键”（Mac）。

在Jane的示例里，虽然文本输入框被隐藏起来了，但还是可以访问到的。等一下我还会再继续谈到`accesskey`这个属性，在那之前我们先来看一下示例里其他也比较有趣的部分吧。

### `pattern`属性的使用
-----------------------------

为了实现示例的效果，在隐藏的文本输入框上还用到了[pattern属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)。奇怪的是，MDN的文档并没有列出关于`pattern`属性的浏览器兼容性，但用起来应该也没什么问题。如果我没记错的话，它也就比其他HTML5的表单特性出现了得晚了一点而已。

这个属性的值可以是一个正则表达式，在验证表单是否合法时会去检测输入文本是否与对应的正则表达式匹配。该属性适用于以下 \<input\> 类型：`text`，`tel`，`email`，`url`，`password`以及`search`。

这个示例并没有用到正则表达式有关的特殊字符来做一些比较复杂的事情，它只是去检测输入文本是否与一段固定字符串相匹配。

```
<input accesskey="c" pattern="wow!">
```

这里并没有进行表单提交，那又该如何去“验证”该表单是否合法呢？

### `:valid`与`:placeholder-shown`伪类
----------------------------------------------------

为了确认表单是否合法，示例充分利用了CSS中的`:valid`伪类。所以你可以像下面那样，在还没有提交前，给验证合法的表单应用不同的样式：

```
:valid {
  border: solid 1px green;
}
```

这会马上给任一合法的表单添加上绿色的边框，并且不需要表单提交的操作就可以实现。而`:invalid`伪类则与`:valid`的作用刚好相反。两者都有很好的浏览器支持，所以在使用的时候不必有太多顾虑。

这个示例还用了`:placeholder-shown`伪类。这个伪类会选中那些使用了`placeholder`属性且值可见的元素（也就是说用户还没有进行文本输入的操作，占位符 placeholder 的提示信息还未消失）。

```
:placeholder-shown {
  background: white;
}
```

这个伪类对于示例功能整体的实现来说并不是很重要，但会出现在我等一下要讨论到的示例中那一串看起来又长又复杂的CSS选择器规则当中。

### 又长又复杂的CSS选择器规则
--------------------------

一旦我们明白了刚才那两个伪类的用法后，我们就可以开始去理一下示例中的那串长长的选择器规则了：

```
.secret-code:not(:placeholder-shown):valid ~ * {
  --secret_code: ;
}
```

除了`:valid`和`:placeholder-shown`这两个伪类，选择器规则中还包含了更常见的`:not()`伪类、后续兄弟选择器以及通配选择器。这么多选择器放到一起可能一时半会儿不好理解，它其实要做的事情是这样：

* 选中没有显示占位符 placeholder 提示，同时
* 输入已验证合法，并且
* 带有`secret-code`类名元素的
* 后续兄弟元素

理解了这个选择器规则后，我们就可以接着来看看如何通过CSS巧妙地去实现文本显示与隐藏的切换了。

### `--var()`空格切换（Space-toggle）技巧
-------------------------------

这个示例中用到了叫做空格切换（或者Var切换）的技巧。在一年前[Lea Verou对其进行了讲解](https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property/)，并且这是[Ana Tudor](https://twitter.com/anatudor/status/1284160219963170816)首先发现并使用的。这个技巧采用了CSS的自定义属性（也就是CSS变量）。事实上Jane在很多项目中都用到了它，其中包括[CSS扫雷](https://github.com/propjockey/css-sweeper)还有[Augmented UI](https://augmented-ui.com/)库.

这个技巧只需要在一个元素上使用一个属性值，就可以很轻易地实现一组CSS属性/值对的切换。

注意示例中`div`元素的行内样式：

```
<div style="--wow: var(--secret_code) green; color: var(--wow, black);">
```

虽然有点奇怪，但`--wow`这个自定义属性确实使得空格切换技巧成功实现了。在满足选择器规则前，这个自定义属性的值是非法的。因为这时候还没有给`--secret-code`变量赋值。但当`--sceret-code`设置了一个值且为空格时，`green`这个属性值就会起作用了（这也是空格切换技巧名字的由来）。

本质上`--wow: var(--secret_code) green;`会被计算为`--wow: green;`（在CSS的值中，额外空格不会有什么影响）。

为了解释得更清楚，这个行内样式的意思大概是这样的：

* 定义一个`--wow`变量，它的值里有一个不存在的自定义属性，后面跟着颜色“green”
* 将`color`属性的值设为`--wow`变量（目前非法），且回退备用值为`balck`（即当属性值不存在时，会使用的备用值）
* 因为`--wow`当前非法，所以会使用回退备用值green

这就是为什么当你刚开始加载页面时，文本的颜色是黑色的。

实现切换的关键是，为`--secret_code`添加一个空格字符作为它的值。这会使`--wow`的初始定义有效，此时将不会用到备用颜色black。一旦添加了空格字符作为属性值后，逻辑会是这样的：`

* 定义`--wow`变量，值为两个空格和颜色green
* 设置`color`属性的取值为`--wow`变量的值（此时为空格），回退备用值为`black`
* 因为`--wow`目前是 _有效的_，且这并不会影响到`green`这个值，所以最终color取值为`green`

显示隐藏文本的`span`元素也是同样的逻辑：

```
<span style="--wow: var(--secret_code) block; display: var(--wow, none);">
```

跟之前类似，只有满足选择器规则后，“block”值才会生效，生效后会使得`var(--secret_code)`合法（那么`--wow`也是合法的）。

这个空格切换技巧中用到的非法变量一开始让我很困惑。例子中的`green`这个值就让我当时搞不明白怎么回事。因为在我看来，它更像是一个回退备选值，所以第一眼看到的时候觉得这不符合逻辑。但它实际上它并不是备选值。当选择器变量定义传过来的空格使得`--wow`的属性值合法时，就相当于是切换到了`green`这个值。

关于空格切换技巧还有最后一件事要说明一下：在很多情况下并不推荐使用，并且会在使用了CSS压缩工具的情况下带来很多问题。因为压缩工具通常会删去多余的空格字符，而这个技巧恰好就是靠这个实现的。我用了一些在线压缩工具对这个技巧进行了测试，确实很多情况下都导致了一些问题。所以当你要选择使用这个技巧时，一定得注意到这一点。

### 关于使用`accesskey`的最后忠告
-------------------------------------

正如之前提到的，这个技巧使用到了`accesskey`属性。看起来是个挺有用且应该需要好好利用的特性。在Šime推特原文中提到，[讨论这个话题时，WebAIM给出了提醒](https://webaim.org/techniques/keyboard/accesskey):

> 尽管`accesskey`这个属性的出现用意是挺好的，但因为浏览器实现方式的不同与不足，它经常无法为网页提供一个键盘快捷键可行的方案。

接着WebAIM列举了很多原因，来说明使用`accesskey`会产生问题，最后得出以下结论：

> 因为在实现中存在许多问题，所以最好不要去使用`accesskey`这个属性。如果用了，那就需要非常谨慎。最重要的是得明白：有些用户会从中得到一些便利，但有些不会，甚至它还可能给部分用户带来麻烦。

虽然`accesskey`是这个技巧实现的重要部分，但如果你原本对其他部分的内容（可能也是会更常用到的）不是很熟悉的话，那我希望你也能够有些收获。
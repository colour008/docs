
---

Hexo框架默认会使用`hexo-renderer-marked`来作为markdown的渲染器，然后再给默认安装的Mathjax来渲染公式。在该渲染方式下笔者文章中的所有公式都会被重复显示一遍。这似乎是这两个渲染器的转译规则导致了符号语法冲突。

网络上能够搜到的解决方案有很多，比如把原先的markdown渲染器修改为`hexo-renderer-kramed`，或者直接修改Mathjax的渲染引擎脚本。不过有些博客中提到`hexo-renderer-kramed`引擎需要改变一部分的文档语法，并且可能导致代码块高亮失效。而修改脚本又是麻烦事。因此笔者选择了一种较为简单的**Pandoc渲染器+hexo-filter-mathjax公式插件**的解决方案。其配置和安装都比较简单，解决了默认渲染器插件支持有限的问题，公式的编写语法也与大部分markdown编辑器一致。

# 更换渲染器

比Hexo默认渲染器更加好用的渲染器有不少，博主选择的是`hexo-renderer-markdown-it`。除上文中提到的两种，在这里也推荐`hexo-renderer-pandoc`(因为其兼容的语言较多)，这个渲染器支持不少好用的插件。

## 步骤1: 卸载默认渲染器

开始安装前，我们先要移除原先的默认渲染器。在你的Hexo框架的blog根目录下打开终端，输入以下指令:

```
npm uninstall hexo-renderer-marked  --save
```

## 步骤2: 安装新渲染器

同样在你的blog根目录下，安装`markdown-it`渲染器:

```
npm i hexo-renderer-markdown-it --save
```

如果要安装其他渲染器，那么直接将名称替换上面的`hexo-renderer-markdown-it`即可。

安装完`hexo-renderer-markdown-it`渲染器后，将如下文本复制粘贴到 Hexo 的配置文件`_config.yml`的尾部:

```yaml
# Markdown config
markdown:
  preset: "default"
  render:
    html: true
    xhtmlOut: false
    langPrefix: "language-"
    breaks: true
    linkify: true
    typographer: true
    quotes: "“”‘’"
  enable_rules:
  disable_rules:
  plugins:
    - markdown-it-abbr
    - markdown-it-cjk-breaks
    - markdown-it-deflist
    - markdown-it-emoji
    - markdown-it-footnote
    - markdown-it-ins
    - markdown-it-mark
    - markdown-it-sub
    - markdown-it-sup
    - markdown-it-checkbox
    - markdown-it-named-headings
    - markdown-it-imsize
    - markdown-it-expandable
    - name: markdown-it-container
      options: success
    - name: markdown-it-container
      options: tips
    - name: markdown-it-container
      options: warning
    - name: markdown-it-container
      options: danger
  anchors:
    level: 2
    collisionSuffix: ""
    permalink: false
    permalinkClass: "header-anchor"
    permalinkSide: "left"
    permalinkSymbol: "¶"
    case: 0
    separator: "-"
```

此渲染器包含的插件如下：



| 名称                 |   描述   |                 语法                  |                    示例                    |
| -------------------- | :------: | :-----------------------------------: | :----------------------------------------: |
| markdown-it-abbr     |   注释   | `*[HTML]: Hyper Text Markup Language` | 具体效果表格内无法显示，可参照表格后的示例 |
| markdown-it-emoji    |   表情   |                 `:)`                  |                     😃                      |
| markdown-it-footnote |   脚注   |            `参考文献[^1]`             |                参考文献[^1]                |
| markdown-it-ins      |  下划线  |             `++下划线++`              |               <u>下划线</u>                |
| markdown-it-mark     | 突出显示 |              `==标记==`               |                  ==标记==                  |
| markdown-it-sub      |   下标   |                `H~2~O`                |                   H~2~O                    |
| markdown-it-sup      |   上标   |                `X^2^`                 |                    X^2^                    |
| markdown-it-checkbox |  复选框  |  `{% raw %}- [ ] 未选中{% endraw %}`  |                - [ ] 未选中                |
| markdown-it-checkbox |  复选框  |   `{% raw %}- [x] 选中{% endraw %}`   |                 - [x] 选中                 |

`markdown-it-abbr`注释示例：

*[HTML]: Hyper Text Markup Language

*[W3C]:  World Wide Web Consortium

The HTML specification is maintained by the W3C.

分别使用 `npm` 命令安装以下三个插件：

```bash
npm i markdown-it-checkbox
npm i markdown-it-imsize
npm i markdown-it-expandable
```

其它插件 `hexo-renderer-markdown-it` 渲染器自带的有，不要安装。

> 该渲染器能完美解决Markdown表格中如果出现"|"符号时，被识别错误的问题。

对于Pandoc渲染器，这里直接安装Pandoc即可：[Pandoc官网安装页面](https://pandoc.org/installing.html)。具体安装方法根据自己的操作系统选择就行。

# 更换公式渲染插件

[hexo-filter-mathjax](https://github.com/next-theme/hexo-filter-mathjax)这个公式插件是官方支持的插件之一，其支持的公式输入语法与主流markdown编辑器较为一致。

## 步骤1:卸载hexo-math

在你的Hexo框架的blog根目录下打开终端，输入以下指令:

```
npm uninstall hexo-math --save
```



## 步骤2:安装hexo-filter-mathjax

同样在你的blog根目录下，安装插件:

```
npm install hexo-filter-mathjax  --save
```



## 步骤3:在全局配置中配置公式渲染

 在你的Hexo框架的blog根目录下打开`_config.yml`文件，在文件中加入如下内容:

```
mathjax:
  tags: none # or 'ams' or 'all'
  single_dollars: true # enable single dollar signs as in-line math delimiters
  cjk_width: 0.9 # relative CJK char width
  normal_width: 0.6 # relative normal (monospace) width
  append_css: true # add CSS to pages rendered by MathJax
  every_page: false # if true, every page will be rendered by MathJax regardless the `mathjax` setting in Front-matter
```

各个参数的用处可以看代码注释。没有特别需求基本不需要更改。

## 步骤4:需要公式的博客文章启用公式渲染器

 在你写的，需要使用公式的markdown文档的front-matter中添加一个参数：

```
mathjax: true
```

以本片博客的front-matter为例:

```
---
title: 使用Hexo框架时的种种问题和解决方法
date: 2023-07-19 01:17:17
cover: https://cdn.jsdelivr.net/gh/KiRorY/pic_Warehouse/pic/post2/hexo.jpg
tags:
- Hexo
categories: 教程
mathjax: true
---
```

如果你认为给单独一篇文章加参数太麻烦，你也可以在`_config.yml`文件中刚刚添加的`mathjax`设定下，把`every_page`的参数改为`ture`。

至此公式应该可以正常渲染，尝试以下矩阵式子是否能正常显示：

```
$$
\alpha=
\begin{pmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{pmatrix}
$$
```

渲染结果：

![image-20241210202052619](https://bu.dusays.com/2024/12/10/67583221421f4.png)

<span style="text-emphasis:filled red; border:1px solid #330000; background:#FFFF00; color:#FF8000;">参考文档</span>

[1] [hexo博客next主题添加对数学公式的支持](https://blog.csdn.net/weixin_45511189/article/details/115798563)

[2] [Hexo博客(13)添加MathJax数学公式渲染](http://masikkk.com/article/hexo-13-MathJax/)

[3] [在Hexo中使用Mathjax渲染数学公式](https://www.zhangwei.press/2021/03/03/工具/Hexo/在Hexo中渲染MathJax数学公式/)

------

# 在博客文章中添加Emoji表情

   markdown支持Emoji表情的使用，但是在Hexo框架下需要安装插件才能使表情能被渲染。在[Markdown中使用公式的渲染问题](https://kirory.xyz/2023/07/19/Hexo框架博客关于输入公式和表情的问题/#markdown中使用公式的渲染问题)中，笔者提到了`hexo-renderer-markdown-it`这个渲染器，如果你安装了该渲染器，那么可以直接安装渲染器插件`markdown-it-emoji`(不过通常该渲染器已经自带了这个插件了)。在你的Hexo框架blog根目录下打开终端，输入以下指令:

```
npm install markdown-it-emoji --save
```

笔者安装的渲染器是Pandoc,所以需要安装另一个插件`hexo-filter-github-emojis`，以下是该插件的安装和配置流程。



## 步骤1：安装插件

  在Hexo框架blog根目录下打开终端，输入以下指令:

```
npm install hexo-filter-github-emojis --save
```



## 步骤2：在全局配置中启用插件

  打开博客根目录下的`_config.yml`配置文件，添加以下语句:

```
githubEmojis:
  enable: true
  className: github-emoji
  unicode: true
  styles:
    display: inline
    vertical-align: middle # Freemind适用
  localEmojis:
```

关于参数的说明可以查看其[Github说明文档](https://github.com/crimx/hexo-filter-github-emojis)。

## 在文章中插入Emoji表情 😃

![img](https://bu.dusays.com/2024/12/10/67583131a5e8b.png)

Emoji的插入方法有很多，比较方便是直接使用Emoji的快捷代码。例如：`:grinning:` 😀

![img](https://bu.dusays.com/2024/12/10/67583131a53f4.png)

 Emoji表情的快捷代码可以直接上网找，这里提供一个[Emoji快捷码对照网站](https://www.ifreesite.com/emoji/shortcode.htm)。

<span style="text-emphasis:filled red; border:1px solid #330000; background:#FFFF00; color:#FF8000;">参考文档</span>

[1] [Hexo 博客使用 emoji 表情](https://spacefan.github.io/2018/06/30/hexo-emoji/)

# 文章页局部 html 代码不渲染

在你的 md 文章页中，部分内容不想经过 Hexo 渲染，则包一层 `raw` 标签：

```
{% raw %}
<div class="">你的一些代码...</div>
<script>你的一些代码...</script>
{% endraw %}
```

那么标签内的代码就不会被框架渲染了~

[^1]: 这是一个测试脚注
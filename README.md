# ChromePlugin
开发一些以chrome插件形式实现的页面工具

### 几篇chrome开发教程
http://open.chrome.360.cn/extension_dev/overview.html
<br />http://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html
<br />http://blog.csdn.net/my_business/article/details/7711525
<br />http://www.cnblogs.com/-10086/p/5171263.html
<br />http://www.ituring.com.cn/book/1421
<br />https://www.cnblogs.com/ligerleng/p/gmail_assist_2.html
<br />https://chajian.baidu.com/developer/extensions/runtime.html#event-onMessage
<br />http://ie.sogou.com/open/doc/?id=2_9&title=contextMenus

### 概述

1. 文件

每个应用（扩展）都应该包含下面的文件：

一个manifest文件<br />
一个或多个html文件（除非这个应用是一个皮肤）<br />
可选的一个或多个javascript文件<br />
可选的任何需要的其他文件，例如图片<br />
在开发应用（扩展）时，需要把这些文件都放到同一个目录下。发布应用（扩展）时，这个目录全部打包到一个应用（扩展）名是.crx的压缩文件中。

2. 引用文件

任何需要的文件都可以放到应用（扩展）中，但是怎么使用它们呢？一般的说，可以像在普通的HTML文件中那样使用相对地址来引用一个文件。下面的例子演示了如何引用images子目录下的文件myimage.png
> `<img src="images/myimage.png">`

#### 基本架构

   绝大多数应用（扩展）都包含一个背景页面(background page)，用来执行应用（扩展）的主要功能。

4. 页面

   背景页面并不是应用（扩展）中唯一的页面。例如，一个browser action可以包含一个弹窗(popup)，而弹窗就是用html页面实现的。应用（扩展）还可以使用chrome.tabs.create()或者window.open()来显示内部的HTML文件。

   应用（扩展）里面的HTML页面可以互相访问各自DOM树中的全部元素，或者互相调用其中的函数。

   下图显示了一个browser action的弹窗的架构。弹窗的内容是由HTML文件（popup.html）定义的web页面。它不必复制背景页面(background.html)里的代码,因为它可以直接调用背景页面中的函数。

5. Content scripts

   如果一个应用（扩展）需要与web页面交互，那么就需要使用一个content script。Content script脚本是指能够在浏览器已经加载的页面内部运行的javascript脚本。可以将content script看作是网页的一部分，而不是它所在的应用（扩展）的一部分。

   Content script可以获得浏览器所访问的web页面的详细信息，并可以对页面做出修改。一个content script可以读取并修改当前页面的DOM树。但是它并不能修改它所在应用（扩展）的背景页面的DOM树。

   Content script与它所在的应用（扩展）并不是完全没有联系。一个content script脚本可以与所在的应用（扩展）交换消息，它可以使用chrome.runtime 和 chrome.extension 扩展api来与所在应用进行交换消息。

   * inject script

   content scripts 虽然可以操作dom/与dom交互, 却无法操作页面上的js, 因此可以使用document.head.appendChild这样的方法把script的内容插入到页面中去执行, 这样的script就被叫做inject script, 此时插入的script需要在manifest中显式声明"web_accessible_resources": ["js/inject.js"]

   inject script无法使用任何扩展api, 一般用于操作js, 然后使用content script来进行发送数据操作

6. 页面间的通信

   一个应用（扩展）中的HTML页面间经常需要互相通信。由于一个应用（扩展）的所有页面是在同一个进程的同一个线程中运行的，因此它们之间可以直接互相调用各自的函数。

   可以使用chrome.extension中的方法来获取应用（扩展）中的页面，例如getViews()和getBackgroundPage()。一旦一个页面得到了对应用（扩展）中其它页面的引用，它就可以调用被引用页面中的函数，并操作被引用页面的DOM树。


#### 配置文件

1. manifest.json

包括扩展的名称（name）、版本（version）、描述（description）、图标位置（icons）和 manifest 版本（manifest_version）等信息。其中，name、version 和 manifest_version 是必须的，而且 manifest_version 必须为 2

```json
{
    ...
    "manifest_version": 2,
    "name": "Weather",
    "description": "a currently clone",
    "version": "0.1",
    ...
}
```

2. browser_action

browser action可以理解为对浏览器现有菜单功能的扩展。可以在manifest.json文件中对browser action进行配置.

browser_action 指定扩展的图标放在 Chrome 工具栏中，它定义了扩展图标文件位置（default_icon）、悬浮提示（default_title）和点击扩展图标所显示的页面位置（default_popup）。

```json
{
    ...
    "browser_action": {
        "default_icon": {
            "19": "images/icon19.png",
            "38": "images/icon38.png"
        },
        "default_title": "stock helper",
        "default_popup": "popup.html"
    },
    ...
}
```

3. options_page

options_page 属性定义了扩展的设置页面，配置后在扩展图标点击右键可以看到 选项，点击即打开指定页面。对于没有图标（没有设置 browser_action ）的扩展，可以在 chrome://extensions/ 页面找到选项按钮。
```
{
    ...
    "options_page": "options.html",
    ...
}
```
4. permissions

permissions 属性是一个数组，它定义了扩展需要向 Chrome 申请的权限，比如通过 XMLHttpRequest 跨域请求数据、访问浏览器选项卡（tabs）、获取当前活动选项卡（activeTab）、浏览器通知（notifications）、存储（storage）等，可以根据需要添加。
```
{
    ...
    "permissions": [
        "http://api.wunderground.com/api/"
        "tabs",
        "activeTab",
        "notifications",
        "storage"
    ],
    ...
}
```
5. background

background 可以使扩展常驻后台，比较常用的是指定子属性 scripts，表示在扩展启动时自动创建一个包含所有指定脚本的页面。
```
{
    ...
    "background": {
        "scripts": ["js/background.js"]
    },
    ...
}
```
6. chrome_url_overrides

chrome_url_overrides 属性可以自定义的页面替换 Chrome 相应默认的页面，比如新标签页（newtab）、书签页面（bookmarks）和历史记录（history）。
```
{
    ...
    "chrome_url_overrides": {
        "newtab": "tab.html"
    },
    ...
}
```
---
layout: post
title:  "cloudflare worker 搭建 vless节点"
date:   2024-11-27 09:07:18 +0800
categories: 互联网
tags: cloudflare
author: lhlloveqq
excerpt: Cloudflare Workers 是一种无服务器平台，允许您在 Cloudflare 的边缘网络上运行 JavaScript 代码。通过使用 Cloudflare Workers，您可以轻松地将 VLESS 配置信息转换为订阅内容，并将其用于 Clash 或 Singbox 等工具。
---

* content
{:toc}


**github文件地址：**[https://github.com/zizifn/edgetunnel/blob/main/src/worker-vless.js][1]

[worker-vless.js][2]

**搭建流程**

1、注册一个cloudflare账号；

2、注册一个域名，并且将域名的DNS修改为cloudflare；

3、在cloudflare的“Workers 和 Pages”菜单中“创建应用程序”；

4、创建worker；

5、名称可以保持默认，也可以修改为任意名称（英文）；

6、点击“部署”按钮；

7、点击“配置worker”；

8、点击“编辑代码”；

9、将上面的worker-vless.js中的代码替换掉worker中的原来的代码；

10、打开V2ray工具—服务器—添加[VLESS]服务器；

11、点击“用户ID(id)”后面的“生成”按钮，生成一个类似于“86797703-523c-4325-8fd8-ea3fc228038f”的字符串；

12、复制该字符串，替换掉worker中的第7行中的userID：

let userID = ‘86797703-523c-4325-8fd8-ea3fc228038f’;

13、将第9行的“let proxyIP = ”修改为下面cdn加速中的任意一个，例如：
let proxyIP = ‘cdn.anycast.eu.org’;

cdn加速

```
cdn-all.xn--b6gac.eu.org
cdn.xn--b6gac.eu.org
cdn-b100.xn--b6gac.eu.org
edgetunnel.anycast.eu.org
cdn.anycast.eu.org （亚洲地区）
```

14、点击右上角的“保存并部署”；
如果点击编辑栏右上角的“workers.dev”，在新页面打开看到的是“{”开头，“}”结尾的json内容，则说明部署已经生效了，否则就会是网页报错的页面！

15、退出编辑模式，回到worker的主页，点击预览中的“Custom Domains”后面的“查看”；

16、点击“添加自定义域”，假如你在该cloudflare账号托管的一个域名是“abc.com”，则你可以添加一个二级自定义域名例如“link.abc.com”;

17、当你添加的自定义域的证书下面显示绿色的“有效”的时候，你就可以通过“link.abc.com”这个域名访问上面的json网页了！

18、在浏览器输入“link.abc.com\86797703-523c-4325-8fd8-ea3fc228038f”，你就可以获得VLESS的链接了！

19、复制该VLESS链接，就可以添加VLESS服务器到V2ray的终端；

  [1]: https://github.com/zizifn/edgetunnel/blob/main/src/worker-vless.js
  
  [2]: https://r2.wait.loan/uploads/attach/worker-vless.js
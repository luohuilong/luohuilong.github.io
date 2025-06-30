---
layout: post
title:  "cloudflare相关设置hotlink与缓存"
date:   2025-06-14  09:07:18 +0800
categories: 网络日志
tags: cloudflare hotlink
author: LuoHuiLong
excerpt: 
---

### 缓存 ###

最近通过cloudflare开启了小黄云，磨磨蹭蹭的摸索了它的设置的一些选项，加之头一回使用，做个笔记。

开启了缓存对于源服务器的压力，还是很有作用的，不过对CN来说，还是网络上的头疼，有一丢丢慢。

好了现在来说缓存这一项，域名变更cloudflare的NDS这是第一步吧，设置好后就可以在网页上设置了。

<!--more-->

点开域名，在设置里面选择缓存-->Cache Rules，我选的通配符，这样以后用这个所有子域名都默认开启了缓存，不需要缓存的子域名以后只做加法，把不需要缓存直接加到不包含里面，如图：

![请输入图片描述][1]

**首先创建两个模版，一个缓存所有，一个缓存文件扩展名。**

这两个顺序不要排错了，扩展名是要全部缓存的，所以排最后，这样就算第一个设置里面用了不缓存，也是会缓存默认扩展名的。
打开第一个缓存所有的设置，我们来设置一下，我用的typecho，cloudreve,kiftd,xiunobbs，所以我在一个页面全部把他们搞定。

如图：

![请输入图片描述][2]

逻辑是这样的，首先把要缓存的域名以通配符式写上，然后在来做排除，我不需要xiunobbs被缓存，所以我不包含bbs这整个站，其次我排除了typecho的后台路径，登录的三个Cookie，这样后台设置就不会有问题，登录了的就不会看到缓存的页面，然后排除了cloudreve的api路径和一些必须排除的路径，这样cloudreve也正常了，还有kiftd的用户id，因为不排除这个Cookie，就算你点击下载的文件名不一样也会下载同一个文件。所以这一页就解决了，是不是很简单。

### hotlink ###

这个hotlink就是防盗链的功能，为什么不直接开启而要去页面规则里面设置配置规则呢？因为我需要排除两个其他的域名。

你如果不需要排除其他的域名，只希望你自己的域名引用图片你可以直接在这里开启，如图：
![请输入图片描述][3]

我是设置了一个配置规则：

![请输入图片描述][4]
![请输入图片描述][5]
![请输入图片描述][6]

首先把要防盗链的源域名以通配符式写上，然后在来排除，选择引用方不包含，然后写你需要引用的站点域名就可以了，你也可以设置单独源域名，以自己的需求来。

以下是我的两段表达式，直接输入表达式就不用那么繁琐的去一个一个的选择了，你也可以用表达式快速勾勒出来在来改自己需要的域名。我也做个记号，备忘一下，嘿嘿，以后在有其他关于cloudflare方面的以后在加上吧，over！

- 缓存

```
(http.request.full_uri wildcard r"https://*.wait.loan/*" and not http.host contains "bbs.wait.loan" and not http.request.uri.path contains "/luohuilong/" and not http.cookie contains "typecho_uid" and not http.cookie contains "typecho_authCode" and not http.cookie contains "typecho_remember" and not http.request.uri.path contains "/api/" and not http.request.uri.path contains "/custom/bg/" and not http.cookie contains "folder_id")
```

- hotlink

```
(http.request.full_uri wildcard "*.wait.loan/*" and not http.referer contains "blog.fork.pub" and not http.referer contains "*.wait.loan" and not http.referer contains "lhl.ueuo.com")
```

  [1]: https://img2.wait.loan/file/img-hub/1750070703308_sshot-2025-06-16-18-34-30.png
  [2]: https://img2.wait.loan/file/img-hub/1750070707917_sshot-2025-06-16-18-35-38.png
  [3]: https://img2.wait.loan/file/img-hub/1750071431536_sshot-2025-06-16-18-56-59.png
  [4]: https://img2.wait.loan/file/img-hub/1750071523763_sshot-2025-06-16-18-58-25.png
  [5]: https://img2.wait.loan/file/img-hub/1750071563736_sshot-2025-06-16-18-59-03.png
  [6]: https://img2.wait.loan/file/img-hub/1750071566988_sshot-2025-06-16-18-59-15.png
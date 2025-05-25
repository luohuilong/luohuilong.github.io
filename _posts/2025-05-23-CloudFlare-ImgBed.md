---
layout: post
title:  "图床方案Cloudflare Pages+R2+KV"
date:   2025-05-23 09:35:18 +0800
categories: 互联网
tags: CloudFlare-ImgBed
author: lhlloveqq
excerpt: 最近一直在探索各种图床方案，本文想讲的Cloudflare Pages+R2+KV方案，是借助github上这个CloudFlare-ImgBed开源项目，部署在cloudflare pages上顺带也解决了存储筒和数据库的烦恼。
---

* content
{:toc}

### 前言 ###

最近一直在探索各种图床方案：

首先，别人的图床肯定不能用，版权、隐私、稳定性、数据安全性都无法得到保证，这是大忌⚠️

其次，“永存”的github做图床仓库看似是个不错的选择，直接仓库存储即可。若是担心仓库封禁，还可以使用github issue/wiki页面托管图片，在这些页面中上传图片，会自动生成一个markdown格式的公共链接，直接拿来用就好了。缺点就是中国大陆经常无法访问，即使是用jsdelivr cdn加速也依旧加载缓慢。一个面相中文访客的网站和图床，如果大部分人上不去，就失去了意义。

于是，大善人Cloudflare的R2存储桶就被搬了出来（见我这篇文章）。R2桶虽然需要绑定付款方式，但免费额度对于个人网站来说非常充足，唯一需要担心的是公共子域容易被人恶意刷量。当然，买一个属于自己的域名，设规则、开缓存，就能解决这个问题，但域名最多持有10年，如果10年后无法续上这个域名，那该怎么办呢？

在此情况下，Cloudflare Workers搭配Backblazec B2桶的方案浮出水面（见我这篇文章），这个方案解决了Cloudflare R2的额度限制的问题，所以也不用担心被刷量。可惜的是，该方案使用的Cloudflare 的workers.dev子域直接被墙了。虽然可以考虑使用类似Webp Cloud服务对域名进行代理，但有种拆东墙补西墙的感觉。三个服务商，如果每个服务商出问题的概率是50%，那么整个方案出问题的概率就是87.5%，风险极高。

以上三个方案除了它们自身的问题，还有个缺点就是需要搭配picgo、piclist才能有比较好的使用体验，否则光是压缩、上传、预览、获取图片url就要费很大的功夫。

最后，终于来到了本文想讲的Cloudflare Pages+R2+KV方案，这个想法最初是在一些“telegram图床”相关文章时看到的，但都以telegram为主，讲的也不详细。在进一步搜索后，发现了github上这个CloudFlare-ImgBed开源项目。这个方案简单来说是通过Cloudflare Pages部署一个web页面，Cloudflare KV作为网站配置的数据库，Cloudflare R2作为图床的存储空间。该方案不需要开通R2.dev子域，图片的url用的是pages.dev子域，且可以自定义域名过滤，避免被盗链刷量。该方案的web端页面具备图片上传、压缩、图库管理的功能，可以直接替代picgo，非常方便。加上pages.dev域名可访问性不错，我试下来，认为是现阶段一个近乎完美的图床解决方案。

为了畅快使用，你需要：

一个Github账户
一个Cloudflare账户
一张国际信用卡或paypal账户
一个自己的域名（可选）

### Github fork仓库 ###
注册之类的就不多说了，前往CloudFlare-ImgBed仓库，fork该项目至自己名下

![请输入图片描述][1]

### 开通Cloudflare R2存储桶 ###
这里就不过多阐述了，自行搜索开通，值得注意的是：除非需要用到后续的图像审查功能，否则不需要开启r2.dev公共子域，以提升安全性

### 创建Cloudflare KV空间 ###
命名空间随便填，点击添加即可

![请输入图片描述][2]

### 创建Cloudflare Page ###
连接到git

![请输入图片描述][3]

关联Cloudflare与Github账户，并选择前面fork来的CloudFlare-ImgBed仓库。如果没有显示，则需要在Github里设置Cloudflare的仓库访问权限

![请输入图片描述][4]

项目名称关系到你的图床域名，取一个不重复的、自己喜欢的，构建命令填写npm install

![请输入图片描述][5]

保存并部署之后，如图在设置中创建环境变量和绑定

 
 	
- 环境变量

    BASIC_PASS = web端后台管理员密码
    BASIC_USER = web端后台管理员用户名

- 绑定

    img_url = 你的KV空间的名字
    img_r2 = 你的R2存储桶的名字


![请输入图片描述][6]

注意：任何设置更改后，都要进行重新部署

![请输入图片描述][7]

### 图床web端管理员设置 ###
打开你的图床域名.pages.dev网址，点击右下角管理页面

![请输入图片描述][8]

* 上传设置，我所用的版本（2.0.1）貌似还没开发完成，不能修改设置，但也不需要设置，因为我们前面绑定里已经绑上了R2存储桶


* 安全设置中可以设置上传密码，没有密码的人是无法进行上传的，避免被陌生人恶意上传。图像审查功能见原仓库介绍，我是没用。域名过滤功能用于防盗链，只有允许的域名才能读取你的图片，所以一定要填。首先就要填入你的图床域名.pages.dev，否则这个web界面将无法预览图片。然后加入你的网站域名，亦或是一些代理域名等等

![请输入图片描述][9]

* 页面设置按自己需求即可，如果你使用了代理域名，这里URL前缀就可以填，否则就空着

![请输入图片描述][10]

### 上传、图库管理一览 ##

具体就供大家自行研究了

![请输入图片描述][11]

![请输入图片描述][12]

![请输入图片描述][13]

项目地址：[https://github.com/MarSeventh/CloudFlare-ImgBed][14]


  [1]: https://f80386d.webp.li/file/img-hub/1747954689326_image-20250318160256603.png
  [2]: https://f80386d.webp.li/file/img-hub/1747954690568_image-20250318163032310.webp
  [3]: https://f80386d.webp.li/file/img-hub/1747960058289_image-20250318160715963.webp
  [4]: https://f80386d.webp.li/file/img-hub/1747954694565_image-20250318160947328.png
  [5]: https://f80386d.webp.li/file/img-hub/1747954695090_image-20250318161301692.png
  [6]: https://f80386d.webp.li/file/img-hub/1747955391914_image-20250318162328437.jpg
  [7]: https://f80386d.webp.li/file/img-hub/1747954690790_image-20250318162806111.webp
  [8]: https://f80386d.webp.li/file/img-hub/1747955387107_image-20250318163301576.jpg
  [9]: https://f80386d.webp.li/file/img-hub/1747955389450_image-20250318163451868.jpg
  [10]: https://f80386d.webp.li/file/img-hub/1747955392031_image-20250318164221375.jpg
  [11]: https://f80386d.webp.li/file/img-hub/1747955390107_image-20250318165147887.jpg
  [12]: https://f80386d.webp.li/file/img-hub/1747955396677_image-20250318165136074.jpg
  [13]: https://f80386d.webp.li/file/img-hub/1747955393079_image-20250318165024849.jpg
  [14]: https://github.com/MarSeventh/CloudFlare-ImgBed
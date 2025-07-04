---
layout: post
title:  "媒体库刮削器TinyMediaManager配置指南"
date:   2025-05-23 09:50:18 +0800
categories: 网络日志
tags: TinyMediaManager
author: LuoHuiLong
excerpt: 常用的NAS媒体库软件有Jellyfin、Emby、Plex、Kodi等等，但它们的内置刮削器有时候并不太好用，我这边推荐使用TinyMediaManager作为刮削器、媒体文件管理平台使用，而Jellyfin等媒体库软件仅作为媒体读取、播放、展示的平台。
---

* content
{:toc}

一些不重要的设置，本文不做展示和介绍，操作时直接下一步or跳过or默认配置即可

1、什么是TinyMediaManager？
常用的NAS媒体库软件有Jellyfin、Emby、Plex、Kodi等等，但它们的内置刮削器有时候并不太好用，我这边推荐使用TinyMediaManager作为刮削器、媒体文件管理平台使用，而Jellyfin等媒体库软件仅作为媒体读取、播放、展示的平台。TinyMediaManager除了有Windows、Mac客户端，还有docker版本，本文展示的是docker版本的配置和使用

刮削后在Jellyfin中展示

海报墙

![请输入图片描述][1]

电视剧

![请输入图片描述][2]

剧集

![请输入图片描述][3]

刮削后文件夹系统展示

电视剧文件夹

![请输入图片描述][4]

季文件夹

![请输入图片描述][5]

剧集、nfo、缩略图

中文字幕建议软件外自行下载重命名

![请输入图片描述][6]

2、容器下载和配置

镜像仓库搜索dzhuang/tinymediamanager

这个镜像是专门对中文做了字体优化，避免了UI出现乱码方块字

![请输入图片描述][7]

下载latest或v3.1.16版本

因为v3.1.16是最后的全功能免费版本，v4以上版本部分功能需要付费才能使用

![请输入图片描述][8]

创建容器

镜像下载完成后，点击创建容器，容器名称自定

![请输入图片描述][9]

重启策略

![请输入图片描述][10]

存储空间

自行设置目录，并设为读写权限。建议电影和电视剧分两个文件夹

![请输入图片描述][11]

端口

默认自动或自定，不与其他容器端口冲突即可

![请输入图片描述][12]

环境变量

- USER_ID和GROUP_ID通常不需要更改，如果后续发现容器无法移动文件，可以改为0
- display_width和display_height可以修改UI分辨率


![请输入图片描述][13]

![请输入图片描述][14]

3、TinyMediaManager设置向导

更新弹窗

TinyMediaManager每次启动都会提示更新，直接关闭即可。点更新会卡死，需要重启容器

![请输入图片描述][15]

语言设置

下拉选择中文，重启容器生效，可以向导走完再重启

![请输入图片描述][16]

电影、电视剧源设置

- 选择各自的电影、电视文件夹
- 刮削器设置themoviedb
- 刮削语言设置大陆简体
- 勾选成人内容、刮削语言名/国家名、使用后备语言抓取标题

![请输入图片描述][17]

![请输入图片描述][18]

![请输入图片描述][19]

重启容器

![请输入图片描述][20]

4、通用选项推荐设置

通用选项

![请输入图片描述][21]

系统

- 内存建议给足
- 如果你有自己的代理服务器，在这里填，用于”加速“刮削
- 并行下载数可以填大一点

![请输入图片描述][22]

杂项

取消勾选图片快取可以加快载入

![请输入图片描述][23]

5、电视剧刮削推荐设置

电影和电视剧类似，就不做阐述，可自行研究

电视节目

自动重命名建议打开，后面有相关规则推荐设置

![请输入图片描述][24]

刮削器

![请输入图片描述][25]

刮削器选项

![请输入图片描述][26]

NFO设置

![请输入图片描述][27]

图片

![请输入图片描述][28]

剧照档案名

![请输入图片描述][29]

重命名规则
- 电视剧文件夹建议设为${showTitle} ${showoriginalTitle} (${showYear})
- 季文件夹建议设为Season ${seasonNr2}
- 剧集名建议空着，不建议重命名视频文件

![请输入图片描述][30]

6、刮削

初步分类

电视剧先手动按文件夹做个初步的分类，比如一个电视剧一个文件夹，所有剧集都放里面即可，文件夹内不必再按季分类

更新数据源

媒体文件夹如果有加入新文件，软件需要更新数据源，否则不会刷新增加的文件

![请输入图片描述][31]

搜索并刮削

右键点击初步分类出的剧集文件夹，选择 搜索并刮削已选电视节目

![请输入图片描述][32]

检查是否识别正确，如果有误，选择正确结果或修改搜索关键词

![请输入图片描述][33]

点击确定，等待刮削完成。软件会按季自动建文件夹，自动完成重命名操作

![请输入图片描述][34]


  [1]: https://img2.wait.loan/file/img-hub/1747964722514_20250308025024420.jpg
  [2]: https://img2.wait.loan/file/img-hub/1747964715624_20250308025519572.jpg
  [3]: https://img2.wait.loan/file/img-hub/1747964716548_20250308025519574.jpg
  [4]: https://img2.wait.loan/file/img-hub/1747964719128_20250308025519575.png
  [5]: https://img2.wait.loan/file/img-hub/1747964716544_20250308025519576.webp
  [6]: https://img2.wait.loan/file/img-hub/1747964714432_20250308025519577.png
  [7]: https://img2.wait.loan/file/img-hub/1747964720402_20250308025519578.webp
  [8]: https://img2.wait.loan/file/img-hub/1747964722150_20250308025519579.webp
  [9]: https://img2.wait.loan/file/img-hub/1747964716859_20250308025519580.jpg
  [10]: https://img2.wait.loan/file/img-hub/1747964720701_20250308025519581.jpg
  [11]: https://img2.wait.loan/file/img-hub/1747964718114_20250308025519582.jpg
  [12]: https://img2.wait.loan/file/img-hub/1747964716216_20250308025519583.jpg
  [13]: https://img2.wait.loan/file/img-hub/1747964717612_20250308025519584.jpg
  [14]: https://img2.wait.loan/file/img-hub/1747964719045_20250308025519585.jpg
  [15]: https://img2.wait.loan/file/img-hub/1747964718538_20250308025519586.jpg
  [16]: https://img2.wait.loan/file/img-hub/1747964717676_20250308025519587.webp
  [17]: https://img2.wait.loan/file/img-hub/1747964711274_20250308025519588.webp
  [18]: https://img2.wait.loan/file/img-hub/1747964718123_20250308025519589.webp
  [19]: https://img2.wait.loan/file/img-hub/1747964708726_20250308025519590.webp
  [20]: https://img2.wait.loan/file/img-hub/1747964713859_20250308025519591.jpg
  [21]: https://img2.wait.loan/file/img-hub/1747964713348_20250308025519592.webp
  [22]: https://img2.wait.loan/file/img-hub/1747964712391_20250308025519593.webp
  [23]: https://img2.wait.loan/file/img-hub/1747964708465_20250308025519594.webp
  [24]: https://img2.wait.loan/file/img-hub/1747964713983_20250308025519595.webp
  [25]: https://img2.wait.loan/file/img-hub/1747964713198_20250308025519596.webp
  [26]: https://img2.wait.loan/file/img-hub/1747964709690_20250308025519597.webp
  [27]: https://img2.wait.loan/file/img-hub/1747964709675_20250308025519598.webp
  [28]: https://img2.wait.loan/file/img-hub/1747964709387_20250308025519599.webp
  [29]: https://img2.wait.loan/file/img-hub/1747964711363_20250308025519600.webp
  [30]: https://img2.wait.loan/file/img-hub/1747964707080_20250308025519601.webp
  [31]: https://img2.wait.loan/file/img-hub/1747964704944_20250308025519602.webp
  [32]: https://img2.wait.loan/file/img-hub/1747964705928_20250308025519603.webp
  [33]: https://img2.wait.loan/file/img-hub/1747964711308_20250308025519604.webp
  [34]: https://img2.wait.loan/file/img-hub/1747964711851_20250308025519605.webp
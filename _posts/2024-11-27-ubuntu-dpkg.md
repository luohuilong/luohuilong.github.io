---
layout: post
title:  "Ubuntu更换dpkg架构从armhf到arm"
date:   2024-11-27 14:56:18 +0800
categories: 互联网
tags: ubuntu
author: lhlloveqq
excerpt: 今天在海纳斯安装CloudFlare Tunnel的时候，提示错误，一度怀疑人生，网上的教程都是docker安装，我这个hinas就想安静的做个WEB服务器，并不想安装docker，所以下载了原生程序，我明明已经选择了Debian/arm32安装包。安装为什么还会报错呢。况且，arm是32位，armhf不也是32位嘛，这话的意思是说deb包的架构是arm的，系统的架构是armhf的，不适配。
---

* content
{:toc}

今天在海纳斯安装CloudFlare Tunnel的时候，提示错误。

一度怀疑人生。网上的教程都是docker安装，我这个玩客云就想安静的做个WEB服务器，并不想安装docker。

我明明 已经选择了Debian/arm32安装包。为什么还会报错呢。况且，arm是32位，armhf不也是32位嘛。

这话的意思是说deb包的架构是arm的，系统的架构是armhf的，不适配。那就是architecture 架构的问题咯。

用下面命令显示系统的架构：

    sudo dpkg --print-architecture

不同的系统可能显示的结果有：arm64， amd64，armhf……

好的关键来了，安装包适配的是arm，而我的系统显示的是armhf。机器就是机器，脑子不好，太死板。

通过命令添加新的架构：

    sudo dpkg --add-architecture arm

然后再尝试安装，顺利完成。。

既然贴了添加，那就顺便把移除命令也放出来：

    sudo dpkg --remove-architecture arm

后续运行正常没有报错。
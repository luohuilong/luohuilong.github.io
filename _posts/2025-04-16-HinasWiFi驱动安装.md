---
layout: post
title:  "HinasWiFi驱动安装"
date:   2025-04-16 09:07:18 +0800
categories: 互联网
tags: hinas
author: lhlloveqq
excerpt: HinasWiFi驱动安装的操作方法以及配置文件设置等。
---

* content
{:toc}

安装命令

`wget https://mirror.ghproxy.com/https://github.com/benbenhuo/hinaswifi/raw/main/hinaswifi.sh && bash ./hinaswifi.sh`

`nmcli device wifi connect "wifi名字" password "wifi密码" ifname wlan0`

另外：

想要静态ip就编辑配置文件/etc/NetworkManager/system-connections/<wifi名字>.nmconnection

找到下面这一段

[ipv4]

dns-search=

method=auto

改成如下格式(地址、网关、dns根据情况修改)

[ipv4]

dns-search=

method=manual

addresses1=192.168.1.100/24,192.168.1.1

dns=192.168.1.1

然后重新启用下连接

nmcli connection reload "wifi名字"

nmcli connection down "wifi名字"

nmcli connection up "wifi名字"


**附件下载**：[wifi-hg680j.7z][1]


  [1]: https://r2.wait.loan/uploads/attach/wifi-hg680j.7z
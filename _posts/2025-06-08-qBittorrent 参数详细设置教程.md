---
layout: post
title:  "qBittorrent 参数详细设置教程"
date:   2025-06-08 08:07:18 +0800
categories: 网络日志
tags: qBittorrent
author: LuoHuiLong
excerpt: 全文将以目前的最新版v4.3.7为例，进行参数设置，老版本某些功能不太一致，请知悉。
---

* content
{:toc}


全文将以目前的最新版v4.3.7为例，进行参数设置，老版本某些功能不太一致，请知悉。

## 行为参数

 

![qBittorrent 行为参数](https://cimg1.17lai.site/data/2025/02/08/20250208192508.webp)

qBittorrent 行为参数

 

可用的UI主题清单：<https://github.com/qbittorrent/qBittorrent/wiki/List-of-known-qBittorrent-themes>

 

![qBittorrent 下载参数](https://cimg1.17lai.site/data/2025/02/08/20250208192508-1.webp)

qBittorrent 下载参数

 

## 连接参数

 

![qBittorrent 连接参数](https://cimg1.17lai.site/data/2025/02/08/20250208192508-2.webp)

qBittorrent 连接参数

 

## 速度参数

 

![qBittorrent 速度参数](https://cimg1.17lai.site/data/2025/02/08/20250208192508-3.webp)

qBittorrent 速度参数

 

## BT参数

 

![qBittorrent BitTorrent参数](https://cimg1.17lai.site/data/2025/02/08/20250208192508-4.webp)

qBittorrent BitTorrent参数

 

匿名模式说明：<https://github.com/qbittorrent/qBittorrent/wiki/Anonymous-Mode>

## RSS设置

 

![qBittorrent RSS参数](https://cimg1.17lai.site/data/2025/02/08/20250208192508-5.webp)

qBittorrent RSS参数

 

RSS正则表达式教程：<https://www.jianshu.com/p/54e6137ea4e3>

## web参数

 

![qBittorrent web参数](https://cimg1.17lai.site/data/2025/02/08/20250208192508-6.webp)

qBittorrent web参数

 

可用的备用WebUI清单见：<https://github.com/qbittorrent/qBittorrent/wiki/List-of-known-alternate-WebUIs>

## 高级参数

 

![qBittorrent 高级参数](https://cimg1.17lai.site/data/2025/02/08/20250208192508-7.webp)

qBittorrent 高级参数

 

### 关于磁盘缓存的补充说明：

经常有人吐槽qB特别吃内存，个人猜测应该是磁盘缓存设置不正确导致的。磁盘缓存设置过小，磁盘缓存到期间隔过长，先下载的文件块来不及写入硬盘，新的文件块又到了，可能就会导致内存爆掉甚至磁盘I/O错误。个人建议：在进行高速下载时，适当将磁盘缓存调高，磁盘缓存到期间隔调低（下载时间隔越低写入越频繁，自己根据电脑的资源占用情况调整最适合自己的值）。实在不知道怎么调的，就干脆把磁盘缓存设置为-1（自动）好了，还不行，就把磁盘缓存到期间隔再调低一些。举一个例子，比如设置2048MiB磁盘缓存、300s磁盘缓存到期间隔时，当下载速度为50MiB/s的时候，300s的时间总共可以下载15000MiB，早就远远超过2048MiB了，不爆内存、不I/O错误才怪。所以当达到这个下载速度的时候，在磁盘缓存不变的情况下，根据简单的除法（磁盘缓存除以下载速度）可知，磁盘缓存到期间隔就应该设置到40s以下了。

qB在正常运行后，其占用的内存会比你所设置的磁盘缓存多几百M。所有的参数没有标准答案，一切都得根据你机子的本身属性以及实际的使用场景（比如CPU性能、内存大小、硬盘写入速度、下载速度等）来设置，建议大家多试验。

### 关于TCP、UTP的补充说明：

TCP是Internet上最常用的协议，是一种面向连接的、可靠的、基于字节流的传输层通信协议。TCP的优势在于双向互动机制兼顾数据传输的完整性、可控制性和可靠性，但复杂的校验与控制机制也使其没有UDP传输效率高。

UDP协议与TCP协议一样用于处理数据包，是一种无连接的协议。UDP的缺点是不提供数据包分组、组装和不能对数据包进行排序的缺点，也就是说，当报文发送之后，是无法得知其是否安全完整到达的。UDP优势在于带宽占用小、传输效率和连接成功率高，有益于内网用户（如通过UDP内网穿透UDP Hole Punching连接），但UDP与TCP协议相比也存在无反向确认机制、无流量和序列控制等弊端。

uTP(Micro Transport Protocol)是一种正在标准化的开放式BT协议，主要功能是提高宽带使用效率、减少网络问题。在减缓网络延迟和拥堵的同时最大化网络吞吐量、克服多数防火墙和NAT的阻碍，增强网络穿透和传输效率，同时增益流量控制，这对BT用户和ISP都是互利的。uTP虽基于UDP协议但有所不同，uTP通过拥堵控制算法（Ledbat）可限制延时，当延时不严重时可最大限度利用带宽，并能通过uTP提供的信息用于选择TCP连接的传输率，即使在不作限速设置的情况下，也能减少网络拥堵产生，当用户端之间都启用uTP时，可见明显的传输速率提升。内网无法实现端口映射的用户启用uTP，可以改善与网外用户的连接。

使用uTP进行连接的用户，其标志将包含“P”。

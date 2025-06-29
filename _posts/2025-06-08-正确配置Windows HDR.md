---
layout: post
title:  "如何正确配置Windows HDR显示"
date:   2025-06-08 08:07:18 +0800
categories: 网络日志
tags: HDR windows
author: LuoHuiLong
excerpt: 全文将以目前的最新版v4.3.7为例，进行参数设置，老版本某些功能不太一致，请知悉。
---

* content
{:toc}

## **目的**

解决Windows HDR过曝、过暗等显示问题

## **必要条件**

* Windows 11
* 显示器自身支持HDR功能并已正常开启
  ## 推荐条件**
* 系统更新到最新的Win11版本
* 使用DP线缆连接主机和显示器

## **开启 HDR**

### **显卡驱动选择“完全”动态范围**

以NVIDIA显卡为例，在NVIDIA控制面板如下位置，选择使用NVIDIA颜色设置，选择输出动态范围为“完全”

[![65c51aaf4ccb4d36a61850cd0f22f4c6.png](https://e79016d.webp.li/file/2025/03/1742313543549_65c51aaf4ccb4d36a61850cd0f22f4c6.png)](https://e79016d.webp.li/file/2025/03/1742313543549_65c51aaf4ccb4d36a61850cd0f22f4c6.png)

### **系统设置开启使用HDR**

注：颜色配置文件和图里显示的不一样没关系，这是后面会提到的步骤

[![7effe9e60abd46be9d88c7d3e94c41d4.png](https://e79016d.webp.li/file/2025/03/1742313544617_7effe9e60abd46be9d88c7d3e94c41d4.png)](https://e79016d.webp.li/file/2025/03/1742313544617_7effe9e60abd46be9d88c7d3e94c41d4.png)

### **关闭自动HDR**

点击HDR设置，关闭自动HDR [![28212146ec574b60ba52ff051e1606c3.png](https://e79016d.webp.li/file/2025/03/1742313546420_28212146ec574b60ba52ff051e1606c3.png)](https://e79016d.webp.li/file/2025/03/1742313546420_28212146ec574b60ba52ff051e1606c3.png)

## **HDR校准**

下载Windows HDR Calibration校准工具：<https://apps.microsoft.com/detail/9n7f2sm5d1lr?rtc=1&hl=zh-cn&gl=CN>

[![97e29e82481f4f198f36807aeb5cdc17.png](https://e79016d.webp.li/file/2025/03/1742313545723_97e29e82481f4f198f36807aeb5cdc17.png)](https://e79016d.webp.li/file/2025/03/1742313545723_97e29e82481f4f198f36807aeb5cdc17.png)

打开后根据向导完成HDR校准，整个校准过程是通过**调整滑杆，使屏幕中央的田字格直至完全看不见即可**

[![830bfdb8bb8d41029e662dfdddd155a8.png](https://e79016d.webp.li/file/2025/03/1742313548626_830bfdb8bb8d41029e662dfdddd155a8.png)](https://e79016d.webp.li/file/2025/03/1742313548626_830bfdb8bb8d41029e662dfdddd155a8.png)

校准完后就会生成一个HDR校准配置文件

[![27601d2d70624cb6b555f68c982c7273.png](https://e79016d.webp.li/file/2025/03/1742313548781_27601d2d70624cb6b555f68c982c7273.png)](https://e79016d.webp.li/file/2025/03/1742313548781_27601d2d70624cb6b555f68c982c7273.png)

## **安装HEVC视频扩展**

下载和安装过程可以参考我的[另外一篇文章](https://ghostdavid.pages.dev/posts/windows-HEVC/)

[![9b57d3c6045d46a9b2b6512502daf365.png](https://e79016d.webp.li/file/2025/03/1742313549316_9b57d3c6045d46a9b2b6512502daf365.png)](https://e79016d.webp.li/file/2025/03/1742313549316_9b57d3c6045d46a9b2b6512502daf365.png)

## **NVIDIA App内开启AI自动HDR（可选）**

[![78578032b0ec43b498dccc8e46cb30c7.png](https://e79016d.webp.li/file/2025/03/1742313549710_78578032b0ec43b498dccc8e46cb30c7.png)](https://e79016d.webp.li/file/2025/03/1742313549710_78578032b0ec43b498dccc8e46cb30c7.png)

[![b5d306fbce4a46689de6d3cc19096f0d.png](https://e79016d.webp.li/file/2025/03/1742313550177_b5d306fbce4a46689de6d3cc19096f0d.png)](https://e79016d.webp.li/file/2025/03/1742313550177_b5d306fbce4a46689de6d3cc19096f0d.png)

## **在线网站观看HDR视频**

此时Windows系统的HDR配置已经完成了，使用Chrome浏览器浏览支持HDR的视频网站（比如bilibili），选择HDR画质就可以正常播放HDR视频了

[![b40e360746694960b84854d9a83165e1.png](https://e79016d.webp.li/file/2025/03/1742313546551_b40e360746694960b84854d9a83165e1.png)](https://e79016d.webp.li/file/2025/03/1742313546551_b40e360746694960b84854d9a83165e1.png)

## **本地软件播放HDR片源**

* MPC-BE：<https://github.com/Aleksoid1978/MPC-BE>

  安装即用，对HDR片源支持比较好，不用去操心设置复杂的解码器，有UI界面

  [![302ddcabe8054e7481a87c8f9f072fbc.png](https://e79016d.webp.li/file/2025/03/1742313543050_302ddcabe8054e7481a87c8f9f072fbc.png)](https://e79016d.webp.li/file/2025/03/1742313543050_302ddcabe8054e7481a87c8f9f072fbc.png)

* MPV-lazy:<https://github.com/hooke007/MPV_lazy>

  也是安装即用，极简风格。但如果想进一步自定义，则需要修改配置文件，会略复杂

  [![e7487038f68f4c34a119cca452443b9b.png](https://e79016d.webp.li/file/2025/03/1742313549120_e7487038f68f4c34a119cca452443b9b.png)](https://e79016d.webp.li/file/2025/03/1742313549120_e7487038f68f4c34a119cca452443b9b.png)

* potplayer:<https://potplayer.tv/?lang=zh_CN>

  我试了下，即使按网上教程，设置内置dx11解码器和硬解，HDR画面暗处细节仍旧偏暗，观感不好。如果要进一步优化，还要下载额外解码器和配置，喜欢折腾的用户可以去试试


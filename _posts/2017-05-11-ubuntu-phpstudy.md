---
layout: post
title:  "ubuntu安装phpstudy和一些优化设置"
date:   2017-05-11 05:56:18 +0800
categories: 互联网
tags: phpstudy ubuntu
author: lhlloveqq
excerpt: phpstudy设置非常简单的一款集成web应用，一般在windows下常见人使用，这是介绍在ubuntu下的安装及配置
---

* content
{:toc}

### 安装ubuntu ###

- ubuntu系统，下载地址：

    http://cn.ubuntu.com/download/

一般选择具有长期支持的稳定版本，建议64位。

- 安装ubuntu系统

利用UNetbootin工具把ISO文件写到U盘中，在电脑bios中设置U盘优先于硬盘启动，根据安装界面的提示一步一步安装就对了。

关于更多的硬盘分区方案参照：[点这里](http://blog.csdn.net/ropenyuan/article/details/44917271 "RopenYuan的博客")

### 优化及常用软件 ###

- 系统安装后需要做的事

删除自带办公软件及Amazon的图标

    sudo apt-get remove libreoffice-common   删除libreoffice
    sudo apt-get remove unity-webapps-common  删除Amazon

更新软件

    sudo apt-get update
    sudo apt-get upgrade

安装文本编辑软件

    sudo apt-get install vim

安装openssh

    sudo apt-get install openssh-server

安装谷歌浏览器

    sudo wget https://repo.fdzh.org/chrome/google-chrome.list -P /etc/apt/sources.list.d/
    
将下载源加入到系统的源列表

    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub  | sudo apt-key add -
    
导入谷歌软件的公钥，用于下面步骤中对下载软件进行验证。如果顺利的话，命令将返回“OK”

    sudo apt-get update
    sudo apt-get install google-chrome-stable
    
执行对谷歌 Chrome 浏览器（稳定版）的安装。

最后，如果一切顺利，在终端中执行以下命令：

    /usr/bin/google-chrome-stable

将会启动谷歌 Chrome 浏览器，它的图标将会出现在屏幕左侧的 Launcher 上，在图标上右键——“锁定到启动器”，以后就可以简单地单击启动了。

### 下载及安装 ###

- phpstudy的安装

```
wget -c http://lamp.phpstudy.net/phpstudy.bin  下载bin文件
sudo chmod +x phpstudy.bin    #权限设置
sudo ./phpstudy.bin 　　　　#运行安装
```

根据上列命令一条一条来。

- phpstudy-ftp的安装

```
wget -c http://lamp.phpstudy.net/phpstudy-ftpd.sh 回车
chmod +x phpstudy-ftpd.sh 回车
sudo ./phpstudy-ftpd.sh 回车
```

- 开通FTP

    phpstudy ftp add

根据提示输入：

FTP用户名

密码

输入目录（注意是绝对目录）就是你下面要添加网站的目录

- 另外一个ftp软件也蛮好用

```
sudo apt-get install vsftpd
配置文件：/etc/vsftpd.conf
启动 sudo /etc/init.d/vsftpd start
```

### 配置 ###

命令列表：

phpstudy start|stop|restart   开启|停止|重启

phpstudy add|del|list  添加虚拟主机|删除虚拟主机|查看虚拟主机列表

比如：

    sudo phpstudy add /phpstudy/www/www.aaa.com  添加了一个域名为www.aaa.com 的网站目录

apache配置文件在：

    /phpstudy/server/httpd/conf/httpd.conf

PHP配置文件在：

    /phpstudy/server/php/etc/php.ini

打开Mysql控制台：

    /phpstudy/mysql/bin/mysql -uroot -proot

### vi编辑文本文件的命令 ###

    vi file.txt  file.txt为文件名也可以是.conf

vi编辑器的工作有插入（编辑）模式和浏览（命令）模式。

当你最开始编辑时，你处于浏览模式，你可以使用箭头或者其他导航键在文本中导航。

开始编辑时，键入i，插入文本，或者键入a，在末尾添加文本。

当你编辑结束时，键入Esc退出插入/添加模式，进入浏览（命令）模式。

键入命令时，首先键入冒号（:），后面紧跟命令，例如w命令去编辑文本，然后键入Enter。

尽管vi编辑器支持非常复杂的操作并且有无数条命令，然而你可以仅用一些简单的命令就能完成工作，这些基本的vi命令主要有：

    光标运动          h,j , k, l （上/下/左/右）
    删除字符          x
    删除行            dd
    模式退出          Esc,Insert（或者i）
    退出编辑器        q
    强制退出不保存     q!
    运行shell命令     :sh（使用exit返回vi编辑器）
    保存文件          :w
    文本查找          /

详细使用命令请参考：[点这里](http://jingyan.baidu.com/article/9f63fb91c58387c8400f0eef.html "百度经验")

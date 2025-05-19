---
layout: post
title:  "JustList for hinas"
date:   2025-05-12 09:07:18 +0800
categories: 互联网
tags: hinas
author: lhlloveqq
excerpt: 一个简易且便利的【天翼云盘】列表程序
---

* content
{:toc}

### 一个简易且便利的【天翼云盘】列表程序 ###

直接讲安装方法：

请使用安装脚本先安装docker-compose

    install-docker.sh
    
### 安装 ###

进入ssh终端后台输入如下命令即可

    nasupdate
    install-docker.sh
    install-justlist.sh

安装完成后，浏览器打开盒子的 IP 端口 5000 就可以看到页面。

### 配置 ###

使用vi编辑或者其它高级文本编辑

`vi /opt/justlist/config/cloud189.yml`

把第 4，5，6 行的三个 # 号去掉
得到如下示例：（注意：必须严格按照此格式，每行低两个字符）

    accounts:
      Cloud189:
        - "15200000000@189.cn"
        - "123456"

将 "15200000000@189.cn" 修改为你的天翼云盘账号
将 "123456" 修改为你的天翼云盘密码
保存。
执行以下命令使它生效：

```
cd /opt/justlist
docker-compose down
docker-compose up -d
```

生效后，如果你的账号密码正确，约30秒左右，在页面点击 ”刷新本地缓存“ 即可！

卸载
终端执行以下命令即可完全卸载

```
cd /opt/justlist
docker-compose down
rm -rf /opt/justlist
docker rmi registry.cn-hangzhou.aliyuncs.com/ecoo/justlist:armv7 或者 arm64
```

demo例子：
[dl.histb.com][1]


  [1]: https://dl.histb.com/
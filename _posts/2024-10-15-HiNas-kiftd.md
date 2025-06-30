---
layout: post
title:  "ARM设备上的轻量化NAS-Kiftd"
date:   2024-10-15 15:07:18 +0800
categories: 网络日志
tags: kiftd
author: LuoHuiLong
excerpt: 本文最初是因为看到了这篇帖子： https://www.right.com.cn/forum/thread-8260837-1-1.html，但是发现那个镜像在window上可以正常运行，但是在盒子上无法访问的情况，因此决定记录直接部署kiftd到ARM设备上的操作方法
---

 * content
{:toc}

**前言**

本文最初是因为看到了这篇帖子： https://www.right.com.cn/forum/thread-8260837-1-1.html

但是发现那个镜像在window上可以正常运行，但是在玩客云上会出现无法访问 Kiftd 的情况，因此决定使用直接部署的方式。

评价优点：轻量

缺点：非直接存储，无法离线下载。

**部署**

* 安装 java

创建 java 文件夹

```
sudo mkdir /opt/java-8
cd /opt/java-8
```

* 下载 java8

`wget https://repo.huaweicloud.com/java/jdk/8u181-b13/jdk-8u181-linux-arm32-vfp-hflt.tar.gz`

* 解压

```
tar -zxvf jdk-8u181-linux-arm32-vfp-hflt.tar.gz
rm jdk-8u181-linux-arm32-vfp-hflt.tar.gz
```

* 配置系统变量

`sudo vim /etc/profile`

按 i 进入插入模式，在末尾输入

```
    #set java environment 
    #安装目录 
    export JAVA_HOME=/opt/java-8/jdk1.8.0_181 
    #下面都一样 
    export   CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH 
    export  PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH 
    export   JRE_HOME=$JAVA_HOME/jre
```

按 ESC 然后输入:wq

`source /etc/profile`

* 校验 java 版本

`java -version`

**安装 Kiftd**

* 下载

```
cd /home/
git clone  https://github.com/KOHGYLW/kiftd.git
```

* 启动

```
cd ./kiftd/
java -jar kiftd-1.1.0-RELEASE.jar -console
-start
```

程序名字自己换对应的，版本不一样名字不一样。

* 访问

等到服务启动完成即可访问。

默认端口8080，可以在配置文件server.properties中修改监听端口

在任意设备（或者本机）上打开其浏览器，并在地址栏输入“http://{运行kiftd的操作系统的IP地址}:8080/”来进入自己的网盘主页，如图所示：

新部署的网盘服务器中不会有任何文件，如下图所示。此时，可以使用默认的管理员账户登入系统。登录方法是：点击右上方的“登入”按钮：

输入默认的管理员账户为admin，密码是000000：

至此所有操作完成，更多信息请看：`https://kohgylw.gitee.io/`

设置开机启动

`sudo nano kiftd.service`

内容

```
    [Unit]
    
    [Service]
    ExecStart=/opt/java-8/jdk1.8.0_181/bin/java -jar /kiftd/kiftd.jar -start
     
    [Install]
    WantedBy=default.target
    ExecStart={您的Java安装路径}/bin/java -jar {kiftd主程序的完整路径} -start
```

```
sudo systemctl daemon-reload
sudo systemctl enable kiftd.service
```

使用下面的命令进行管理

启动 kiftd
`sudo systemctl start kiftd.service`
重启 kiftd
`sudo systemctl restart kiftd.service`
查看 kiftd 运行状态
`sudo systemctl status kiftd.service`

或者使用原生后台运行关闭中断不影响
`nohup java -jar kiftd-xxx-xxx.jar -start & echo $!`

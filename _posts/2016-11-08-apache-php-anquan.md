---
layout: post
title:  "Windows下配置安全的WebServer"
date:   2016-11-08 08:07:18 +0800
categories: 互联网
tags: apache php
author: lhlloveqq
excerpt: apache+php的一种降低用户权限的做法同时也方便设置读写操作，目录关闭或开启写权限操作
---

* content
{:toc}

- 为了快速安装，我们选Server目录作为说明，约定安装目录： D:/Server

- 安装完毕以后，运行: services.msc, 停止掉 Apache, mysql 服务

- 新增 Windows 用户（我的电脑 > 右键 > 管理 > 用户）：mysql, apache, 密码随便设置(不要开启远程桌面权限)

- 设置目录权限（目录 > 右键 > 属性 > 安全 > 选中用户 > 允许）：

```
D:/www （网站目录） —apache 读写（可以拒绝写操作但你必须知道web目录哪些文件夹可行）
D:/server/Apache2.2 —apache 读
D:/windows/php.ini —apache 读
D:/appserv/mysql —mysql 读
D:/appserv/mysql/data —myslq 读写
```

- 你可以设置网站根目录拒绝写权限，然后根目录下的其他目录在打开写权限举个栗子比如用于上传文件的uploads目录单独打开写权限

- 运行：services.msc, 找到 Apache 选项 > 右键 > 属性 > 登录 > 登录身份 > 此账户， 填写 apache 账号密码，确定。同样设置mysql

- 修改 C:/windows/php.ini

```
disable_functions =
chroot,scandir,chgrp,chown,proc_get_status,ini_alter,ini_restore,pfsockopen,openlog,syslog,readlink,symlink,popepassthru,stream_socket_server,eval,fsocket,fsockopen,phpinfo,exec,system,passthru,shell_exec,cmd,popen,dl,proc_open,parse_ini_file,show_source,curl_multi_exec,curl_exec

safe_mode = On
```

- 启动后台服务

httpd.exe为Apache HTTP服务器程序。直接执行程序可启动服务器的服务。本文以Apache2.2.21版本为例详细介绍该指令的各个参数及用法。

语法格式：

    httpd [-D name] [-d directory] [-f file]
    [-C “directive”] [-c “directive”]
    [-w] [-k start|restart|stop|shutdown]
    [-k install|config|uninstall] [-n service_name]
    [-v] [-V] [-h] [-l] [-L] [-t] [-T] [-S]

参数选项：

    -d serverroot

将ServerRoot指令设置初始值为serverroot。它可以被配置文件中的ServerRoot指令所覆盖。其默认值是/usr/local/apache2 。

    -f config

在启动中使用config作为配置文件。如果config不以”/”开头，则它是相对于ServerRoot的路径。其默认值是conf/httpd.conf 。

    -k start|restart|graceful|stop|graceful-stop

发送信号使httpd启动、重新启动或停止 。

    -C directive

在读取配置文件之前，先处理directive的配置指令。

    -c directive

在读取配置文件之后，再处理directive的配置指令。

    -D parameter

设置参数parameter ，它配合配置文件中的段，用于在服务器启动和重新启动时，有条件地跳过或处理某些命令。

    -e level

在服务器启动时，设置LogLevel为level 。它用于在启动时，临时增加出错信息的详细程度，以帮助排错。

    -E file

将服务器启动过程中的出错信息发送到文件file 。

    -R directory

当在服务器编译中使用了SHARED_CORE规则时，它指定共享目标文件的目录为directory 。

    -h

输出一个可用的命令行选项的简要说明。

    -l

输出一个静态编译在服务器中的模块的列表。它不会列出使用LoadModule指令动态加载的模块。

    -L

输出一个指令的列表，并包含了各指令的有效参数和使用区域。

    -M

输出一个已经启用的模块列表，包括静态编译在服务器中的模块和作为DSO动态加载的模块。

    -S

显示从配置文件中读取并解析的设置结果(目前仅显示虚拟主机的设置)

    -T

在启动/重启的时候跳过根文件检查 (该参数在Apache 2.2.17及其以后版本有效)

    -t

仅对配置文件执行语法检查。程序在语法解析检查结束后立即退出，或者返回”0″(OK)，或者返回非0的值(Error)。如果还指定了”-D DUMP_VHOSTS”，则会显示虚拟主机配置的详细信息。

    -v

显示httpd的版本，然后退出。

    -V

显示httpd和APR/APR-Util的版本和编译参数，然后退出。

    -X

以调试模式运行httpd 。仅启动一个工作进程，并且服务器不与控制台脱离。

下列参数仅用于Windows平台：

    -k install|config|uninstall

安装Apache为一个Windows NT的服务；改变Apache服务的启动方式；删除Apache服务。

    -n name

指定Apache服务的名称为name

    -w

保持打开控制台窗口，使得可以阅读出错信息。

在windows下使用http.exe命令的例子：

平时我们使用最多的可能就是用http.exe命令安装、开启、停止，删除apache服务这些操作。

    httpd -k install

将Apache注册为windows服务，因为我们使用的是apache2.2版本，所以默认的服务名为”Apache2.2″。

    httpd -k install -n “服务名”

将Apache注册为windows服务，自己指定一个服务名字。

    httpd -k install -n “服务名” -f “conf\my.conf”

将Apache注册为windows服务，自己指定一个服务名字，并且使用特定配置文件。

    httpd -k uninstall

移除Apache服务，缺省地，将使用”Apache2.2″

    httpd -k uninstall -n “服务名”

移除Apache服务，自己制定一个服务名字。

    httpd -k start

启动Apache服务。

    httpd -k stop

停止Apache服务。

    httpd -k restart

重启Apache服务。

    mysqld.exe –instal

mysql安装后台服务
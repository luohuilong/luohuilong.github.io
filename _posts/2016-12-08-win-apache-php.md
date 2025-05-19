---
layout: post
title:  "Windows下apache+php搭建过程"
date:   2016-12-08 08:07:18 +0800
categories: 互联网
tags: apache php
author: lhlloveqq
excerpt: 简单说说Windows下apache+php的搭建
---

* content
{:toc}

近来比较清闲，经理让我研究研究php！于是就开始看了。。。  第一次使用php，第一次使用apache，以前都是用的tomcat。。。

### 第一步： ###
  
到php官网上下载php2进制安装文件http://windows.php.net/download/。  

我安装的是VC9 x86 Thread Safe 线程安全版的php-5.4.0-Win32-VC9-x86.zip

到apache官网上下载apache httpd  

http://mirror.bit.edu.cn/apache/httpd/binaries/win32/httpd-2.2.22-win32-x86-openssl-0.9.8t.msi

### 第二步： ###
 
解压php-5.4.0-Win32-VC9-x86.zip到d：/php/下。  

运行httpd-2.2.22-win32-x86-openssl-0.9.8t.msi开始安装apache，安装过程很简单，只要你是程序媛你肯定可以根据自己的需求正确安装！

由于我只是测试用，所以根据安装向导一路向下，其中我只修改了端口号和安装路径！端口号默认为80，我改为8090，安装到了d：/Apache2.2目录下

### 第三步： ###

安装完毕，打开浏览器输入http://localhost:8090/即可看到输出“It Works！”！  

其实输出的是D:\Apache2.2\htdocs\index.html中的内容！

这个目录我个人理解即类似于tomcat的webapp目录，当然这个目录是可以在D:\Apache2.2\conf\httpd.conf文件中修改的，可以指定到任何目录去！  

找到DocumentRoot “D:/Apache2.2/htdocs” 改为你想要的目录比如：DocumentRoot “D:/MyApache/webapp”  

<Directory “D:\Apache2.2\htdocs”>改为<Directory “D:\MpApache\webapp”>

修改完配置文件，切记要重启apache，否则不会生效！！！

截止到这里apache是正常服务了！接下来要让apache解析php

### 第四步： ###

1、在D:\Apache2.2\conf\httpd.conf文件中，找到

    <IfModule dir_module>
        DirectoryIndex index.html
    </IfModule>

修改为

    <IfModule dir_module>
        DirectoryIndex index.html index.php index.htm
    </IfModule>

2、在D:\Apache2.2\conf\httpd.conf文件中任意位置添加如下三行，一般建议添加到末尾

    LoadModule php5_module “D:\php\php5apache2_2.dll”
    AddHandler application/x-httpd-php .php
    AddHandler application/x-httpd-php .htm

D:\php\php5apache2_2.dll为你的php解压目录下的动态链接库文件！  

保存并重启apache，在默认的D:\Apache2.2\htdocs目录下添加hello.php文件，内容如下

```php
<html>
   <body>
       <h1>
<?php
echo “Hello World! My first php test!”;
?>
       </h1>
   </body>
</html>
```

打开浏览器输入http://localhost:8090/hello.php如果输出Hello World! My first php test!

Congratulations！你已经成功的迈入了php+apache的第一步！
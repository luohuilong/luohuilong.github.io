---
layout: post
title:  "让phpstudy支持https"
date:   2017-04-08 08:07:18 +0800
categories: 互联网
tags: phpstudy
author: lhlloveqq
excerpt: phpstudy设置启用https的方法
---

* content
{:toc}

首先在阿里云证书服务栏申请证书，这里有免费一年的。

让域名解析txt类型到指定记录值，验证域名。

申请成功后下载指定的证书，有nginx，apache，tomact，iis6、7、8和其他。

这里讲apache的，打开apache的配置文件找到下面模块并去掉前面的井号：

    #LoadModule ssl_module modules/mod_ssl.so (如果找不到请确认是否编译过 openssl 插件)

打开conf目录下的vhosts文件并编辑一个网站属性这里列个例子：

```shell
NameVirtualHost *:443

<VirtualHost *:443>
ServerAdmin mynetgear_1000y@163.com
DocumentRoot “E:\wordpress”
ServerName blog.wait.loan
ServerAlias blog.wait.loan
SSLEngine on
SSLProtocol all -SSLv2 -SSLv3
SSLCipherSuite ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4
SSLCertificateFile D:\phpStudy\Apache\blog\public.pem
SSLCertificateKeyFile D:\phpStudy\Apache\blog\214090683780274.key
SSLCertificateChainFile D:\phpStudy\Apache\blog\chain.pem
</VirtualHost>
<Directory “E:\wordpress”>
Options Indexes FollowSymLinks
AllowOverride All
Order allow,deny
Allow from all
</Directory>
```

SSLCertificateFile为证书公匙，文件在D:\phpStudy\Apache\blog\public.pem目录。

SSLCertificateKeyFile为证书私匙，文件在D:\phpStudy\Apache\blog\214090683780274.key目录。

SSLCertificateChainFile为证书链配置，文件在D:\phpStudy\Apache\blog\chain.pem目录。

重启apache完成https（SSL）的配置，记得前面的NameVirtualHost *:443必须设置
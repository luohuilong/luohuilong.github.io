---
layout: post
title:  "Apache+WordPress部署SSL "
date:   2016-10-08 08:07:18 +0800
categories: 互联网
tags: wordpress
author: lhlloveqq
excerpt: 国际著名Wordpress博客程序开启ssl的设置，重定向，后台强制https，不修改数据库设置站内链接支持ssl
---

* content
{:toc}

### 开启https访问 域名301重定向 ###

借助.htaccess文件实现301重定向，编辑网站根目录的.htaccess，加入以下代码：

    RewriteCond %{HTTPS} !on [NC]
    RewriteRule (.*) https://xxx.cn%{REQUEST_URI} [R=301,NC,L]

### 登录和后台强制开启SSL ###

修改WP-config.php文件，直接在文件末尾加入以下两行代码：

    define(‘FORCE_SSL_LOGIN’, true);
    define(‘FORCE_SSL_ADMIN’, true);

### 让站内链接支持SSL ###

上传到空间的附件都被WordPress标记为了绝对链接，一般需要修改数据库，但这种方法比较危险，因此推荐另一种方法

代码法，编辑当前主题下的 function.php 文件，加入以下代码：

```php
/* 替换图片链接为 https */
function my_content_manipulator($content){
    if( is_ssl() ){
        $content = str_replace(‘http://xxx.cn/wp-content/uploads’, ‘https://xxx.cn/wp-content/uploads’, $content);
    }
    return $content;
}
add_filter(‘the_content’, ‘my_content_manipulator’);
```

还有一种插件设置法，WordPress站内链接修改插件：Velvet Blues Update URLs

最后在修改“设置”→“常规”里的“站点地址”和“WordPress 地址”为 HTTPS

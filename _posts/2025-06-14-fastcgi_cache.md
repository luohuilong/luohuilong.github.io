---
layout: post
title:  "Typecho的fastcgi_cache缓存插件 "
date:   2025-06-14  09:07:18 +0800
categories: 网络日志
tags: nginx fastcgi_cache
author: LuoHuiLong
excerpt: 
---

**本插件需要 WEB 服务器为 Nginx 并且需要 ngx_cache_purge 模块支持**

**ubuntu安装ngx_cache_purge模块：**

`sudo apt install libnginx-mod-http-cache-purge`

### 插件特性 ###

直接在 nginx 层缓存，媲美静态页面速度
支持所有页面缓存
支持内容修改之后自动更新内容、分类、首页缓存
支持评论生效更新缓存
支持登录状态下不缓存
支持搜索等动态页面不缓存

### 已知问题 ###

非 js 方式的访问统计插件会失效

### 使用方法 ###

需要修改 nginx 配置文件，添加

<!--more-->

```nginx
    #下面2行的中的wpcache路径请自行提前创建，否则可能会路径不存在而无法启动nginx，max_size请根据分区大小自行设置
    fastcgi_cache_path /www/server/nginx/fastcgi_cache_dir levels=1:2 keys_zone=fcache:250m inactive=1d max_size=1G;
    fastcgi_temp_path /www/server/nginx/fastcgi_cache_dir/temp;
    fastcgi_cache_key "$scheme$request_method$host$request_uri";
    fastcgi_cache_use_stale error timeout invalid_header http_500;
    #忽略一切nocache申明，避免不缓存伪静态等
    fastcgi_ignore_headers Cache-Control Expires Set-Cookie;
    #Ps：如果是多个站点，以上内容不要重复添加，否则会冲突，可以考虑将以上内容添加到nginx.conf里面，避免加了多次。
```

```nginx
    server
    {
    	***略***
    	set $skip_cache 0;
    	#post访问不缓存
    	if ($request_method = POST) {
    		set $skip_cache 1;
    	}
    	#动态查询不缓存
    	if ($query_string != "") {
    		set $skip_cache 1;
    	}
    	#pjax查询缓存
    	if ($query_string ~ "_pjax=(.*)") {
    		set $skip_cache 0;
    	}
    	#后台等特定页面不缓存（其他需求请自行添加即可）
    	if ($request_uri ~* "/admin/|/action/|/search/|/feed/|baidu_sitemap.xml|sitemap.xml") {
    		set $skip_cache 1;
    	}
    	#对登录的用户不展示缓存
    	if ($http_cookie ~* "typecho_authCode") {
    		set $skip_cache 1;
    	}
    	location ~ [^/]\.php(/|$)
    	{
    		try_files $uri =404;
    		fastcgi_pass  unix:/tmp/php-cgi-74.sock;
    		fastcgi_index index.php;
    		include fastcgi.conf;
    		include pathinfo.conf;
    		#新增的缓存规则
    		fastcgi_cache_bypass $skip_cache;
    		fastcgi_no_cache $skip_cache;
    		add_header X-Cuojue-Cache "$upstream_cache_status From $host";
    		fastcgi_cache fcache;
    		fastcgi_cache_valid 200 1d;
    	}
    
    	location ~* /{后台设置的token}/_clean_cache(/.*) {
    		fastcgi_cache_purge fcache "$scheme$request_method$host$1$is_args$args";
    	}
    	***略***
    }
```

以上的这个部分要和后台设置的 token 一致，例如后台设置1150AE6A4F7938AE754D则这里设置为

```nginx
location ~* /{后台设置的token}/_clean_cache(/.*) {
	fastcgi_cache_purge fcache "$scheme$request_method$host$1$is_args$args";
}
```

```nginx
location ~* /1150AE6A4F7938AE754D/_clean_cache(/.*) {
	fastcgi_cache_purge fcache "$scheme$request_method$host$1$is_args$args";
}
```

### 缓存效果 ###

替换新的配置，并且重载 Nginx `nginx -s reload`，之后访问前台页面，查看 header，会多出一个 X-Cuojue-Cache 标志。

X-Cuojue-Cache 一般会有 3 个状态：**MISS、HIT、BYPASS**。

MISS 表示未命中
即这个页面还没被缓存，新发布或刚被删除的页面，首次访问将出现这个状态（图略）。

HIT 表示缓存命中
打开一个会缓存的页面，比如文章内容 html 页面，F5 刷新几次即可在 F12 开发者模式当中的 Header 头部信息中看到如图缓存命中状态：

![请输入图片描述][1]

BYPASS 表示缓存黑名单
即页面路径在 Nginx 规则中被设置成不缓存（set $skip_cache 1;），比如 typecho 后台和搜索：

![请输入图片描述][2]


*如果你发现想要缓存的页面却是这个状态，就可以去检查排除规则中是不是包含了这个路径！反之，如果你发现后台登录不了，或者各种登陆态丢失问题，则应该到排除规则中加上该页面路径的关键字。*

### 缓存刷新 ###

- 自动刷新

后台配置完成后，涉及文章，评论等更新，会自动刷新对应缓存。默认缓存 24 小时后过期。
自动刷新缓存是访问对应的刷新地址实现的，所以以上的 nginx 配置和后台 token 一定要一致，如不一致，缓存是不会刷新的。

- 手动刷新

手动刷新，可以拼合地址规则。
比如定义 token 为：ABCD1234

比如页面为：
'https://xxx.xxx.com/read/typecho-fastcgi_cache.html'

则刷新地址是：
'https://xxx.xxx.com/ABCD1234/_clean_cache/read/typecho-fastcgi_cache.html'

访问这个地址就会刷新，插件内也是模拟访问这个地址，实现的刷新。

这个地址，在有缓存的时候，访问会返回200刷新成功，在不存在缓存的时候，会返回正常的404未找到页面错误。
所以如果没有配置正确，缓存是不会刷新的。
缓存 key 就是 url，如果 url 变化了，旧的缓存也不会刷新。

### 进阶操作 ###

- 评论者信息被缓存

typecho 主题一般使用 php 的函数获取 cookies 来填充评论者信息，导致了如果用户评论了文章，就会缓存评论者的信息

所以只用把PHP方式改为JS的方式来回填就好了,打开主题模版comments文件删除这三个

`<?php $this->remember('author'); ?>`
`<?php $this->remember('mail'); ?>`
`<?php $this->remember('url'); ?>`

然后在JS部分(或最底部)添加:

```javascript
<script>
<?php if(!$this->user->hasLogin()){ ?>
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return '';
}

function fillUserInfo() {
    var prefix = '<?php echo md5($this->request->getUrlPrefix()); ?>';
    var author = getCookie(prefix + '__typecho_remember_author');
    var mail = getCookie(prefix + '__typecho_remember_mail');
    var url = getCookie(prefix + '__typecho_remember_url');

    if (author) document.getElementById('author').value = author;
    if (mail) document.getElementById('mail').value = mail;
    if (url) document.getElementById('url').value = url;
}

fillUserInfo();
<?php } ?>
</script>
```

- Set-Cookie 头处理被缓存

使用了 fastcgi_cache 来缓存所有页面，导致了一个问题，那就是 set-cookie 也被缓存了，其他用户再次访问会导致被设置缓存的 cookie。

所以要在缓存 miss/bypass 的状态下，输出 set-cookie

在缓存 hit 的状态下，丢弃 set-cookie

要达到这种效果，目前 nginx 的 fastcgi_cache 没有给出解决方案，要么就是直接丢弃所有的 cookie：`fastcgi_hide_header "Set-Cookie";`，这样导致了所有 cookies 全部被丢弃，造成无法登陆等问题

**暂行办法：**使用 nginx_lua 模块实现

在 server 段外增加

```nginx
fastcgi_ignore_headers Cache-Control Expires Set-Cookie;
map $upstream_bytes_received $hide_cookie {default '';'' Set-Cookie;}
```

在 server 段内增加

```nginx
header_filter_by_lua_block {
   ngx.header[ngx.var.hide_cookie] = nil;
}
```

未命中缓存，输出 cookie

![请输入图片描述][3]

命中缓存，丢弃 set-cookie 头

![请输入图片描述][4]

[fastcgi_cache缓存插件下载地址][5]


----------
题外话：问了一下AI，AI告诉我要这么写

```nginx
fastcgi_cache_path /var/cache/nginx/fastcgi_cache_dir/ levels=1:2 keys_zone=fcache:50m inactive=7d max_size=500M use_temp_path=off;
fastcgi_temp_path /var/cache/nginx/fastcgi_cache_dir/tmp;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
fastcgi_cache_use_stale error timeout invalid_header http_500;
fastcgi_ignore_headers Cache-Control Expires;
map $upstream_cache_status $hide_cookie {
    default       "Set-Cookie";  # 默认保留（如 MISS、BYPASS）
    "HIT"         "";           # 缓存命中时移除 Set-Cookie
    "EXPIRED"     "Set-Cookie"; # 缓存过期但仍需回源时保留
    "STALE"       "Set-Cookie"; # 缓存陈旧但仍有效时保留
    "UPDATING"    "Set-Cookie"; # 缓存正在更新时保留
    "REVALIDATED" "Set-Cookie"; # 重新验证缓存时保留
}
```

```nginx
header_filter_by_lua_block {
    if ngx.var.hide_cookie == "" then
        ngx.header["Set-Cookie"] = nil
    end
}
```

[配置文件下载][6]


  [1]: https://img2.wait.loan/file/img-hub/1749663565860_2906163519.png
  [2]: https://img2.wait.loan/file/img-hub/1749663565544_4256031367.png
  [3]: https://img2.wait.loan/file/img-hub/1749664323427_2818833632.png
  [4]: https://img2.wait.loan/file/img-hub/1749664328775_1784695453.png
  [5]: https://r2.wait.loan/uploads/attach/Ncache.7z
  [6]: https://r2.wait.loan/uploads/attach/%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.7z

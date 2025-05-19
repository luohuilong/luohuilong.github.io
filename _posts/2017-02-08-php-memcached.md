---
layout: post
title:  "WordPress启用memcached缓存"
date:   2017-02-08 08:07:18 +0800
categories: 互联网
tags: wordpress
author: lhlloveqq
excerpt: memcached是memcache后续版本，能用d的就优先用，这是一个分布式缓存方法，可大量减少对数据库的操作，是个好工具。
---

* content
{:toc}

目前用的是Nginx的fastcgi缓存方案，属于纯净态缓存模式，所以前台登录态什么的基本都没了。如果要兼顾前台登录态，又想速度快，有没有解决方案？

之前在优化方案时提到，要实现网站轻度缓存，方案还是有的，比如 DB Cache Reloaded、Redis、memcached等。

最近恰好遇到一个数据缓存需求，因此尝试了下memcached方案，下面简单分享下我的环境部署以及报错解决过程。



### 一、d还是不d ###

php有memcached和memcache两个类似组件，百度搜出来的文章，大部分是教你如何安装memcache(d)，却步解释二者的区别。

比如这位博客仁兄的经验分享：



为什么他选第二个不行？其实php的这2个组件还是有点区别的：

简单来说：

memcache 是 pecl 扩展库版本，原生支持php，出现更早，是老前辈；

memcached 是 libmemcached 版本，出现较后，是新一代，因此也更加完善，推荐使用。

Ps：如果想更深入了解，可以搜索下 memcache vs memcached

其实，我们这种小网站的话，二选一即可，这点QPS还不至于纠结。不过一旦选择了，安装的时候就要注意区分，一对一配套安装，别搞的牛头不对马嘴，出现上面那位仁兄的困惑（后文有相关说明）。

这里，我果断选择了带d的，继续分享。

### 二、部署memcached ###

#### 1、安装memcached ####

Ps：这里的memcached是指Mencached的服务端，用来处理缓存数据，名字也是容易混淆。

下面2种安装方式任选其一：

* ①、在线安装


Centos直接使用yum安装即可，其他系统自行搜索安装命令，比如ubuntu

    yum –y install memcached

启动memcached

    service memcached start

开机启动

    chkconfig memcached on

* ②、编译安装

相比在线安装，很多时候编译安装更加灵活，非常类似Windows平台的自定义安装或绿色安装，推荐熟悉 Linux 系统的朋友使用：


从官方下载最新源码包

    wget http://memcached.org/files/memcached-1.4.25.tar.gz

解压开始编译安装

    tar xzvf memcached–1.4.15.tar.gz
    cd memcached–1.4.15
    ./configure —prefix=/usr/local/memcached
    make && make install
    cd ..

设置环境

    ln –s /usr/local/memcached/bin/memcached /usr/bin/memcached
    cp scripts/memcached.sysv /etc/init.d/memcached

改为监听127.0.0.1，并关闭UDP连接方式，若为远程服务调用或不需要的话请跳过此行

    sed –i ‘s/OPTIONS=””/OPTIONS=”-l 127.0.0.1 -U 0″/g’ /etc/init.d/memcached
    sed –i ‘s@chown@#chown@’ /etc/init.d/memcached
    sed –i ‘s@/var/run/memcached/memcached.pid@/var/run/memcached.pid@’ /etc/init.d/memcached

启动并设置开机服务

    chmod +x /etc/init.d/memcached
    service memcached start
    chkconfig —add memcached
    chkconfig memcached on

至此memcached的服务端就安装好了。

#### 2、集成php-memcached拓展 ####

* ①、先安装libmemcached

提前分享一个问题，如果直接按照网上的教程安装php-memcached可能会报如下错误：

configure: error: no, sasl.h is not available. Run configure with –disable-memcached-sasl to disable this check

大部分教程会使用 –disable-memcached-sasl 参数来禁用这个功能，作为一个强迫症，我还是从国外的论坛扒到了解决方法，很简单，在编译libmemcached之前，先安装cyrus-sasl-devel即可解决

    yum install cyrus–sasl–devel

接着开始编译安装libmemcached：

    wget https://launchpad.net/libmemcached/1.0/1.0.18/download/libmemcached-1.0.18.tar.gz
    tar xzf libmemcached–1.0.18.tar.gz
    cd libmemcached–1.0.18
    ./configure —with–memcached=/usr/local/memcached —prefix=/usr/local/libmemcached
    make && make install
    cd ..

* ②、安装php-memcached组件

下载和解压这步，我们要区分下是php7还是之前的版本：

- I、如果当前环境是php7 ：

从github下载PHP7专用的memcached组件分支

    wget https://github.com/php-memcached-dev/php-memcached/archive/php7.zip

解压备用

    unzip php7.zip
    cd php–memcached–php7

- II、如果是旧的的php版本：

从官方下载php-memcached的最新源码包

    wget http://pecl.php.net/get/memcached-2.2.0.tgz

解压和编译

    tar zxvf memcached–2.2.0.tgz
    cd memcached–2.2.0

接下来开始编译：

注意已有php的实际路径

    /usr/local/php/bin/phpize
    ./configure —with–php–config=/usr/local/php/bin/php–config
    make && make install

编辑php.ini文件，在最后插入如下参数

    extension=memcached.so

Ps：如果不知道php.ini在哪个位置 ？ 执行命令：php –ini 即可找到。

保存后，执行如下命令看看是否加载成功：

    php –m | grep memcached

如果输出memcached则表示成功。

最后，如果是Nginx就 service php-fpm reload ，如果是Apache就重启Apache完成安装。

* ③、测试缓存

```php
    <?php
    $m = new Memcached();
    $m->addServer( ‘127.0.0.1’, 11211 );
    $m->set( ‘foo’, 100 );
    echo $m->get( ‘foo’ ) . “\n”;
```

将上述代码保存为 test.php，然后执行 php -f test.php，如果能输出100表示安装成功。

### 三、WordPress缓存 ###

做完上述所有步骤，系统环境就已经支持memcached缓存了。下面分享如何应用到WordPress

* 1、安装插件

访问github项目页面下载插件包：

https://github.com/tollmanz/wordpress-pecl-memcached-object-cache

下载并解压得到的 object-cache.php，上传到 wp-content 目录即可开启memcached缓存。

值得说明的是，这里还有一个大坑等着你来踩：

WordPress官网上的object-cache.php虽然也号称Memcached 插件，然而它只支持Memcache，不支持新版的，所以不能使用。如果错误地将object-cache.php和Memcached混用的话，则会出现WordPress打不开，前台后台页面一片空白的现象。

这也就是经常有站长反馈WordPress启用memcached功能后，页面空白的错误原因了。不巧，张戈在测试的时候也踩坑了，所以特别提出来，希望大家了解错误的原因，规避掉！

* 2、查看效果

做完第2步之后，你可以去网站前台刷新几次，产生缓存，然后从官方下载探针：

http://pecl.php.net/get/memcache-3.0.8.tgz

解压后，里面有一个memcache.php文件，编辑并找到如下代码：

```php
    define(‘ADMIN_USERNAME’,‘memcache’);    // Admin Username
    define(‘ADMIN_PASSWORD’,‘password’);    // Admin Password
    define(‘DATE_FORMAT’,‘Y/m/d H:i:s’);
    define(‘GRAPH_SIZE’,200);
    define(‘MAX_ITEM_DUMP’,50);
    $MEMCACHE_SERVERS[] = ‘mymemcache-server1:11211’; // add more as an array
    $MEMCACHE_SERVERS[] = ‘mymemcache-server2:11211’; // add more as an array
```

修改如下：

```php
    define(‘ADMIN_USERNAME’,‘memcache’);    // Admin Username 登录名称，自行修改
    define(‘ADMIN_PASSWORD’,‘password’);    // Admin Password 登录密码，自行修改
    define(‘DATE_FORMAT’,‘Y/m/d H:i:s’);
    define(‘GRAPH_SIZE’,200);
    define(‘MAX_ITEM_DUMP’,50);
    //下面是定义memcached服务器，一般我们是单机部署，所以注释掉一行，并将服务器地址根据实际修改，比如本文是127.0.0.1
    $MEMCACHE_SERVERS[] = ‘127.0.0.1:11211’; // add more as an array
    //$MEMCACHE_SERVERS[] = ‘mymemcache-server2:11211’; // add more as an array
```

上传到网站私密目录（临时测试可以放到根目录），然后通过前台访问memcache.php这个文件，输入上面的用户名和密码即可看到memcached状态：

* 3、其他设置

如果发现页面可以打开，但是里面没有Hits数据，说明WordPress并没有成功连接到memcached，这时候我们可以在wp-config.php加入如下参数：

```php
    global $memcached_servers;
    $memcached_servers = array(
    array(
        ‘127.0.0.1’, // Memcached server IP address
         11211        // Memcached server port
         )
    );
```

实际的memcached监听IP和端口，你可以通过如下命令查看：

```Shell
    netstat –nutlp | grep memcache
```

四、纯静态缓存

实际上memcached可以缓存动态查询数据，他也可以缓存html内容！因此，memcached也能实现和其他方案一样的html纯净态缓存！

实现原理和我之前分享的php代码缓存html方案类似，不过后者更好的是将缓存内容放在了内存当中，速度比放硬盘快的绝对不是一点点。

如何将前台页面html都缓存到memcached中呢？这里，我们需要用到 batcache 这款插件。

1、下载安装

直接在WordPress后台搜索安装 batcache ，也可以从官方下载插件包：

    https://wordpress.org/plugins/batcache/

然后解压得到 advanced-cache.php 上传到wp-content即可。

2、启用缓存

在wp-config.php中启用缓存：

```php
    define(‘WP_CACHE’, true);
```

不过，插件默认只会对游客缓存，显然也是怕影响到前台登录态。缓存和动态判断一直是矛与盾、鱼和熊掌，看个人抉择吧。

3、参数调整

```php
    var $max_age =  3600; // Expire batcache items aged this many seconds (zero to disable batcache)
    var $remote  =    0; // Zero disables sending buffers to remote datacenters (req/sec is never sent)
    var $times   =    2; // Only batcache a page after it is accessed this many times… (two or more)
    var $seconds =  0; // …in this many seconds (zero to ignore this and use batcache immediately)
```

max_age代表缓存过期时间（以秒为单位），times表示访问多少次才创建缓存（2是最小值），seconds表示在多少秒之后才创建缓存（0表示立即）。

我目前也只是要用到memcache的动态缓存，所以对于batcache也只是初步了解状态，感兴趣的朋友可以自行搜索学习更多相关设置。
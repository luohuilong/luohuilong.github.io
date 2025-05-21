---
layout: post
title:  "Linux中使用davfs2挂载WebDav网盘"
date:   2025-05-21 11:05:18 +0800
categories: 互联网
tags: davfs2
author: lhlloveqq
excerpt: davfs2 是一个 Linux 文件系统驱动程序，允许挂载 WebDAV 资源，WebDAV 是 HTTP/1.1 的扩展，允许远程协作编写 Web 资源。
---

* content
{:toc}

### 1. 安装webdav ###

    sudo apt update
    sudo apt install davfs2

### 2. 准备webdav信息 ###

挂载链接（通常由供应商提供），例如：https://aaa.bbb.com/dav/

用户名， 例如：admin

密码， 例如：123456

### 3. 创建挂载点 ###

在你想要的路径下创建目录，比如在 `/home/user/` 目录下创建 `webdav` 目录：

    mkdir /home/user/webdav

### 4. 手动挂载 ###

以上准备好后，即可进行挂载，命令如下：

    sudo mount.davfs https://aaa.bbb.com/dav/ /home/user/webdav/

执行此命令后，会提示输入账号密码，根据实际进行输入即可。

### 5. 自动挂载 ###

如果想要开机自动挂载的话，可以按照以下操作进行配置

- 5.1 配置davfs文件

编辑 `/etc/davfs2/davfs2.conf`，找到其中的 `use_lock` 取消注释，并修改值为 `0`。

- 5.2 保存挂载信息

将 2 中的信息保存到 `/etc/davfs2/secrets` 文件中，格式如下：

    https://aaa.bbb.com/dav/ admin 123456

- 5.3 编辑fstab文件

在 `/etc/fstab` 中添加以下内容：

    https://aaa.bbb.com/dav/ /home/user/webdav/ davfs defaults 0 0
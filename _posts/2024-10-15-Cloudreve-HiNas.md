---
layout: post
title:  "Cloudreve3.5.3 armv7版本 适用hi3798mv100"
date:   2024-10-15 15:07:18 +0800
categories: 网络日志
tags: cloudreve hi3798mv100
author: LuoHuiLong
excerpt: 部署cloudreve到hinas上的操作方法
---

 * content
{:toc}

新建文件夹 mkdir cloudreve3.5.3 && cd cloudreve3.5.3

下载整合包 wget http://xxx.xxx.xxx/cloudreve3.5.3-armv7.zip

解压整合包 unzip cloudreve3.5.3-armv7.zip

启动主程序 ./cloudreve

进程守护

编辑文件 vi /usr/lib/systemd/system/cloudreve.service i

文件内容

    [Unit]
    Description=Cloudreve
    Documentation=https://docs.cloudreve.org
    After=network.target
    After=mysqld.service
    Wants=network.target
    
    [Service]
    WorkingDirectory=/root/cloudreve3.5.3
    ExecStart=/root/cloudreve3.5.3/cloudreve
    Restart=on-abnormal
    RestartSec=5s
    KillMode=mixed
    StandardOutput=null
    StandardError=syslog
    
    [Install]
    WantedBy=multi-user.target

保存退出 [Esc] :wq

重载配置 `systemctl daemon-reload`

启动守护 `systemctl start cloudreve`

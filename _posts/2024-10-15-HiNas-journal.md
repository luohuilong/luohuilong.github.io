---
layout: post
title:  "journal日志清理"
date:   2024-10-15 15:07:18 +0800
categories: 互联网
tags: hinas
author: lhlloveqq
excerpt: Linux下有很多历史累积的日志，时间长了占用空间比较多，清理方法可以采用按照日期清理，或者按照允许保留的容量清理，只保存2天的日志或最大500M
---

 * content
{:toc}

Linux下有很多历史累积的日志。

Linux log日志清理

检查当前journal使用磁盘量

`journalctl --disk-usage`

清理方法可以采用按照日期清理，或者按照允许保留的容量清理，只保存2天的日志，最大500M

```
journalctl --vacuum-time=2d
journalctl --vacuum-size=500M
```

如果要手工删除日志文件，则在删除前需要先轮转一次journal日志

`systemctl kill --kill-who=main --signal=SIGUSR2 systemd-journald.service`

要启用日志限制持久化配置，可以修改 /etc/systemd/journald.conf

```
SystemMaxUse=16M
ForwardToSyslog=no
```

然后重启

`systemctl restart systemd-journald.service`

检查journal是否运行正常以及日志文件是否完整无损坏

`journalctl --verify`

或者直接命令搞定

```
    echo '''SystemMaxUse=300M
    SystemMaxFileSize=50M
    RuntimeMaxUse=30M
    RuntimeMaxFileSize=5M''' >> /etc/systemd/journald.conf;
```

重启

`systemctl restart  systemd-journald`

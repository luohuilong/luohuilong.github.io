---
layout: post
title:  "Cloudflare防火墙规则设置"
date:   2025-06-08 08:07:18 +0800
categories: 网络日志
tags: cloudflare
author: LuoHuiLong
excerpt: Cloudflare是一家提供网站安全管理、性能优化等相关技术的跨国科技企业，Cloudflare可以帮助受保护站点抵御包括分布式拒绝服务攻击(DDoS, Distributed Denial of Service)在内的大多数网络攻击，确保该网站长期在线，阻止网络攻击、垃圾邮件等，同时提升网站的性能、访问速度以改善访客体验。
---

* content
{:toc}

Cloudflare是一家提供网站安全管理、性能优化等相关技术的跨国科技企业，Cloudflare可以帮助受保护站点抵御包括分布式拒绝服务攻击(DDoS, Distributed Denial of Service)在内的大多数网络攻击，确保该网站长期在线，阻止网络攻击、垃圾邮件等，同时提升网站的性能、访问速度以改善访客体验。

Cloudflare提供用户免费使用，是防御DDos的最佳解决方案之一，Cloudflare的网络容量几乎等于其他6家领先的DDoS提供商的总清洗容量的总和，最令人惊讶的是，Cloudflare在包含免费计划的所有服务计划中提供的DDoS防御服务均不计容量且不设上限。

免费的Cloudflare防火墙可以设置5条规则，设置界面灵活且直观，可以对网站应用达到细粒度控制。

很多人使用了免费的Cloudflare，但是后台功能却不会使用，特别其功能强大的防火墙功能，不用一下实在是暴殄天物，下面就介绍一些常见的Cloudflare防火墙的设置规则。

**1、根据IP信誉阻止请求**

防火墙表达式

(not cf.client.bot and cf.threat\_score gt 2)

执行操作

质询（Captcha）

![请输入图片描述][1]

解释：

cf.threat\_score（威胁分数）表示从0到100的Cloudflare威胁评分，其中0表示低风险。大于10的值可能代表垃圾邮件发送者或机器人，大于40的值表示互联网上的不良行为者。一个常见的建议是质询分数高于10的请求并阻止分数高于50的请求。

cf.client.bot（合法机器人爬虫）当数值为true，标识来自良好的机器人或爬虫的请求。

**2、选择性防盗链**

防火墙表达式

(not http.referer contains "williamlong.info")

执行操作

阻止

![请输入图片描述][2]

解释：

引用方（http.referer）表示HTTP Referer请求头，其中包含链接到当前请求页面的网页地址。上述表达式的意思是，排除指定网站之外，其他网站的盗链均阻止。如果使用这个规则，需要在Scrape Shield应用程序中禁用热链接保护。

**3、登陆保护**

防火墙表达式

(not ip.src in {202.96.134.0/24} and lower(http.request.uri.path) contains "/wp-admin")

执行操作

阻止

![请输入图片描述][3]

解释：当客户端IP地址不在指定范围，并且请求的URI路径包含后台管理路径时候，阻止访问。

**4、根据ASN调整规则**

防火墙表达式

(ip.geoip.asnum in {37963 45090 55990} and not cf.client.bot)

执行操作

质询（Captcha）

![请输入图片描述][4]

解释：

ASN（ip.geoip.asnum）表示与客户端IP地址关联的自治系统 (Autonomous System) 编号。

上面的那条防火墙规则，可以屏蔽阿里云、腾讯云和华为云这三家云服务商的IP地址的访问，常言道，同行是冤家，使用阿里云、腾讯云和华为云来抓取你网站的，通常都不是善类，一般情况下都是恶意采集、恶意抓取、CC攻击和DDOS攻击等等，通过ASN屏蔽可以一次屏蔽数百万IP地址，非常高效。

此外，防火墙的执行顺序就是右侧的序号，拖动序号可修改防火墙规则的执行顺序。

挑战解决率 (CSR)可以评估每个防火墙规则的优劣，这个指标的含义是指被解决了发出挑战的百分比，公式为CSR=解决的挑战数量/发出的挑战数量，这个数值越低越好。将鼠标悬停在CSR上可以显示已发布和解决的CAPTCHA挑战的数量。

越低的CSR意味着越少向实际人类发出CAPTCHA挑战，降低CSR是防火墙规则的目标，应该不断调整防火墙规则来降低CSR数值。当CSR比率为0%的时候，意味着全部请求都是非人类发出的，这时候可以考虑将规则操作更改为阻止（Block）。

好了，以上就是常见的Cloudflare防火墙用例，更为详细的技术文档，可以参见[Cloudflare官方文档](https://developers.cloudflare.com/firewall/)（英文）。


  [1]: https://img2.wait.loan/file/img-hub/1750325665480_6617_1.jpg
  [2]: https://img2.wait.loan/file/img-hub/1750325661982_6617_2.jpg
  [3]: https://img2.wait.loan/file/img-hub/1750325657566_6617_3.jpg
  [4]: https://img2.wait.loan/file/img-hub/1750325659584_6617_4.jpg

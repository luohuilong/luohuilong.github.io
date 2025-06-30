---
layout: post
title:  "cloudflare pages 构建 jekyll 3.1.2版本 "
date:   2025-05-26 08:07:18 +0800
categories: 网络日志
tags: jekyll cloudflare
author: LuoHuiLong
excerpt: 利用cloudflare pages 链接github的jekyll地址，构建全球部署的pages。
---

* content
{:toc}

### 创建

打开 `https://dash.cloudflare.com/`
选择Workers和Pages，点击右上角创建选择Pages，导入现有Git存储库，前提是要在github上允许

cloudflare拉取，选择你的jekyll的github仓库。

### 部署

- 构建命令

`bundle exec jekyll build`

- 变量和机密

设置三个环境变量

`BUNDLE_WITHOUT=""`

`LANG=C.UTF-8`

`LC_ALL=C.UTF-8`

点击部署，但是可能会失败，失败后重新设置**构建系统版本为1**

- 此jekyll需上传Gemfiles到根目录，并有一下内容：

```
source "https://rubygems.org"

# 指定 Jekyll 3.1.2 兼容的插件版本
gem "jekyll", "3.1.2"
gem "jekyll-paginate", "~> 1.1.0"  # 这是 Jekyll 3 的标准分页插件
```

重新部署

OK

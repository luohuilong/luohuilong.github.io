---
layout: post
title:  "htaccess使用方法总结"
date:   2017-05-08 08:07:18 +0800
categories: 互联网
tags: apache
author: lhlloveqq
excerpt: 简单介绍.htaccess的使用方法，对于初学很有帮助，包括我自己,嘿嘿..!
---

* content
{:toc}

在利用.htaccess的Rewrite规则实现Discuz论坛的伪静态链接中已经提到过了.htaccess的重定向的使用，这里让我们来比较全面的了解一下.htaccess吧。

.htaccess是Apache服务器的一个非常强大的分布式配置文件。正确的理解和使用.htaccess文件，可以帮助我们优化自己的服务器或者虚拟主机。比如可以利用.htaccess文件创建自定义的“404 error”页面，更改很多服务器的配置。而我们所需要做的，仅仅是在这个文本文档中添加几条简单的指令而已。

Unix或Linux系统，或任何版本的Apache Web服务,都是支持.htaccess的，但是有的主机服务商可能不允许你自定义自己的.htaccess文件。国外目前主流的虚拟主机提供商，几乎全部都支持自定义功能。

启用.htaccess，需要修改httpd.conf，启用AllowOverride，并可以用AllowOverride限制特定命令的使用
如果需要使用.htaccess以外的其他文件名，可以用AccessFileName指令来改变。例如，需要使用.config ，则可以在服务器配置文件中按以下方法配置：
AccessFileName .config

笼统地来说，.htaccess可以帮我们实现包括：文件夹密码保护、用户自动重定向、自定义错误页面、改变你的文件扩展名、封禁特定IP地址的用户、只允许特定IP地址的用户、禁止目录列表，以及使用其他文件作为index文件等一些功能。

●创建一个.htaccess文档

.htaccess是一个古怪的文件名（从Win的角度来说，它没有文件名，只有一个由8个字母组成的扩展名，不过实际上它是linux下的命名，而很多linux下的东西，我们向来都会认为很古怪的），在Win系统中是不可以直接通过“新建”文件来创建的，不过我们可以利用cmd中的copy来实现，比如copy sample.txt .htaccess。也可以先创建一个htaccess.txt，然后Ftp到服务器，通过FTP来修改文件名。

●自定义错误页

.htaccess的一个应用是自定义错误页面，这将使你可以拥有自己的、个性化的错误页面（例如找不到文件时），而不是你的服务商提供的错误页或没有任何页面。这会让你的网站在出错的时候看上去更专业。你还可以利用脚本程序在发生错误的时候通知你（例如当找不到页面的时候自动Email给你）。

你所知道的任何页面错误代码（像404找不到页面），都可以通过在.htaccess文件里加入下面的文字将其变成自定义页面：

    ErrorDocument errornumber /file.html

举例来说，如果我的根目录下有一个notfound.html文件，我想使用它作为404 error的页面：

    ErrorDocument 404 /notfound.html

如果文件不在网站的根目录下，你只需要把路径设置为：

    ErrorDocument 500 /errorpages/500.html

以下是一些最常用的错误：

```
401 – Authorization Required 需要验证
400 – Bad request 错误请求
403 – Forbidden 禁止
500 – Internal Server Error 内部服务器错误
404 – Wrong page 找不到页面
```

接下来，你要做的只是创建一个错误发生时显示的文件，然后把它们和.htaccess一起上传。

●.htaccess命令

▼禁止显示目录列表

有些时候，由于某种原因，你的目录里没有index文件，这意味着当有人在浏览器地址栏键入了该目录的路径，该目录下所有的文件都会显示出来，这会给你的网站留下安全隐患。
为避免这种情况（而不必创建一堆的新index文件），你可以在你的.htaccess文档中键入以下命令，用以阻止

目录列表的显示：

    Options -Indexes

▼阻止/允许特定的IP地址

某些情况下，你可能只想允许某些特定IP的用户可以访问你的网站（例如：只允许使用特定ISP的用户进入某个目录），或者想封禁某些特定的IP地址（例如：将低级用户隔离于你的信息版面外）。当然，这只在你知道你想拦截的IP地址时才有用，然而现在网上的大多数用户都使用动态IP地址，所以这并不是限制使用的常用方法。

你可以使用以下命令封禁一个IP地址：

    deny from 000.000.000.000

这里的000.000.000.000是被封禁的IP地址，如果你只指明了其中的几个，则可以封禁整个网段的地址。如你输入210.10.56.，则将封禁210.10.56.0～210.10.56.255的所有IP地址。

你可以使用以下命令允许一个IP地址访问网站：

    allow from 000.000.000.000

被允许的IP地址则为000.000.000.000，你可以象封禁IP地址一样允许整个网段。

如果你想阻止所有人访问该目录，则可以使用：

    deny from all

不过这并不影响脚本程序使用这个目录下的文档。

▼替换index文件

也许你不想一直使用index.htm或index.html作为目录的索引文件，举例来说，如果你的站点使用PHP文件，你可能会想使用 index.php来作为该目录的索引文档。

当然也不必局限于“index”文档，如果你愿意，使用.htaccess你甚至能够设置 foofoo.balh来作为你的索引文档！

这些互为替换的索引文件可以排成一个列表，服务器会从左至右进行寻找，检查哪个文档在真实的目录中存在。

如果一个也找不到，它将会把目录列表显示出来（除非你已经关闭了显示目录文件列表）。

    DirectoryIndex index.php index.php3 messagebrd.pl index.html index.htm

▼重定向(rewrite)

.htaccess 

最有用的功能之一就是将请求重定向到同站内或站外的不同文档。这在你改变了一个文件名称，但仍然想让用户用旧地址访问到它时，变的极为有用。

另一个应用（我发现的很有用的）是重定向到一个长URL，例如在我的时事通讯中，我可以使用一个很简短的URL来指向我的会员链接。以下是一个重定向文件的例子：

    Redirect /location/from/root/file.ext http://minidx.com/new/file/location.xyz

上述例子中，访问在root目录下的名为oldfile.html可以键入：

    /oldfile.html

访问一个旧次级目录中的文件可以键入：

    /old/oldfile.html

你也可以使用.htaccess重定向整个网站的目录。假如你的网站上有一个名为olddirectory的目录，并且你已经在一个新网站http: //minidx.com/newdirectory/上建立了与上相同的文档，你可以将旧目录下所有的文件做一次重定向而不必一一声明：

    Redirect /olddirectory http://minidx.com/newdirectory

这样，任何指向到站点中/olddirectory目录的请求都将被重新指向新的站点，包括附加的额外URL信息。例如有人键入：

    http: //minidx.com/olddirecotry/oldfiles/images/image.gif

请求将被重定向到：

    http: //minidx.com/newdirectory/oldfiles/images/image.gif

如果正确使用，此功能将极其强大。

注：由于Windows Live Writer编辑这篇文章的时候，遇到http:// 就会自动添加超级链接，所以上面都特意加了一个空格，而这原本是没有的。

●密码保护

尽管有各种各样的.htaccess用法，但至今最流行的也可能是最有用的做法是将其用于网站目录可靠的密码保护。尽管JavaScript等也能做到，但只有.htaccess具有完美的安全性（即访问者必须知晓密码才可以访问目录，并且绝无“后门”可走）。

利用.htaccess将一个目录加上密码保护分两个步骤。第一步是在你的.htaccess文档里加上适当的几行代码，再将.htaccess文档放进你要保护的目录下：

````
AuthName “Section Name”
AuthType Basic
AuthUserFile /full/path/to/.htpasswd
Require valid-user
````

你可能需要根据你的网站情况修改一下上述内容中的一些部分，如用被保护部分的名字”Members Area”，替换掉“Section Name”。

`/full/parth/to/.htpasswd`则应该替换为指向.htpasswd文件（后面详述该文档）的完整服务器路径。

目录的密码保护比.htaccess的其他功能要麻烦些，因为你必须同时创建一个包含用户名和密码的文档，用于访问你的网站，相关信息（默认）位于一个名为.htpasswd的文档里。

像.htaccess一样，.htpasswd也是一个没有文件名且具有8位扩展名的文档，可以放置在你网站里的任何地方（此时密码应加密），但建议你将其保存在网站Web根目录外，这样通过网络就无法访问到它了。

创建好.htpasswd文档后（可以通过文字编辑器创建），下一步是输入用于访问网站的用户名和密码，应为：

    username:password

“password” 的位置应该是加密过的密码。你可以通过几种方法来得到加密过的密码：一是使用一个网上提供的permade脚本或自己写一个；

另一个很不错的username/password加密服务是通过KxS网站，这里允许你输入用户名及密码，然后生成正确格式的密码。

对于多用户，你只需要在.htpasswd文档中新增同样格式的一行即可。另外还有一些免费的脚本程序可以方便地管理.htpasswd文档，可以自动新增/移除用户等。

当你试图访问被.htaccess密码保护的目录时，你的浏览器会弹出标准的username/password对话窗口。

如果你不喜欢这种方式，有些脚本程序可以允许你在页面内嵌入username/password输入框来进行认证，你也可以在浏览器的URL框内以以下方式输入用户名和密码（未加密的):`http://username:password@www.website.com/directory/`

比较常用的基本上就是这些了，如果想更加具体的了解.htaccess的使用，那可以参照Appache的doc中相关的文档。
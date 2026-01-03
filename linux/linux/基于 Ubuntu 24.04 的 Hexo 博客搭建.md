---
title: 基于 Ubuntu 24.04 的 Hexo 博客搭建📇
date: 2024-12-01 14:00:00
updated: 2024-12-01 14:00:00
tag: [Linux,Ubuntu]
categories: [知识库,博客]
cover:
description: 基于 Ubuntu 24.04 的 Hexo 博客搭建📇
swiper_index: 2
sticky: 2
---

---

# 一、安装基础框架

[Hexo](https://hexo.io/) 博客框架基于` Node.js` 。因此首先要安装` nodejs `和 `npm `，然后再进行` hexo` 的安装。

## 1.1 安装 nodejs 和 npm

打开`nodejs`官网 https://nodejs.org/en/download/，按照如下操作安装` nodejs` 和 `npm`

```bash
# installs fnm (Fast Node Manager)
curl -fsSL https://fnm.vercel.app/install | bash

# activate fnm
source ~/.bashrc

# download and install Node.js
fnm use --install-if-missing 22

# verifies the right Node.js version is in the environment
node -v # should print `v22.11.0`

# verifies the right npm version is in the environment
npm -v # should print `10.9.0`
```

## 1.2 改npm源

npm下载各种模块，默认是从国处服务器下载，速度较慢，建议配置成淘宝镜像。打开CMD窗口，运行如下命令:

```perl
npm config set registry https://registry.npmmirror.com
```

##  1.3 安装 hexo

```perl
# 安装hexo
npm install -g hexo-cli
```

此时使用hexo应该可以使用了，如果提示找不到hexo命令，可以尝试链接hexo到可执行文件目录

```perl
# 链接hexo
sudo ln -s /home/xulouzhe/nodejs/node-v16.15.0-linux-x64/bin/hexo   /usr/local/bin/hexo
# 将 Hexo 所在的目录下的 node_modules 添加到环境变量之中即可直接使用 hexo <command>
echo 'PATH="$PATH:./node_modules/.bin"' >> ~/.profile
```

## 1.4 hexo的使用方法

进入想生成博客目录的路径，执行init命令生成博客文件

```perl
cd 网站目录
hexo init 目录名
```

会生成如下所示的目录结构

```perl
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

其中 _config.yml 为网站配置文件，title 属性为博客标题， language 设置为 zh-CN 可将博客变为中文主题， description 属性为博客描述。详细配置方法可以见 https://hexo.io/zh-cn/docs/configuration
其他路径中 source/_posts 目录存放文章， source/_drafts 目录存放草稿。 _posts 目录内会生成一篇默认文章，指导 hexo 的简单用法。
此时，执行

```perl
hexo generate
hexo server
```

就可以在 ip:4000 地址看到你的博客了。
以下是一些 hexo 常用的命令

```perl
# 在 source/_posts 路径内生成生成 文章标题.md 的空白文章
hexo new "文章标题"

# 生成网页静态文件，可以简写为 hexo g
hexo generate

# 部署之前生成的静态文件至 public 文件夹，可以简写为 hexo d
hexo deploy

# 清除缓存和静态文件，一般装插件出现问题时使用
hexo clean
```

# 二、使用 Nginx 部署 Hexo 博客

## 2.1 安装 Nginx 

```perl
apt install nginx
```

## 2.2 Nginx 配置

打开` Nginx` 配置文件，一般是`/etc/nginx/sites-available/default`

```perl
server{
    listen 80;
    listen [::]:80;

    # 下面的 root 后路径修改为 Hexo 博客 public 目录所在路径
    root /var/hexo/public;
}
```

## 2.3 重启 Nginx

```perl
systemctl restart nginx.service
```

## 2.4 使用 pm2 自动监控文件变化并自动生成和部署网页

* 安装 pm2

```perl
npm install -g pm2
```

* 在博客路径的 source 文件夹内新建 start.js 文件，内容如下：

```perl
var process = require('child_process');

process.exec(' hexo g -d', function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
```

* 在 source 文件夹内再新建 watch.json 文件，内容如下：

```perl
{
  "apps" : [{
    "name"       : "blog",
    "script"     : "./start.js",
    "exec_interpreter": "node",
    "exec_mode"  : "fork_mode",
    "watch"      : "_posts"
  }]
}
```

* 在 source 目录内使用 pm2 命令进行监控：

```perl
pm2 start watch.json
```

## 2.5 Hexo 博客 Markdown 文档内插入图片

先修改博客配置文件 _config.yml 内的 post_asset_folder 属性为 true

```
post_asset_folder: true
```

然后，在博客文件夹内安装插件 hexo-asset-link

```
npm i -s hexo-asset-link
```

在开启了 post_asset_folder 选项后，在生成新 md 文档时会在同一目录生成同名文件夹，将图片文件移动至文件夹内，然后在 Markdown 文档内使用如下格式即可插入图片。

```
![名称](图片所在文件夹/图片文件名) 
```

## 2.6 其他小坑

装插件后显示出现错误，使用 hexo clean 命令清除缓存后再生成静态文件解决~
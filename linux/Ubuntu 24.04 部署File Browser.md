---
title: Ubuntu 24.04 部署文件服务器--File Browser💾
date: 2025-01-04 11:16:45
updated: 2025-01-04 11:16:45
tag: [Linux,Ubuntu,File Browser]
categories: [知识库,Ubuntu]
cover:
description: Ubuntu 24.04 部署文件服务器--File Browser💾
swiper_index: 
sticky: 
---

---

# 一、File Browser介绍

`File Browser`是一个使用`go`语言编写的软件，功能是可以通过浏览器对服务器上的文件进行管理。

## 1.1 File Browser功能

- 创建文本类文件或文件夹
- 修改文件名或文本类文件内容
- 文件删除、移动与复制
- 文件上传与下载、文件分享

## 1.2 File Browser使用场景

- 使用`File Browser`可以在远程服务器上直接浏览文件和文件夹，无需登录到服务器终端。
- 可以通过`File Browser`来上传、下载和删除文件，方便管理和共享文件。
- 在团队协作中，可以使用`File Browser`来共享文件夹和文件，并设置不同的访问权限，方便团队成员之间的文件共享和管理。
- 在服务器上进行文件备份时，可以使用`File Browser`来浏览、复制和移动文件，提高文件管理的效率。
- 使用`File Browser`可以对文件和文件夹进行重命名、压缩和解压缩操作，方便进行文件操作和管理。
- 在需要远程访问服务器文件时，可以使用`File Browser`通过浏览器访问服务器上的文件，而无需使用其他远程桌面软件或命令行工具。
- 可以通过`File Browser`来创建和编辑文本文件，方便编辑服务器上的配置文件或其他文本文件。
- 在服务器上进行文件搜索时，可以使用`File Browser`来快速搜索指定的文件或文件夹，提高搜索效率。
- 在需要查看服务器上特定文件内容时，可以使用`File Browser`进行文件预览，避免下载文件后再进行查看。

# 二、本地环境介绍

本次实践为个人虚拟机测试环境，操作系统版本为`ubuntu 24.04`。

|   hostname    |  本地IP地址   | 操作系统版本 | File Browser版本 |       备注       |
| :-----------: | :-----------: | :----------: | :--------------: | :--------------: |
| colour-ubuntu | 192.168.5.229 | ubuntu 24.04 | v2.31.2/129a4fd3 | 系统已关闭防火墙 |

# 三、安装File Browser

## 3.1 创建目录

创建部署目录` /data/filebrowser`，并进入目录

```shell
mkdir -p /data/filebrowser  && cd /data/filebrowser
```

## 3.2 下载安装包

执行以下命令，下载`File Browser`软件包，[github地址](https://github.com/filebrowser/filebrowser/releases/tag/v2.31.2)。

```shell
wget https://github.com/filebrowser/filebrowser/releases/download/v2.31.2/linux-amd64-filebrowser.tar.gz
```

这里我选择的是`v2.31.2`最新版本，若想下载历史版本只需要修改版本号即可。

## 3.3 解压软件包

执行以下命令，解压`File Browser`软件包。

```shell
tar -xzf linux-amd64-filebrowser.tar.gz
```

解压后，将二进制文件`filebrowser`复制到`/usr/bin/`目录下，方便我们使用和操作`filebrowser`相关命令。

```shell
cp -a  filebrowser /usr/bin/filebrowser
```

查看版本号

```shell
filebrowser version
```

显示结果如下：

![image-20250104113141996](https://bu.dusays.com/2025/01/04/6778aba439344.png)

# 四、配置File Browser程序

## 4.1 初始化数据库

执行以下命令，初始化数据库。

```shell
./filebrowser -d /data/filebrowser/filebrowser.db config init 
```

## 4.2 配置filebrowser服务

我们可以使用`filebrowser`命令修改`filebrowser`服务的相关参数，修改`filebrowser`服务监听地址为`0.0.0.0`，可以执行以下命令。

```shell
./filebrowser -d /data/filebrowser/filebrowser.db config set --address 0.0.0.0
```

修改`filebrowser`服务监听端口为`9988`

```shell
./filebrowser -d /data/filebrowser/filebrowser.db config set --port 9988
```

执行以下命令，设置中文语言。

```shell
./filebrowser -d /data/filebrowser/filebrowser.db config set --locale zh-cn
```

执行以下命令，设置日志路径。(可执行，可不执行默认会在当前目录创建此文件)

```shell
./filebrowser -d /data/filebrowser/filebrowser.db config set  --log /data/filebrowser/filebrowser.log
```

设置`File Browser`登录账号密码默认为`admin/admin`下面命令可以手动配置

```shell
./filebrowser -d /data/filebrowser/filebrowser.db users add admin admin --perm.admin
```

## 4.3 启动filebrowser服务

上面配置步骤完成后，输入`filebrowser`启动`filebrowser`服务，启动后的如下图所示表示启动成功：

![image-20250104113959373](https://bu.dusays.com/2025/01/04/6778ad8e6bfee.png)

然后在浏览器输入`http://192.168.5.229:9988/`（这里端口号前的IP请根据自己服务器实际IP填写），打开后如下图所示：

![image-20250104114248421](https://bu.dusays.com/2025/01/04/6778ae3776aec.png)

输入用户名`admin`和密码`admin`即可进入主页，如下图所示：

![image-20250104114446466](https://bu.dusays.com/2025/01/04/6778aeadb9109.png)

> 此时，表明所有配置已完成，但是还有一个问题，目前这种情况，系统每次启动我们都要手动启动`filebrowser`服务很麻烦，下面我们创建自启动服务，在系统开机是自启动`filebrowser`服务。

# 五、使用systemctl 管理 filebrowser服务

## 5.1 创建filebrowser.json配置文件

新建`filebrowser.json`配置文件

```shell
touch filebrowser.json
```

执行`vim filebrowser.json`命令，输入如下配置内容：

```json
{
  "address": "0.0.0.0",
  "port": 9988,
  "database": "/data/filebrowser/filebrowser.db",
  "log": "/data/filebrowser/filebrowser.log",
  "locale": "zh-cn",
  "username": "admin",
  "password": "admin",
  "root": "/data/filebrowser/shareflies/",
  "scope": "/"
}
```

配置中其他参数与上文配置参数一直即可，只有`root`参数需要说明一下，就是打开`http://192.168.5.229:9988/`后加载的根目录文件目录。如果我们不设置的话默认加载的是`filebrowser`（如上图）， 这样有可能会出现误删配置文件等，是有风险的，不推荐这样写。 可在`filebrowser`目录新建`shareflies`目录（也可根据自己的情况进行更改），这样启动后加载的就是`shareflies`目录。

## 5.2 创建filebrowser服务

执行`vim /etc/systemd/system/filebrowser.service`命令，创建`filebrowser`服务，然后输入如下内容：

```shell
[Unit]
Description=filebrowser
Documentation=https://filebrowser.org/
After=network.target

[Service]
ExecStart=/data/filebrowser/filebrowser -c /data/filebrowser/filebrowser.json

[Install]
WantedBy=multi-user.target
```

## 5.3 启动filebrowser服务

执行以下命令，启动`filebrowser`服务。

```shell
systemctl daemon-reload 
systemctl enable --now filebrowser
```

## 5.4 检查filebrowser服务状态

检查`filebrowser`服务状态

```shell
systemctl status filebrowser
```

启动成功后如下图所示：

<img src="https://bu.dusays.com/2025/01/04/6778b28060161.png" alt="image-20250104120105119" style="zoom:80%;" />

然后重新打开`http://192.168.5.229:9988/`后加载的就是指定的目录，如下图所示：

![image-20250104120219683](https://bu.dusays.com/2025/01/04/6778b2cacd8d3.png)

## 5.5 检查监听端口

检查`filebrowser`服务的监听端口：

```bash
ss -tunlp |grep filebrowser
```

![image-20250104120631104](https://bu.dusays.com/2025/01/04/6778b3c632f0d.png)

## 5.6 常用的filebrowser命令

### 启动filebrowser服务

```bash
systemctl start filebrowser
```

### 停止filebrowser服务

```bash
systemctl stop filebrowser
```

### 重启filebrowser服务

```bash
systemctl restart filebrowser
```

# 六、Docker一键部署方法

## 6.1 下载 File Browser 镜像

```bash
docker pull filebrowser/filebrowser
```

## 6.2 使用 Docker-Cli 部署

```bash
# 创建数据存储目录
mkdir -p /docker/filebrowser/{srv,config,db}
docker run -d --name filebrowser --restart always -v /docker/filebrowser/srv:/srv -v /docker/filebrowser/config/config.json:/etc/config.json -v /docker/filebrowser/db/database.db:/etc/database.db -p 8080:80 filebrowser/filebrowser
```

> 容器说明

| **服务器文件夹**                   | **容器文件夹**           | **说明**     |
| ---------------------------------- | ------------------------ | ------------ |
| /docker/filebrowser/srv            | /srv                     | 文件存放位置 |
| /docker/filebrowser/filebrowser.db | /database/filebrowser.db | 数据库       |
| /docker/filebrowser/settings.json  | /config/settings.json    | 配置文件     |

## 6.3 使用 docker-compose.yaml 部署

### 创建数据目录

```bash
mkdir -p /docker/filebrowser/{srv,config,db}
```

### 目录授权

```bash
chmod -R 777 /docker/filebrowser/
```

### 编辑 docker-compose.yaml 文件

```bash
[root@blog filebrowser] vim docker-compose.yaml
version: "3"
services:
  filebrowser:
    container_name: filebrowser
    image: filebrowser/filebrowser:latest
    restart: always
#    depends_on:
#      - mariadb
    volumes:
      - /data/filebrowser/srv:/srv
      - /data/filebrowser/config/config.json:/etc/config.json
      - /data/filebrowser/db/database.db:/etc/database.db
#    environment:
#      - DB_HOST=mariadb
#      - DB_USER=admin
#      - DB_PASS=admin
#      - DB_NAME=notepad
#      - DB_PORT=3306
#      - PGID=1000
#      - PUID=1000
#      - TZ=Aisa/Shanghai
    ports:
      - "8080:80"
    networks:
      - filebrowser
networks:
    filebrowser:
```

### 运行 File Browser 容器

```bash
# 基于 docker-compose.yaml 启动并运行服务
docker compose -f docker-compose.yaml up -d
```

# 七、总结

<span style="font-size:1.1em; color:#990000; font-weight:bold;">使用`File Browser`对服务器上的文件进行管理非常方便。它提供了一个用户友好的界面，可以直接在浏览器中查看、上传、下载、删除、复制、移动和重命名文件。`File Browser`的界面布局清晰，功能的操作按钮一目了然，没有任何复杂的操作流程。使用起来非常直观，即使对于非技术人员也很容易上手。`File Browser`还提供了文件的预览功能，可以预览各种常见的文件类型，包括图片、文本、音频和视频文件。这样可以方便地查看文件内容，而无需下载到本地。另外，`File Browser`还支持文件夹的分享功能。可以生成一个公共链接，将文件夹的内容分享给他人。这对于团队协作或者与客户共享文件非常实用。`File Browser`是一个简单易用但功能强大的文件管理工具。它的使用体验非常好，可以大大提高文件管理的效率。无论是个人使用还是团队协作，都是一个非常不错的选择。</span>


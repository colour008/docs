---
title: 基于Linux系统一键搭建本地文件服务器📥️
date: 2025-11-27 20:00:00
updated: 2025-11-27 20:00:00
tag: [教程,Linux]
categories: [知识库,Linux]
cover:
description: 基于Linux系统一键搭建本地文件服务器📥️
swiper_index: 
sticky:  

---

---

> 转载于油管大佬<span style="font-style:italic; color:#FF3333;">悟空的日常</span>[视频教程](https://www.youtube.com/watch?v=aD0jZe3Aw-Q)，大佬的[油管主页](https://www.youtube.com/@wukongdaily)，请支持一下！

## 一、准备工作

* 一台Linux服务器，可以是CentOS、Ubuntu等Linux发行版，也可以是OpenWrt或飞牛NAS等系统，服务器最好能科学上网；
* 服务器已安装`docker`；
* SSH连接工具。

> 博主使用装有Ubuntu 24.04的J4125服务器进行演示。

## 二、安装步骤

1.用SSH连接服务器，切换到`root`用户，在服务器内`/opt`目录下新建一个文件夹（也可以是其他目录，推荐`/opt`，飞牛NAS可以在共享文件夹新建目录，然后复制文件夹路径在下面步骤备用），命名为`fileserver`（可以任意命名）；

2.给`fileserver`文件夹读写权限；

![image-20251127212428103](https://bu.dusays.com/2025/11/27/6928511206e75.png)

3.然后`CD`进入`fileserver`文件夹，用悟空大佬一键部署脚本进行安装，命令如下：

```bash
bash -c "$(curl -fsSL https://getindex.netlify.app/init.sh)"
```

> 注意：安装前确保你的服务器`18080`端口未被占用，如果已被占用，那么先访问悟空大佬的项目[index](https://github.com/wukongdaily/index)，将项目文件下载到`fileserver`文件夹，修改`nginx`目录下`docker-compose.yml`的端口为服务器未使用的端口，然后在本地启动`start.sh`脚本进行部署。

博主服务器`18080`端口未被占用，在线安装过程如图所示：

![image-20251127212745308](https://bu.dusays.com/2025/11/27/692851d0312b8.png)

安装完成后，`fileserver`文件夹下就会存在如下文件夹及文件：

![image-20251127212956076](https://bu.dusays.com/2025/11/27/69285252ba040.png)

4.将你需要分享的文件上传到`abc`文件夹内，然后在浏览器内输入http://服务器IP:18080/，以博主服务器为例，输入http://192.168.5.20:18080/，就可以访问文件服务器web页面，点击文件即可满速下载，如下图所示：

![image-20251127214233349](https://bu.dusays.com/2025/11/27/6928554829271.png)

5.如果想通过外网访问，有公网IP的直接设置端口映射即可，其他网络可以使用内网穿透工具即可。


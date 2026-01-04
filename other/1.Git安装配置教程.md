

---

## 一、Git 是什么

> `Git`是目前世界上最先进的[分布式版本控制系统](https://so.csdn.net/so/search?q=分布式版本控制系统&spm=1001.2101.3001.7020)，没有之一！说到`Git`,另一个需要知道的便是`GitHub`，`GitHub`是目前使用最多的社交代码托管平台。`GitHub`，字面意思就是`Git`中心枢纽的意思，它是基于`Git`的，仅支持`git`作为唯一的版本库格式进行托管，故名`GitHub`。

## 二、安装 Git

### 1.下载 git

`git`官网地址：https://git-scm.com/
![](https://bu.dusays.com/2024/12/08/675522c669914.png)
但是如果没梯子下载会非常慢，因为服务器在国外。也可在国内校园网联合镜像站下载：https://mirrors.cernet.edu.cn/list/git-for-windows

### 2.安装 git

双击打开上面已经下好的`exe`执行文件,选择安装位置，然后都默认下一步直接安装即可。

![](https://bu.dusays.com/2024/12/08/675522e79cdc9.png)

![](https://bu.dusays.com/2024/12/08/6755230259fe9.png)

### 3.检测 git

按键盘上的`win+R`打开运行，输入`cmd`打开终端，然后输入`git --version `查看`Git`版本信息

![](https://bu.dusays.com/2024/12/08/6755230de9875.png)

## 三、配置 Git

### 1.配置本地信息

为了在后面上传项目到`github`时方便知道是谁上传的，需要给本机`git`配置用户名和邮箱：

```
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

打开 `git bash`（也可任意位置右键打开 `git bash`）：

![](https://bu.dusays.com/2024/12/08/675523331e38f.png)
**查看配置命令：`git config --list`**

### 2.配置 SSH

#### （1）SSH 与 SSH Key 是什么？

要了解`SSH key`简介，首先得熟悉`SSH`(Secure Shell 的缩写 ) 是一个允许两台电脑之间通过安全的连接进行数据交换的网络协议。`SSH `密钥对可以让您方便的登录到 `SSH `服务器，而无需输入密码。`SSH `密钥对总是成双出现的，一把公钥，一把私钥。这里用到了非对称公钥加密体系，生成的公钥放到`github`的网站上，生成的私钥放在自己的电脑上。

#### （2）生成 SSH Key

`ssh key`生成命令

```
ssh-keygen -t rsa -C “注册邮箱”
//执行后一直回车即可
```

![](https://bu.dusays.com/2024/12/08/6755233f56f87.png)

#### （3）获取 ssh key 公钥内容（id_rsa.pub）

```
cd ~/.ssh
cat id_rsa.pub
```

如下图所示，复制该内容

![](https://bu.dusays.com/2024/12/08/6755234ca7b92.png)

#### （4）Github 账号上添加公钥

打开个人的`Github`主页，进入`Settings`设置

![](https://bu.dusays.com/2024/12/08/67552360128ba.png)
添加`ssh key`，把刚才复制的内容粘贴上去保存即可

![](https://bu.dusays.com/2024/12/08/6755236ea47bd.png)
![](https://bu.dusays.com/2024/12/08/6755238740260.png)

#### （5）验证是否配置成功

```
ssh -T git@github.com
```

显示如下信息表明设置成功

![在这里插入图片描述](https://bu.dusays.com/2024/12/30/677290645f430.png)

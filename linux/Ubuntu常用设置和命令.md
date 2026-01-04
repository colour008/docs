---
title: Ubuntu常用设置和命令📘
date: 2024-12-01 12:00:00
updated: 2024-12-01 12:00:00
tag: [Linux,Ubuntu]
categories: [知识库,Ubuntu]
cover:
description: Ubuntu常用设置和命令 📘
swiper_index: 1
sticky: 1
---
---

# 一、更换镜像源

## 阿里源

在 Ubuntu 24.04 之前，Ubuntu 的软件源配置文件使用传统的 One-Line-Style，路径为 `/etc/apt/sources.list`；从 Ubuntu 24.04 开始，Ubuntu 的软件源配置文件变更为 DEB822 格式，路径为 `/etc/apt/sources.list.d/ubuntu.sources`。

**注意：** 24.04 源文件地址 已经更换为 `/etc/apt/sources.list.d/ubuntu.sources`
以更换阿里源为例，受限打开终端，输入以下命令，备份当前的源列表：

```
sudo cp /etc/apt/sources.list.d/ubuntu.sources  /etc/apt/sources.list.d/ubuntu.sources.bak
```

打开文本编辑器，输入以下命令：

```
sudo vim /etc/apt/sources.list.d/ubuntu.sources
```

在文本编辑器中粘贴以下内容：

```
# 阿里云
Types: deb
URIs: http://mirrors.aliyun.com/ubuntu/
Suites: noble noble-updates noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

保存并关闭文本编辑器。

更新源列表，输入以下命令：

```
sudo apt-get update
```

如果需要，可以更新系统软件包，输入以下命令：

```
sudo apt-get upgrade
```

其他几份国内源如下：

## 清华源

```
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
Types: deb
URIs: http://mirrors.tuna.tsinghua.edu.cn/ubuntu/
Suites: noble noble-updates noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

## 中科大源

```
Types: deb
URIs: http://mirrors.ustc.edu.cn/ubuntu/
Suites: noble noble-updates noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

## 网易163源

```
Types: deb
URIs: http://mirrors.163.com/ubuntu/
Suites: noble noble-updates noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

# 二、开启ssh服务，配置root远程登录

> 注：自己根据自身情况决定加不加sudo 

## 一、开启ssh服务

### 1、先更新下载源

```sql
apt update
```

> 注：`apt upgrade`这个命令，会把本地已安装的软件，与刚下载的软件列表里对应软件地址的软件进行对比，如果发现已安装的软件版本太低，就会提示你更新。

### 2.安装ssh服务器

```vbscript
apt install openssh-server
```

### 3.启动ssh服务

#### （1)输入下面的命令启动ssh服务

```sql
service ssh start
```

#### (2)查看ssh服务是否开启

```perl
ps -e |grep ssh
```

**还可以通过下面这个命令查看ssh状态**

```lua
service ssh status
```

**running即已启动**，至此SSH服务已开启。

## 二、修改root用户登录桌面权限

> 在Ubuntu 24.04桌面版中，开启root用户登录并启用远程SSH连接可以按照以下步骤进行操作：

### 1. 设置root用户密码

使用如下命令设置root用户密码，执行命令后，依次输入当前登录用户密码，要设置的root密码，确认root密码

```bash
sudo passwd root
```

### 2. 注释如下两个文件的对应行

文件为`/etc/pam.d/gdm-password和/etc/pam.d/gdm-autologin`，找到如下代码后在文件前面加入#注释，代码为`auth required pam_succeed_if.so user != root quiet_success`。编辑文件代码如下：

```bash
sudo nano /etc/pam.d/gdm-autologin
sudo nano /etc/pam.d/gdm-password
```

### 3. 修改profile文件

修改`/root/.profile`文件，编辑代码如下

```bash
sudo nano /root/.profile
# 注释掉或者删除行
mesg n 2＞ /dev/null || true
# 插入新行
tty -s && mesg n || true
```

注意：当没有执行第一步“设置root用户密码”时，`/root/.profile`文件是不存在的所以对于新安装的系统来说，第一步是非常重要的。

### 4. 修改配置文件安装完成后修改配置文件/etc/ssh/sshd_config，命令如下

```bash
sudo nano /etc/ssh/sshd_config
将\#PermitRootLogin prohibit-password改成
PermitRootLogin yes
```

### 5. 重启服务

使用如下命令重启ssh服务

```bash
sudo systemctl restart ssh
```

> 现在，你已经成功开启了root用户登录并启用了远程SSH连接。你可以使用root用户登录桌面版，或者通过SSH客户端使用root用户进行远程连接。请确保在远程连接时保持安全性，并仅授权受信任的用户使用root权限。

# 三、添加系统字体

> 系统字体保存路径在`/usr/share/fonts`下，如果此目录下缺少字体，则使用其他可视化api（如Python的pygame库）的默认配置时可能会出现乱码问题。

## 方法一：手动添加字体文件

- 下载字体文件：从互联网下载你需要的字体文件（例如，.ttf 或 .otf 文件）。
- 复制字体文件到 /usr/local/share/fonts：将下载的字体文件复制到 /usr/local/share/fonts 目录。

```
sudo cp /path/to/downloaded/font.ttf /usr/local/share/fonts/
```

- 更新字体缓存：添加字体后，运行 fc-cache 命令来更新字体缓存。

```
sudo fc-cache -fv
```

## 方法二：通过系统包管理器安装字体

Ubuntu 提供了多种字体包，可以通过 apt 包管理器安装。以下是一些常见的字体包：

- 安装 Microsoft 字体：

```
sudo apt update
sudo apt install ttf-mscorefonts-installer
```

- 安装 Google 字体：

```
sudo apt update
sudo apt install fonts-noto
```

- 安装其他常用字体：

```
sudo apt update
sudo apt install fonts-dejavu
sudo apt install fonts-liberation
sudo apt install fonts-ubuntu
```

安装这些字体包后，系统会自动将字体文件添加到合适的目录（通常是 `/usr/share/fonts `或` /usr/local/share/fonts`），并更新字体缓存。

## 方法三：使用 fontconfig 来查找现有系统字体

即使 `/usr/local/share/fonts` 目录中没有字体文件，系统其他位置仍然可能有字体文件。你可以使用 fontconfig 来查找这些字体。

```
fc-list
```

此命令会列出系统中所有可用的字体及其路径。你可以使用 grep 来查找特定的字体。例如：

```
fc-list | grep -i "arial"
```

# 四、切换默认sh为bash或者dash

## 1.bash与dash

------

从Ubuntu 6.10开始，默认使用dash(theDebian Almquist Shell)而不是bash(the GNUBourne-Again Shell).

但Login Shell还是bash. 原因是dash更快、更高效，而且它符合POSIX规范。Ubuntu在启动的时候会运行很多shell脚本，使用dash可以加快启动速度。

## 2.切换bash和dash

------

### 2.1 查看与使用

------

先用命令`ls -l /bin/sh`看看

> /bin/sh -> dash

我们会发现Ubuntu默认采用的是 dash

### 2.2 切换sh为bash

------

查看shell是否为bash，在终端运行如下命令

```html
ls -l /bin/sh
```

如果显示为“/bin/sh -> bash”则为正常，否则请按以下方式修改：

**方法一**：在终端运行如下命令，然后选择 no。

```html
sudo dpkg-reconfigure dash
```

**方法二**：先删除sh，再创建软链接。

```html
sudo rm -rf /bin/sh
sudo ln -s /bin/bash /bin/sh
```

### 2.3 切换sh为dash

------

当然我们也可以使用

> sudo dpkg-reconfigure dash

把sh修改回去

## 3.美化bash

> 默认用户和root用户分别进行如下操作

### 3.1 打开配置文件

```
vim ~/.bashrc
```

### 3.2 编辑配置文件

打开后按i键，在文件最后添加如下美化代码：

```shell
export PS1='\[\e[37;1m\][\[\e[31;1m\]\u\[\e[34;1m\]@\[\e[32;1m\]\h \[\e[31;1m\]\w \[\e[33;1m\]\t\[\e[37;1m\]]\[\e[32;1m\]\$\[\e[m\]'
```

PS1具体对应的美化教程参考：https://blog.csdn.net/kim5659/article/details/104514814

### 3.3 保存并应用配置文件

```
source ~/.bashrc
```

### 3.4 LS_COLOR美化列举文件

[LS_COLOR](https://github.com/trapd00r/LS_COLORS) 是通过配置GNU环境的 DIRCOLOR ，让你的 Terminal 加上颜色，将 `LS_COLOR` 配置为全局适用，包括 `root` 用户在内，可以按照以下步骤操作：

1. **下载 `LS_COLORS` 配置文件**： 首先，我们需要将 `LS_COLORS` 配置文件下载到一个适合全局使用的位置。例如，您可以将其下载到 `/etc` 目录下，这样所有用户都可以访问到它。

   ```bash
   sudo wget https://raw.githubusercontent.com/trapd00r/LS_COLORS/master/LS_COLORS -O /etc/dircolors
   ```

2. **修改全局配置文件**： 接下来，您需要在系统的全局 bash 配置文件中（通常是 `/etc/bash.bashrc` 或 `/etc/profile`）添加配置，以便所有用户（包括 `root`）都能加载此颜色设置。

   打开 `/etc/bash.bashrc` 文件：

   ```bash
   sudo nano /etc/bash.bashrc
   ```

3. **添加 `dircolors` 配置**： 在文件末尾添加以下内容：

   ```bash
   if [ -f /etc/dircolors ]; then
       eval "$(dircolors -b /etc/dircolors)"
   fi
   ```

   这段代码会检查 `/etc/dircolors` 文件是否存在，如果存在就加载颜色配置。

4. **重新加载配置**： 编辑完毕后，保存并退出编辑器，然后执行以下命令使配置立即生效：

   ```bash
   source /etc/bash.bashrc
   ```

   或者，您也可以让所有用户在下次登录时自动加载新的配置。

5. **测试颜色配置**： 可以通过使用 `ls` 命令测试颜色是否已经生效。例如：

   ```bash
   ls --color=auto
   ```

   如果一切顺利，您应该能看到带有不同颜色的文件列表。

# 五、开启/关闭防火墙

1. Ctrl+Alt+T打开终端或者ssh登录，输入`sudo ufw status`回车，[查看防火墙状态](https://so.csdn.net/so/search?q=查看防火墙状态&spm=1001.2101.3001.7020)：inactive是关闭，active是开启。
2. 使用`sudo ufw enable`开启防火墙。
3. 使用`sudo ufw disable`[关闭防火墙](https://so.csdn.net/so/search?q=关闭防火墙&spm=1001.2101.3001.7020)。

# 六、安装1Panel

> 官方文档：https://1panel.cn/docs/installation/online_installation/

使用一键安装命令

```
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh
```

安装成功后，控制台会打印面板访问信息，可通过浏览器访问 1Panel：

```
http://目标服务器 IP 地址:目标端口/安全入口
```

- **如果使用的是云服务器，请至安全组开放目标端口。**
- **ssh 登录 1Panel 服务器后，执行 1pctl user-info 命令可获取安全入口（entrance）**

# 七、切换shell

> 切换终端只需要两句命令

```shell
chsh -s /usr/bin/fish  //切换到fish-shell
fish  //启用fish-shell
```

# 八、Ubuntu修改UTC/CST时间

## （一）修改时区为UTC

先查看`/etc`下面有没有`localtime`的软链接，如果有，先备份文件（备份文件使用`mv`命令）

```perl
cd /etc

#备份源文件
mv localtime localtime.bak

#复制UTC时间到 /etc/localtime
sudo cp /usr/share/zoneinfo/UTC /etc/localtime
 
#创建软连接 /etc/localtime
sudo ln -sf /usr/share/zoneinfo/UTC /etc/localtime
 
#显示时间和时区
date
```

## （二）修改时区为CST

同样的操作，备份源文件，并修改为`CST`时区

```perl
cd /etc
 
#备份源文件
mv localtime localtime.bak
 
#把CST时区覆盖掉 /etc/localtime 对时区进行修改
sudo cp /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
 
#创建软连接
sudo ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
 
#显示时间和时区
date
```

## （三）linux环境下时区无法设置(Asia/Shanghai (UTC, 0000))的问题解决

在进行linux下修改时区的时候,总是修改不了,修改成 Asia/Shanghai 但是时区总是 +0000 却不是想要的+0800
按照网上的方法

A : tzselect：执行tzselect命令-->选择Asia-->选择China-->选择east China - Beijing, Guangdong, Shanghai, etc-->然后输入1。

B : 修改配置文件来修改时区

1.修改/etc/sysconfig/clock     ZONE=Asia/Shanghai

2.rm /etc/localtime

3.链接到上海时区文件    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

执行完上述过程后，重启机器，即可看到时区已经更改。

这些都需要重启才能生效，其实只需要在`/etc/profile`中简单设置一下，加入`export TZ='CST-8'`，即时生效一下就全部搞定。

# 九、如何在ubuntu中配置eza

> `eza` 是 `exa` 的一个现代化分支，提供了类似的功能，包括更美观的文件和目录列表，并支持图标。以下是如何在 Ubuntu 中配置 `eza` 的步骤：

## 1. 安装 `eza`

### 方法 1：从包管理器安装

对于支持的系统，可以直接使用以下命令：

```bash
sudo apt update
sudo apt install eza
```

### 方法 2：从源码或 GitHub 发布页面安装

如果在软件源中找不到，可以从 [eza 的 GitHub Releases 页面](https://github.com/eza-community/eza/releases) 下载最新版本。

#### 步骤：

1. 下载最新版本的 `.deb` 包：

   ```bash
   wget https://github.com/eza-community/eza/releases/download/vVERSION/eza_VERSION_amd64.deb
   ```

   将 `VERSION` 替换为最新版本号（例如 `v0.14.0`）。

2. 安装下载的 `.deb` 包：

   ```bash
   sudo dpkg -i eza_VERSION_amd64.deb
   ```

3. 如果有依赖问题，运行以下命令：

   ```bash
   sudo apt --fix-broken install
   ```

## 2. 设置别名

为了方便使用 `eza`，可以将 `ls` 替换为 `eza`，并开启图标显示。

1. 编辑 `~/.bashrc` 或 `~/.zshrc` 文件：

   ```bash
   nano ~/.bashrc
   ```

2. 添加以下行：

   ```bash
   alias ls='eza --icons'
   alias ll='eza -al --icons'
   ```

3. 保存文件并重新加载：

   ```bash
   source ~/.bashrc
   ```

## 3. 确保图标字体支持

为了正确显示文件和目录的图标，您需要安装支持 Nerd Fonts 的字体。

### 安装 Nerd Fonts

1. 从 [Nerd Fonts 官网](https://www.nerdfonts.com/) 下载一个字体（如 Fira Code、JetBrains Mono）。

2. 解压下载的字体并安装：

   ```bash
   mkdir -p ~/.fonts
   cp path-to-downloaded-font/*.ttf ~/.fonts/
   fc-cache -fv
   ```

3. 打开终端设置，选择已安装的 Nerd Font 作为终端的字体。

## 4. 使用示例

使用以下命令测试：

```bash
eza --icons
eza -al --icons
```

**常用选项：**

- `--icons`：启用图标。
- `-a`：显示隐藏文件。
- `-l`：以长格式显示文件信息。
- `-g`：按组显示文件归属。
- `--tree`：以树形结构显示目录。

完成以上步骤后，`eza` 应该可以正常工作，并在终端中显示文件图标和详细信息。

# 十、 VMware Tools安装

进入终端，只需要输入三行命令：（输入之后耐心等待命令执行）

```shell
sudo apt upgrade
sudo apt install open-vm-tools-desktop -y
sudo reboot
```


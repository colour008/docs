

---

> 转载于esir大佬[视频教程](https://www.youtube.com/watch?v=YwbwzuXKNlg&t=26s)，大佬的[油管主页](https://www.youtube.com/@eSirPlayGround)，请支持一下！

## 一、查看并新建分区

首先，使用`SSH`命令登录`OpenWrt`， 执行`lsblk`命令查看当前固件分区格式，并得到固件现有`Overlay`空间大小，自己心里有个数，准备扩容多大。

![图1](https://bu.dusays.com/2025/01/05/677a70703ceee.png)

使用`cfdisk`命令打开分区工具。通过键盘方向键，选中`Free space(自由分区)`，并选择`NEW(新建)`:

![图2](https://bu.dusays.com/2025/01/05/677a707147585.png)

设置`Overlay`所需的空间大小，推荐1~2GB即可，保存分区修改设置:

![图3](https://bu.dusays.com/2025/01/05/677a70725baaf.png)

按提示输入`yes`确认保存设置，然后移动左右方向键选择`[Quit]`退出`cfdisk`工具。

## 二、挂载分区

然后按如下方法格式化并挂载`sda4`分区:

* 把新建的`sda4`分区格式化为`ext4`分区格式，命令为：`mkfs.ext4 /dev/sda4`;

* 把`sda4`分区从`/dev`目录移动到`/mnt`挂载目录下，命令为：`mount /dev/sda4 /mnt/sda4`:

![图4](https://bu.dusays.com/2025/01/05/677a707344c76.png)

* 查看`sda4`是否挂载到`mnt`目录下，命令为：`ls /mnt/sda4`；
* 进入`overlay`文件夹，命令为：`cd /overlay`；然后拷贝源`overlay`目录内所有配置文件到`sda4`目录，命令为：`cp -r /overlay/* /mnt/sda4`：

![图5](https://bu.dusays.com/2025/01/05/677a707430396.png)

## 三、OpenWrt添加挂载点

进入`OpenWrt`控制页面，**找到系统->挂载点->添加**，添加`sda4`挂载点为`Overlay`外部挂载点，保存并应用：

![图6](https://bu.dusays.com/2025/01/05/677a70754bf4a.png)

![图7-20230203010643575](https://bu.dusays.com/2025/01/05/677a70767d3dd.png)

重启`OpenWrt`后检查扩容是否完成：

> 扩容前：

![图8](https://bu.dusays.com/2025/01/05/677a70777f500.png)

> 扩容后：

![图9](https://bu.dusays.com/2025/01/05/677a70786895a.png)

**现在，你可以随心所欲地安装需要的应用了。**

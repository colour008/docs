# 删除右键新建newdocermall和newmenuchuangkitdesign

> Windows右键，新建有newdocermall和newmenuchuangkitdesign，可能是安装金山WPS所致。

按下`Win + R`键，输入`regedit`并回车，打开注册表编辑器。依次打开`计算机\HKEY_USERS\S-1-5-21-XXXXXXXXX-XXXXXXXXXX-XXXXXXXXXX-00\SOFTWARE\Kingsoft\Office\6.0\Common`，找到`EnableNewDocerMall`和`EnableNewMenuChuangkitDesign`（没有的话新建一个）将值改为`0`就可以了。如下图所示：

![image-20251221153548079](https://bu.dusays.com/2025/12/21/6947a34c28d6a.png)
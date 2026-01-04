
---

## 获取超密

浏览器输入

```
http://192.168.1.1:8080/cgi-bin/telnetenable.cgi?telnetenable=1
```

开启`Telnet`

![显示telnet开启](https://bu.dusays.com/2024/12/08/6755223bc4598.jpg)

然后使用`putty`，`mobaxterm`或`windows`自带的`telnet`工具登录后台，命令行输入`telnet `光猫`IP`：

![用户名root，密码abcd](https://bu.dusays.com/2024/12/08/6755223ee2738.jpg)

用户名`root`，密码`abcd`，然后输入

```
cat /flash/cfg/agentconf/factory.conf
```

即可看到超密：

![telnet](https://bu.dusays.com/2024/12/08/675522431c613.jpg)

输入

```
touch /usr/local/fh/mf/factory_mode
```

可以开启工厂模式，浏览器重新访问光猫

```
192.168.1.1:8080/cgi-bin/login.htm.cgi
```

![可以看到底下一行红字显示工厂模式已开启](https://bu.dusays.com/2024/12/08/67552247f10fa.jpg)

可以看到底下一行红字显示工厂模式已开启。用之前获取的超密账号登录，再次来到设备管理界面

![](https://bu.dusays.com/2024/12/08/6755224c9d691.jpg)

`telecomadmin`账号登录后，设备管理页出现`USB`备份设置。找一个`fat32`格式的U盘插入光猫，然后点击「备份配置」，提示"配置文件备份成功”后，拔下U盘，插回电脑。可以看到有一个`e8_Config_Backup`文件夹，里面的`ctce8_HG2xxG.cfg`就是配置文件。

![光猫配置文件](https://bu.dusays.com/2024/12/08/675522644fc87.jpg)

复制这个文件到电脑上，然后用`Notepad++`之类的源代码编辑器打开，`Ctrl+F`打开查找对话框，输入`telnet`，定位到`TelnetUserName`和`TelnetPassword`即可看到`telnet`用户名和密码

![](https://bu.dusays.com/2024/12/08/67552268eb733.jpg)

修改`telnet`密码。修改`value`后面的值即可将用户名和密码改成自己的

`<param name="TelnetEnable"  rw="2"  type="b" dev_func="dev_X_CT_COM_ServiceManage_TelnetEnable"  value="0">`

这行是开启`Telnet`，`value="0"`表示关闭，改为`1`则是永久打开`telnet`功能。查找`TotalTerminalNumber`，修改`value`后面的数值可修改终端连接数

![破解终端连接数](https://bu.dusays.com/2024/12/30/677295c506dcf.jpg)

破解终端连接数。查找`telecomadmin`，定位到即可看到超级管理员密码,同样可以在此修改密码

![修改超密](https://bu.dusays.com/2024/12/08/6755228c42c1c.jpg)

修改超密。其它的`TR069`、`ftp`、`Samba`、宽带密码都可以在这份配置文件中进行查看和修改。

## 更新光猫配置

保存后替换U盘的原名文件，重新插回光猫，再次回到设备管理界面，勾选「快速恢复」更新即可

为了阻止电信远程自动下发配置改超密，可以用超密登录后，在「网络」-「远程管理」-「ITMS服务」中，取消勾选「启用周期上报」

![ITMS设置](https://bu.dusays.com/2024/12/08/67552291edfcc.jpg)

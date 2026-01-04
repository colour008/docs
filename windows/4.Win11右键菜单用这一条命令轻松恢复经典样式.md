# win11右键菜单用这一条命令轻松恢复经典样式！

点开开始按钮，在搜索框输入cmd并以管理员身份运行。

在弹出的命令提示框中输入：

```bat
reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

然后输入：

```bat
taskkill /f /im explorer.exe & start explorer.exe
```

重启资源管理器。返回到桌面右键，菜单的样式就已经回到了我们在win10下熟悉的模样了。

如果你修改之后想要回到win11的菜单样式，可以在命令提示框中输入：

```bat
reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f
```

后再次输入：

```bat
taskkill /f /im explorer.exe & start explorer.exe
```

重启资源管理器，win11的右键菜单样式就还原了。

还有个方法，就是按住键盘上的shift键，在点击鼠标右键，也会显示经典菜单，只是每次都需要使用shift+鼠标右键，很不方便。
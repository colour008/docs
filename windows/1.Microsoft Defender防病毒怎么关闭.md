# Microsoft Defender 防病毒关闭详细步骤

Microsoft Defender 是 Windows 系统中的防病毒软件，提供了实时的安全保护功能。但是，在某些情况下，用户想要关闭系统内的 Microsoft Defender 功能，但不知道要怎么操作才能关闭？接下来小编给大家带来详细的关闭步骤介绍。

## 永久禁用 Windows Defender

> 注：不建议在没有其他防护措施的情况下禁用 Microsoft Defender。如果你决定不使用 Microsoft Defender，请确保有其他可靠的第三方安全软件保护你的系统。

在旧版本的 Windows 中，禁用「实时保护」通常就足够了。但现在，要彻底禁用 Microsoft Defender，需要先关闭篡改防护功能，具体步骤如下：

1. 在「开始」菜单中搜索并打开「Windows 安全中心」，选择「病毒和威胁防护」。

2. 在「病毒和威胁防护」设置中，点击「管理设置」。

3. 找到并关闭「篡改防护」开关。

![img](https://bu.dusays.com/2024/12/08/675523a7d4aa7.jpeg)

## 通过组策略禁用 Windows Defender

对于 Windows 10 和 Windows 11 的专业版和企业版用户，可以通过[组策略]编辑器永久禁用 Windows Defender 实时保护，具体步骤如下：

1. 使用 Windows + R 快捷键打开「运行」对话框，执行 gpedit.msc 打开组策略编辑器。

2. 导航至以下路径：

计算机配置 > 管理模板 > Windows 组件 > Windows Defender 防病毒

3. 双击「关闭 Windows Defender 防病毒」策略，选择「已启用」，然后点击「确定」。

![img](https://bu.dusays.com/2024/12/08/675523aea2eeb.jpeg)

4. 打开「命令提示符」，执行 gpupdate /force 命令强制更新组策略，或者重启计算机以让更改生效。

## 通过注册表禁用 Windows Defender

对于 Windows 10 和 Windows 11 的家庭版用户，可以通过修改注册表来永久禁用 Windows Defender，具体步骤如下：

1. 使用 Windows + R 快捷键打开「运行」对话框，执行 regedit 打开注册表编辑器。

2. 导航至以下路径：

`HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender`

3. 将名为 DisableAntiSpyware 的 DWORD （32 位） 值设置为 1，如果没有就新建。

![img](https://bu.dusays.com/2024/12/08/675523b76c415.jpeg)

4. 重启计算机以使更改生效。

再次打开 Windows 安全中心并查看「病毒和威胁防护」时，可能会看到提示：无可用的防病毒提供方。你的设备易受攻击。

![img](https://bu.dusays.com/2024/12/08/675523c33d945.jpeg)

## 验证 Windows Defender 运行状态

1. 使用 Windows + R 快捷键打开「运行」对话框，输入 powershell，然后按 Ctrl + Shift + Enter 以管理员权限打开 Windows PowerShell 窗口。

2. 执行以下命令：

`Get-MpComputerStatus | select AMRunningMode`

返回 Normal 表示仍在运行，Not Running 表示禁用成功。

![img](https://bu.dusays.com/2024/12/08/675523c888b9d.jpeg)

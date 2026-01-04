

---

> 适用产品：台式机，笔记本
>
> 适用版本：Windows 10, Windows 11

当 Windows 系统出现问题，使用 Windows 系统自带的通用修复命令可以第一时间排查以下问题。

操作步骤：

1. 在任务栏中点击搜索图标，在搜索框中输入`cmd`，点击**以管理员身份运行**。
2. 根据故障现象，选择对应的操作步骤，在窗口中输入命令（建议直接复制、粘贴命令完成），按<kbd>Enter</kbd>键确认。

## 一、Windows系统问题通用修复命令

依次输入下列修复命令：

1. 检查系统映像健康：`Dism.exe /Online /Cleanup-image /CheckHealth`，按<kbd>Enter</kbd>键确认。
2. 检查系统映像完整：`DISM.exe /Online /Cleanup-image /Scanhealth`，按<kbd>Enter</kbd>键确认。
3. 修复系统映像：`DISM.exe /Online /Cleanup-image /Restorehealth`，按<kbd>Enter</kbd>键确认。
4. 修复系统文件：`sfc /scannow`，按<kbd>Enter</kbd>键确认。

* 每个“/”前需输入空格。
* 若修复一半出现卡死的情况，不需要全部重新执行命令，只需重新执行当前命令即可。
* 若一直修复失败，说明系统的自动修复命令无法解决当前系统文件损坏问题，建议开机按<kbd>F10</kbd>恢复出厂设置。

> 检查、修复 Windows 系统

## 二、Windows系统磁盘问题通用修复命令

使用此命令将会扫描硬盘中的逻辑错误和坏扇区。如果在硬盘驱动器上发现坏扇区，`chkdsk`会自动修复坏扇区，但该硬盘的数据可能会丢失，请注意提前备份数据。

**操作步骤：**

如果需要检查C盘，请输入:` chkdsk /r C:`，按<kbd>Enter</kbd>键确认。`C:`指的是驱动器号，若需要检查其他盘，请将`C:`替换为对应盘符。例如：检查D盘，则输入：`chkdsk /r D:`。

> 检测修复磁盘分区的分区表与磁盘文件等

## 三、Windows系统电源计划异常通用修复命令

输入：`powercfg –restoredefaultschemes`，按<kbd>Enter</kbd>键确认。

> 将电源管理计划还原到初始状态

以上命令建议使用复制粘贴的方式输入，如手动输入，请注意符号“/”及符号“-”前面有一个空格符。
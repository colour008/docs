# OpenWrt新建接口直连光猫

> 参考视频：[许迎果 第217期 openwrt软路由如何快捷管理光猫](https://www.bilibili.com/video/BV12i4y1c7TX/?spm_id_from=333.999.0.0&vd_source=c5a46efcbe68c08701ad742bbbd03c4e)

1.启用光猫的`DHCP`服务;

2.在路由器接口添加新接口`Mao`，协议选择`DHCP客户端`，包括以下接口选择`wan`接口;

3.防火墙选择`wan`;

4.高级设置只保留开机自动运行，其余项目全部取消。


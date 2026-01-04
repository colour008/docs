import { defineConfig } from 'vitepress';
import { set_sidebar } from './utils/auto_sidebar.mjs'; // 改成自己的路径
// https://vitepress.dev/reference/site-config
export default defineConfig({
	// 1. 站点基础配置（可选，建议设置）
	lang: 'zh-CN', // 站点语言标识
	head: [['link', { rel: 'icon', href: '/logo.png' }]],
	title: 'JamHoo的笔记',
	description: '我的个人文档站点',

	// 2. 主题配置（核心：设置中文 locale）
	themeConfig: {
		outlineTitle: '本页目录',
		outline: [2, 6],
		logo: '/logo.png', // 配置logo位置，public目录
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '主页', link: '/' },
			{ text: 'Windows', link: '/windows/' },
			{ text: 'Linux', link: '/linux/' },
			{ text: '网络', link: '/net/' },
			{ text: '其他', link: '/other/' },
			{
				text: '友情链接',
				items: [
					{ text: 'Jay的博客', link: 'https://yjblog.de5.net/' },
					{ text: 'Jay的笔记', link: 'https://yjnote.de5.net/#/' },
				],
			},
		],
		sidebar: {
			'/linux': set_sidebar('/linux'),
			'/windows': set_sidebar('/windows'),
			'/net': set_sidebar('/net'),
			'/other': set_sidebar('/other'),
		},
		// sidebar: false, // 关闭侧边栏
		// aside: 'left', // 设置右侧侧边栏在左侧显示
		// sidebar: [
		// 	{
		// 		text: 'Examples',
		// 		items: [
		// 			{ text: 'Markdown 演示', link: '/markdown-examples' },
		// 			{ text: 'Runtime API 演示', link: '/api-examples' },
		// 		],
		// 	},
		// 	{
		// 		text: 'Examples',
		// 		items: [
		// 			{ text: 'Markdown 演示', link: '/markdown-examples' },
		// 			{ text: 'Runtime API 演示', link: '/api-examples' },
		// 		],
		// 	},
		// ],

		socialLinks: [{ icon: 'github', link: 'https://github.com/colour008' }],

		//底部配置
		footer: {
			copyright: 'Copyright © 2026 JamHoo',
		},
		// 设置搜索框的样式
		search: {
			provider: 'local',
			options: {
				translations: {
					button: {
						buttonText: '搜索文档',
						buttonAriaLabel: '搜索文档',
					},
					modal: {
						noResultsText: '无匹配结果',
						resetButtonTitle: '清除查询条件',
						backButtonTitle: '返回上一级',
						footer: {
							selectText: '选择',
							navigateText: '切换',
							closeText: '关闭',
						},
					},
				},
			},
		},

		// 文章翻页
		docFooter: {
			prev: '上一篇',
			next: '下一篇',
		},

		// 移动端 - 外观
		darkModeSwitchLabel: '切换明暗主题',

		// 移动端 - 返回顶部
		returnToTopLabel: '返回顶部',

		// 移动端 - menu
		sidebarMenuLabel: '菜单',
	},
});

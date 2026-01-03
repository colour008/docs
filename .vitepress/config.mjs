import { defineConfig } from 'vitepress';
import { set_sidebar } from './utils/auto_sidebar.mjs'; // 改成自己的路径
// https://vitepress.dev/reference/site-config
export default defineConfig({
	head: [['link', { rel: 'icon', href: '/logo.png' }]],
	title: 'JamHoo文档站',
	description: '我的个人文档站点',
	themeConfig: {
		outlineTitle: '本页目录',
		outline: [2, 6],
		logo: '/logo.png', // 配置logo位置，public目录
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '主页', link: '/' },
			{
				text: '友情链接',
				items: [
					{ text: 'Jay的博客', link: 'https://yjblog.de5.net/' },
					{ text: 'Jay的笔记', link: 'https://yjnote.de5.net/#/' },
				],
			},
			{ text: '示例', link: '/markdown-examples' },
			{ text: 'Linux', link: '/linux/linux/' },
			{ text: 'Windows', link: '/windows/windows/' },
		],
		sidebar: {
			'/linux/linux': set_sidebar('/linux/linux'),
			'/windows/windows': set_sidebar('/windows/windows'),
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
						noResultsText: '无法找到相关结果',
						resetButtonTitle: '清除查询条件',
						footer: {
							selectText: '选择',
							navigateText: '切换',
						},
					},
				},
			},
		},
	},
});

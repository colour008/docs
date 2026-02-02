import {defineConfig} from 'vitepress';
import {set_sidebar} from './utils/auto_sidebar.mjs';

export default defineConfig({
    appearance: 'dark',
    lang: 'zh-CN',
    head: [['link', {rel: 'icon', href: '/logo.png'}]],
    title: 'colour008的笔记',
    description: '我的个人笔记站点',
    lastUpdated: {
        format: (time) => {
            return new Date(time).toLocaleString('zh-CN', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', hour12: false,
            });
        },
    },
    markdown: {
        theme: {light: 'dracula', dark: 'dracula'},
    },
    ignoreDeadLinks: true,
    themeConfig: {
        outlineTitle: '页面大纲',
        outline: [2, 6],
        logo: '/logo.png',
        nav: [
            {text: '主页', link: '/'},
            {text: 'Windows', link: '/windows/'},
            {text: 'Linux', link: '/linux/'},
            {text: '网络', link: '/net/'},
            {text: '编程', link: '/code/'},
            {text: '其他', link: '/other/'},
            {
                text: '友情链接',
                items: [
                    {text: 'Jay的博客', link: 'https://yjblog.de5.net/'},
                    {text: 'Jay的笔记', link: 'https://yjnote.de5.net/#/'},
                ],
            },
        ],
        sidebar: {
            '/linux': set_sidebar('/linux'),
            '/windows': set_sidebar('/windows'),
            '/net': set_sidebar('/net'),
            '/other': set_sidebar('/other'),
            '/code': set_sidebar('/code'),
        },
        socialLinks: [{icon: 'github', link: 'https://github.com/colour008'}],
        footer: {copyright: 'Copyright © 2026 colour008'},
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {buttonText: '搜索文档', buttonAriaLabel: '搜索文档'},
                    modal: {
                        noResultsText: '无匹配结果', resetButtonTitle: '清除查询条件',
                        backButtonTitle: '返回上一级',
                        footer: {selectText: '选择', navigateText: '切换', closeText: '关闭'},
                    },
                },
            },
        },
        docFooter: {prev: '上一篇', next: '下一篇'},
        darkModeSwitchTitle: '切换深色模式',
        lightModeSwitchTitle: '切换浅色模式',
        darkModeSwitchLabel: '切换明暗主题',
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '笔记目录',
        editLink: {
            pattern: 'https://github.com/colour008/docs/tree/main/:path',
            text: '在 GitHub 上编辑此页面',
        },
        lastUpdatedText: '最后更新于',
    },
});

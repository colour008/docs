// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import './custom.css';
import './customStyles.css';

/** @type {import('vitepress').Theme} */
export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		});
	},
	enhanceApp({ app, router, siteData }) {
		// ...
	},

	async setup() {
		// 动态导入原生 JS 脚本（路径对应 theme 目录下的 backToTop.js）
		await import('./backToTop.js');
	},
};

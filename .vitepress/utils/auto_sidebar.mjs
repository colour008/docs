import path from 'node:path';
import fs from 'node:fs';

// 文件根目录
const DIR_PATH = path.resolve();
// 白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = [
	'index.md',
	'.vitepress',
	'node_modules',
	'.idea',
	'assets',
];

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

// 取差值
const intersections = (arr1, arr2) =>
	Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 【新增】从文件名中提取排序数字（核心排序逻辑）
const extractSortNumber = (fileName) => {
	// 匹配文件名开头的数字（如 "1.xxx.md" → 1，"10.xxx.md" → 10，"xxx2.xxx.md" → 0）
	const match = fileName.match(/^(\d+)/);
	return match ? parseInt(match[1], 10) : 0; // 无数字则默认排最后
};

// 把方法导出直接使用
function getList(params, path1, pathname) {
	// 存放结果
	const res = [];
	// 开始遍历params
	for (let file in params) {
		// 拼接目录
		const dir = path.join(path1, params[file]);
		// 判断是否是文件夹
		const isDir = isDirectory(dir);
		if (isDir) {
			// 如果是文件夹,读取之后作为下一次递归参数
			const files = fs.readdirSync(dir);
			res.push({
				text: params[file],
				collapsible: true,
				items: getList(files, dir, `${pathname}/${params[file]}`),
			});
		} else {
			// 获取名字
			const name = path.basename(params[file]);
			// 排除非 md 文件
			const suffix = path.extname(params[file]);
			if (suffix !== '.md') {
				continue;
			}
			res.push({
				text: name,
				link: `${pathname}/${name}`,
				// 【新增】给每个条目添加排序数字（用于后续排序）
				sortNum: extractSortNumber(name),
			});
		}
	}
	// 对name做一下处理，把后缀删除
	res.forEach((item) => {
		item.text = item.text.replace(/\.md$/, '');
	});

	// 【核心新增】排序逻辑
	res.sort((a, b) => {
		// 1. 文件夹优先排在前面（可选，根据需求调整）
		if (a.items && !b.items) return -1; // a是文件夹，b是文件 → a在前
		if (!a.items && b.items) return 1; // a是文件，b是文件夹 → b在前
		// 2. 都是文件：按提取的数字升序排序
		if (!a.items && !b.items) return a.sortNum - b.sortNum;
		// 3. 都是文件夹：按文件夹名称升序（可选，也可加文件夹排序逻辑）
		return a.text.localeCompare(b.text, 'zh-CN'); // 中文文件夹按拼音排序
	});

	return res;
}

export const set_sidebar = (pathname) => {
	// 获取pathname的路径
	const dirPath = path.join(DIR_PATH, pathname);
	// 读取pathname下的所有文件或者文件夹
	const files = fs.readdirSync(dirPath);
	// 过滤掉
	const items = intersections(files, WHITE_LIST);
	// getList 函数后面会讲到
	return getList(items, dirPath, pathname);
};

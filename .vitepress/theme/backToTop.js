// .vitepress/theme/backToTop.js
(function () {
	// 1. 创建返回顶部按钮元素
	const backToTopBtn = document.createElement('div');
	backToTopBtn.id = 'custom-back-to-top';
	// 替换文本为 🔝 emoji
	backToTopBtn.innerText = '🔝';

	// 以下代码保持不变
	document.body.appendChild(backToTopBtn);
	const scrollThreshold = 200;
	let isShow = false;

	function handleScroll() {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const shouldShow = scrollTop > scrollThreshold;

		if (shouldShow !== isShow) {
			isShow = shouldShow;
			backToTopBtn.style.display = isShow ? 'flex' : 'none';
		}
	}

	function backToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	window.addEventListener('scroll', handleScroll);
	backToTopBtn.addEventListener('click', backToTop);
	handleScroll();

	window.addEventListener('beforeunload', () => {
		window.removeEventListener('scroll', handleScroll);
		backToTopBtn.removeEventListener('click', backToTop);
	});
})();

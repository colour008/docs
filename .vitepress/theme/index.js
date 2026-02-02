import {h, watch, nextTick, onMounted} from 'vue';
import {useRoute} from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    Layout: () => h(DefaultTheme.Layout, null, {}),
    enhanceApp({app}) {
        app.mixin({
            mounted() {
                if (typeof window !== 'undefined' && typeof document !== 'undefined') {
                    // 移除重复按钮
                    const oldBtn = document.getElementById('force-back-to-top');
                    if (oldBtn) oldBtn.remove();

                    // 创建按钮
                    const btn = document.createElement('div');
                    btn.id = 'force-back-to-top';

                    // 替换：使用自定义图片（核心修改处）
                    btn.innerHTML = `
            <img
              src="/返回顶部.svg"
              alt="返回顶部"
            >
          `;

                    // 1. 基础样式（仅 CSS，无 JS）
                    btn.style.cssText = `
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            width: 40px !important;
            height: 40px !important;
            background: transparent !important;
            display: none !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 9999999 !important;
            cursor: pointer !important;
            opacity: 0.9 !important;
            transition: all 0.3s ease !important;
            pointer-events: auto !important;
            transform: translateZ(9999px) !important;
    `;

                    // 2. 媒体查询适配逻辑（JS 代码，写在 cssText 外面）
                    const mediaQuery = window.matchMedia('(max-width: 768px)');
                    const updateStyle = (e) => {
                        if (e.matches) {
                            // 移动端样式（覆盖基础样式）
                            btn.style.bottom = '15px !important';
                            btn.style.right = '15px !important';
                            btn.style.width = '45px !important';
                            btn.style.height = '45px !important';
                        } else {
                            // 桌面端样式（覆盖基础样式）
                            btn.style.bottom = '40px !important';
                            btn.style.right = '40px !important';
                            btn.style.width = '55px !important';
                            btn.style.height = '55px !important';
                        }
                    };
                    // 初始化适配 + 监听窗口大小变化
                    updateStyle(mediaQuery);
                    mediaQuery.addEventListener('change', updateStyle);

                    // 3. 点击返回顶部
                    btn.addEventListener('click', () => {
                        window.scrollTo({top: 0, behavior: 'smooth'});
                    });

                    // 4. 滚动显示逻辑
                    const scrollThreshold = 100;
                    const handleScroll = () => {
                        const scrollTop = window.scrollY || document.documentElement.scrollTop;
                        btn.style.display = scrollTop > scrollThreshold ? 'flex' : 'none';

                        // hover 效果
                        btn.onmouseenter = () => {
                            btn.style.opacity = '1 !important';
                            btn.style.transform = 'translateZ(9999px) translateY(-3px) scale(1.05) !important';
                            btn.style.boxShadow = '0 6px 16px rgba(47, 14, 59, 0.4) !important';
                        };
                        btn.onmouseleave = () => {
                            btn.style.opacity = '0.9 !important';
                            btn.style.transform = 'translateZ(9999px) !important';
                            btn.style.boxShadow = '0 4px 12px rgba(47, 14, 59, 0.3) !important';
                        };
                        btn.onmousedown = () => {
                            btn.style.transform = 'translateZ(9999px) translateY(-1px) scale(0.98) !important';
                        };
                    };

                    // 绑定滚动事件 + 初始化
                    window.addEventListener('scroll', handleScroll);
                    handleScroll();

                    // 插入到 body
                    document.body.appendChild(btn);

                    // 页面卸载时移除监听
                    window.addEventListener('beforeunload', () => {
                        window.removeEventListener('scroll', handleScroll);
                        mediaQuery.removeEventListener('change', updateStyle); // 同时移除媒体查询监听
                    });
                }
            },
            setup() {
                const route = useRoute();

                // 大纲折叠交互逻辑
                const initOutlineInteraction = () => {
                    const container = document.querySelector('.VPDocAsideOutline');
                    if (!container || container.dataset.outlineProcessed) return;
                    container.dataset.outlineProcessed = 'true';

                    container.addEventListener('click', (e) => {
                        const link = e.target.closest('.outline-link');
                        if (!link) return;
                        const li = link.parentElement;
                        if (!li.querySelector('ul')) return;

                        const rect = link.getBoundingClientRect();
                        const isArrowClick = (e.clientX - rect.left) < 30;

                        if (isArrowClick) {
                            e.preventDefault();
                            e.stopPropagation();
                            const currentState = li.getAttribute('data-state');
                            li.setAttribute('data-state', currentState === 'open' ? 'closed' : 'open');
                        } else {
                            li.setAttribute('data-state', 'open');
                            let p = li.parentElement.closest('li');
                            while (p) {
                                p.setAttribute('data-state', 'open');
                                p = p.parentElement.closest('li');
                            }
                        }
                    });
                };

                onMounted(() => {
                    setTimeout(initOutlineInteraction, 500);
                });

                watch(() => route.path, () => {
                    nextTick(() => {
                        setTimeout(initOutlineInteraction, 500);
                        const target = document.querySelector('.VPDocAsideOutline');
                        if (target) {
                            new MutationObserver(initOutlineInteraction).observe(target, {
                                childList: true,
                                subtree: true
                            });
                        }
                    });
                }, {immediate: true});
            }
        });
    }
};
import {h, watch, nextTick, onMounted} from 'vue';
import {useRoute} from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import './custom.css';

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    Layout: () => h(DefaultTheme.Layout, null, {}),
    enhanceApp({app}) {
        app.mixin({
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

                    // 返回顶部按钮逻辑
                    if (!document.getElementById('back-to-top-fancy')) {
                        const btn = document.createElement('div');
                        btn.id = 'back-to-top-fancy';
                        btn.innerHTML = `<img src="/返回顶部.svg" alt="Top">`;
                        document.body.appendChild(btn);
                        window.addEventListener('scroll', () => {
                            if (window.scrollY > 300) btn.classList.add('visible');
                            else btn.classList.remove('visible');
                        });
                        btn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
                    }
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
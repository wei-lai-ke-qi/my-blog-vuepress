// .vuepress/plume.config.js
import { defineThemeConfig } from 'vuepress-theme-plume'

export default defineThemeConfig({
    // 导航栏配置
    navbar: [
        { text: '首页', link: '/', icon: 'mdi:home' },
        { text: '博客', link: '/blog/', icon: 'mdi:blog' },
        { text: '收藏夹', link: '/More/Favorites', icon: 'mdi:star' },
        {
            text: '更多',
            items: [
                {text:'来杯咖啡',link:'/More/sponsor',icon:'mdi:local-cafe-outline'},
                {   // 分组标题，自动不可点击
                    text: '相关文档',
                    items: [           // 这个分组下的可点击项
                        { text: '官方文档', link: 'https://v2.vuepress.vuejs.org/', icon: '/image/Vuepress.svg' },
                        { text: 'PLume 主题', link: 'https://plume.pengzhanbo.cn/',icon:'/image/plume.png' },
                    ]
                },
            ]
        },

    ],
    // 博客文章集合配置
    collections: [
        {
            type: 'post',
            dir: 'blog',
            title: '博客',
            meta: {
                tags: true,
                createTime: true,
                readingTime: true,
                wordCount: true,
            },
            autoFrontmatter: {
                title: true,
                createTime: true,
                permalink: true,
                transform: (data, context, locale) => {
                    data.foo ??= 'foo'
                    return data
                }
            },
        },
    ],



    // 侧边栏配置 - 你的收藏夹
    sidebar: {
        '/web_page/': [
            {
                text: '我的收藏',
                collapsed: false,  // 展开状态
                items: [
                    { text: '官方文档', link: '/web_page/#官方文档' },
                    { text: '1', link: 'https://github.com' },
                    { text: '2', link: 'https://www.google.com' },
                    { text: '3', link: 'https://www.bilibili.com' },
                ]
            },
            {
                text: '开发工具',
                collapsed: true,  // 折叠状态
                items: [
                    { text: 'Vue.js 文档', link: 'https://cn.vuejs.org/' },
                    { text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/' },
                    { text: 'npm', link: 'https://www.npmjs.com/' },
                    { text: 'MDN Web Docs', link: 'https://developer.mozilla.org/zh-CN/' },
                ]
            }
        ]
    },


})
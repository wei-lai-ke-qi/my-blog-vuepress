// .vuepress/plume.config.js
import { defineThemeConfig } from 'vuepress-theme-plume'

export default defineThemeConfig({
    // 导航栏配置
    navbar: [
        { text: '首页', link: '/', icon: 'mdi:home' },
        { text: '博客', link: '/blog/', icon: 'mdi:blog' },
        { text: '收藏夹', link: '/More/Favorites.md', icon: 'mdi:star' },
        {
            text: '更多',
            items: [
                {text:'来杯咖啡',link:'/More/sponsor.md',icon:'mdi:local-cafe-outline'},
                {text:'关于',link:'/More/About.md',icon:'mdi:information'},
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






})
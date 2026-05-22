// .vuepress/plume.config.js
import { defineThemeConfig } from 'vuepress-theme-plume'

export default defineThemeConfig({
    // 导航栏配置
    navbar: [
        { text: '首页', link: '/', icon: 'mdi:home' },
        { text: '博客', link: '/blog/', icon: 'mdi:blog'},
        { text: '收藏夹', link: '/favorites/', icon: 'mdi:star' },
        { text: '笔记', link: '/notes/', icon: 'mdi:notebook' },
        {
            text: '更多',
            items: [
                {text:'来杯咖啡',link:'/More/sponsor',icon:'mdi:local-cafe-outline'},
                {text:'关于',link:'/More/About',icon:'mdi:information'},
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
    // 个人资料卡牌配置
    profile: {
        name: '暮云衔山',           // 显示名字
        description: '用代码解构世界，以文字安放自己', // 显示描述
        avatar: '/image/聪音_头像.jpg',      // 头像路径（放在 public 目录下）

    },
    // 社交链接
    social: [
        { icon: 'github', link: 'https://github.com/wei-lai-ke-qi/my-blog-vuepress' },
        { icon: 'mdi:email', link: 'mailto:work@log-i.cn' },
        // 其他社交平台...
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
        {
            type: 'doc',          // 关键：设置为 'doc'
            dir: 'favorites',     // 指向你的收藏夹目录
            title: '我的收藏',     // 集合的显示名称
            sidebar: 'auto',   // 可选：让主题根据目录结构自动生成侧边栏
            // sidebar: [
            //     { text: '常用工具', link: '/favorites/tools' },
            //     { text: '学习网站', link: '/favorites/websites' },
            // ]
        },

        {
            type: 'doc',
            dir: 'notes',   // 需要在 docs/ 下创建这个文件夹
            title: '笔记',
            sidebar: 'auto',            // 自动生成侧边栏
            meta: {
                createTime: true,       // 显示创建时间
                wordCount: true,        // 显示字数
            }
        },
    ],






})
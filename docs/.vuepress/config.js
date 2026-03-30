import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    // 添加这一行！根据你的仓库名设置 base
    // 如果你的仓库名是 username.github.io，则 base: '/'
    // 如果你的仓库名是 blog，则 base: '/blog/'
    base: '/',  // 👈 请根据你的实际仓库名修改
    //部署至Cloudflare Pages 不需要管

    // VuePress 基础配置
    lang: 'zh-CN',
    title: '暮云衔山的博客',
    description: '分享技术与生活',

    bundler: viteBundler(),
    port: 9999,
    theme: plumeTheme({
        // 主题配置项
        navbar: [
            { text: '首页', link: '/' },
            { text: '博客', link: '/blog/' },
            { text: '友情链接', link: 'https://www.baidu.com/Index.htm'},
        ],
        // 博客文章集合配置
        collections: [
            {
                type: 'post',      // 文章类型
                dir: 'blog',       // 文章存放目录
                title: '博客',      // 页面标题
                meta: {
                    tags: true, // 是否显示标签
                    /**
                     * 是否显示创建时间，或设置时间格式
                     * - 'short': 显示为 `2022-01-01`，默认
                     * - 'long': 显示为 `2022-01-01 00:00:00`
                     */
                    createTime: true, // boolean | 'short' | 'long'
                    readingTime: true, // 是否显示阅读时间估算
                    wordCount: true, // 是否显示字数统计
                },
                autoFrontmatter: {
                    title: true, // 自动生成标题
                    createTime: true, // 自动生成创建时间
                    permalink: true, // 自动生成永久链接
                    transform: (data, context, locale) => { // 自定义转换
                        data.foo ??= 'foo'
                        return data
                    }
                },

            },

        ],


    }),

})
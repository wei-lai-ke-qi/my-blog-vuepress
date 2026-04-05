import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'
import { defineUserConfig } from 'vuepress'

import { getDirname, path } from 'vuepress/utils'
import { fileURLToPath } from 'url'

const __dirname = getDirname(import.meta.url)

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
    theme: plumeTheme(),
    alias: {
        // 将主题默认的页脚组件指向你刚刚创建的新组件
        '@theme/VPFooter.vue': path.resolve(
            __dirname,  // 指向 .vuepress 目录
            './components/MyFooter.vue', // 你的自定义组件路径
        ),
    },

})
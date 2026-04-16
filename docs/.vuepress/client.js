// docs/.vuepress/client.js
import { onUnmounted } from 'vue'
import { defineClientConfig } from 'vuepress/client'

// 批量导入组件
import * as components from './components/Data/index.js'

// 导入自定义背景样式
// import './styles/index.js.css'

export default defineClientConfig({
    enhance({ app }) {
        // 批量注册所有组件
        Object.entries(components).forEach(([name, component]) => {
            app.component(name, component)
        })
    },

    setup() {
        // 友好的控制台输出
        console.log('%c✨ 欢迎访问暮云衔山的博客 ✨', 'color: #3eaf7c; font-size: 16px; font-weight: bold')
        console.log('%c🔒 检测到控制台开启，请手下留情～', 'color: #ff9800; font-size: 12px')
        console.log('%c🙏 我只是个小博客，求放过', 'color: #666; font-size: 12px')
        console.log('%c📧 有缘相遇，何不交个朋友：3127169374@qq.com', 'color: #666; font-size: 12px')

        // 检测是否为本地开发环境
        const isLocalhost = window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname.startsWith('192.168.') ||
            window.location.hostname.startsWith('10.') ||
            window.location.hostname === '::1'

        if (isLocalhost) {
            console.log('%c🛠️ 本地调试模式，跳过安全检测', 'color: #888; font-size: 12px')
            return
        }

        let devToolsOpen = false

        const checkDevTools = () => {
            const widthDiff = window.outerWidth - window.innerWidth
            const heightDiff = window.outerHeight - window.innerHeight
            const isOpen = widthDiff > 160 || heightDiff > 160

            if (isOpen && !devToolsOpen) {
                devToolsOpen = true
                console.warn('%c⚠️ 检测到开发者工具已打开', 'color: #ff5722; font-size: 14px')
                console.clear()
            } else if (!isOpen && devToolsOpen) {
                devToolsOpen = false
            }
        }

        const handleKeydown = (e) => {
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault()
                console.log('%c🔧 F12被按下', 'color: #ff9800; font-size: 12px')
            }
        }

        const interval = setInterval(checkDevTools, 2000)
        document.addEventListener('keydown', handleKeydown)

        onUnmounted(() => {
            clearInterval(interval)
            document.removeEventListener('keydown', handleKeydown)
        })
    }
})
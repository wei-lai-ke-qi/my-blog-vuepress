---
pageLayout: 'home'
config:
  # 区域1：Banner大屏区
  - type: banner
    full: true                                    # 占满全屏
    banner: https://api.pengzhanbo.cn/wallpaper/bing  # 背景图
    bannerMask:
      light: 0.1                                  # 浅色模式遮罩透明度
      dark: 0.3                                   # 深色模式遮罩透明度
    hero:
      name: 暮云衔山                               #笔名
      tagline: 前端开发 / 微信小程序
      text: 热爱编程，乐于分享。记录技术成长与生活思考。  #个人简介或博客介绍
      actions:
        - text: 📝 文章列表
          link: /blog/
          theme: brand
        - text: GitHub
          link: https://github.com/yourname
          theme: alt
        - text: #预留
          link: #跳转链接
          theme: #控制按钮的视觉样式/颜色主题，让不同功能的按钮有明确的视觉层级       brand	主题色     alt	次要色

  # 区域2：特性展示区
  - type: features
    title: 博客特色
    description: 这里有什么？
    features:
      - title: 响应式设计
        icon: 📱
        details: 完美适配PC、平板、手机
      - title: 深色模式
        icon: 🌙
        details: 自动适配系统主题，护眼舒适
      - title: 全文搜索
        icon: 🔍
        details: 快速找到需要的内容
      - title: 评论互动
        icon: 💬
        details: 支持多种评论系统

  # 区域3：图文介绍区（图片在右）
  - type: text-image
    title: 关于我
    description: 了解更多
    image: /avatar.jpg
    list:
      - title: 工作经历
        description: 学生=￣ω￣=
      - title: 技术栈
        description: Vue/React/Node.js
      - title: 兴趣爱好
        description: 开源、写作、摄影

  # 区域4：自定义区（需要编写组件）
  - type: custom
    name: MyStats
    full: true
---
<template>
  <div class="resume-wrapper">
    <!-- 折叠控制按钮 -->
    <div class="collapse-control" @click="isExpanded = !isExpanded">
      <span class="collapse-icon">{{ isExpanded ? '▼' : '▶' }}</span>
      <span class="collapse-text">{{ isExpanded ? '不忍直视 · 点击收起' : '这是一个很烂的简历 · 点击展开' }}</span>
    </div>

    <!-- 简历内容区域（可折叠） -->
    <transition name="fade-slide">
      <div v-show="isExpanded" class="resume-container">
        <div class="resume-card">

          <!-- 左侧边栏 -->
          <aside class="sidebar">
            <div class="profile-header">
              <div class="avatar-placeholder">
                <span>📸</span>
              </div>
              <h1 class="name">暮云衔山</h1>
              <p class="title">前端开发（求职中·菜鸟版）</p>
            </div>

            <div class="section">
              <h2 class="section-title">联系方式</h2>
              <ul class="contact-list">
                <li>📞 136-5576-8175</li>
                <li>✉️ 3127169374@qq.com</li>
                <li>🔗 <a href="https://github.com/wei-lai-ke-qi" target="_blank" class="link">github.com/wei-lai-ke-qi</a></li>
                <li>📍 浙江省 · 绍兴市</li>
              </ul>
            </div>

            <div class="section">
              <h2 class="section-title">技术栈（自称）</h2>
              <div class="skill-tags">
                <span class="skill-tag">Vue 3</span>
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">Tailwind CSS</span>
                <span class="skill-tag">Vite</span>
                <span class="skill-tag">Pinia</span>
                <span class="skill-tag">uni-app</span>
                <span class="skill-tag">Git</span>
                <span class="skill-tag">HTML/CSS</span>
              </div>
              <p style="font-size: 0.75rem; color: #64748b; margin-top: 8px; font-style: italic;">*以上均为能跑通 demo 的水平</p>
            </div>

            <div class="section">
              <h2 class="section-title">个人特质</h2>
              <ul class="text-list">
                <li>📚 擅长 chanGPT 编程</li>
                <li>🤝 熟练使用 Ctrl+C/V</li>
                <li>🔍 专业 Bug 制造者</li>
                <li>☕ 代码全靠咖啡驱动</li>
              </ul>
            </div>

            <!-- 实习期望移到左边 -->
            <div class="section">
              <h2 class="section-title">💼 实习期望</h2>
              <ul class="text-list">
                <li>🎯 求一份前端开发实习，能学到东西的那种</li>
                <li>👥 希望团队有大佬带飞<span style="font-size: 0.7rem; color: #64748b;">（不想再一个人瞎折腾了）</span></li>
                <li>🔧 保证不把生产环境搞崩<span style="font-size: 0.7rem; color: #64748b;">（尽量）</span></li>
                <li>💪 能加班，能背锅，能改 bug 改到天亮</li>
              </ul>
            </div>
          </aside>

          <!-- 右侧主要内容 -->
          <main class="content">
            <div class="section">
              <h2 class="content-title">📋 关于我</h2>
              <p class="summary">
                <s>拥有3年Web前端开发经验</s><br>
                拥有3年<span class="highlight">学习</span>Web前端开发经验，见证了前端圈从 jQuery 到 Vue 3 的版本号膨胀。<br>
                对 Vue 生态有深入实践<span style="font-size: 0.8rem; color: #94a3b8;">（指会用 Vue 写 Todo List）</span>，注重代码可维护性<span style="font-size: 0.8rem; color: #94a3b8;">（指自己三个月后还能看懂）</span>。<br>
                具备良好的团队协作能力<span style="font-size: 0.8rem; color: #94a3b8;">（指会写注释）</span>和独立解决问题的能力<span style="font-size: 0.8rem; color: #94a3b8;">（指会问 ChatGPT）</span>。<br>
                喜欢尝试新技术，喜欢分享知识。<br>
                <s>因为没什么技术只能写一个网站来优化自己的简历</s>
              </p>
            </div>

            <div class="section">
              <h2 class="content-title">🚀 项目经历</h2>

              <div class="entry" v-for="project in projects" :key="project.id">
                <!-- 项目标题栏 - 点击折叠 -->
                <div class="entry-header" @click="project.isExpanded = !project.isExpanded">
                  <div class="entry-header-left">
                    <span class="entry-expand-icon">{{ project.isExpanded ? '▼' : '▶' }}</span>
                    <h3>{{ project.name }}</h3>
                  </div>
                  <span class="date">{{ project.date }}</span>
                </div>

                <!-- 项目详情 - 可折叠 -->
                <transition name="project-fade">
                  <div v-show="project.isExpanded">
                    <p class="company">{{ project.stack }}</p>
                    <ul class="desc-list">
                      <li v-for="(desc, idx) in project.descriptions" :key="idx">{{ desc }}</li>
                    </ul>
                  </div>
                </transition>
              </div>
            </div>

            <div class="section">
              <h2 class="content-title">🎓 教育背景</h2>

              <div class="entry" v-for="edu in education" :key="edu.id">
                <div class="entry-header" style="cursor: default;">
                  <h3>{{ edu.major }}</h3>
                  <span class="date">{{ edu.period }}</span>
                </div>
                <p class="company">{{ edu.school }}</p>
                <p v-if="edu.note" class="note">{{ edu.note }}</p>
              </div>
            </div>

            <div class="section">
              <h2 class="content-title">🏆 竞赛与证书</h2>
              <ul class="desc-list">
                <li><strong>数学竞赛</strong> — 证明了我不是只会写代码<span style="font-size: 0.8rem; color: #94a3b8;">（虽然也没拿大奖）</span></li>
                <li><strong>三创赛</strong> — 负责前端部分<span style="font-size: 0.8rem; color: #94a3b8;">（以及给队友买咖啡）</span></li>
                <li>ppt大赛<span style="font-size: 0.8rem; color: #94a3b8;">（因为没有时间，所以没有做）</span></li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 折叠状态控制（默认展开）
const isExpanded = ref(false)

// 项目经历数据（添加 isExpanded 属性）
const projects = reactive([
  {
    id: 1,
    name: '个人博客网站',
    date: '2026.03 - 2026.04（肝了两周，发际线后移1cm）',
    stack: 'Vue 3 · Vite · 手写 CSS（纯手工打造，没抄作业）',
    descriptions: [
      '花了两周用 vuePrass 强行搓出来的博客，代码里藏了3处"下次一定重构"的TODO，还有1处忘了为什么写的注释',
      'Flex/Grid 布局都用上了，移动端属于"勉强能看，不建议真看"的水平，PC端倒是人模人样',
      '打印效果意外地能打——可能是因为我压根没写打印样式，浏览器自己发挥得挺好'
    ],
    isExpanded: true  // 默认展开
  },
  {
    id: 2,
    name: '校园助手 · 微信小程序',
    date: "2025.03 - 2025.06（从裹棉袄写到了吹空调）",
    stack: 'uni-app · Vue 2 · uView UI（能用的轮子全搬上了）',
    descriptions: [
      '负责课表查询和校园资讯模块，写完之后才知道原来调接口要处理 loading 和报错',
      '封装了几个卡片组件，队友说复用率高，我觉得主要是因为长得像、需求也像',
      '和队友一起肝完了项目，最后因为学校服务器懒得续费+甲方学姐毕业了，没上线——算是功德+1'
    ],
    isExpanded: true
  },
  {
    id: 3,
    name: '后台管理系统 Demo',
    date: '2025.09 - 2025.11（写了三个月，跑起来只要三秒）',
    stack: 'Vue 3 · Pinia · Element Plus（生怕别人不知道我会用组件库）',
    descriptions: [
      '独立开发的轻量级后台管理原型，用户管理和数据看板页面——加起来一共5个页面，但布局很正经',
      '用 Pinia 管全局状态后终于理解了：原来状态管理是为了让自己一个月后还能看懂代码',
      '路由权限控制写了一半，剩下的那半条注释写着『等真上线再补』——不出所料，一直没补'
    ],
    isExpanded: true
  }
])

// 教育经历数据
const education = reactive([
  {
    id: 1,
    school: '绍兴职业技术学院',
    major: '计算机应用技术',
    period: '2024.09 - 2027.06',
    note: '主修课程：Web 前端开发、微信小程序开发、uni-app、数据库原理'
  }
])
</script>

<style scoped>
/* 折叠控制按钮样式 */
.collapse-control {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.collapse-control:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.collapse-icon {
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

.collapse-text {
  letter-spacing: 0.5px;
}

/* 整体折叠动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 项目折叠动画 */
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.25s ease;
}

.project-fade-enter-from,
.project-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* 简历容器样式 */
.resume-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.resume-container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f4f6f9;
  display: flex;
  justify-content: center;
}

.resume-card {
  display: grid;
  grid-template-columns: 300px 1fr;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 35px -8px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 100%;
}

/* 左侧栏样式 */
.sidebar {
  background-color: #1e293b;
  color: #f1f5f9;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.profile-header {
  text-align: left;
}

.avatar-placeholder {
  width: 90px;
  height: 90px;
  background-color: #334155;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  border: 3px solid #475569;
  font-size: 2.5rem;
}

.name {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: white;
  letter-spacing: -0.01em;
}

.title {
  font-size: 1rem;
  color: #94a3b8;
  margin: 0;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #94a3b8;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid #334155;
  padding-bottom: 0.6rem;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  line-height: 2.2;
  color: #cbd5e1;
}

.contact-list .link {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.contact-list .link:hover {
  color: white;
  text-decoration: underline;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background-color: #334155;
  color: #e2e8f0;
  padding: 0.25rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.text-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 2;
}

/* 右侧内容样式 */
.content {
  padding: 2.5rem 2.2rem;
  background: white;
}

.content-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1.2rem 0;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.summary {
  color: #334155;
  line-height: 1.8;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.summary .highlight {
  color: #2563eb;
  font-weight: 500;
}

.entry {
  margin-bottom: 1.8rem;
}

.entry:last-child {
  margin-bottom: 0;
}

/* 项目标题栏 - 可点击 */
.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  cursor: pointer;
  padding: 8px 0;
  margin: -8px 0;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.entry-header:hover {
  background-color: #f8fafc;
}

.entry-header-left {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: 1;
}

.entry-expand-icon {
  font-size: 0.75rem;
  color: #64748b;
  transition: transform 0.2s ease;
  display: inline-block;
  width: 16px;
}

.entry-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
}

.date {
  font-size: 0.8rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.2rem 0.7rem;
  border-radius: 20px;
  font-weight: 500;
  cursor: default;
  pointer-events: none;
}

.company {
  font-size: 0.9rem;
  color: #475569;
  margin: 0.5rem 0 0.6rem 1.5rem;
  font-weight: 500;
}

.note {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 0.4rem;
  font-style: italic;
}

.desc-list {
  padding-left: calc(1.2rem + 24px);
  margin: 0.5rem 0 0 0;
  color: #334155;
  font-size: 0.9rem;
  line-height: 1.6;
}

.desc-list li {
  margin-bottom: 0.4rem;
}

.desc-list strong {
  color: #1e293b;
}

/* 打印时隐藏折叠按钮并展开内容 */
@media print {
  .collapse-control {
    display: none;
  }

  .resume-wrapper {
    margin: 0;
  }

  .resume-container {
    background: white;
    padding: 0;
  }

  .resume-card {
    box-shadow: none;
    border-radius: 0;
  }

  .sidebar {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* 打印时强制展开所有项目 */
  .project-fade-enter-from,
  .project-fade-leave-to {
    display: block !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* 移动端适配 */
@media (max-width: 700px) {
  .resume-card {
    grid-template-columns: 1fr;
    border-radius: 12px;
  }

  .sidebar {
    text-align: center;
  }

  .avatar-placeholder {
    margin-left: auto;
    margin-right: auto;
  }

  .profile-header {
    text-align: center;
  }

  .desc-list {
    padding-left: 1.2rem;
  }

  .company {
    margin-left: 0;
  }
}
</style>
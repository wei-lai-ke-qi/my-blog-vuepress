---
title: 我的收藏
sidebar: true
editLink: false
readingTime: false
---

# ⭐ 我的收藏

这里收录了我精心整理的各类资源，包括开发工具、学习网站、设计灵感等。

## 📂 分类导航

请通过左侧**侧边栏**浏览具体内容：

<div class="nav-cards">

<div class="nav-card">
  <div class="icon">🛠️</div>
  <div class="content">
    <h3>开发工具</h3>
    <p>编辑器、调试工具、版本管理等</p>
  </div>
</div>

<div class="nav-card">
  <div class="icon">📚</div>
  <div class="content">
    <h3>学习资源</h3>
    <p>教程、文档、在线课程</p>
  </div>
</div>

<div class="nav-card">
  <div class="icon">🎨</div>
  <div class="content">
    <h3>设计灵感</h3>
    <p>配色方案、设计社区、素材资源</p>
  </div>
</div>

<div class="nav-card">
  <div class="icon">🤖</div>
  <div class="content">
    <h3>AI 工具</h3>
    <p>人工智能相关工具与应用</p>
  </div>
</div>

</div>

## 💡 使用提示

- 点击左侧**侧边栏**可以展开各个分类
- 收藏内容会持续更新，欢迎收藏本页

<style scoped>
.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.nav-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
  cursor: default;
}

.nav-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.nav-card .icon {
  font-size: 2rem;
}

.nav-card .content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
}

.nav-card .content p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .nav-cards {
    grid-template-columns: 1fr;
  }
}
</style>
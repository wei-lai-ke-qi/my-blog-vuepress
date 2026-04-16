<template>
  <div class="modern-blog-home">
    <div class="container">
      <!-- ========== 左侧边栏区域 ========== -->
      <!-- 放置个人信息和静态内容卡片 -->
      <aside class="sidebar">
        <AuthorCard />  <!-- 作者信息卡片：头像、昵称、联系方式 -->
        <QuoteCard />   <!-- 每日一言卡片：随机格言、自动刷新 -->

      </aside>

      <!-- ========== 右侧主内容区域 ========== -->
      <!-- 放置动态内容和功能卡片 -->
      <main class="main-content">
        <TimeCard />    <!-- 时间卡片：实时时钟、日期、农历、地理位置 -->
        <SkillsCard />
        <FriendLinks />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModernBlogHome',  // 组件名称，用于调试和递归组件

}
</script>

<style scoped>
/* ========== 页面容器 ========== */
.modern-blog-home {
  min-height: 100vh;           /* 最小高度为视口高度 */
  padding: 20px;               /* 内边距，避免内容贴边 */
  position: relative;          /* 相对定位，为子元素定位提供参考 */
  //background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);  /* 深色渐变背景 */
}

/* ========== 主容器：双栏布局 ========== */
.container {
  max-width: 1400px;           /* 最大宽度，大屏幕居中显示 */
  margin: 0 auto;              /* 水平居中 */
  display: grid;               /* 使用 Grid 布局 */
  grid-template-columns: 320px 1fr;  /* 左侧固定 320px，右侧自适应 */
  grid-template-rows: auto auto;
  gap: 24px;                  /* 两栏之间的间距 */
  position: relative;          /* 相对定位 */
  z-index: 1;                 /* 层级，确保内容在背景之上 */
}

/* ========== 左侧边栏样式 ========== */
.sidebar {
  position: sticky;           /* 粘性定位，滚动时保持可见 */
  top: 20px;                  /* 距离顶部 20px 时固定 */
  height: fit-content;        /* 高度自适应内容 */
  display: flex;              /* Flex 布局 */
  flex-direction: column;     /* 垂直排列 */
  gap: 20px;                  /* 卡片之间的间距 */
}

/* ========== 右侧主内容区样式 ========== */
.main-content {
  min-width: 0;              /* 防止内容溢出，允许缩小 */
  display: flex;             /* Flex 布局 */
  flex-direction: column;    /* 垂直排列 */
  gap: 20px;                 /* 卡片之间的间距 */
}

/* ========== 响应式设计：移动端 ========== */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;  /* 小于 768px 时改为单栏布局 */
  }

  .sidebar {
    position: static;        /* 移动端取消粘性定位，正常滚动 */
  }
}
</style>
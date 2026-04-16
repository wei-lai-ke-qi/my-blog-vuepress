<template>
  <div class="card author-card">
    <div class="avatar">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=暮云衔山" alt="avatar">
    </div>
    <h2 class="author-name">暮云衔山</h2>
    <div class="contact-info">
      <a href="https://github.com/wei-lai-ke-qi/my-blog-vuepress" target="_blank" class="contact-item">
        <span class="contact-icon">📦</span>
        <span class="contact-text">GitHub</span>
      </a>
      <a href="mailto:3127169374@qq.com" class="contact-item">
        <span class="contact-icon">✉️</span>
        <span class="contact-text">QQ邮箱</span>
      </a>
      <a href="/blog/" class="contact-item">
        <span class="contact-icon">📝</span>
        <span class="contact-text">博客</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorCard'
}
</script>

<style scoped>
.card {
  background: rgba(10, 10, 20, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(100, 150, 255, 0.3);
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(100, 150, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 0 25px rgba(100, 150, 255, 0.15);
}

.author-card {
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(100, 150, 255, 0.5);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(100, 150, 255, 0.5);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  background: rgba(100, 150, 255, 0.1);
  border-radius: 12px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  border: 1px solid rgba(100, 150, 255, 0.2);
}

.contact-item:hover {
  background: rgba(100, 150, 255, 0.2);
  transform: translateX(5px);
  border-color: rgba(100, 150, 255, 0.5);
  box-shadow: 0 0 15px rgba(100, 150, 255, 0.2);
}

.contact-icon {
  font-size: 1.2rem;
}

.contact-text {
  font-size: 0.85rem;
  word-break: break-all;
}
</style>
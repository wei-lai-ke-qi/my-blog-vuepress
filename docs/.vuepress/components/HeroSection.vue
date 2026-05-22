<template>
  <section class="hero-section">
    <div class="hero-container">
      <!-- 装饰性光晕效果 -->
      <div class="hero-glow"></div>

      <!-- 头像/图标区域（可选） -->
      <div class="hero-icon">
        <span class="icon-code">{</span>
        <span class="icon-slash">/</span>
        <span class="icon-code">}</span>
      </div>

      <!-- 主标题 -->
      <h1 class="hero-title">
        <span class="title-line">暮云衔山</span>
        <span class="title-cursor"></span>
      </h1>

      <!-- 副标题 / Slogan -->
      <p class="hero-subtitle">「 用代码解构世界，以文字安放自己 」</p>

      <!-- 简短介绍 -->
      <p class="hero-description">
        全栈开发者 · 热爱 Vue、Node.js 与优雅的代码
      </p>

      <!-- 行动按钮 -->
      <div class="hero-buttons">
        <a href="/blog/" class="hero-btn primary">
          <span class="btn-icon">📝</span>
          <span class="btn-text">浏览文章</span>
        </a>
        <a href="https://github.com/wei-lai-ke-qi" target="_blank" class="hero-btn secondary">
          <span class="btn-icon">🐙</span>
          <span class="btn-text">GitHub</span>
        </a>
        <a href="mailto:3127169374@qq.com" class="hero-btn tertiary">
          <span class="btn-icon">✉️</span>
          <span class="btn-text">联系我</span>
        </a>
      </div>

      <!-- 滚动提示（可选） -->
      <div class="hero-scroll-tip">
        <span class="scroll-text">探索更多</span>
        <span class="scroll-arrow">↓</span>
      </div>
    </div>
  </section>
</template>

<script setup>
defineOptions({
  name: 'HeroSection'
})
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
}

.hero-container {
  text-align: center;
  padding: 40px 24px 60px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* ========== 装饰光晕 ========== */
.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(100, 150, 255, 0.15), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.5;
    width: 400px;
    height: 400px;
  }
  50% {
    opacity: 0.8;
    width: 440px;
    height: 440px;
  }
}

/* ========== 图标装饰 ========== */
.hero-icon {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 24px;
  font-family: monospace;
  letter-spacing: 8px;
}

.icon-code {
  color: rgba(100, 150, 255, 0.7);
  text-shadow: 0 0 10px rgba(100, 150, 255, 0.3);
}

.icon-slash {
  color: rgba(255, 255, 255, 0.4);
}

/* ========== 主标题 ========== */
.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.title-line {
  background: linear-gradient(135deg, #ffffff 0%, #a8c0ff 50%, #6496ff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: titleShine 3s ease-in-out infinite;
}

@keyframes titleShine {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}

.title-cursor {
  display: inline-block;
  width: 3px;
  height: 0.9em;
  background: linear-gradient(180deg, #6496ff, #a8c0ff);
  margin-left: 6px;
  animation: blink 1s step-end infinite;
  vertical-align: middle;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ========== 副标题 ========== */
.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
  font-style: italic;
  letter-spacing: 1px;
}

/* ========== 描述文字 ========== */
.hero-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* ========== 按钮组 ========== */
.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 40px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  cursor: pointer;
  backdrop-filter: blur(4px);
}

.hero-btn .btn-icon {
  font-size: 1.1rem;
}

.hero-btn.primary {
  background: rgba(100, 150, 255, 0.2);
  border: 1px solid rgba(100, 150, 255, 0.5);
  color: #fff;
  box-shadow: 0 0 10px rgba(100, 150, 255, 0.1);
}

.hero-btn.primary:hover {
  background: rgba(100, 150, 255, 0.35);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(100, 150, 255, 0.2);
  border-color: rgba(100, 150, 255, 0.7);
}

.hero-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.85);
}

.hero-btn.secondary:hover {
  background: rgba(100, 150, 255, 0.15);
  border-color: rgba(100, 150, 255, 0.4);
  transform: translateY(-3px);
}

.hero-btn.tertiary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.7);
}

.hero-btn.tertiary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

/* ========== 滚动提示 ========== */
.hero-scroll-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0.5;
  transition: opacity 0.3s;
  cursor: pointer;
}

.hero-scroll-tip:hover {
  opacity: 0.8;
}

.scroll-text {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
}

.scroll-arrow {
  font-size: 1rem;
  color: rgba(100, 150, 255, 0.8);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-description {
    font-size: 0.85rem;
    padding: 0 12px;
  }

  .hero-buttons {
    gap: 12px;
    margin-bottom: 50px;
  }

  .hero-btn {
    padding: 8px 20px;
    font-size: 0.85rem;
  }

  .hero-glow {
    width: 280px;
    height: 280px;
  }

  .hero-icon {
    font-size: 1.5rem;
    letter-spacing: 4px;
    margin-bottom: 16px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-btn {
    padding: 8px 16px;
    font-size: 0.8rem;
  }

  .hero-btn .btn-icon {
    font-size: 0.9rem;
  }
}
</style>
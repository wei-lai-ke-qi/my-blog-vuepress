<script setup>
</script>
<template>
  <div class="vp-footer">
    <div class="footer-content">
      <div class="copyright">
        <span>© 2026 暮云衔山</span>  <span class="separator">•</span>  <span>技术让生活更美好</span>
      </div>

      <div class="links">
<!--        没有贡献者-->
<!--        <a href="" target="_blank" rel="noopener noreferrer">贡献者</a>-->


<!--        <a href="/More/About.md" class="about-link">关于本站</a>-->
        <RouterLink to="/More/About.html" class="about-link">关于本站</RouterLink>


      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-footer {
  margin-top: 60px;
  padding: 24px 20px;
  //background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.copyright {
  margin-bottom: 12px;
  font-size: 14px;
  color: #4a5568;
}

.separator {
  margin: 0 8px;
  color: #cbd5e0;
}

.links {
  font-size: 13px;
}

.links a {
  color: #718096;
  text-decoration: none;
  transition: all 0.3s ease;
  margin: 0 8px;
}

.links a:hover {
  color: #42b883;
  text-decoration: underline;
}

/* 暗色主题适配 */
[data-theme="dark"] .vp-footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-top-color: rgba(255, 255, 255, 0.05);
}

[data-theme="dark"] .copyright {
  color: #a0aec0;
}

[data-theme="dark"] .links a {
  color: #718096;
}

[data-theme="dark"] .links a:hover {
  color: #42b883;
}
</style>
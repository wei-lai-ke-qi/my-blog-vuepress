<template>
  <div
      class="card skills-card"
      @mouseenter="showGrid = true"
      @mouseleave="showGrid = false"
  >
    <div class="card-title">🛠️ 技术栈</div>

    <!-- 固定高度容器 -->
    <div class="skills-container">
      <!-- 正常状态：滚动标签 -->
      <div v-show="!showGrid" class="skills-marquee-container">
        <div class="skills-marquee">
          <div class="marquee-track">
            <span
                v-for="skill in skills"
                :key="skill.name"
                class="skill-tag-marquee"
                :style="{ borderColor: skill.color || 'rgba(100, 150, 255, 0.4)' }"
            >
              {{ skill.name }}
            </span>
            <span
                v-for="skill in skills"
                :key="skill.name + '-clone'"
                class="skill-tag-marquee"
                :style="{ borderColor: skill.color || 'rgba(100, 150, 255, 0.4)' }"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>

        <div class="skills-marquee reverse">
          <div class="marquee-track reverse">
            <span
                v-for="skill in skills.slice().reverse()"
                :key="skill.name + '-rev'"
                class="skill-tag-marquee"
                :style="{ borderColor: skill.color || 'rgba(100, 150, 255, 0.4)' }"
            >
              {{ skill.name }}
            </span>
            <span
                v-for="skill in skills.slice().reverse()"
                :key="skill.name + '-rev-clone'"
                class="skill-tag-marquee"
                :style="{ borderColor: skill.color || 'rgba(100, 150, 255, 0.4)' }"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- 悬停状态：完整技能网格 -->
      <div v-show="showGrid" class="skills-grid">
        <div class="skills-grid-row">
          <span
              v-for="skill in allSkills"
              :key="skill.name"
              class="skill-tag-grid"
              :style="{ borderColor: skill.color || 'rgba(100, 150, 255, 0.4)' }"
          >
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsCard',
  data() {
    return {
      showGrid: false,
      // 滚动显示的技能列表
      skills: [
        { name: 'Vue.js', color: '#42B883' },
        { name: 'VuePress', color: '#42B883' },
        { name: 'JavaScript', color: '#F7DF1E' },
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'HTML5', color: '#E34F26' },
        { name: 'CSS3', color: '#1572B6' },
        { name: 'Git', color: '#F05032' },
        { name: 'Vite', color: '#646CFF' },
        { name: 'Webpack', color: '#8DD6F9' },
        { name: 'Node.js', color: '#339933' },
        { name: 'Python', color: '#3776AB' },
        { name: 'Docker', color: '#2496ED' },
        { name: 'MySQL', color: '#4479A1' },
      ],
// 完整技能列表（鼠标悬停时显示）
      allSkills: [
        { name: 'Vue.js', color: '#42B883' },
        { name: 'VuePress', color: '#42B883' },
        { name: 'JavaScript', color: '#F7DF1E' },
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'HTML5', color: '#E34F26' },
        { name: 'CSS3', color: '#1572B6' },
        { name: 'MySQL', color: '#4479A1' },
        { name: 'Git', color: '#F05032' },
        { name: 'Vite', color: '#646CFF' },

      ],
    }
  }
}
</script>

<style scoped>
.skills-card {
  background: rgba(10, 10, 20, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(100, 150, 255, 0.3);
  padding: 16px 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(100, 150, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.skills-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 0 25px rgba(100, 150, 255, 0.15);
}

/* 标题样式 */
.card-title {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 固定高度容器 - 关键！确保两种状态高度一致 */
.skills-container {
  min-height: 100px;
  position: relative;
}

/* ========== 滚动装饰层 ========== */
.skills-marquee-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.skills-marquee {
  width: 100%;
  overflow: hidden;
  margin-bottom: 12px;
}

.skills-marquee.reverse {
  margin-bottom: 0;
}

.marquee-track {
  display: flex;
  gap: 12px;
  width: fit-content;
  animation: scroll-left 15s linear infinite;
  padding: 6px 0;
}

.marquee-track.reverse {
  animation: scroll-right 15s linear infinite;
}

/* 悬停时暂停滚动 */
.skills-card:hover .marquee-track {
  animation-play-state: paused;
}

/* 滚动标签样式 */
.skill-tag-marquee {
  display: inline-block;
  padding: 4px 16px;
  background: transparent;
  border-radius: 24px;
  border: 1px solid;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
}

/* ========== 悬停时显示的网格 ========== */
.skills-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  animation: fadeIn 0.3s ease;
}

.skills-grid-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
}

.skill-tag-grid {
  display: inline-block;
  padding: 6px 18px;
  background: transparent;
  border-radius: 24px;
  border: 1px solid;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.skill-tag-grid:hover {
  transform: translateY(-2px);
  background: rgba(100, 150, 255, 0.1);
}

/* ========== 动画 ========== */
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
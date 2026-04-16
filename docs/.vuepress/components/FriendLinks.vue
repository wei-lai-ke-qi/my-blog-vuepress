<template>
  <div class="friend-links-wrapper">
    <div class="card friend-card">
      <!-- 标题栏（包含欢迎语） -->
      <div class="card-header">
        <div class="header-left">
          <span class="header-icon">🔗</span>
          <span class="header-title">友情链接</span>
          <span class="friend-count">({{ friends.length }})</span>
        </div>
        <div class="header-right">
          <span class="welcome-text">✨ 欢迎交换友链 ~</span>
          <div class="all-friends-btn">
<!--            <button class="all-friends-btn-text" @click="viewAllFriends">-->
<!--              📋 所有好友-->
<!--            </button>-->
          </div>
        </div>
      </div>

      <!-- 友链网格 -->
      <div class="friend-grid">
        <a
            v-for="friend in friends"
            :key="friend.name"
            :href="friend.url"
            class="friend-card-item"
            target="_blank"
            rel="noopener noreferrer"
            :title="friend.name + ' - ' + friend.desc"
        >
          <div class="friend-avatar">
            <span class="avatar-emoji">{{ friend.emoji }}</span>
          </div>
          <div class="friend-name">{{ friend.name }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// 从单独的文件导入友链数据
import { friends } from './Data/friendsData.js'

export default {
  name: 'FriendLinks',
  data() {
    return {
      friends: friends  // 直接使用导入的数据
    }
  },
  methods: {
    viewAllFriends() {
      // 跳转到完整的友情链接页面
      window.location.href = '/friends/'
      // 或者如果是路由跳转：
      // this.$router.push('/friends')
    }
  }
}
</script>

<style scoped>
/* 样式保持不变 */
.friend-links-wrapper {
  margin: 20px 0;
}

.card {
  background: rgba(10, 10, 20, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(100, 150, 255, 0.3);
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(100, 150, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 0 25px rgba(100, 150, 255, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(100, 150, 255, 0.2);
  flex-wrap: wrap;
  gap: 8px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  font-size: 1.1rem;
}

.header-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.friend-count {
  font-size: 0.7rem;
  color: rgba(100, 150, 255, 0.6);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.welcome-text {
  font-size: 0.65rem;
  color: rgba(100, 150, 255, 0.6);
  background: rgba(100, 150, 255, 0.08);
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
}

.all-friends-btn-text {
  background: rgba(100, 150, 255, 0.15);
  border: 1px solid rgba(100, 150, 255, 0.3);
  padding: 3px 10px;
  border-radius: 16px;
  font-size: 0.65rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.all-friends-btn-text:hover {
  background: rgba(100, 150, 255, 0.3);
  color: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
}

.friend-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
}

.friend-card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 6px;
  background: rgba(100, 150, 255, 0.05);
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid rgba(100, 150, 255, 0.15);
  width: 80px;
}

.friend-card-item:hover {
  background: rgba(100, 150, 255, 0.12);
  border-color: rgba(100, 150, 255, 0.4);
  transform: translateY(-2px);
}

.friend-avatar {
  width: 44px;
  height: 44px;
  background: rgba(100, 150, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.avatar-emoji {
  font-size: 1.5rem;
}

.friend-name {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70px;
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }

  .welcome-text {
    font-size: 0.6rem;
  }

  .all-friends-btn-text {
    font-size: 0.6rem;
    padding: 2px 8px;
  }

  .friend-card-item {
    width: 70px;
    padding: 8px 4px;
  }

  .friend-avatar {
    width: 38px;
    height: 38px;
  }

  .avatar-emoji {
    font-size: 1.3rem;
  }

  .friend-name {
    font-size: 0.65rem;
    max-width: 62px;
  }
}
</style>
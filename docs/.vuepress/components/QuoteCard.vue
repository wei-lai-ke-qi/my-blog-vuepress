<template>
  <div class="quote-card-wrapper">
    <div class="card quote-card">
      <div class="quote-content">
        <p class="quote-text" :class="{ 'is-loading': isRefreshing }">
          {{ isRefreshing ? '✨ 加载中...' : hitokoto.text }}
        </p>
      </div>
      <div class="quote-footer">
        <span class="quote-from">—— {{ hitokoto.from }}</span>
        <button class="quote-refresh" @click="refreshQuote" :disabled="!canManualRefresh">
          {{ manualCooldown > 0 ? `冷却中 ${manualCooldown}s` : '🔄 换一句' }}
        </button>
      </div>
<!--      <div v-if="autoCountdown <= 10" class="auto-refresh-tip">
        ⏱️ {{ autoCountdown }}秒后自动刷新
      </div>-->
    </div>
  </div>
</template>

<script>
import { getRandomQuote } from './Data/quotes.js'

export default {
  name: 'QuoteCard',
  data() {
    return {
      hitokoto: { text: '', from: '' },
      autoCountdown: 30,           // 自动刷新倒计时
      manualCooldown: 0,           // 手动刷新冷却倒计时
      autoTimer: null,             // 自动刷新定时器
      cooldownTimer: null,         // 冷却定时器
      isRefreshing: false,         // 是否正在刷新
      failedApis: new Map(),       // 记录失败的API
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true
    }
  },
  computed: {
    canManualRefresh() {
      return this.manualCooldown === 0 && !this.isRefreshing
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline)
      window.addEventListener('offline', this.handleOffline)
      this.fetchHitokoto()
      this.startAutoRefresh()
    }
  },
  beforeDestroy() {
    if (this.autoTimer) clearInterval(this.autoTimer)
    if (this.cooldownTimer) clearInterval(this.cooldownTimer)
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnline)
      window.removeEventListener('offline', this.handleOffline)
    }
  },
  methods: {
    /**
     * 检查API是否可用（失败后5分钟内不再使用）
     */
    isApiAvailable(apiName) {
      const failedTime = this.failedApis.get(apiName)
      if (!failedTime) return true
      return Date.now() - failedTime > 5 * 60 * 1000
    },

    /**
     * 标记API失败
     */
    markApiFailed(apiName) {
      this.failedApis.set(apiName, Date.now())
      if (process.env.NODE_ENV === 'development') {
        console.warn(`⚠️ API ${apiName} 请求失败，暂时禁用5分钟`)
      }
    },

    /**
     * 清除API失败标记
     */
    clearApiFailed(apiName) {
      if (this.failedApis.has(apiName)) {
        this.failedApis.delete(apiName)
      }
    },

    /**
     * 网络恢复处理
     */
    handleOnline() {
      this.isOnline = true
      this.fetchHitokoto()
    },

    /**
     * 网络断开处理
     */
    handleOffline() {
      this.isOnline = false
      this.hitokoto = getRandomQuote()
    },

    /**
     * 带超时的fetch请求
     */
    async fetchWithTimeout(url, timeout = 6000) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json'
          }
        })
        clearTimeout(timeoutId)
        return response
      } catch (error) {
        clearTimeout(timeoutId)
        throw error
      }
    },

    /**
     * 获取一言数据（多API备用）
     */
    async fetchHitokoto() {
      // 离线状态直接使用本地数据
      if (!this.isOnline) {
        this.hitokoto = getRandomQuote()
        return
      }

      // 多API备用列表（按优先级排序）
      const apis = [
        {
          name: 'hitokoto',
          url: 'https://v1.hitokoto.cn/',
          parser: (data) => {
            if (data && data.hitokoto) {
              return {
                text: data.hitokoto,
                from: data.from || data.from_who || '一言'
              }
            }
            return null
          },
          timeout: 5000
        },
        {
          name: 'hitokoto-intl',
          url: 'https://international.v1.hitokoto.cn/',
          parser: (data) => {
            if (data && data.hitokoto) {
              return {
                text: data.hitokoto,
                from: data.from || data.from_who || '一言'
              }
            }
            return null
          },
          timeout: 6000
        },
        {
          name: 'xygeng.cn',
          url: 'https://api.xygeng.cn/one/',
          parser: (data) => {
            if (data && data.data) {
              return {
                text: data.data,
                from: data.from || '佚名'
              }
            }
            return null
          },
          timeout: 5000
        },
        {
          name: '66mz8.com',
          url: 'https://api.66mz8.com/api/rand.yiyan.php?format=json',
          parser: (data) => {
            if (data && data.content) {
              return {
                text: data.content,
                from: data.author || '佚名'
              }
            }
            return null
          },
          timeout: 6000
        }
      ]

      // 依次尝试每个API
      for (let api of apis) {
        if (!this.isApiAvailable(api.name)) continue

        try {
          const response = await this.fetchWithTimeout(api.url, api.timeout)

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
          }

          const data = await response.json()
          const parsed = api.parser(data)

          if (parsed && parsed.text && parsed.text.trim().length > 0) {
            this.hitokoto = {
              text: parsed.text.trim(),
              from: parsed.from.trim()
            }
            this.clearApiFailed(api.name)

            if (process.env.NODE_ENV === 'development') {
              console.log(`✅ 成功从 ${api.name} 获取格言`)
            }
            return
          }
        } catch (error) {
          this.markApiFailed(api.name)
          if (process.env.NODE_ENV === 'development') {
            console.warn(`❌ API ${api.name} 失败:`, error.message)
          }
        }
      }

      // 所有API都失败，使用本地备用数据
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ 所有API均失败，使用本地格言数据')
      }
      this.hitokoto = getRandomQuote()
    },

    /**
     * 手动刷新格言
     */
    async refreshQuote() {
      if (!this.canManualRefresh) return

      this.isRefreshing = true
      await this.fetchHitokoto()
      this.isRefreshing = false
      this.autoCountdown = 30
      this.manualCooldown = 20
      this.startCooldownTimer()
    },

    /**
     * 启动自动刷新定时器
     */
    startAutoRefresh() {
      this.autoTimer = setInterval(() => {
        if (this.autoCountdown > 0 && !this.isRefreshing) {
          this.autoCountdown--
        }
        if (this.autoCountdown === 0 && !this.isRefreshing) {
          this.autoRefresh()
        }
      }, 1000)
    },

    /**
     * 自动刷新
     */
    async autoRefresh() {
      this.isRefreshing = true
      await this.fetchHitokoto()
      this.isRefreshing = false
      this.autoCountdown = 30
    },

    /**
     * 启动手动刷新冷却定时器
     */
    startCooldownTimer() {
      if (this.cooldownTimer) {
        clearInterval(this.cooldownTimer)
        this.cooldownTimer = null
      }

      if (this.manualCooldown <= 0) return

      this.cooldownTimer = setInterval(() => {
        if (this.manualCooldown > 0) {
          this.manualCooldown--
        }
        if (this.manualCooldown <= 0) {
          clearInterval(this.cooldownTimer)
          this.cooldownTimer = null
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.quote-card-wrapper {
  margin: 20px 0;
}

.card {
  background: rgba(10, 10, 20, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(100, 150, 255, 0.3);
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(100, 150, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 0 25px rgba(100, 150, 255, 0.15);
}

.quote-content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  min-height: 80px;
}

.quote-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin: 0;
  transition: opacity 0.3s ease;
}

.quote-text.is-loading {
  opacity: 0.7;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.4; }
}

.quote-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(100, 150, 255, 0.2);
}

.quote-from {
  font-size: 0.8rem;
  color: rgba(100, 150, 255, 0.7);
  font-style: italic;
}

.quote-refresh {
  background: rgba(100, 150, 255, 0.15);
  border: 1px solid rgba(100, 150, 255, 0.3);
  padding: 4px 12px;
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 90px;
}

.quote-refresh:hover:not(:disabled) {
  background: rgba(100, 150, 255, 0.3);
  transform: translateY(-1px);
}

.quote-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auto-refresh-tip {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 0.65rem;
  color: rgba(100, 150, 255, 0.5);
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 10px;
  pointer-events: none;
}
</style>
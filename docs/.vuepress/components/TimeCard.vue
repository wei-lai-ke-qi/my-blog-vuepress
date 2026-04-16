<template>
  <div class="card time-card">
    <!-- 公历日期行 -->
    <div class="time-header">
      <span class="date-icon">📅</span>
      <span class="date-info">{{ currentDate }}</span>
    </div>

    <!-- 当前时间行（实时刷新） -->
    <div class="time-main">
      <span class="time-clock">{{ currentTime }}</span>
    </div>

    <!-- 农历信息行 -->
    <div class="lunar-info">
      <span class="lunar-date">农历 {{ lunarDate }}</span>
      <span class="ganzhi">{{ ganzhi }}</span>
    </div>

    <!-- 地理位置行 -->
    <div class="weather-info">
      <span class="location">📍 {{ location }}</span>
    </div>
  </div>
</template>

<script>
import lunisolar from 'lunisolar'

export default {
  name: 'TimeCard',

  data() {
    return {
      currentDate: '',      // 公历日期字符串
      currentTime: '',      // 当前时间字符串
      location: '加载中...', // 地理位置
      lunarDate: '',        // 农历日期（如：正月十五）
      ganzhi: '',           // 干支纪年（如：甲辰年【龙年】）
      timer: null           // 定时器ID
    }
  },

  mounted() {
    this.updateDateTime()
    this.timer = setInterval(this.updateDateTime, 1000)
    this.getLocation()
  },

  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  },

  methods: {
    /**
     * 更新日期、时间和农历信息
     * 使用 lunisolar 库获取农历数据
     */
    updateDateTime() {
      const now = new Date()

      // ========== 公历日期处理 ==========
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const weekday = weekdays[now.getDay()]

      this.currentDate = `${year}年${month}月${day}日 ${weekday}`
      this.currentTime = now.toLocaleTimeString('zh-CN', { hour12: false })

      // ========== 农历信息（使用 lunisolar） ==========
      const lunar = lunisolar(now)

      // 方式1：获取格式化的农历日期（推荐）
      // 格式：正月十五、腊月廿三、闰四月初二
      this.lunarDate = lunar.format('lMlD')

      // 方式2：获取完整的干支纪年（包含生肖）
      // 返回格式如：甲辰年【龙年】
      const ganzhiYear = lunar.format('lY')  // 干支年：甲辰
      const zodiac = lunar.zodiac            // 生肖：龙
      this.ganzhi = `${ganzhiYear}年【${zodiac}年】`
    },

    /**
     * 获取地理位置信息
     * 通过 IP 定位 API 获取用户所在地区
     */
    async getLocation() {
      try {
        const ipRes = await fetch('https://ipapi.co/json/')
        const ipData = await ipRes.json()

        if (ipData && !ipData.error) {
          const regionEn = ipData.region || ''

          // 英文省份名 → 中文映射表
          const regionMap = {
            'Beijing': '北京', 'Shanghai': '上海', 'Tianjin': '天津', 'Chongqing': '重庆',
            'Zhejiang': '浙江', 'Jiangsu': '江苏', 'Guangdong': '广东', 'Sichuan': '四川',
            'Hubei': '湖北', 'Shaanxi': '陕西', 'Henan': '河南', 'Hunan': '湖南',
            'Yunnan': '云南', 'Fujian': '福建', 'Shandong': '山东', 'Anhui': '安徽',
            'Jiangxi': '江西', 'Hebei': '河北', 'Shanxi': '山西', 'Liaoning': '辽宁',
            'Jilin': '吉林', 'Heilongjiang': '黑龙江', 'Gansu': '甘肃', 'Qinghai': '青海',
            'Ningxia': '宁夏', 'Xinjiang': '新疆', 'Guizhou': '贵州', 'Tibet': '西藏',
            'Guangxi': '广西', 'Hainan': '海南', 'Nei Mongol': '内蒙古', 'Inner Mongolia': '内蒙古',
            'Hong Kong': '香港', 'Macau': '澳门', 'Taiwan': '台湾'
          }

          const regionZh = regionMap[regionEn] || regionEn
          this.location = regionZh && regionZh !== '' ? `${regionZh} 中国` : '中国'
        } else {
          this.location = '获取失败'
        }
      } catch (error) {
        console.error('IP定位失败:', error)
        this.location = '获取失败'
      }
    }
  }
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

.time-card {
  text-align: center;
}

.time-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.time-main {
  margin-bottom: 15px;
}

.time-clock {
  font-size: 2.5rem;
  font-weight: 600;
  color: #fff;
  font-family: monospace;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(100, 150, 255, 0.5);
}

.lunar-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: rgba(100, 150, 255, 0.8);
}

.weather-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  padding-top: 10px;
  border-top: 1px solid rgba(100, 150, 255, 0.2);
}
</style>
<template>
  <div class="tech-grid-bg" ref="containerRef" :class="{ 'dark-mode': isDarkMode }">
    <canvas ref="canvasRef" class="grid-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

// VuePress 主题检测
const isDarkMode = ref(false)

function detectTheme() {
  const htmlClass = document.documentElement.className
  const bodyClass = document.body.className
  const themeAttr = document.documentElement.getAttribute('data-theme')

  if (htmlClass.includes('dark') || bodyClass.includes('dark') || themeAttr === 'dark') {
    isDarkMode.value = true
  } else if (htmlClass.includes('light') || bodyClass.includes('light') || themeAttr === 'light') {
    isDarkMode.value = false
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

function watchThemeChange() {
  const observer = new MutationObserver(() => detectTheme())
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] })
  window.addEventListener('vuepress-theme-change', detectTheme)
  return observer
}

const containerRef = ref(null)
const canvasRef = ref(null)

let ctx = null
let animationId = null
let time = 0

// 浅色主题配置 - 更低的存在感
const LIGHT_CONFIG = {
  gridStep: 52,
  backgroundColor: ['#f8fafc', '#f1f5f9'],
  gridColor: 'rgba(100, 116, 139, 0.12)',      // 更淡的网格
  laserColor: { start: 'rgba(59, 130, 246, 0.35)', end: 'rgba(139, 92, 246, 0.2)' },
  laserSpeed: 0.8,                            // 更慢的激光
  laserGlowColor: 'rgba(59, 130, 246, 0.15)',
  enableStars: false,
  pointDensity: 0,
  pointSpeedRange: [0.5, 1.0],
  pointRadius: [0, 0],
  movingPointColor: [59, 130, 246],
  movingPointAlpha: 0,
  nodeGlowIntensity: 0.12                      // 节点光晕强度
}

// 深色主题配置 - 保留星星，但整体更低调
const DARK_CONFIG = {
  gridStep: 52,
  backgroundColor: ['#0a0c14', '#0f111a'],
  gridColor: 'rgba(59, 130, 246, 0.18)',       // 更淡的网格
  laserColor: { start: 'rgba(0, 180, 230, 0.4)', end: 'rgba(100, 80, 200, 0.25)' },
  laserSpeed: 0.35,                            // 更慢的激光
  laserGlowColor: 'rgba(0, 180, 230, 0.2)',
  enableStars: true,
  pointDensity: 0.35,                          // 减少星星数量
  pointSpeedRange: [0.3, 0.7],                 // 星星移动更慢
  pointRadius: [1.2, 2.2],                     // 星星更小
  movingPointColor: [0, 180, 230],
  movingPointAlpha: 0.45,                      // 星星更淡
  nodeGlowIntensity: 0.1
}

const currentConfig = ref({ ...LIGHT_CONFIG })

let gridPoints = []
let laserLines = []
let laserActive = []
let laserNextChange = []
let canvasWidth = 0
let canvasHeight = 0

// 生成网格线条
function generateLaserLines(width, height, step, offsetX, offsetY) {
  const lines = []
  for (let x = offsetX; x < width; x += step) {
    lines.push({
      type: 'vertical',
      x: x,
      y1: 0,
      y2: height,
      progress: Math.random()
    })
  }
  for (let y = offsetY; y < height; y += step) {
    lines.push({
      type: 'horizontal',
      y: y,
      x1: 0,
      x2: width,
      progress: Math.random()
    })
  }
  return lines
}

// 初始化激光活跃状态
function initLaserStates() {
  const states = []
  const nextChanges = []
  for (let i = 0; i < laserLines.length; i++) {
    const isActive = Math.random() > 0.7      // 更少的激光同时活跃
    states.push(isActive)
    nextChanges.push(3 + Math.random() * 8)    // 激光出现/消失间隔更长
  }
  laserActive = states
  laserNextChange = nextChanges
}

// 更新激光活跃状态
function updateLaserStates(deltaTime) {
  if (!laserActive.length) return
  const safeDelta = Math.min(deltaTime, 0.033)

  for (let i = 0; i < laserActive.length; i++) {
    laserNextChange[i] -= safeDelta
    if (laserNextChange[i] <= 0) {
      laserActive[i] = !laserActive[i]
      laserNextChange[i] = 3 + Math.random() * 8
    }
  }
}

// 初始化星星（仅深色主题）
function initGridPoints(width, height, config) {
  if (!config.enableStars) return []

  const points = []
  const step = config.gridStep
  const offsetX = (width % step) / 2
  const offsetY = (height % step) / 2

  for (let x = offsetX; x < width; x += step) {
    for (let y = offsetY; y < height; y += step) {
      if (Math.random() > config.pointDensity) continue

      const speedX = config.pointSpeedRange[0] + Math.random() * (config.pointSpeedRange[1] - config.pointSpeedRange[0])
      const speedY = config.pointSpeedRange[0] + Math.random() * (config.pointSpeedRange[1] - config.pointSpeedRange[0])
      const phaseX = Math.random() * Math.PI * 2
      const phaseY = Math.random() * Math.PI * 2
      const radius = config.pointRadius[0] + Math.random() * (config.pointRadius[1] - config.pointRadius[0])
      const alphaBase = 0.4 + Math.random() * 0.3

      points.push({
        baseX: x, baseY: y,
        offsetXRange: step * 0.25,
        offsetYRange: step * 0.25,
        speedX, speedY, phaseX, phaseY, radius, alphaBase,
        flickerSpeed: 0.8 + Math.random() * 1.5,
        flickerPhase: Math.random() * Math.PI * 2
      })
    }
  }
  return points
}

// 调整尺寸
function handleResize() {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const width = rect.width
  const height = rect.height

  if (width > 0 && height > 0) {
    canvasWidth = width
    canvasHeight = height

    if (canvasRef.value) {
      const dpr = window.devicePixelRatio || 1
      canvasRef.value.width = width * dpr
      canvasRef.value.height = height * dpr
      canvasRef.value.style.width = `${width}px`
      canvasRef.value.style.height = `${height}px`
      ctx = canvasRef.value.getContext('2d')
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const step = currentConfig.value.gridStep
    const offsetX = (width % step) / 2
    const offsetY = (height % step) / 2
    laserLines = generateLaserLines(width, height, step, offsetX, offsetY)
    initLaserStates()
    gridPoints = initGridPoints(width, height, currentConfig.value)
  }
}

// 绘制流动激光（更柔和）
function drawLasers(config, timeVal) {
  if (!ctx) return
  const speed = config.laserSpeed
  const { start, end } = config.laserColor

  for (let idx = 0; idx < laserLines.length; idx++) {
    const line = laserLines[idx]
    if (!laserActive[idx]) continue

    line.progress = (line.progress + 0.006 * speed) % 1   // 更慢的移动

    if (line.type === 'vertical') {
      const x = line.x
      const yStart = line.y1 + (line.y2 - line.y1) * line.progress
      const laserLength = 35
      const yEnd = Math.min(line.y2, yStart + laserLength)

      const gradient = ctx.createLinearGradient(x, yStart, x, yEnd)
      gradient.addColorStop(0, start)
      gradient.addColorStop(1, end)

      ctx.beginPath()
      ctx.moveTo(x, yStart)
      ctx.lineTo(x, yEnd)
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.8
      ctx.stroke()

      // 激光头部光晕（更淡）
      ctx.beginPath()
      ctx.arc(x, yStart, 3, 0, Math.PI * 2)
      ctx.fillStyle = start
      ctx.fill()

    } else if (line.type === 'horizontal') {
      const y = line.y
      const xStart = line.x1 + (line.x2 - line.x1) * line.progress
      const laserLength = 35
      const xEnd = Math.min(line.x2, xStart + laserLength)

      const gradient = ctx.createLinearGradient(xStart, y, xEnd, y)
      gradient.addColorStop(0, start)
      gradient.addColorStop(1, end)

      ctx.beginPath()
      ctx.moveTo(xStart, y)
      ctx.lineTo(xEnd, y)
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.8
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(xStart, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = start
      ctx.fill()
    }
  }
}

// 绘制星星（更低调）
function drawStars(config, currentTime) {
  if (!config.enableStars || gridPoints.length === 0) return

  const [r, g, b] = config.movingPointColor
  const w = canvasWidth
  const h = canvasHeight

  for (let point of gridPoints) {
    const t = currentTime
    const offsetXPos = Math.sin(t * point.speedX + point.phaseX) * point.offsetXRange
    const offsetYPos = Math.cos(t * point.speedY + point.phaseY) * point.offsetYRange

    let x = point.baseX + offsetXPos
    let y = point.baseY + offsetYPos
    x = Math.min(w - 6, Math.max(6, x))
    y = Math.min(h - 6, Math.max(6, y))

    const breath = 0.6 + Math.sin(t * point.flickerSpeed + point.flickerPhase) * 0.25
    const alpha = Math.min(config.movingPointAlpha, point.alphaBase * breath)

    // 柔和光晕
    const radGrad = ctx.createRadialGradient(x, y, 0, x, y, point.radius * 2)
    radGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`)
    radGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
    ctx.fillStyle = radGrad
    ctx.beginPath()
    ctx.arc(x, y, point.radius * 1.5, 0, Math.PI * 2)
    ctx.fill()

    // 核心亮点
    ctx.beginPath()
    ctx.arc(x, y, point.radius * 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`
    ctx.fill()
  }
}

// 绘制背景
function draw(currentTime) {
  if (!ctx || canvasWidth === 0 || canvasHeight === 0) return

  const w = canvasWidth
  const h = canvasHeight
  const config = currentConfig.value
  const step = config.gridStep
  const offsetX = (w % step) / 2
  const offsetY = (h % step) / 2

  // 背景渐变 - 更淡更柔和
  const grad = ctx.createLinearGradient(0, 0, w * 0.5, h)
  grad.addColorStop(0, config.backgroundColor[0])
  grad.addColorStop(1, config.backgroundColor[1])
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // 绘制网格 - 更细更淡
  ctx.beginPath()
  ctx.strokeStyle = config.gridColor
  ctx.lineWidth = 0.6

  for (let x = offsetX; x < w; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = offsetY; y < h; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }

  // 绘制网格交点（极淡光点）
  const nodeIntensity = config.nodeGlowIntensity || 0.15
  for (let x = offsetX; x < w; x += step) {
    for (let y = offsetY; y < h; y += step) {
      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(100, 120, 150, ${nodeIntensity})`
      ctx.fill()
    }
  }

  // 绘制星星（仅深色主题）
  drawStars(config, currentTime)

  // 绘制激光
  drawLasers(config, currentTime)
}

// 动画循环
let lastFrameTime = 0
function animate(now) {
  if (!ctx) {
    animationId = requestAnimationFrame(animate)
    return
  }

  if (lastFrameTime === 0) {
    lastFrameTime = now
    animationId = requestAnimationFrame(animate)
    return
  }

  let delta = Math.min(0.033, (now - lastFrameTime) / 1000)
  if (delta > 0.001) {
    updateLaserStates(delta)
  }
  lastFrameTime = now

  time += 0.012                        // 整体动画节奏更慢
  draw(time)

  animationId = requestAnimationFrame(animate)
}

let resizeTimer = null
function onResize() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => handleResize(), 100)
}

// 主题切换时重新生成
function updateTheme() {
  if (isDarkMode.value) {
    currentConfig.value = { ...DARK_CONFIG }
  } else {
    currentConfig.value = { ...LIGHT_CONFIG }
  }
  if (canvasWidth > 0 && canvasHeight > 0) {
    const step = currentConfig.value.gridStep
    const offsetX = (canvasWidth % step) / 2
    const offsetY = (canvasHeight % step) / 2
    laserLines = generateLaserLines(canvasWidth, canvasHeight, step, offsetX, offsetY)
    initLaserStates()
    gridPoints = initGridPoints(canvasWidth, canvasHeight, currentConfig.value)
  }
}

watchEffect(() => {
  updateTheme()
})

onMounted(() => {
  detectTheme()
  handleResize()
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
  }
  lastFrameTime = 0
  animate(0)

  const observer = watchThemeChange()
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onResize)
    observer.disconnect()
    window.removeEventListener('vuepress-theme-change', detectTheme)
  })
})
</script>

<style scoped>
.tech-grid-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.grid-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
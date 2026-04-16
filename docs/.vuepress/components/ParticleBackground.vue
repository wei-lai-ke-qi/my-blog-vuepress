<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<script>
export default {
  name: 'ParticleBackground',
  data() {
    return {
      animationId: null,
      particles: [],
      width: 0,
      height: 0,
      ctx: null,
      mouseX: null,
      mouseY: null,
      config: {
        particleCount: 180,    // 粒子数量
        maxDistance: 130,      // 连线距离
        mouseRadius: 200,      // 鼠标吸引半径
        mouseForce: 0.5,      // 鼠标吸引力强度
        baseSpeed: 0.3,        // 初始随机速度
        randomForce: 0.5,     // 🆕 随机移动强度（越大越活跃）
        damping: 0.9         // 阻尼（越小减速越快）
      }
    }
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      if (!canvas) return
      this.ctx = canvas.getContext('2d')
      this.handleResize()
      this.initParticles()
      this.animate()
      window.addEventListener('mousemove', this.handleMouseMove)
      window.addEventListener('mouseleave', () => {
        this.mouseX = null
        this.mouseY = null
      })
    },
    handleResize() {
      const canvas = this.$refs.canvas
      if (!canvas) return
      this.width = window.innerWidth
      this.height = window.innerHeight
      canvas.width = this.width
      canvas.height = this.height
      this.initParticles()
    },
    initParticles() {
      this.particles = []
      for (let i = 0; i < this.config.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * this.config.baseSpeed,
          vy: (Math.random() - 0.5) * this.config.baseSpeed
        })
      }
    },
    handleMouseMove(e) {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    },
    updateParticles() {
      for (let p of this.particles) {
        // === 新增：随机移动（布朗运动）===
        p.vx += (Math.random() - 0.5) * this.config.randomForce
        p.vy += (Math.random() - 0.5) * this.config.randomForce

        // 限制最大速度，避免飞得太快
        const maxSpeed = 2.5
        p.vx = Math.min(maxSpeed, Math.max(-maxSpeed, p.vx))
        p.vy = Math.min(maxSpeed, Math.max(-maxSpeed, p.vy))

        // 鼠标吸引
        if (this.mouseX !== null && this.mouseY !== null) {
          const dx = this.mouseX - p.x
          const dy = this.mouseY - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < this.config.mouseRadius && dist > 5) {
            const force = (1 - dist / this.config.mouseRadius) * this.config.mouseForce
            const angle = Math.atan2(dy, dx)
            p.vx += Math.cos(angle) * force
            p.vy += Math.sin(angle) * force
          }
        }

        p.x += p.vx
        p.y += p.vy

        // 边界处理
        if (p.x < 0) {
          p.x = 0
          p.vx = -p.vx * 0.8
        }
        if (p.x > this.width) {
          p.x = this.width
          p.vx = -p.vx * 0.8
        }
        if (p.y < 0) {
          p.y = 0
          p.vy = -p.vy * 0.8
        }
        if (p.y > this.height) {
          p.y = this.height
          p.vy = -p.vy * 0.8
        }

        p.vx *= this.config.damping
        p.vy *= this.config.damping
      }
    },
    drawNetwork() {
      const ctx = this.ctx
      if (!ctx) return

      ctx.clearRect(0, 0, this.width, this.height)

      // 拖尾效果（透明度越高拖尾越长）
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, this.width, this.height)

      // 绘制连线
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const p1 = this.particles[i]
          const p2 = this.particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < this.config.maxDistance) {
            const opacity = 0.45 * (1 - distance / this.config.maxDistance)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            // 颜色根据距离鼠标位置动态变化
            let hue = 210
            if (this.mouseX && this.mouseY) {
              const avgX = (p1.x + p2.x) / 2
              const avgY = (p1.y + p2.y) / 2
              const dxMouse = avgX - this.mouseX
              const dyMouse = avgY - this.mouseY
              const distToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
              if (distToMouse < 150) {
                hue = 280  // 鼠标附近变紫色
              }
            }
            ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // 绘制粒子
      for (let p of this.particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(210, 90%, 65%, 0.85)`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`
        ctx.fill()
      }
    },
    animate() {
      this.updateParticles()
      this.drawNetwork()
      this.animationId = requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  display: block;
}
</style>
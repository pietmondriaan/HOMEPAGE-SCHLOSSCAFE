import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

class Vector2D {
  constructor(x, y) { this.x = x; this.y = y }
}

class Vector3D {
  constructor(x, y, z) { this.x = x; this.y = y; this.z = z }
}

class AnimationController {
  constructor(canvas, ctx, dpr, size) {
    this.canvas = canvas
    this.ctx = ctx
    this.dpr = dpr
    this.size = size
    this.time = 0
    this.stars = []
    this.changeEventTime = 0.32
    this.cameraZ = -400
    this.cameraTravelDistance = 3400
    this.startDotYOffset = 28
    this.viewZoom = 100
    this.numberOfStars = 3000
    this.trailLength = 80

    this.createStars()
    this.timeline = gsap.timeline({ repeat: -1 })
    this.timeline.to(this, { time: 1, duration: 15, repeat: -1, ease: 'none', onUpdate: () => this.render() })
  }

  createStars() {
    const origRandom = Math.random
    let seed = 1234
    Math.random = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
    for (let i = 0; i < this.numberOfStars; i++) this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance))
    Math.random = origRandom
  }

  ease(p, g) { return p < 0.5 ? 0.5 * Math.pow(2 * p, g) : 1 - 0.5 * Math.pow(2 * (1 - p), g) }
  easeOutElastic(x) { const c = (2 * Math.PI) / 4.5; return x <= 0 ? 0 : x >= 1 ? 1 : Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c) + 1 }
  map(v, s1, e1, s2, e2) { return s2 + (e2 - s2) * ((v - s1) / (e1 - s1)) }
  constrain(v, min, max) { return Math.min(Math.max(v, min), max) }
  lerp(a, b, t) { return a * (1 - t) + b * t }

  spiralPath(p) {
    p = this.constrain(1.2 * p, 0, 1)
    p = this.ease(p, 1.8)
    const theta = 2 * Math.PI * 6 * Math.sqrt(p)
    const r = 170 * Math.sqrt(p)
    return new Vector2D(r * Math.cos(theta), r * Math.sin(theta) + this.startDotYOffset)
  }

  showProjectedDot(pos, sizeFactor) {
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
    const newCamZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance
    if (pos.z > newCamZ) {
      const depth = pos.z - newCamZ
      const x = this.viewZoom * pos.x / depth
      const y = this.viewZoom * pos.y / depth
      const sw = 400 * sizeFactor / depth
      this.ctx.beginPath()
      this.ctx.arc(x, y, sw / 2, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

  render() {
    const ctx = this.ctx
    if (!ctx) return
    ctx.clearRect(0, 0, this.size, this.size)
    ctx.save()
    ctx.translate(this.size / 2, this.size / 2)
    const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1)
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
    ctx.rotate(-Math.PI * this.ease(t2, 2.7))

    // Trail
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.1, 0.1)
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f
      ctx.fillStyle = 'rgba(201, 168, 108, 0.8)'
      const pos = this.spiralPath(t1 - 0.00015 * i)
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, sw / 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    for (const star of this.stars) star.render(t1, this)

    ctx.restore()
  }

  destroy() { this.timeline.kill() }
}

class Star {
  constructor(cameraZ, cameraTravelDistance) {
    this.angle = Math.random() * Math.PI * 2
    this.distance = 30 * Math.random() + 15
    this.rotationDir = Math.random() > 0.5 ? 1 : -1
    this.expansionRate = 1.2 + Math.random() * 0.8
    this.finalScale = 0.7 + Math.random() * 0.6
    this.dx = this.distance * Math.cos(this.angle)
    this.dy = this.distance * Math.sin(this.angle)
    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3
    this.z = (0.5 * cameraZ) + Math.random() * (cameraTravelDistance + cameraZ - 0.5 * cameraZ)
    this.z = this.z * (1 - 0.3 * this.spiralLocation) + (cameraTravelDistance / 2) * 0.3 * this.spiralLocation
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0)
  }

  render(p, ctrl) {
    const spiralPos = ctrl.spiralPath(this.spiralLocation)
    const q = p - this.spiralLocation
    if (q > 0) {
      const dp = ctrl.constrain(4 * q, 0, 1)
      const easing = ctrl.easeOutElastic(dp)
      const screenX = spiralPos.x + this.dx * this.expansionRate * easing
      const screenY = spiralPos.y + this.dy * this.expansionRate * easing
      const vx = (this.z - ctrl.cameraZ) * screenX / ctrl.viewZoom
      const vy = (this.z - ctrl.cameraZ) * screenY / ctrl.viewZoom
      const dotSize = 8.5 * this.strokeWeightFactor * (1.0 + dp * 0.2)
      ctrl.showProjectedDot(new Vector3D(vx, vy, this.z), dotSize)
    }
  }
}

export default function SpiralAnimation() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dims.w === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const size = Math.max(dims.w, dims.h)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${dims.w}px`
    canvas.style.height = `${dims.h}px`
    ctx.scale(dpr, dpr)
    animRef.current = new AnimationController(canvas, ctx, dpr, size)
    return () => { if (animRef.current) { animRef.current.destroy(); animRef.current = null } }
  }, [dims])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

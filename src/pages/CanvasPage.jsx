import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'

export default function CanvasPage() {
  const goHome = useWellnessStore((s) => s.goHome)
  const theme = useWellnessStore((s) => s.theme)

  const canvasRef = useRef(null)
  const circlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Main animation loop
    const render = () => {
      // Semi-transparent background creates trailing blur
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-base') || '#101016'
      ctx.globalAlpha = 0.08
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Get color variable from theme
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || '#f6c857'

      ctx.globalAlpha = 1
      circlesRef.current.forEach((circle, index) => {
        circle.radius += 0.8
        circle.alpha -= 0.015

        if (circle.alpha <= 0) {
          circlesRef.current.splice(index, 1)
        } else {
          ctx.beginPath()
          ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
          ctx.fillStyle = primaryColor
          ctx.globalAlpha = circle.alpha
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    circlesRef.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 4,
      alpha: 0.8,
    })
  }

  return (
    <main
      aria-label="Fidget drawing canvas"
      className="fixed inset-0 z-40 bg-[var(--bg-base)] overflow-hidden select-none"
    >
      {/* Controls HUD */}
      <div className="absolute top-20 left-6 md:left-12 z-50 flex items-center gap-4">
        <button
          onClick={goHome}
          className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm"
        >
          ← Leave canvas
        </button>
      </div>

      <div className="absolute top-20 right-6 md:right-12 z-50 text-right max-w-xs">
        <p className="text-xs font-semibold tracking-wider text-[var(--color-primary)] uppercase mb-1">
          Mindful Canvas
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          Trace on the screen to anchor your focus. Trails fade away like drawing in sand.
        </p>
      </div>

      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        className="w-full h-full cursor-crosshair block"
      />
    </main>
  )
}

/**
 * AmbientBackground.jsx
 *
 * Renders the animated layered gradient background that fills the viewport.
 * Now supports theming via CSS variables and respects `reduceMotion`.
 */
import React from 'react'
import { motion } from 'framer-motion'

import useWellnessStore from '../context/useWellnessStore'

export default function AmbientBackground({ reduceMotion }) {
  const lowEnergyMode = useWellnessStore((s) => s.lowEnergyMode)
  const isReduced = reduceMotion || lowEnergyMode

  // Dust motes particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 30 + 30,
      delay: Math.random() * 20,
    }))
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-[var(--bg-base)] transition-colors duration-1000">
      
      {/* Organic background shapes */}
      <div className="absolute inset-0 opacity-15 filter blur-[120px]">
        {/* Teal Orb */}
        <motion.div
          className="absolute top-[10%] left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--color-primary)]"
          animate={isReduced ? {} : { 
            x: [0, 40, -20, 0], 
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Sage Orb */}
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[60%] h-[60%] rounded-full bg-[var(--color-secondary)]"
          animate={isReduced ? {} : { 
            x: [0, -50, 30, 0], 
            y: [0, 40, -50, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Lavender Orb */}
        <motion.div
          className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full bg-[var(--color-tertiary)]"
          animate={isReduced ? {} : { 
            x: [0, 30, -40, 0], 
            y: [0, 50, -30, 0],
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
      </div>

      {/* Dust Motes */}
      {!isReduced && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white/20"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.1)'
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, 50, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette & Texture */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, rgba(249, 247, 245, 0.2) 100%) pointer-events-none" />
      <div className="noise-overlay" />
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'

const DURATION_SECONDS = 60

export default function StillnessPage() {
  const goHome = useWellnessStore((s) => s.goHome)
  const reduceMotion = useWellnessStore((s) => s.reduceMotion)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    let timer
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      setIsDone(true)
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const startTimer = () => setIsRunning(true)
  const reset = () => {
    setIsRunning(false)
    setIsDone(false)
    setTimeLeft(DURATION_SECONDS)
  }

  // Calculate percentage for drawing the circle
  const progress = 1 - (timeLeft / DURATION_SECONDS)

  return (
    <main
      aria-label="A moment of stillness"
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <motion.button
        onClick={goHome}
        className="absolute top-20 left-6 md:left-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        ← Leave
      </motion.button>

      {!isDone ? (
        <motion.div 
          className="flex flex-col items-center gap-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          {/* Subtle instructions fade out when running */}
          <AnimatePresence>
            {!isRunning && (
              <motion.div 
                className="text-center absolute top-1/4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              >
                <p className="text-[var(--text-main)] text-lg mb-2">A moment of stillness</p>
                <p className="text-[var(--text-muted)] text-sm max-w-xs">
                  For the next 60 seconds, do nothing. Just be here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal visual timer */}
          <div className="relative w-64 h-64 mt-16 flex items-center justify-center cursor-pointer group" onClick={!isRunning ? startTimer : undefined}>
            {/* Background track */}
            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="48"
                fill="none"
                stroke="var(--bg-card)"
                strokeWidth="2"
              />
              {/* Progress circle */}
              {isRunning && (
                <motion.circle
                  cx="50" cy="50" r="48"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeDasharray="301.59" // 2 * pi * 48
                  strokeDashoffset={301.59 * (1 - progress)}
                  strokeLinecap="round"
                  style={{ opacity: 0.5 }}
                  animate={{ strokeDashoffset: reduceMotion ? 301.59 * (1 - progress) : undefined }}
                  transition={reduceMotion ? { duration: 0 } : { ease: "linear", duration: 1 }}
                />
              )}
            </svg>
            
            {/* Start Prompt / Timer Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {!isRunning ? (
                <span className="text-[var(--text-muted)] text-sm group-hover:text-[var(--color-primary)] transition-colors">Begin</span>
              ) : (
                <span className="text-[var(--bg-card)] font-mono opacity-20 hover:opacity-100 transition-opacity">
                  {timeLeft}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-medium text-[var(--color-primary)] mb-4">
            Thank you.
          </h2>
          <p className="text-[var(--text-muted)] max-w-sm mb-8">
            You gave yourself a minute of peace. You can carry this stillness with you.
          </p>
          <button
            onClick={goHome}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] underline underline-offset-4"
          >
            Return to the world
          </button>
        </motion.div>
      )}
    </main>
  )
}

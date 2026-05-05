/**
 * NavBar.jsx
 *
 * Minimal top navigation. Intentionally sparse — only a logo/wordmark
 * and a soft "safe space" indicator. No links that create decision paralysis.
 */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Zap } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'
import SettingsMenu from './SettingsMenu'

export default function NavBar({ onOpenPrefs }) {
  const goHome = useWellnessStore((s) => s.goHome)
  const openRescue = useWellnessStore((s) => s.openRescue)
  const openToolkit = useWellnessStore((s) => s.openToolkit)

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6"
      role="banner"
    >
      {/* Logo / Wordmark */}
      <button
        onClick={goHome}
        className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-lg"
        aria-label="Serenspace – return to home"
      >
        <span
          className="w-3 h-3 rounded-full bg-[var(--grad-calm)] shadow-sm"
          aria-hidden="true"
        />
        <span className="font-bold text-[var(--text-main)] tracking-tight text-lg group-hover:opacity-70 transition-all">
          Seren<span className="text-[var(--color-primary)]">Space</span>
        </span>
      </button>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={openToolkit}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--text-main)] transition-all"
        >
          Toolkit
        </button>

        <button
          onClick={openRescue}
          className="px-4 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full transition-all flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-600 shadow-sm"
          aria-label="Open emergency rescue"
        >
          <Zap size={14} className="fill-rose-500" />
          Rescue
        </button>

        <button
          onClick={onOpenPrefs}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-full hover:bg-white/5"
          aria-label="Open preferences"
        >
          <Settings size={20} />
        </button>
      </div>
    </motion.header>
  )
}

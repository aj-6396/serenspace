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

export default function NavBar() {
  const goHome = useWellnessStore((s) => s.goHome)
  const openRescue = useWellnessStore((s) => s.openRescue)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-6 md:px-12 py-4
      "
      role="banner"
    >
      {/* Logo / Wordmark */}
      <button
        onClick={goHome}
        className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-[#f6c857] rounded-lg"
        aria-label="Serenspace – return to home"
        id="nav-logo"
      >
        {/* Breathing dot */}
        <span
          className="w-2.5 h-2.5 rounded-full animate-pulse-soft"
          style={{ background: 'linear-gradient(135deg, #f6c857, #9fcba9)' }}
          aria-hidden="true"
        />
        <span className="font-semibold text-[#f0ece6] tracking-wide text-sm group-hover:text-[#f6c857] transition-colors">
          Seren<span className="text-[#f6c857]">space</span>
        </span>
      </button>

      {/* Right Actions: Privacy badge & Settings */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex items-center gap-1.5 px-3 py-1.5 rounded-full
            text-xs text-[var(--text-muted)] border border-[var(--border-subtle)]
            select-none bg-[var(--bg-card)] backdrop-blur-md
          "
          title="Nothing you do here is stored, tracked, or shared"
          aria-label="Privacy notice: nothing is stored or tracked"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 2.5v3M5 7v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Private & local
        </div>

        <button
          onClick={openRescue}
          className="px-3 py-1.5 bg-[var(--color-primary)]/15 hover:bg-[var(--color-primary)]/30 border border-[var(--color-primary)]/30 hover:border-[var(--color-primary)]/50 rounded-full transition-all flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] shadow-sm"
          aria-label="Open emergency rescue calming sequence"
        >
          <Zap className="w-3.5 h-3.5 fill-[var(--color-primary)]" />
          Rescue
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-full hover:bg-white/5"
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <SettingsMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </motion.header>
  )
}

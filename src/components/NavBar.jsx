import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Zap, Menu, X, LayoutGrid, HeartPulse } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

export default function NavBar({ onOpenPrefs }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const goHome = useWellnessStore((s) => s.goHome)
  const openRescue = useWellnessStore((s) => s.openRescue)
  const openToolkit = useWellnessStore((s) => s.openToolkit)

  const handleNav = (fn) => {
    fn()
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-16 py-6 sm:py-8 backdrop-blur-md bg-white/10"
      role="banner"
    >
      {/* Logo / Wordmark */}
      <button
        onClick={() => handleNav(goHome)}
        className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xl relative z-[60]"
        aria-label="SerenSpace – return to home"
      >
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 rounded-full bg-[var(--color-primary)] animate-ping opacity-20" />
          <div className="relative w-full h-full rounded-full bg-[var(--grad-calm)] shadow-sm" />
        </div>
        <span className="font-sans font-semibold text-[var(--text-main)] tracking-tight text-lg sm:text-xl group-hover:opacity-70 transition-all">
          Seren<span className="text-[var(--color-primary)]">Space</span>
        </span>
      </button>

      {/* Right Actions - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={openToolkit}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--text-main)] transition-all bg-white/20 backdrop-blur-sm h-11"
        >
          Toolkit
        </button>

        <button
          onClick={openRescue}
          className="px-5 py-2 bg-[var(--color-caution)]/10 hover:bg-[var(--color-caution)]/20 border border-[var(--color-caution)]/20 rounded-full transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-caution)] shadow-sm h-11"
        >
          <Zap size={14} className="fill-[var(--color-caution)]" />
          Rescue
        </button>

        <button
          onClick={onOpenPrefs}
          className="p-2.5 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-full hover:bg-white/50 backdrop-blur-sm h-11 w-11 flex items-center justify-center"
        >
          <Settings size={22} />
        </button>
      </div>

      {/* Mobile Toggle & Quick Actions */}
      <div className="flex md:hidden items-center gap-2 relative z-[60]">
        <button
          onClick={openRescue}
          className="p-2.5 bg-[var(--color-caution)]/10 text-[var(--color-caution)] rounded-full h-11 w-11 flex items-center justify-center"
          aria-label="Quick rescue"
        >
          <Zap size={20} className="fill-[var(--color-caution)]" />
        </button>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 text-[var(--text-muted)] bg-white/40 backdrop-blur-sm rounded-full h-11 w-11 flex items-center justify-center transition-all"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-2xl md:hidden flex flex-col pt-32 px-6 pb-12 space-y-8"
          >
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] ml-2">Navigation</p>
              <button
                onClick={() => handleNav(openToolkit)}
                className="w-full flex items-center justify-between p-6 rounded-[32px] bg-slate-50 border border-slate-100 text-left group active:scale-95 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-600">
                    <LayoutGrid size={24} />
                  </div>
                  <span className="text-lg font-bold text-[var(--text-main)] font-heading">Wellness Toolkit</span>
                </div>
                <X size={20} className="rotate-45 text-teal-300" />
              </button>

              <button
                onClick={() => handleNav(openRescue)}
                className="w-full flex items-center justify-between p-6 rounded-[32px] bg-orange-50 border border-orange-100 text-left group active:scale-95 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
                    <HeartPulse size={24} />
                  </div>
                  <span className="text-lg font-bold text-[var(--text-main)] font-heading">Emergency Rescue</span>
                </div>
                <X size={20} className="rotate-45 text-orange-300" />
              </button>
            </div>

            <div className="flex flex-col gap-4 pt-8 border-t border-slate-100">
              <button
                onClick={() => handleNav(onOpenPrefs)}
                className="w-full flex items-center gap-4 p-4 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <Settings size={20} />
                <span className="font-bold text-sm uppercase tracking-widest">Preferences</span>
              </button>
            </div>

            <div className="mt-auto text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">SerenSpace PWA v4.0</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

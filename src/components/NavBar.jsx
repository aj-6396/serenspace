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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-10 md:px-20 py-5 sm:py-8 backdrop-blur-xl bg-white/5 border-b border-white/10"
      role="banner"
    >
      {/* Logo / Wordmark */}
      <button
        onClick={() => handleNav(goHome)}
        className="flex items-center gap-4 group focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xl relative z-[60]"
        aria-label="SerenSpace – return to home"
      >
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 rounded-full bg-[var(--color-primary)] animate-ping opacity-20" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-tertiary)] shadow-sm" />
        </div>
        <span className="font-sans font-bold text-[var(--text-main)] tracking-[0.2em] text-sm sm:text-base uppercase group-hover:opacity-60 transition-all">
          Seren<span className="gradient-text">Space</span>
        </span>
      </button>

      {/* Right Actions - Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <button
          onClick={openToolkit}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border border-white/20 hover:border-[var(--color-primary)] hover:text-[var(--text-main)] transition-all bg-white/20 backdrop-blur-sm h-11"
        >
          Toolkit
        </button>

        <button
          onClick={openRescue}
          className="px-6 py-2.5 bg-[var(--color-caution)] text-white rounded-full transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 hover:scale-[1.03] active:scale-[0.97] h-11"
        >
          <Zap size={14} className="fill-white" />
          Rescue
        </button>

        <div className="w-px h-6 bg-white/10 mx-2" />

        <button
          onClick={onOpenPrefs}
          className="p-2.5 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-full hover:bg-white/50 backdrop-blur-sm h-11 w-11 flex items-center justify-center border border-white/10"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Mobile Toggle & Quick Actions */}
      <div className="flex md:hidden items-center gap-3 relative z-[60]">
        <button
          onClick={openRescue}
          className="p-2.5 bg-[var(--color-caution)] text-white rounded-full h-11 w-11 flex items-center justify-center shadow-lg shadow-orange-500/10"
          aria-label="Quick rescue"
        >
          <Zap size={20} className="fill-white" />
        </button>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 text-[var(--text-muted)] bg-white/40 backdrop-blur-sm rounded-full h-11 w-11 flex items-center justify-center transition-all border border-white/20"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white/98 backdrop-blur-3xl md:hidden flex flex-col pt-32 px-6 pb-12 space-y-12"
          >
            <div className="flex flex-col gap-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-muted)] ml-4">Sanctuary Menu</p>
              
              <button
                onClick={() => handleNav(openToolkit)}
                className="w-full flex items-center justify-between p-7 rounded-[40px] bg-white border border-slate-100 shadow-sm active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-teal-50 text-teal-600">
                    <LayoutGrid size={28} />
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-bold text-[var(--text-main)] font-heading block">Wellness Toolkit</span>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Explore 15+ calming rituals</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleNav(openRescue)}
                className="w-full flex items-center justify-between p-7 rounded-[40px] bg-orange-50 border border-orange-100 shadow-sm active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-orange-100 text-orange-600">
                    <Zap size={28} />
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-bold text-[var(--text-main)] font-heading block">Rescue Mode</span>
                    <p className="text-xs text-orange-500 mt-1">Instant support when you need it</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex flex-col gap-6 pt-12 border-t border-slate-100">
              <button
                onClick={() => handleNav(onOpenPrefs)}
                className="w-full flex items-center gap-4 p-4 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                  <Settings size={20} />
                </div>
                <span className="font-bold text-sm uppercase tracking-[0.2em]">Sanctuary Settings</span>
              </button>
            </div>

            <div className="mt-auto text-center space-y-4">
              <div className="w-8 h-px bg-slate-200 mx-auto" />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">SerenSpace v4.2</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

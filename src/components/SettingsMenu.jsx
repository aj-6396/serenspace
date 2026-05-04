import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings2, Volume2, VolumeX, Eye, Activity, Palette } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

export default function SettingsMenu({ isOpen, onClose }) {
  const {
    theme, setTheme,
    soundEnabled, toggleSound,
    reduceMotion, toggleMotion,
    useDyslexicFont, toggleFont
  } = useWellnessStore()

  const THEMES = [
    { id: 'default', label: 'Charcoal' },
    { id: 'dusk', label: 'Dusk' },
    { id: 'midnight', label: 'Midnight' },
    { id: 'forest', label: 'Forest' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-16 right-6 md:right-12 z-50 w-72 glass-card p-5 shadow-2xl border border-[var(--border-subtle)]"
            role="dialog"
            aria-label="Settings and Preferences"
          >
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-4 h-4 text-muted" />
              <h3 className="text-sm font-medium tracking-wide text-[var(--text-main)] uppercase">
                Atmosphere & Needs
              </h3>
            </div>

            <div className="flex flex-col gap-5">
              {/* Theme Selector */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted mb-2">
                  <Palette className="w-3.5 h-3.5" /> Color Theme
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs transition-colors border
                        ${theme === t.id 
                          ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10' 
                          : 'border-[var(--border-subtle)] text-muted hover:text-[var(--text-main)] hover:bg-white/5'}
                      `}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-[var(--border-subtle)]" />

              {/* Toggles */}
              <div className="flex flex-col gap-3">
                <ToggleRow 
                  icon={soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  label="Ambient Soundscape"
                  isActive={soundEnabled}
                  onClick={toggleSound}
                />
                
                <ToggleRow 
                  icon={<Activity className="w-4 h-4" />}
                  label="Reduce Motion"
                  isActive={reduceMotion}
                  onClick={toggleMotion}
                />
                
                <ToggleRow 
                  icon={<Eye className="w-4 h-4" />}
                  label="Dyslexia-Friendly Font"
                  isActive={useDyslexicFont}
                  onClick={toggleFont}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ToggleRow({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full group py-1"
      aria-pressed={isActive}
    >
      <div className="flex items-center gap-2 text-sm text-[var(--text-main)] group-hover:text-[var(--color-primary)] transition-colors">
        <span className="text-muted group-hover:text-[var(--color-primary)]">{icon}</span>
        {label}
      </div>
      <div className={`
        relative w-8 h-4 rounded-full transition-colors duration-300
        ${isActive ? 'bg-[var(--color-primary)]' : 'bg-[#2e2e3d]'}
      `}>
        <div className={`
          absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-300
          ${isActive ? 'translate-x-4' : 'translate-x-0'}
        `} />
      </div>
    </button>
  )
}

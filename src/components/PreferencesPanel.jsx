import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Moon, Sun, Type, Eye, Zap, Bell, Settings } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

export default function PreferencesPanel({ isOpen, onClose }) {
  const preferences = useWellnessStore(s => s.preferences)
  const updatePreferences = useWellnessStore(s => s.updatePreferences)
  const theme = useWellnessStore(s => s.theme)
  const setTheme = useWellnessStore(s => s.setTheme)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/5 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-sm h-full bg-[var(--bg-base)]/95 backdrop-blur-2xl shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.05)] p-10 overflow-y-auto border-l border-[var(--border-subtle)]"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm">
                  <Settings size={22} />
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-main)] font-heading tracking-tight">Preferences</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 rounded-full hover:bg-[var(--color-primary)]/5 text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-12">
              {/* Appearance */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] font-heading">Appearance</h3>
                <div className="flex items-center justify-between p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--color-tertiary)]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${theme === 'midnight' ? 'bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)]' : 'bg-amber-50 text-amber-500'}`}>
                      {theme === 'midnight' ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <span className="text-sm font-bold text-[var(--text-main)] font-body">Midnight Theme</span>
                  </div>
                  <button
                    onClick={() => setTheme(theme === 'midnight' ? 'light' : 'midnight')}
                    className={`w-14 h-7 rounded-full transition-all relative ${theme === 'midnight' ? 'bg-[var(--color-tertiary)]' : 'bg-slate-200'}`}
                  >
                    <motion.div
                      animate={{ x: theme === 'midnight' ? 30 : 4 }}
                      className="absolute top-1.5 w-4 h-4 rounded-full bg-white shadow-md"
                    />
                  </button>
                </div>
              </div>

              {/* Accessibility */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] font-heading">Accessibility</h3>
                <div className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      <Type size={20} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text-main)] font-body">Font Scaling</span>
                  </div>
                  <div className="flex justify-between gap-3 p-1.5 bg-[var(--bg-base)] rounded-2xl">
                    {['S', 'M', 'L'].map(size => (
                      <button
                        key={size}
                        onClick={() => updatePreferences({ fontSize: size })}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${preferences.fontSize === size ? 'bg-[var(--bg-card)] shadow-md text-[var(--color-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                      >
                        {size === 'S' ? 'Fine' : size === 'M' ? 'Normal' : 'Large'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--color-primary)]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      <Eye size={20} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text-main)] font-body">Clarity Assist</span>
                  </div>
                  <button
                    onClick={() => updatePreferences({ highContrast: !preferences.highContrast })}
                    className={`w-14 h-7 rounded-full transition-all relative ${preferences.highContrast ? 'bg-[var(--color-primary)]' : 'bg-slate-200'}`}
                  >
                    <motion.div
                      animate={{ x: preferences.highContrast ? 30 : 4 }}
                      className="absolute top-1.5 w-4 h-4 rounded-full bg-white shadow-md"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--color-secondary)]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                      <Zap size={20} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text-main)] font-body">Calm Interface</span>
                  </div>
                  <button
                    onClick={() => updatePreferences({ lowStimulationMode: !preferences.lowStimulationMode })}
                    className={`w-14 h-7 rounded-full transition-all relative ${preferences.lowStimulationMode ? 'bg-[var(--color-secondary)]' : 'bg-slate-200'}`}
                  >
                    <motion.div
                      animate={{ x: preferences.lowStimulationMode ? 30 : 4 }}
                      className="absolute top-1.5 w-4 h-4 rounded-full bg-white shadow-md"
                    />
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] font-heading">Nurturing</h3>
                <div className="flex items-center justify-between p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--color-caution)]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[var(--color-caution)]/10 text-[var(--color-caution)]">
                      <Bell size={20} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text-main)] font-body">Daily Nudges</span>
                  </div>
                  <button
                    onClick={() => updatePreferences({ dailyReminder: !preferences.dailyReminder })}
                    className={`w-14 h-7 rounded-full transition-all relative ${preferences.dailyReminder ? 'bg-[var(--color-caution)]' : 'bg-slate-200'}`}
                  >
                    <motion.div
                      animate={{ x: preferences.dailyReminder ? 30 : 4 }}
                      className="absolute top-1.5 w-4 h-4 rounded-full bg-white shadow-md"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-10 border-t border-[var(--border-subtle)]">
              <p className="text-[10px] text-slate-400 text-center leading-relaxed font-body uppercase tracking-widest font-bold">
                Privacy Protected<br/>Local Workspace only
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

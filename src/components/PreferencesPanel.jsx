import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Moon, Sun, Type, Eye, Zap, Bell, Settings } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

export default function PreferencesPanel({ isOpen, onClose }) {
  const preferences = useWellnessStore(s => s.preferences)
  const updatePreferences = useWellnessStore(s => s.updatePreferences)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/10 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-sm h-full bg-white shadow-2xl p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <Settings size={20} className="text-[var(--text-muted)]" />
                <h2 className="text-xl font-bold text-[var(--text-main)]">Preferences</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-all text-[var(--text-muted)]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-10">
              {/* Appearance */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Appearance</h3>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Moon size={18} className="text-purple-500" />
                    <span className="text-sm font-medium">Dark Mode</span>
                  </div>
                  <button
                    onClick={() => updatePreferences({ darkMode: !preferences.darkMode })}
                    className={`w-12 h-6 rounded-full transition-all relative ${preferences.darkMode ? 'bg-purple-500' : 'bg-gray-200'}`}
                  >
                    <motion.div
                      animate={{ x: preferences.darkMode ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>
              </div>

              {/* Text Size */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Accessibility</h3>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Type size={18} className="text-blue-500" />
                    <span className="text-sm font-medium">Text Size</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    {['S', 'M', 'L'].map(size => (
                      <button
                        key={size}
                        onClick={() => updatePreferences({ fontSize: size })}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${preferences.fontSize === size ? 'bg-white shadow-sm border border-blue-200 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {size === 'S' ? 'Small' : size === 'M' ? 'Medium' : 'Large'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Eye size={18} className="text-emerald-500" />
                    <span className="text-sm font-medium">High Contrast</span>
                  </div>
                  <button
                    onClick={() => updatePreferences({ highContrast: !preferences.highContrast })}
                    className={`w-12 h-6 rounded-full transition-all relative ${preferences.highContrast ? 'bg-emerald-500' : 'bg-gray-200'}`}
                  >
                    <motion.div
                      animate={{ x: preferences.highContrast ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Zap size={18} className="text-amber-500" />
                    <span className="text-sm font-medium">Reduce Intensity</span>
                  </div>
                  <button
                    onClick={() => updatePreferences({ lowStimulationMode: !preferences.lowStimulationMode })}
                    className={`w-12 h-6 rounded-full transition-all relative ${preferences.lowStimulationMode ? 'bg-amber-500' : 'bg-gray-200'}`}
                  >
                    <motion.div
                      animate={{ x: preferences.lowStimulationMode ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Reminders</h3>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Bell size={18} className="text-rose-500" />
                    <span className="text-sm font-medium">Daily Reminder</span>
                  </div>
                  <button
                    onClick={() => updatePreferences({ dailyReminder: !preferences.dailyReminder })}
                    className={`w-12 h-6 rounded-full transition-all relative ${preferences.dailyReminder ? 'bg-rose-500' : 'bg-gray-200'}`}
                  >
                    <motion.div
                      animate={{ x: preferences.dailyReminder ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                Your preferences are saved locally to your device.<br/>SerenSpace Privacy Protocol v3.0
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

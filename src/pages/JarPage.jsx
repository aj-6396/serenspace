import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { Plus, Trash2, Sparkles } from 'lucide-react'

export default function JarPage() {
  const goHome = useWellnessStore((s) => s.goHome)
  const jarMessages = useWellnessStore((s) => s.jarMessages)
  const addJarMessage = useWellnessStore((s) => s.addJarMessage)
  const removeJarMessage = useWellnessStore((s) => s.removeJarMessage)

  const [newMessage, setNewMessage] = useState('')
  const [pulledMessage, setPulledMessage] = useState(null)

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    addJarMessage(newMessage.trim())
    setNewMessage('')
  }

  const handlePull = () => {
    if (!jarMessages.length) return
    const randomIndex = Math.floor(Math.random() * jarMessages.length)
    setPulledMessage(jarMessages[randomIndex])
  }

  return (
    <main
      aria-label="Kind Messages Jar"
      className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-12"
    >
      {/* Header back */}
      <motion.button
        onClick={goHome}
        className="absolute top-20 left-6 md:left-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm flex items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        ← Back
      </motion.button>

      <div className="w-full max-w-xl flex flex-col gap-10">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-wider text-[var(--color-primary)] uppercase mb-3">
            Kind Messages Jar
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-main)] mb-2">
            Notes for difficult days.
          </h1>
          <p className="text-[var(--text-muted)] text-sm max-w-xs mx-auto leading-relaxed">
            Write down a supportive note to yourself when you're feeling well, and open them when you're struggling.
          </p>
        </div>

        {/* ── Visual Jar / Random Pull ── */}
        <div className="glass-card w-full p-6 text-center flex flex-col items-center gap-6 relative overflow-hidden min-h-[220px] justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/5 via-transparent to-[var(--color-secondary)]/5 pointer-events-none" />

          {pulledMessage ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={pulledMessage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <Sparkles className="w-8 h-8 text-[var(--color-primary)]" />
                <p className="text-lg text-[var(--text-main)] font-medium leading-relaxed max-w-sm italic">
                  "{pulledMessage}"
                </p>
                <button
                  onClick={handlePull}
                  className="mt-2 text-xs text-[var(--color-primary)] hover:underline"
                >
                  Draw another message →
                </button>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <span className="text-5xl" aria-hidden="true">🏺</span>
              <p className="text-sm text-[var(--text-muted)] max-w-xs">
                Need a kind word right now? Reach into the jar.
              </p>
              <button
                onClick={handlePull}
                disabled={jarMessages.length === 0}
                className="
                  px-6 py-2.5 rounded-xl border border-[var(--color-primary)]/25 text-[var(--color-primary)]
                  hover:bg-[var(--color-primary)]/10 transition-all font-medium text-sm disabled:opacity-40
                "
              >
                Pull a note from the jar
              </button>
            </div>
          )}
        </div>

        {/* ── Add New Note ── */}
        <form onSubmit={handleAdd} className="w-full flex gap-3">
          <input
            type="text"
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--color-primary)] text-[var(--text-main)] outline-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
            placeholder="Add a kind word to the jar..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl transition-all duration-200 disabled:opacity-40"
            aria-label="Add note"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* ── List of Messages ── */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Your Kind Notes ({jarMessages.length})
          </p>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {jarMessages.map((msg, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3.5 bg-[var(--bg-card)]/50 border border-[var(--border-subtle)]/60 rounded-xl"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                <p className="text-sm text-[var(--text-main)] leading-normal flex-1 pr-3">
                  {msg}
                </p>
                <button
                  onClick={() => removeJarMessage(index)}
                  className="text-[var(--text-muted)] hover:text-red-400 transition-colors duration-200"
                  aria-label="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            {jarMessages.length === 0 && (
              <p className="text-xs text-[var(--text-muted)] text-center py-4 italic">
                The jar is empty right now. Write something kind for your future self.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

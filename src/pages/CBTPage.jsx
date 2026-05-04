import React, { useState } from 'react'
import { motion } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { AlertCircle, Download, CheckCircle } from 'lucide-react'

export default function CBTPage() {
  const goHome = useWellnessStore((s) => s.goHome)

  const [thought, setThought] = useState('')
  const [evidence, setEvidence] = useState('')
  const [alternative, setAlternative] = useState('')
  const [hasExported, setHasExported] = useState(false)

  const handleExport = () => {
    if (!thought.trim()) return

    const content = `=== Serenspace CBT Takeaways ===
Session Date: ${new Date().toLocaleDateString()}

1. The Original Thought:
"${thought}"

2. Facts & Evidence Supporting/Contradicting the Thought:
"${evidence || "No facts documented."}"

3. A Balanced, Compassionate Alternative:
"${alternative || "No balanced alternative documented."}"

This is a local cognitive restructuring takeaway from your session. You are safe.
Disclaimer: This is not a medical advisory, please consult a healthcare professional.
`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `serenspace-cbt-takeaways-${Date.now()}.txt`
    link.click()
    URL.revokeObjectURL(url)

    setHasExported(true)
    setTimeout(() => setHasExported(false), 4000)
  }

  return (
    <main
      aria-label="CBT Cognitive Restructuring"
      className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12"
    >
      <motion.button
        onClick={goHome}
        className="absolute top-20 left-6 md:left-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm flex items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        ← Back
      </motion.button>

      <div className="w-full max-w-2xl flex flex-col gap-8">
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold tracking-wider text-[var(--color-primary)] uppercase mb-2">
            CBT Cognitive Restructuring
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-main)] mb-2">
            Unpack Your Thoughts.
          </h1>
          <p className="text-[var(--text-muted)] text-sm max-w-md leading-relaxed">
            Examine your thoughts with balance and kindness to break down automatic assumptions.
          </p>
        </div>

        {/* ── Steps Inputs ──────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-5 border border-[var(--border-subtle)] space-y-3">
            <label className="block text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
              Step 1: The Automatic Negative Thought
            </label>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              What critical or negative thing are you telling yourself right now?
            </p>
            <textarea
              className="textarea-calm w-full p-4 text-sm"
              style={{ minHeight: '80px' }}
              placeholder="e.g., 'I will never be successful at this.'"
              value={thought}
              onChange={(e) => setThought(e.target.value)}
            />
          </div>

          <div className="glass-card p-5 border border-[var(--border-subtle)] space-y-3">
            <label className="block text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
              Step 2: Facts and Evidence
            </label>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              What are the objective, factual truths that support or oppose this thought?
            </p>
            <textarea
              className="textarea-calm w-full p-4 text-sm"
              style={{ minHeight: '80px' }}
              placeholder="e.g., 'I failed on my attempt today, but I've succeeded before. Progress is non-linear.'"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
            />
          </div>

          <div className="glass-card p-5 border border-[var(--border-subtle)] space-y-3">
            <label className="block text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
              Step 3: A Balanced Alternative Perspective
            </label>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              How would you talk to a good friend who is experiencing this thought?
            </p>
            <textarea
              className="textarea-calm w-full p-4 text-sm"
              style={{ minHeight: '80px' }}
              placeholder="e.g., 'It is okay to find this difficult. I am learning. One small challenge doesn't define my future.'"
              value={alternative}
              onChange={(e) => setAlternative(e.target.value)}
            />
          </div>
        </div>

        {/* Action button row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--bg-card)]/40 border border-[var(--border-subtle)] p-4 rounded-2xl">
          <p className="text-xs text-[var(--text-muted)] text-center sm:text-left max-w-xs leading-relaxed">
            Download your session takeaways locally to look at them whenever you need a reminder.
          </p>

          <button
            onClick={handleExport}
            disabled={!thought.trim()}
            className="w-full sm:w-auto px-6 py-3.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-xl transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {hasExported ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Downloaded
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export Takeaways
              </>
            )}
          </button>
        </div>

        {/* Medical disclaimer note */}
        <div className="flex gap-2 items-start bg-black/10 p-3.5 rounded-xl border border-[var(--border-subtle)]/60 max-w-md mx-auto text-left mt-2 select-none">
          <AlertCircle className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-normal text-[var(--text-muted)]">
            <strong>Important Disclaimer:</strong> This guided cognitive reflection tool is provided as a supportive resource only. It is not a medical advisory or a replacement for professional clinical care. Please seek consultation from a qualified doctor or healthcare professional.
          </p>
        </div>
      </div>
    </main>
  )
}

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, ChevronLeft, Calendar, Trash2 } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

const PROMPTS = [
  "What is bothering you today?",
  "What made you smile today?",
  "What is one thing you’re grateful for?",
  "What would make today a win for you?",
  "How did you handle a challenge today?",
  "Describe a moment of peace you felt today."
]

export default function SmartJournal() {
  const [entry, setEntry] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  
  const addJournalEntry = useWellnessStore(s => s.addJournalEntry)
  const journalEntries = useWellnessStore(s => s.journalEntries)
  const goHome = useWellnessStore(s => s.goHome)
  const updateStreak = useWellnessStore(s => s.updateStreak)

  useEffect(() => {
    // Rotate prompt every day or on refresh
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    setCurrentPrompt(dayOfYear % PROMPTS.length)
  }, [])

  const handleSave = () => {
    if (!entry.trim()) return
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      prompt: PROMPTS[currentPrompt],
      content: entry.trim()
    }
    
    addJournalEntry(newEntry)
    updateStreak()
    setEntry('')
    alert('Entry saved to your device.')
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-6 py-12 min-h-[80vh]">
      <div className="w-full flex justify-between items-center mb-8">
        <button onClick={goHome} className="text-[var(--text-muted)] flex items-center gap-2 hover:text-[var(--text-main)] transition-colors">
          <ChevronLeft size={20} /> Back
        </button>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 rounded-full border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--color-primary)] transition-all"
        >
          {showHistory ? 'New Entry' : 'Past Entries'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showHistory ? (
          <motion.div 
            key="new-entry"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h1 className="text-3xl font-semibold mb-2 text-[var(--text-main)]">Reflect</h1>
            <p className="text-[var(--text-muted)] mb-8">{PROMPTS[currentPrompt]}</p>
            
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Start writing here..."
              className="w-full h-64 p-6 rounded-3xl bg-white/50 border border-[var(--border-subtle)] focus:border-[var(--color-primary)] transition-all resize-none text-[var(--text-main)] outline-none"
            />
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                disabled={!entry.trim()}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-primary)] text-white font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
              >
                <Save size={18} /> Save Entry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-6"
          >
            <h1 className="text-3xl font-semibold mb-8 text-[var(--text-main)]">Your Journey</h1>
            
            {journalEntries.length === 0 ? (
              <div className="text-center py-20 text-[var(--text-muted)]">
                No entries yet. Start your journey today.
              </div>
            ) : (
              journalEntries.map(e => (
                <div key={e.id} className="p-6 rounded-2xl bg-white/40 border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2">
                    <Calendar size={12} /> {e.date}
                  </div>
                  <h3 className="text-sm font-medium text-[var(--text-muted)] mb-4">{e.prompt}</h3>
                  <p className="text-[var(--text-main)] leading-relaxed italic">"{e.content}"</p>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

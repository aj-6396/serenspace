import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, ChevronLeft, Calendar, Trash2, Wind, Sparkles } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'
import InfoTooltip from './InfoTooltip'

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
  const [saveStatus, setSaveStatus] = useState(null)
  
  const addJournalEntry = useWellnessStore(s => s.addJournalEntry)
  const journalEntries = useWellnessStore(s => s.journalEntries)
  const selectedEmotion = useWellnessStore(s => s.selectedEmotion)
  const goHome = useWellnessStore(s => s.goHome)
  const updateStreak = useWellnessStore(s => s.updateStreak)

  const [isReframeOpen, setIsReframeOpen] = useState(false)
  const [isDissolving, setIsDissolving] = useState(false)

  const isNegativeMood = ['sad', 'angry', 'anxious'].includes(selectedEmotion)

  useEffect(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    setCurrentPrompt(dayOfYear % PROMPTS.length)
  }, [])

  const handleSave = () => {
    if (!entry.trim()) return
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      prompt: PROMPTS[currentPrompt],
      content: entry.trim(),
      emotionId: selectedEmotion
    }
    
    addJournalEntry(newEntry)
    updateStreak()
    setEntry('')
    setIsReframeOpen(false)
    setSaveStatus('Entry secured.')
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleLetItGo = () => {
    setIsDissolving(true)
    setTimeout(() => {
      setEntry('')
      setIsDissolving(false)
      setIsReframeOpen(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 sm:px-8 py-10 sm:py-20 min-h-[90vh]">
      <div className="w-full flex justify-between items-center mb-8 sm:mb-12">
        <button onClick={goHome} className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors h-11 px-2">
          <ChevronLeft size={18} /> Back
        </button>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="px-5 sm:px-6 py-2.5 rounded-full border border-[var(--border-subtle)] text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--text-main)] transition-all bg-white/20 h-11"
        >
          {showHistory ? 'New Entry' : 'Journal'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showHistory ? (
          <motion.div 
            key="new-entry"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full space-y-8 sm:space-y-10"
          >
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] font-heading flex items-center gap-3 tracking-tight">
                Reflect
                <InfoTooltip text="Writing your thoughts helps process heavy emotions by moving them from the reactive amygdala to the reflective prefrontal cortex." />
              </h1>
              <p className="text-[var(--text-muted)] font-body text-base sm:text-lg leading-relaxed">{PROMPTS[currentPrompt]}</p>
            </div>
            
            {isNegativeMood && (
              <div className="space-y-4">
                <button
                  onClick={() => setIsReframeOpen(!isReframeOpen)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-tertiary)] hover:opacity-80 transition-all px-2 py-1"
                >
                  <Sparkles size={14} /> {isReframeOpen ? 'Focusing on Reflection' : 'Explore a Reframe?'}
                </button>
                <AnimatePresence>
                  {isReframeOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-5 sm:p-6 rounded-[28px] bg-[var(--color-tertiary)]/5 border border-[var(--color-tertiary)]/10 text-sm sm:text-base text-[var(--color-tertiary)] font-body leading-relaxed shadow-sm"
                    >
                      <strong className="font-heading">Cognitive Inquiry:</strong> What is one small piece of evidence, however tiny, that might offer a different perspective on this feeling?
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            <div className="relative">
              <motion.textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                animate={isDissolving ? { 
                  opacity: 0, 
                  scale: 0.95, 
                  filter: 'blur(12px)',
                  y: -40
                } : { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                placeholder="Let your thoughts flow here..."
                className="w-full h-64 sm:h-80 p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] glass-card bg-white/40 focus:bg-white/60 focus:border-[var(--color-primary)] transition-all resize-none text-[var(--text-main)] outline-none font-body text-base sm:text-lg leading-relaxed shadow-inner"
              />
              
              <AnimatePresence>
                {isDissolving && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 1, x: '50%', y: '50%' }}
                        animate={{ 
                          opacity: 0, 
                          x: `${Math.random() * 120 - 10}%`, 
                          y: `${Math.random() * 120 - 10}%`,
                          scale: 0
                        }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="absolute w-3 h-3 rounded-full bg-[var(--color-tertiary)]/20 blur-sm"
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {saveStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest border border-emerald-100 shadow-sm"
                >
                  {saveStatus}
                </motion.div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                onClick={handleLetItGo}
                disabled={!entry.trim() || isDissolving}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 sm:py-5 rounded-[24px] border border-[var(--color-caution)]/20 text-[var(--color-caution)] font-heading font-bold text-sm hover:bg-[var(--color-caution)]/5 transition-all disabled:opacity-30 min-h-[56px]"
              >
                <Wind size={20} /> Release it
              </button>
              <button
                onClick={handleSave}
                disabled={!entry.trim() || isDissolving}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 sm:py-5 rounded-[24px] bg-[var(--color-primary)] text-white font-heading font-bold text-sm shadow-xl shadow-teal-500/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale min-h-[56px]"
              >
                <Save size={20} /> Save reflection
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="history"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8 sm:space-y-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] font-heading tracking-tight">Your Journey</h1>
            
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {journalEntries.length === 0 ? (
                <div className="text-center py-20 text-[var(--text-muted)] font-body italic">
                  No entries yet. Every journey begins with a single reflection.
                </div>
              ) : (
                journalEntries.map(e => (
                  <div key={e.id} className="p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] glass-card bg-white/40 space-y-4">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                      <Calendar size={14} /> {e.date}
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-muted)] font-heading leading-tight">{e.prompt}</h3>
                    <p className="text-[var(--text-main)] font-body leading-relaxed italic text-base sm:text-lg opacity-90">"{e.content}"</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { Wind, Brain, Heart, ChevronLeft, ArrowRight, Zap } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

const SECTIONS = [
  {
    title: "Breathing & Grounding",
    icon: <Wind size={20} className="text-blue-500" />,
    items: [
      { name: "4-7-8 Breathing", desc: "For deep relaxation and sleep.", view: "breathe" },
      { name: "Box Breathing", desc: "For focus and stress management.", view: "breathe" },
      { name: "Body Scan", desc: "To release physical tension.", view: "pmr" },
      { name: "5-4-3-2-1 Grounding", desc: "To snap back to reality.", view: "grounding" }
    ]
  },
  {
    title: "Mindful Moments",
    icon: <Heart size={20} className="text-rose-500" />,
    items: [
      { name: "Awareness of Breath", desc: "1-minute simple focus.", view: "stillness" },
      { name: "Awareness of Sounds", desc: "Ground yourself in your environment.", view: "stillness" },
      { name: "Kindness Jar", desc: "Read some warm messages.", view: "jar" }
    ]
  },
  {
    title: "CBT Prompts",
    icon: <Brain size={20} className="text-purple-500" />,
    items: [
      { name: "Thought Stuck?", desc: "Identify one thought keeping you stuck.", view: "cbt" },
      { name: "Friend Test", desc: "What would you say to a friend?", view: "cbt" },
      { name: "Smallest Action", desc: "What's one tiny step you can take?", view: "cbt" }
    ]
  }
]

export default function ToolkitPage() {
  const goHome = useWellnessStore(s => s.goHome)
  const setView = useWellnessStore(s => s.setView)

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-24 pb-32 max-w-4xl mx-auto">
      <div className="w-full flex justify-between items-center mb-12">
        <button onClick={goHome} className="text-[var(--text-muted)] flex items-center gap-2 hover:text-[var(--text-main)] transition-colors">
          <ChevronLeft size={20} /> Back
        </button>
        <h1 className="text-3xl font-bold text-[var(--text-main)]">Toolkit</h1>
      </div>

      <div className="w-full space-y-12">
        {SECTIONS.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-white/50 border border-[var(--border-subtle)] shadow-sm">
                {section.icon}
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-main)]">{section.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setView(item.view)}
                  className="p-6 rounded-3xl bg-white/40 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] hover:bg-white/60 transition-all text-left group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-[var(--text-main)]">{item.name}</span>
                    <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 p-8 rounded-3xl bg-[var(--grad-soft)] border border-[var(--color-primary)]/20 text-center"
      >
        <Zap size={24} className="text-[var(--color-primary)] mx-auto mb-4" />
        <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">Need a quick reset?</h3>
        <p className="text-sm text-[var(--text-muted)] mb-6">Try the 3-minute mini-ritual for an instant mental recharge.</p>
        <button
          onClick={() => setView('breathe')}
          className="px-8 py-3 rounded-2xl bg-[var(--color-primary)] text-white font-bold shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          Start 3-Minute Reset
        </button>
      </motion.div>
    </div>
  )
}

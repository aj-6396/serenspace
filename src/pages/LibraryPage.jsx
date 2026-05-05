import React from 'react'
import { motion } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { BookOpen, ArrowLeft, Brain, Wind, Heart, Shield, HelpCircle } from 'lucide-react'

const ARTICLES = [
  {
    icon: <Wind className="w-5 h-5" />,
    title: "Why Breathing Works",
    excerpt: "The Vagus Nerve is the secret highway to calm. When you exhale longer than you inhale, you tell your brain to stop the 'Fight or Flight' response.",
    content: "When we are stressed, our sympathetic nervous system is dominant. Deep, rhythmic breathing activates the Parasympathetic Nervous System. By consciously slowing our breath, we physically signal the brain that there is no immediate threat, allowing the heart rate to drop and muscles to relax."
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "The Power of CBT",
    excerpt: "Your thoughts aren't always facts. Cognitive Behavioral Therapy helps you catch 'Distortions' before they become moods.",
    content: "CBT is based on the idea that our thoughts, feelings, and behaviors are interconnected. Often, we fall into 'Thinking Traps' like Catastrophizing (expecting the worst) or Black-and-White thinking. Catching these thoughts and challenging them with evidence-based reality can break the cycle of anxiety."
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Grounding 101",
    excerpt: "Feeling 'floaty' or disconnected? Grounding pulls your focus back to the physical world to stop a panic attack in its tracks.",
    content: "Grounding techniques, like the 5-4-3-2-1 method, use your five senses to anchor you in the 'Now.' During panic or high stress, the brain often dwells in the past (regret) or future (fear). Sensory focus forces the mind back to the immediate, safe environment."
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "The Importance of Venting",
    excerpt: "Keeping thoughts inside makes them feel bigger than they are. Writing them down 'externalizes' them, making them manageable.",
    content: "Research shows that 'Affect Labeling'—putting your feelings into words—decreases activity in the emotional centers of the brain. When you vent onto the screen, you are effectively taking a chaotic internal experience and turning it into a structured external one, which is easier for the brain to process."
  }
]

export default function LibraryPage() {
  const goHome = useWellnessStore((s) => s.goHome)

  return (
    <main className="flex flex-col items-center min-h-screen px-6 pt-24 pb-12 overflow-x-hidden">
      <motion.button
        onClick={goHome}
        className="absolute top-24 left-6 md:left-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm flex items-center gap-1.5 z-30"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </motion.button>

      <div className="w-full max-w-4xl flex flex-col gap-10">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
            <div className="p-2.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]">Wellness Library</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-main)]">Knowledge is Healing.</h1>
          <p className="text-[var(--text-muted)] text-sm max-w-md mt-2">
            Understand the biological and psychological science behind the tools you use in Serenspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((article, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 border border-[var(--border-subtle)] space-y-4 hover:border-[var(--color-primary)] transition-all cursor-default"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 text-[var(--text-main)] rounded-lg">
                  {article.icon}
                </div>
                <h3 className="font-bold text-[var(--text-main)]">{article.title}</h3>
              </div>
              <p className="text-xs text-[var(--text-main)] font-medium leading-relaxed">
                {article.excerpt}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                {article.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2 items-start bg-black/10 p-5 rounded-xl border border-[var(--border-subtle)]/60 max-w-2xl mx-auto">
          <HelpCircle className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-bold text-[var(--text-main)]">Need more help?</p>
            <p className="text-[11px] leading-normal text-[var(--text-muted)]">
              This library is for educational purposes. If you are experiencing persistent or severe emotional distress, we strongly recommend reaching out to a licensed professional who can provide tailored clinical support.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

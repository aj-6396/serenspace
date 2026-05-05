import React from 'react'
import { motion } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { ShieldCheck, EyeOff, Lock, Heart } from 'lucide-react'

export default function OnboardingOverlay() {
  const completeOnboarding = useWellnessStore((s) => s.completeOnboarding)

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-card max-w-lg w-full p-8 md:p-12 border border-white/10 text-center space-y-8"
      >
        <div className="flex justify-center">
          <div className="p-4 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
            <ShieldCheck className="w-8 h-8" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Your Sanctuary is Private.</h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed">
            Before we begin, we want you to know that Serenspace is built on a foundation of absolute privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="space-y-2">
            <Lock className="w-4 h-4 text-[var(--color-primary)]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-main)]">No Login</p>
            <p className="text-[10px] text-[var(--text-muted)]">No accounts, no emails, no identification.</p>
          </div>
          <div className="space-y-2">
            <EyeOff className="w-4 h-4 text-[var(--color-primary)]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-main)]">No Tracking</p>
            <p className="text-[10px] text-[var(--text-muted)]">We never see what you type or how you feel.</p>
          </div>
          <div className="space-y-2">
            <Heart className="w-4 h-4 text-[var(--color-primary)]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-main)]">Device Only</p>
            <p className="text-[10px] text-[var(--text-muted)]">All data stays strictly on this device.</p>
          </div>
        </div>

        <button 
          onClick={completeOnboarding}
          className="w-full py-4 bg-[var(--color-primary)] text-black rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
        >
          I understand, let's begin
        </button>

        <p className="text-[10px] text-[var(--text-muted)] italic">
          By continuing, you agree that this is a supportive tool and not a replacement for clinical therapy.
        </p>
      </motion.div>
    </motion.div>
  )
}

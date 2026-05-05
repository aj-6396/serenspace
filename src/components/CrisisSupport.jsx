import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, AlertCircle, X, ChevronUp, Heart, Wind, ExternalLink } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'
import { DisclaimerBanner, SeveritySignal } from './ClinicalSignals'
import GroundingModule from './GroundingModule'
import InfoTooltip from './InfoTooltip'

export default function CrisisSupport() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* ── Persistent Trigger ──────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[90]">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-rose-50/90 backdrop-blur-md border border-rose-200 p-4 rounded-3xl shadow-xl flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-rose-500 p-2 rounded-full text-white group-hover:scale-110 transition-transform">
              <Phone size={18} />
            </div>
            <div className="text-left">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-600">Need urgent help?</h4>
              <p className="text-sm font-semibold text-rose-900">India: 1800-599-0019</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[9px] text-rose-700/60 leading-tight max-w-[150px] text-left">
              <AlertCircle size={12} className="shrink-0" />
              <span>Not a replacement for professional therapy.</span>
            </div>
            <ChevronUp size={20} className="text-rose-400" />
          </div>
        </motion.button>
      </div>

      {/* ── Expandable Support Sheet ────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-white rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 pb-0 flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
                  <Heart size={24} />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-rose-50 text-rose-400 hover:text-rose-600 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 pt-6 max-h-[80vh] overflow-y-auto space-y-10 custom-scrollbar">
                <header className="space-y-3">
                  <h2 className="text-3xl font-bold text-rose-900 tracking-tight">You’re not alone.</h2>
                  <p className="text-sm text-rose-800/80 leading-relaxed font-medium">
                    It takes courage to ask for help. If you're feeling overwhelmed, please use the resources below.
                  </p>
                </header>

                <SeveritySignal />

                {/* Grounding Section */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-rose-900/60">Snap back to reality</h3>
                    <InfoTooltip text="Grounding techniques help disconnect you from emotional pain or distress." />
                  </div>
                  <div className="bg-rose-50/30 p-6 rounded-3xl border border-rose-100">
                    <GroundingModule />
                  </div>
                </section>

                {/* Helpline Card */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-rose-900/60">Direct Support</h3>
                  <div className="p-6 rounded-3xl bg-[var(--grad-soft)] border border-rose-200 shadow-xl shadow-rose-500/10">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-white/80 text-rose-600 shadow-sm">
                          <Phone size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-rose-900/60 uppercase tracking-widest mb-1">National Helpline (India)</p>
                          <a href="tel:18005990019" className="text-2xl font-bold text-rose-900 hover:text-rose-600 transition-colors">
                            1800-599-0019
                          </a>
                        </div>
                      </div>
                      
                      <button className="w-full py-4 rounded-2xl bg-white border border-rose-200 text-rose-900 font-bold flex items-center justify-center gap-3 hover:bg-rose-50 transition-all shadow-sm">
                        <Heart size={18} className="fill-rose-500 text-rose-500" />
                        Speak to a counselor
                      </button>
                    </div>
                  </div>
                </section>

                <DisclaimerBanner />

                <div className="pt-4 pb-4">
                  <p className="text-[10px] text-rose-300 text-center uppercase tracking-widest font-bold">
                    Stay safe. You are important.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

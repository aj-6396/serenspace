import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, AlertCircle, X, ChevronUp, Heart, Wind, ExternalLink } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'
import { DisclaimerBanner, SeveritySignal } from './ClinicalSignals'
import GroundingModule from './GroundingModule'
import InfoTooltip from './InfoTooltip'

const CITY_RESOURCES = {
  Varanasi: { name: "Aasra Varanasi", phone: "+91 98381 12233" },
  Mumbai: { name: "TISS ICall", phone: "022-25521111" },
  Delhi: { name: "Sanjivini Society", phone: "011-24311918" }
}

export default function CrisisSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')

  return (
    <>
      {/* ── Persistent Trigger ──────────────────────────────── */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[94%] sm:w-full max-w-lg z-[90]">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Open emergency support menu"
          className="w-full bg-[var(--bg-card)] border-2 border-[var(--color-caution)]/20 p-4 sm:p-5 rounded-[28px] sm:rounded-[32px] shadow-2xl flex items-center justify-between gap-4 group backdrop-blur-xl focus-visible:ring-4 focus-visible:ring-[var(--color-caution)]/20 focus-visible:outline-none"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-[var(--color-caution)] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-white group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
              <Phone size={20} />
            </div>
            <div className="text-left space-y-0.5">
              <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[var(--color-caution)] font-heading">Need urgent help?</h4>
              <p className="text-sm sm:text-base font-bold text-[var(--text-main)] font-body">India: 1800-599-0019</p>
            </div>
          </div>
          
          <ChevronUp size={22} className="text-[var(--text-muted)]" />
        </motion.button>
      </div>

      {/* ── Expandable Support Sheet ────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[var(--bg-base)] rounded-t-[40px] sm:rounded-[48px] shadow-2xl overflow-hidden border-t sm:border border-[var(--border-subtle)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="crisis-heading"
            >
              {/* Header */}
              <div className="px-6 sm:px-10 pt-8 sm:pt-10 flex justify-between items-center">
                <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] text-[var(--color-caution)] shadow-sm border border-[var(--border-subtle)]">
                  <Heart size={24} className="fill-[var(--color-caution)]" />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close support menu"
                  className="p-3 rounded-full bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--color-caution)] transition-all h-12 w-12 flex items-center justify-center border border-[var(--border-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--color-caution)] focus-visible:outline-none"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 sm:px-10 py-8 sm:py-10 max-h-[85vh] overflow-y-auto space-y-10 custom-scrollbar">
                <header className="space-y-4 text-center sm:text-left">
                  <h2 id="crisis-heading" className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] tracking-tight font-heading leading-tight">You’re not alone.</h2>
                  <p className="text-[var(--text-muted)] font-body leading-relaxed text-base sm:text-lg opacity-90 max-w-sm sm:max-w-none">
                    We're here to help you find the support you need right now.
                  </p>
                </header>

                <SeveritySignal />

                {/* Localized Support */}
                <section className="space-y-6" aria-label="Local support resources">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] font-heading px-1 opacity-70">Local Resources</h3>
                  <div className="relative group">
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      aria-label="Filter support by city"
                      className="w-full h-16 p-4 pl-5 rounded-[24px] bg-[var(--bg-card)] border border-[var(--color-caution)]/20 text-[var(--text-main)] text-base font-bold focus:outline-none focus:ring-4 focus:ring-[var(--color-caution)]/10 transition-all appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="">Select your city...</option>
                      <option value="Varanasi">Varanasi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-caution)]/40">
                      <ChevronUp className="rotate-180" size={20} />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedCity && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-6 sm:p-8 rounded-[32px] bg-[var(--bg-card)] border border-[var(--color-caution)]/20 shadow-lg shadow-orange-500/5 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 font-heading mb-1">{selectedCity} Help</p>
                            <span className="text-base font-bold text-[var(--text-main)] font-heading">{CITY_RESOURCES[selectedCity].name}</span>
                          </div>
                          <a 
                            href={`tel:${CITY_RESOURCES[selectedCity].phone.replace(/[^0-9]/g, '')}`} 
                            aria-label={`Call ${CITY_RESOURCES[selectedCity].name}`}
                            className="h-14 w-14 rounded-2xl bg-[var(--color-caution)]/10 text-[var(--color-caution)] flex items-center justify-center hover:bg-[var(--color-caution)]/20 transition-colors"
                          >
                            <Phone size={24} />
                          </a>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tabular-nums">{CITY_RESOURCES[selectedCity].phone}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                {/* National Support */}
                <section className="space-y-6" aria-label="National support resources">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] font-heading px-1 opacity-70">National Helpline</h3>
                  <div className="p-8 sm:p-10 rounded-[40px] bg-[var(--bg-card)] border border-[var(--color-caution)]/20 shadow-xl shadow-orange-500/10 space-y-8">
                    <div className="flex flex-col gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-caution)] font-heading">24/7 Support (India)</p>
                      <a 
                        href="tel:18005990019" 
                        aria-label="Call national helpline 1800-599-0019"
                        className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] hover:text-[var(--color-caution)] transition-colors tabular-nums"
                      >
                        1800-599-0019
                      </a>
                    </div>
                    
                    <button className="w-full h-16 sm:h-20 rounded-[24px] bg-[var(--color-caution)] text-white font-bold font-heading text-lg flex items-center justify-center gap-4 hover:opacity-90 transition-all shadow-xl shadow-orange-500/20 active:scale-95 focus-visible:ring-4 focus-visible:ring-[var(--color-caution)]/30 focus-visible:outline-none">
                      <Heart size={24} className="fill-white" />
                      Immediate Support
                    </button>
                  </div>
                </section>

                <DisclaimerBanner />

                <div className="pt-6 pb-2 text-center">
                  <p className="text-[10px] text-orange-400 font-bold uppercase tracking-[0.4em] font-heading opacity-60">
                    You are safe. You are cared for.
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

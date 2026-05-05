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
          className="w-full bg-white border-2 border-[var(--color-caution)]/20 p-4 sm:p-5 rounded-[28px] sm:rounded-[32px] shadow-2xl flex items-center justify-between gap-4 group backdrop-blur-xl"
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
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/10 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full max-w-xl bg-orange-50/95 backdrop-blur-2xl rounded-t-[40px] sm:rounded-[48px] shadow-2xl overflow-hidden border-t sm:border border-white/40"
            >
              {/* Header */}
              <div className="px-6 sm:px-10 pt-8 sm:pt-10 flex justify-between items-center">
                <div className="p-3.5 rounded-2xl bg-white text-[var(--color-caution)] shadow-sm">
                  <Heart size={24} className="fill-[var(--color-caution)]" />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-full bg-white/50 text-[var(--text-muted)] hover:text-[var(--color-caution)] transition-all h-12 w-12 flex items-center justify-center"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 sm:px-10 py-8 sm:py-10 max-h-[80vh] overflow-y-auto space-y-10 custom-scrollbar">
                <header className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] tracking-tight font-heading leading-tight">You’re not alone.</h2>
                  <p className="text-[var(--text-muted)] font-body leading-relaxed text-base sm:text-lg">
                    We're here to help you find the support you need right now.
                  </p>
                </header>

                <SeveritySignal />

                {/* Localized Support */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] font-heading px-1">Local Resources</h3>
                  <div className="relative group">
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full h-14 p-4 pl-5 rounded-[20px] bg-white border border-orange-100 text-[var(--text-main)] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="">Select your city...</option>
                      <option value="Varanasi">Varanasi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-orange-300">
                      <ChevronUp className="rotate-180" size={18} />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedCity && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-6 rounded-[28px] bg-white border border-orange-100 shadow-lg shadow-orange-500/5 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-orange-400 font-heading mb-1">{selectedCity} Help</p>
                            <span className="text-sm font-bold text-[var(--text-main)] font-heading">{CITY_RESOURCES[selectedCity].name}</span>
                          </div>
                          <a 
                            href={`tel:${CITY_RESOURCES[selectedCity].phone.replace(/[^0-9]/g, '')}`} 
                            className="h-12 w-12 rounded-xl bg-orange-50 text-[var(--color-caution)] flex items-center justify-center hover:bg-orange-100 transition-colors"
                          >
                            <Phone size={20} />
                          </a>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-[var(--text-main)] tabular-nums">{CITY_RESOURCES[selectedCity].phone}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                {/* National Support */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] font-heading px-1">National Helpline</h3>
                  <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-orange-100 shadow-xl shadow-orange-500/10 space-y-6 sm:space-y-8">
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-orange-400 font-heading">24/7 Support (India)</p>
                      <a href="tel:18005990019" className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] hover:text-[var(--color-caution)] transition-colors tabular-nums">
                        1800-599-0019
                      </a>
                    </div>
                    
                    <button className="w-full h-14 sm:h-16 rounded-[20px] bg-[var(--color-caution)] text-white font-bold font-heading flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-orange-500/20 active:scale-95">
                      <Heart size={20} className="fill-white" />
                      Immediate Support
                    </button>
                  </div>
                </section>

                <DisclaimerBanner />

                <div className="pt-4 pb-2 text-center">
                  <p className="text-[9px] text-orange-300 uppercase tracking-[0.2em] font-bold font-heading">
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

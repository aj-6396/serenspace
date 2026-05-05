import React from 'react'
import { Info, AlertTriangle, ExternalLink } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

export function DisclaimerBanner() {
  return (
    <div className="w-full p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
      <Info className="text-amber-600 shrink-0 mt-0.5" size={16} />
      <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
        SerenSpace is a self-help tool, not a substitute for professional mental-health care. 
        If symptoms are severe or persistent, please reach out to a licensed clinician.
      </p>
    </div>
  )
}

export function SeveritySignal() {
  const hasSeen = useWellnessStore(s => s.hasSeenSeverityWarning)
  const setHasSeen = useWellnessStore(s => s.setHasSeenSeverityWarning)

  if (hasSeen) return null

  return (
    <div className="w-full p-6 rounded-3xl bg-rose-50 border border-rose-200 space-y-4">
      <div className="flex items-center gap-3">
        <AlertTriangle className="text-rose-600" size={20} />
        <h4 className="font-bold text-sm text-rose-900 uppercase tracking-wide">Take a moment to check in</h4>
      </div>
      <p className="text-xs text-rose-800 leading-relaxed">
        If you’re feeling this way often, it may help to talk to someone in person or over the phone. You don't have to carry this alone.
      </p>
      <div className="space-y-2">
        <a href="tel:18005990019" className="flex items-center justify-between p-3 rounded-xl bg-white border border-rose-200 text-rose-900 text-xs font-semibold hover:bg-rose-100 transition-all">
          India: 1800-599-0019 <ExternalLink size={14} />
        </a>
        <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white border border-rose-200 text-rose-900 text-xs font-semibold hover:bg-rose-100 transition-all">
          Global Resources <ExternalLink size={14} />
        </a>
      </div>
      <button 
        onClick={() => setHasSeen(true)}
        className="w-full py-2 text-[10px] font-bold text-rose-400 uppercase tracking-widest hover:text-rose-600 transition-all"
      >
        I understand
      </button>
    </div>
  )
}

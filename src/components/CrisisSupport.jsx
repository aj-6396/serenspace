import React from 'react'
import { Phone, AlertCircle } from 'lucide-react'

export default function CrisisSupport() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
      <div className="bg-rose-50/90 backdrop-blur-md border border-rose-200 p-4 rounded-3xl shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-rose-500 p-2 rounded-full text-white">
            <Phone size={18} />
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-600">Need urgent help?</h4>
            <p className="text-sm font-semibold text-rose-900">India: 1800-599-0019</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 text-[9px] text-rose-700/60 leading-tight max-w-[150px]">
          <AlertCircle size={12} className="shrink-0" />
          <span>Not a replacement for professional therapy.</span>
        </div>
      </div>
    </div>
  )
}

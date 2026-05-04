/**
 * WellnessStore – Zustand global state
 *
 * DESIGN DECISION:
 * Emotional data (text, current view, emotions) remains strictly memory-only.
 * Accessibility & Aesthetic preferences are persisted to localStorage so they don't reset.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWellnessStore = create(
  persist(
    (set) => ({
      // ── Preferences (Persisted) ────────────────────────────────────
      theme: 'default', // 'default' | 'dusk' | 'midnight' | 'forest'
      soundEnabled: false,
      reduceMotion: false,
      useDyslexicFont: false,
      lowEnergyMode: false,
      jarMessages: [
        "You survived your hardest days before, you can survive this one.",
        "It's okay to do nothing today.",
        "Your worth is not tied to your productivity."
      ], // Seeded with some default kind messages

      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleMotion: () => set((s) => ({ reduceMotion: !s.reduceMotion })),
      toggleFont: () => set((s) => ({ useDyslexicFont: !s.useDyslexicFont })),
      toggleLowEnergy: () => set((s) => ({ lowEnergyMode: !s.lowEnergyMode })),

      addJarMessage: (msg) => set((s) => ({ jarMessages: [...s.jarMessages, msg] })),
      removeJarMessage: (index) => set((s) => ({ jarMessages: s.jarMessages.filter((_, i) => i !== index) })),

      // ── Navigation / View State (Memory-only) ───────────────────────
      currentView: 'home', // 'home' | 'support' | 'vent' | 'breathe' | 'grounding' | 'stillness' | 'rescue' | 'canvas' | 'jar' | 'pmr' | 'cbt'
      selectedEmotion: null,
      isReleasing: false,
      showReleaseMessage: false,

      // ── Actions ───────────────────────────────────────────────────
      setView: (view) => set({ currentView: view }),
      selectEmotion: (emotion) => set({ selectedEmotion: emotion, currentView: 'support' }),
      goHome: () => set({ currentView: 'home', selectedEmotion: null, isReleasing: false, showReleaseMessage: false }),
      openVent: () => set({ currentView: 'vent' }),
      openBreathe: () => set({ currentView: 'breathe' }),
      openGrounding: () => set({ currentView: 'grounding' }),
      openStillness: () => set({ currentView: 'stillness' }),
      openRescue: () => set({ currentView: 'rescue' }),
      openCanvas: () => set({ currentView: 'canvas' }),
      openJar: () => set({ currentView: 'jar' }),
      openPmr: () => set({ currentView: 'pmr' }),
      openCbt: () => set({ currentView: 'cbt' }),

      triggerRelease: () => {
        set({ isReleasing: true })
        setTimeout(() => { set({ isReleasing: false, showReleaseMessage: true }) }, 900)
      },
    }),
    {
      name: 'serenspace-preferences', // unique name in localStorage
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        reduceMotion: state.reduceMotion,
        useDyslexicFont: state.useDyslexicFont,
        lowEnergyMode: state.lowEnergyMode,
        jarMessages: state.jarMessages,
      }),
    }
  )
)

export default useWellnessStore

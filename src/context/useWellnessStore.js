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

      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleMotion: () => set((s) => ({ reduceMotion: !s.reduceMotion })),
      toggleFont: () => set((s) => ({ useDyslexicFont: !s.useDyslexicFont })),

      // ── Navigation / View State (Memory-only) ───────────────────────
      currentView: 'home', // 'home' | 'support' | 'vent' | 'breathe' | 'grounding' | 'stillness'
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
      }),
    }
  )
)

export default useWellnessStore

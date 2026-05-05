/**
 * WellnessStore – Zustand global state
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWellnessStore = create(
  persist(
    (set) => ({
      // ── Preferences & Clinical Data (Persisted) ─────────────────────
      theme: 'default', // 'default' | 'dusk' | 'midnight' | 'forest' | 'high-contrast'
      soundEnabled: false,
      reduceMotion: false,
      useDyslexicFont: false,
      lowEnergyMode: false,
      hasSeenOnboarding: false,
      dailyIntention: null, // { word: string, date: string }
      
      jarMessages: [
        "You survived your hardest days before, you can survive this one.",
        "It's okay to do nothing today.",
        "Your worth is not tied to your productivity."
      ], 
      
      moodHistory: [], 
      safetyPlan: {
        warningSigns: "",
        copingStrategies: "",
        distractions: "",
        supporters: "",
        professionals: ""
      },
      journalEntries: [],
      streak: 0,
      lastCheckInDate: null,

      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleMotion: () => set((s) => ({ reduceMotion: !s.reduceMotion })),
      toggleFont: () => set((s) => ({ useDyslexicFont: !s.useDyslexicFont })),
      toggleLowEnergy: () => set((s) => ({ lowEnergyMode: !s.lowEnergyMode })),
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
      setIntention: (word) => set({ 
        dailyIntention: { word, date: new Date().toISOString().split('T')[0] } 
      }),

      addJarMessage: (msg) => set((s) => ({ jarMessages: [...s.jarMessages, msg] })),
      removeJarMessage: (index) => set((s) => ({ jarMessages: s.jarMessages.filter((_, i) => i !== index) })),

      addJournalEntry: (entry) => set((s) => ({ journalEntries: [entry, ...s.journalEntries] })),
      
      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0]
        set((s) => {
          if (s.lastCheckInDate === today) return {}
          
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().split('T')[0]
          
          const newStreak = s.lastCheckInDate === yesterdayStr ? s.streak + 1 : 1
          return { streak: newStreak, lastCheckInDate: today }
        })
      },

      setSafetyPlan: (plan) => set({ safetyPlan: plan }),

      // ── Navigation / View State (Memory-only) ───────────────────────
      currentView: 'home', 
      selectedEmotion: null,
      isReleasing: false,
      showReleaseMessage: false,

      // ── Actions ───────────────────────────────────────────────────
      setView: (view) => set({ currentView: view }),
      selectEmotion: (emotionId) => {
        const today = new Date().toISOString().split('T')[0]
        set((s) => {
          const newHistory = [...s.moodHistory, { date: today, emotionId }].slice(-100)
          return { selectedEmotion: emotionId, currentView: 'support', moodHistory: newHistory }
        })
      },
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
      openSafetyPlan: () => set({ currentView: 'safety-plan' }),
      openMoodHistory: () => set({ currentView: 'mood-history' }),
      openLibrary: () => set({ currentView: 'library' }),
      openJournal: () => set({ currentView: 'journal' }),
      openProgress: () => set({ currentView: 'progress' }),

      triggerRelease: () => {
        set({ isReleasing: true })
        setTimeout(() => { set({ isReleasing: false, showReleaseMessage: true }) }, 900)
      },
    }),
    {
      name: 'serenspace-preferences-v2', 
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        reduceMotion: state.reduceMotion,
        useDyslexicFont: state.useDyslexicFont,
        lowEnergyMode: state.lowEnergyMode,
        jarMessages: state.jarMessages,
        moodHistory: state.moodHistory,
        safetyPlan: state.safetyPlan,
        hasSeenOnboarding: state.hasSeenOnboarding,
        dailyIntention: state.dailyIntention,
        journalEntries: state.journalEntries,
        streak: state.streak,
        lastCheckInDate: state.lastCheckInDate,
      }),
    }
  )
)

export default useWellnessStore

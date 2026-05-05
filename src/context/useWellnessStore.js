/**
 * WellnessStore – Zustand global state
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWellnessStore = create(
  persist(
    (set) => ({
      // ── Core Preferences & State ─────────────────────
      theme: 'light', // 'light' | 'midnight'
      soundEnabled: false,
      reduceMotion: false,
      useDyslexicFont: false,
      lowEnergyMode: false,
      hasSeenOnboarding: false,
      dailyIntention: null, 
      
      preferences: {
        darkMode: false,
        highContrast: false,
        lowStimulationMode: false,
        fontSize: 'M', // S, M, L
        dailyReminder: false,
        favoriteTool: 'Breathing'
      },

      hasSeenSeverityWarning: false,
      dailyRitualDone: false,
      lastBreakReminder: null,
      
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

      // ── New Features Data ────────────────────────────
      thoughtChecks: [],
      bodyScanSessions: [],
      valuesPrompts: [],
      groundingSessions: [],
      weeklySnapshots: [],

      // ── Actions ─────────────────────────────────────
      setTheme: (theme) => set({ theme }),
      updatePreferences: (newPrefs) => set((s) => ({ preferences: { ...s.preferences, ...newPrefs } })),
      setHasSeenSeverityWarning: (val) => set({ hasSeenSeverityWarning: val }),
      setDailyRitualDone: (val) => set({ dailyRitualDone: val }),
      setLastBreakReminder: (time) => set({ lastBreakReminder: time }),
      
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
      
      addThoughtCheck: (entry) => set((s) => ({ thoughtChecks: [entry, ...s.thoughtChecks] })),
      addBodyScanSession: (session) => set((s) => ({ bodyScanSessions: [session, ...s.bodyScanSessions] })),
      addValuesPrompt: (prompt) => set((s) => ({ valuesPrompts: [prompt, ...s.valuesPrompts] })),
      addGroundingSession: (session) => set((s) => ({ groundingSessions: [session, ...s.groundingSessions] })),
      addWeeklySnapshot: (snapshot) => set((s) => ({ weeklySnapshots: [snapshot, ...s.weeklySnapshots] })),

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0]
        set((s) => {
          if (s.lastCheckInDate === today) return {}
          
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().split('T')[0]
          
          const newStreak = s.lastCheckInDate === yesterdayStr ? s.streak + 1 : 1
          return { streak: newStreak, lastCheckInDate: today, dailyRitualDone: false }
        })
      },

      setSafetyPlan: (plan) => set({ safetyPlan: plan }),

      // ── Navigation / View State (Memory-only) ───────────────────────
      currentView: 'home', 
      selectedEmotion: null,
      isReleasing: false,
      showReleaseMessage: false,

      // ── Navigation Actions ──────────────────────────────────────────
      setView: (view) => set({ currentView: view }),
      selectEmotion: (emotionId) => {
        const today = new Date().toISOString().split('T')[0]
        set((s) => {
          const newHistory = [...s.moodHistory, { date: today, emotionId }].slice(-100)
          return { selectedEmotion: emotionId, moodHistory: newHistory }
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
      openToolkit: () => set({ currentView: 'toolkit' }),
      openSnapshot: () => set({ currentView: 'snapshot' }),

      triggerRelease: () => {
        set({ isReleasing: true })
        setTimeout(() => { set({ isReleasing: false, showReleaseMessage: true }) }, 900)
      },
    }),
    {
      name: 'serenspace-wellness-v3', 
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        reduceMotion: state.reduceMotion,
        useDyslexicFont: state.useDyslexicFont,
        lowEnergyMode: state.lowEnergyMode,
        preferences: state.preferences,
        hasSeenSeverityWarning: state.hasSeenSeverityWarning,
        dailyRitualDone: state.dailyRitualDone,
        jarMessages: state.jarMessages,
        moodHistory: state.moodHistory,
        safetyPlan: state.safetyPlan,
        hasSeenOnboarding: state.hasSeenOnboarding,
        dailyIntention: state.dailyIntention,
        journalEntries: state.journalEntries,
        streak: state.streak,
        lastCheckInDate: state.lastCheckInDate,
        thoughtChecks: state.thoughtChecks,
        bodyScanSessions: state.bodyScanSessions,
        valuesPrompts: state.valuesPrompts,
        groundingSessions: state.groundingSessions,
        weeklySnapshots: state.weeklySnapshots,
      }),
    }
  )
)

export default useWellnessStore

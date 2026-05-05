import React, { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import AmbientBackground from './components/AmbientBackground'
import NavBar            from './components/NavBar'
import BreathingOrb      from './components/BreathingOrb'
import HeroPage          from './pages/HeroPage'

// Lazy loaded pages for performance optimization
const SupportPage     = lazy(() => import('./pages/SupportPage'))
const VentPage        = lazy(() => import('./pages/VentPage'))
const GroundingPage   = lazy(() => import('./pages/GroundingPage'))
const StillnessPage   = lazy(() => import('./pages/StillnessPage'))
const RescuePage      = lazy(() => import('./pages/RescuePage'))
const CanvasPage      = lazy(() => import('./pages/CanvasPage'))
const JarPage         = lazy(() => import('./pages/JarPage'))
const PMRPage         = lazy(() => import('./pages/PMRPage'))
const CBTPage         = lazy(() => import('./pages/CBTPage'))
const SafetyPlanPage  = lazy(() => import('./pages/SafetyPlanPage'))
const MoodHistoryPage = lazy(() => import('./pages/MoodHistoryPage'))
const LibraryPage     = lazy(() => import('./pages/LibraryPage'))
const OnboardingOverlay = lazy(() => import('./components/OnboardingOverlay'))
const SmartJournal     = lazy(() => import('./components/SmartJournal'))
const ProgressTracker  = lazy(() => import('./components/ProgressTracker'))
const CrisisSupport    = lazy(() => import('./components/CrisisSupport'))
const ToolkitPage     = lazy(() => import('./pages/ToolkitPage'))
const WeeklySnapshotPage = lazy(() => import('./pages/WeeklySnapshotPage'))
const PreferencesPanel = lazy(() => import('./components/PreferencesPanel'))
const BreakReminder    = lazy(() => import('./components/BreakReminder'))

import AmbientAudio  from './components/AmbientAudio'
import useWellnessStore from './context/useWellnessStore'
import useKeyboardNav   from './hooks/useKeyboardNav'

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -12, filter: 'blur(4px)' },
}
const PAGE_TRANSITION = { duration: 0.45, ease: 'easeInOut' }

// Loading fallback component
const LoadingIndicator = () => (
  <div className="flex items-center justify-center min-h-screen">
    <motion.div 
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]"
    >
      Finding calm...
    </motion.div>
  </div>
)

function ViewRouter({ view }) {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <HeroPage />
          </motion.div>
        )}
        {view === 'support' && (
          <motion.div key="support" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <SupportPage />
          </motion.div>
        )}
        {view === 'vent' && (
          <motion.div key="vent" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <VentPage />
          </motion.div>
        )}
        {view === 'breathe' && (
          <motion.div key="breathe" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <BreathingOrb />
          </motion.div>
        )}
        {view === 'grounding' && (
          <motion.div key="grounding" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <GroundingPage />
          </motion.div>
        )}
        {view === 'stillness' && (
          <motion.div key="stillness" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <StillnessPage />
          </motion.div>
        )}
        {view === 'rescue' && (
          <motion.div key="rescue" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <RescuePage />
          </motion.div>
        )}
        {view === 'canvas' && (
          <motion.div key="canvas" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <CanvasPage />
          </motion.div>
        )}
        {view === 'jar' && (
          <motion.div key="jar" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <JarPage />
          </motion.div>
        )}
        {view === 'pmr' && (
          <motion.div key="pmr" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <PMRPage />
          </motion.div>
        )}
        {view === 'cbt' && (
          <motion.div key="cbt" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <CBTPage />
          </motion.div>
        )}
        {view === 'safety-plan' && (
          <motion.div key="safety-plan" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <SafetyPlanPage />
          </motion.div>
        )}
        {view === 'mood-history' && (
          <motion.div key="mood-history" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <MoodHistoryPage />
          </motion.div>
        )}
        {view === 'library' && (
          <motion.div key="library" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <LibraryPage />
          </motion.div>
        )}
        {view === 'journal' && (
          <motion.div key="journal" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <SmartJournal />
          </motion.div>
        )}
        {view === 'progress' && (
          <motion.div key="progress" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <ProgressTracker />
          </motion.div>
        )}
        {view === 'toolkit' && (
          <motion.div key="toolkit" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <ToolkitPage />
          </motion.div>
        )}
        {view === 'snapshot' && (
          <motion.div key="snapshot" variants={PAGE_VARIANTS} initial="initial" animate="animate" exit="exit" transition={PAGE_TRANSITION}>
            <WeeklySnapshotPage />
          </motion.div>
        )}
      </AnimatePresence>
    </Suspense>
  )
}

function WeatherView() {
  return (
    <div className="min-h-screen bg-sky-400 flex flex-col items-center justify-center text-white p-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4">
        <Wind size={64} className="animate-pulse" />
        <h1 className="text-6xl font-bold">24°C</h1>
        <p className="text-xl opacity-80">Partly Cloudy • Varanasi, IN</p>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-sm border-t border-white/20 pt-8">
        <div className="text-center"><p className="text-[10px] uppercase opacity-60">Humidity</p><p className="font-bold">65%</p></div>
        <div className="text-center"><p className="text-[10px] uppercase opacity-60">Wind</p><p className="font-bold">12 km/h</p></div>
        <div className="text-center"><p className="text-[10px] uppercase opacity-60">Visibility</p><p className="font-bold">10 km</p></div>
      </div>
    </div>
  )
}

export default function App() {
  useKeyboardNav()
  const view = useWellnessStore((s) => s.currentView)
  const hasSeenOnboarding = useWellnessStore((s) => s.hasSeenOnboarding)
  const preferences = useWellnessStore((s) => s.preferences)
  const theme = useWellnessStore((s) => s.theme)
  
  const [isPrefsOpen, setIsPrefsOpen] = React.useState(false)
  const [isBreakReminderOpen, setIsBreakReminderOpen] = React.useState(false)
  const [isExited, setIsExited] = React.useState(false)
  const [escCount, setEscCount] = React.useState(0)

  // Quick Exit Logic
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setEscCount(prev => {
          if (prev + 1 >= 3) {
            setIsExited(true)
            return 0
          }
          return prev + 1
        })
        // Reset count after 2s of inactivity
        setTimeout(() => setEscCount(0), 2000)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (isExited) return <WeatherView />
  
  const timerRef = React.useRef(null)

  // Break Reminder Logic
  React.useEffect(() => {
    if (view === 'journal' || view === 'breathe') {
      timerRef.current = setTimeout(() => {
        setIsBreakReminderOpen(true)
      }, 7 * 60 * 1000) // 7 minutes
    } else {
      clearTimeout(timerRef.current)
      setIsBreakReminderOpen(false)
    }
    return () => clearTimeout(timerRef.current)
  }, [view])

  const fontSizeClass = preferences.fontSize === 'S' ? 'text-xs' : preferences.fontSize === 'L' ? 'text-lg' : 'text-base'
  const contrastClass = preferences.highContrast ? 'high-contrast' : ''
  const intensityClass = preferences.lowStimulationMode ? 'low-intensity' : ''
  const themeClass = theme === 'midnight' ? 'midnight' : ''

  return (
    <div className={`min-h-screen relative selection:bg-[var(--color-primary)] selection:text-black ${fontSizeClass} ${contrastClass} ${intensityClass} ${themeClass}`}>
      <AmbientBackground />
      <AmbientAudio />
      
      <NavBar onOpenPrefs={() => setIsPrefsOpen(true)} />
      
      <ViewRouter view={view} />

      <CrisisSupport />

      <Suspense fallback={null}>
        {!hasSeenOnboarding && <OnboardingOverlay />}
        <PreferencesPanel isOpen={isPrefsOpen} onClose={() => setIsPrefsOpen(false)} />
        <BreakReminder isOpen={isBreakReminderOpen} onClose={() => setIsBreakReminderOpen(false)} />
      </Suspense>
    </div>
  )
}

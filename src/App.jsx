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
      </AnimatePresence>
    </Suspense>
  )
}

export default function App() {
  useKeyboardNav()
  const view = useWellnessStore((s) => s.currentView)
  const hasSeenOnboarding = useWellnessStore((s) => s.hasSeenOnboarding)

  return (
    <div className="min-h-screen relative selection:bg-[var(--color-primary)] selection:text-black">
      <AmbientBackground />
      <AmbientAudio />
      <NavBar />
      
      <ViewRouter view={view} />

      <CrisisSupport />

      <Suspense fallback={null}>
        {!hasSeenOnboarding && <OnboardingOverlay />}
      </Suspense>
    </div>
  )
}

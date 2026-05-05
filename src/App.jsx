/**
 * App.jsx — Root application shell
 *
 * Manages view routing via Zustand state (no react-router needed for this SPA).
 * AnimatePresence wraps each page so transitions are smooth.
 * useKeyboardNav() attaches global keyboard accessibility shortcuts.
 */
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import AmbientBackground from './components/AmbientBackground'
import NavBar            from './components/NavBar'
import BreathingOrb      from './components/BreathingOrb'

import HeroPage    from './pages/HeroPage'
import SupportPage from './pages/SupportPage'
import VentPage    from './pages/VentPage'
import GroundingPage from './pages/GroundingPage'
import StillnessPage from './pages/StillnessPage'
import RescuePage    from './pages/RescuePage'
import CanvasPage    from './pages/CanvasPage'
import JarPage       from './pages/JarPage'
import PMRPage       from './pages/PMRPage'
import CBTPage       from './pages/CBTPage'
import SafetyPlanPage from './pages/SafetyPlanPage'
import MoodHistoryPage from './pages/MoodHistoryPage'
import AmbientAudio  from './components/AmbientAudio'

import useWellnessStore from './context/useWellnessStore'
import useKeyboardNav   from './hooks/useKeyboardNav'

// Shared page transition config
const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -12, filter: 'blur(4px)' },
}
const PAGE_TRANSITION = { duration: 0.45, ease: 'easeInOut' }

function ViewRouter({ view }) {
  return (
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
    </AnimatePresence>
  )
}

export default function App() {
  // Attach global keyboard nav
  useKeyboardNav()

  const { currentView, theme, useDyslexicFont, reduceMotion, soundEnabled } = useWellnessStore()

  // Sync preferences to DOM
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (useDyslexicFont) {
      document.body.classList.add('font-dyslexic')
    } else {
      document.body.classList.remove('font-dyslexic')
    }
  }, [theme, useDyslexicFont])

  return (
    <>
      {/* Skip to main content link (a11y) */}
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
          focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg
          focus:bg-[#f6c857] focus:text-[#0d0d0f] focus:font-medium text-sm
        "
      >
        Skip to main content
      </a>

      {/* Hidden ambient audio player */}
      <AmbientAudio isPlaying={soundEnabled} />

      {/* Animated ambient background */}
      <AmbientBackground reduceMotion={reduceMotion} />

      {/* Navigation */}
      <NavBar />

      {/* Page content */}
      <ViewRouter view={currentView} />
    </>
  )
}

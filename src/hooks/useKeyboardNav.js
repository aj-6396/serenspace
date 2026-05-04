/**
 * hooks/useKeyboardNav.js
 *
 * Custom hook: Enables global keyboard shortcut for accessibility.
 * - Escape: returns to home
 * - Alt+V: opens vent space
 * - Alt+B: opens breathe screen
 */
import { useEffect } from 'react'
import useWellnessStore from '../context/useWellnessStore'

export default function useKeyboardNav() {
  const goHome      = useWellnessStore((s) => s.goHome)
  const openVent    = useWellnessStore((s) => s.openVent)
  const openBreathe = useWellnessStore((s) => s.openBreathe)
  const currentView = useWellnessStore((s) => s.currentView)

  useEffect(() => {
    const handler = (e) => {
      // Escape → home (unless already home)
      if (e.key === 'Escape' && currentView !== 'home') {
        goHome()
      }
      // Alt+V → vent
      if (e.altKey && e.key === 'v') {
        e.preventDefault()
        openVent()
      }
      // Alt+B → breathe
      if (e.altKey && e.key === 'b') {
        e.preventDefault()
        openBreathe()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentView, goHome, openVent, openBreathe])
}

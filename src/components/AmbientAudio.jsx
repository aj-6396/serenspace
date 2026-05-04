import React, { useEffect, useRef } from 'react'

/**
 * AmbientAudio
 * Generates synthetic brown noise (gentle rumble like distant wind/ocean)
 * using the Web Audio API. Requires no external assets.
 */
export default function AmbientAudio({ isPlaying }) {
  const audioCtxRef = useRef(null)
  const gainNodeRef = useRef(null)
  const noiseNodeRef = useRef(null)

  useEffect(() => {
    // Only initialize audio context when first played
    if (isPlaying && !audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new AudioContext()

      const bufferSize = audioCtxRef.current.sampleRate * 2 // 2 seconds of noise
      const buffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate)
      const data = buffer.getChannelData(0)

      // Generate Brown Noise
      let lastOut = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        data[i] = (lastOut + (0.02 * white)) / 1.02
        lastOut = data[i]
        data[i] *= 3.5 // compensate for gain
      }

      noiseNodeRef.current = audioCtxRef.current.createBufferSource()
      noiseNodeRef.current.buffer = buffer
      noiseNodeRef.current.loop = true

      // Filter to make it sound like deep wind/ocean
      const filter = audioCtxRef.current.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 400

      gainNodeRef.current = audioCtxRef.current.createGain()
      gainNodeRef.current.gain.value = 0 // start silent

      noiseNodeRef.current.connect(filter)
      filter.connect(gainNodeRef.current)
      gainNodeRef.current.connect(audioCtxRef.current.destination)

      noiseNodeRef.current.start()
    }

    // Handle play/pause with fade in/out
    if (audioCtxRef.current && gainNodeRef.current) {
      if (audioCtxRef.current.state === 'suspended' && isPlaying) {
        audioCtxRef.current.resume()
      }

      const now = audioCtxRef.current.currentTime
      if (isPlaying) {
        gainNodeRef.current.gain.cancelScheduledValues(now)
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, now)
        gainNodeRef.current.gain.linearRampToValueAtTime(0.15, now + 2) // fade in 2s
      } else {
        gainNodeRef.current.gain.cancelScheduledValues(now)
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, now)
        gainNodeRef.current.gain.linearRampToValueAtTime(0, now + 1) // fade out 1s
      }
    }

    return () => {
      // Cleanup happens on full unmount, but we keep it alive to avoid recreation
    }
  }, [isPlaying])

  return null
}

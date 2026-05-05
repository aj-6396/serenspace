/**
 * emotions.js — Emotion catalogue
 *
 * Each entry drives the Hero emotion buttons and downstream
 * personalised content (affirmations, suggested tools).
 */

export const EMOTIONS = [
  {
    id: 'anxious',
    label: 'I feel anxious',
    emoji: '🌪️',
    color: 'amber',
    affirmation: 'Your feelings are valid. Anxiety is your mind trying to protect you.',
    suggestion: 'Let us anchor your physical focus and quiet the mind.',
    tools: ['grounding', 'breathe', 'canvas', 'pmr'],
    science: 'Anxiety triggers the Amygdala. Grounding and breathing shift activity to the Prefrontal Cortex, lowering the heart rate and cortisol levels.',
  },
  {
    id: 'alone',
    label: 'I feel alone',
    emoji: '🌑',
    color: 'sage',
    affirmation: "You're not alone right now. This space is here with you.",
    suggestion: 'Let us focus on deep personal reflection and validation.',
    tools: ['vent', 'jar', 'cbt'],
    science: 'Loneliness often involves ruminative loops. CBT and journaling break these loops by externalizing internal thoughts, providing perspective.',
  },
  {
    id: 'lost',
    label: 'I feel lost',
    emoji: '🌫️',
    color: 'amber',
    affirmation: "It's okay not to have all the answers. One breath at a time.",
    suggestion: 'Let us find steady ground and clarity together.',
    tools: ['stillness', 'cbt'],
    science: 'Feeling lost is often a result of cognitive overload. Brief stillness helps reset neural "noise," while CBT targets specific lost-identity distortions.',
  },
  {
    id: 'overwhelmed',
    label: 'I feel overwhelmed',
    emoji: '🌊',
    color: 'sage',
    affirmation: "You don't have to handle everything at once. Just this moment.",
    suggestion: 'Let us give you an immediate mental reset.',
    tools: ['vent', 'grounding', 'canvas', 'pmr'],
    science: 'Overwhelm is a state of sensory flooding. Distraction and somatic release (PMR) provide a "circuit breaker" for the nervous system.',
  },
]

/** Look up an emotion by its id string */
export const getEmotion = (id) => EMOTIONS.find((e) => e.id === id) ?? null

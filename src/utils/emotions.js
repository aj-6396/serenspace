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
  },
  {
    id: 'alone',
    label: 'I feel alone',
    emoji: '🌑',
    color: 'sage',
    affirmation: "You're not alone right now. This space is here with you.",
    suggestion: 'Let us focus on deep personal reflection and validation.',
    tools: ['vent', 'jar', 'cbt'],
  },
  {
    id: 'lost',
    label: 'I feel lost',
    emoji: '🌫️',
    color: 'amber',
    affirmation: "It's okay not to have all the answers. One breath at a time.",
    suggestion: 'Let us find steady ground and clarity together.',
    tools: ['stillness', 'cbt'],
  },
  {
    id: 'overwhelmed',
    label: 'I feel overwhelmed',
    emoji: '🌊',
    color: 'sage',
    affirmation: "You don't have to handle everything at once. Just this moment.",
    suggestion: 'Let us give you an immediate mental reset.',
    tools: ['vent', 'grounding', 'canvas', 'pmr'],
  },
]

/** Look up an emotion by its id string */
export const getEmotion = (id) => EMOTIONS.find((e) => e.id === id) ?? null

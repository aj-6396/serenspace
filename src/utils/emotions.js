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
    color: 'amber',          // maps to design-token primary
    affirmation: 'Your feelings are valid. Anxiety is your mind trying to protect you.',
    suggestion: 'Try a physical grounding exercise to bring you back to the present.',
    tools: ['grounding', 'breathe', 'canvas'],
  },
  {
    id: 'alone',
    label: 'I feel alone',
    emoji: '🌑',
    color: 'sage',
    affirmation: "You're not alone right now. This space is here with you.",
    suggestion: 'Sometimes writing it out helps us feel heard.',
    tools: ['vent', 'stillness', 'canvas'],
  },
  {
    id: 'lost',
    label: 'I feel lost',
    emoji: '🌫️',
    color: 'amber',
    affirmation: "It's okay not to have all the answers. One breath at a time.",
    suggestion: 'A moment of stillness can help you find your footing.',
    tools: ['stillness', 'vent'],
  },
  {
    id: 'overwhelmed',
    label: 'I feel overwhelmed',
    emoji: '🌊',
    color: 'sage',
    affirmation: "You don't have to handle everything at once. Just this moment.",
    suggestion: 'Let it out — write whatever is weighing on you.',
    tools: ['vent', 'grounding', 'canvas'],
  },
]

/** Look up an emotion by its id string */
export const getEmotion = (id) => EMOTIONS.find((e) => e.id === id) ?? null

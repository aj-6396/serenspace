/**
 * emotions.js — Emotion catalogue
 *
 * Each entry drives the Hero emotion buttons and downstream
 * personalised content (affirmations, suggested tools).
 */

export const EMOTIONS = [
  {
    id: 'happy',
    label: 'I feel happy',
    emoji: '🙂',
    color: 'emerald',
    affirmation: 'Happiness is a beautiful gift. Enjoy this moment!',
    suggestion: 'Let us focus on maintaining this positive energy.',
    tools: ['productivity', 'focus', 'library'],
    science: 'Positive affect is linked to increased dopamine and serotonin. Engaging in creative or productive tasks can extend this state.',
  },
  {
    id: 'neutral',
    label: 'I feel neutral',
    emoji: '😐',
    color: 'slate',
    affirmation: 'It is perfectly okay to just be.',
    suggestion: 'Let us help you find focus and gentle flow.',
    tools: ['productivity', 'focus', 'canvas'],
    science: 'A neutral state is an ideal baseline for concentration. Minimalist environments can help sustain this steady cognitive load.',
  },
  {
    id: 'sad',
    label: 'I feel sad',
    emoji: '😞',
    color: 'blue',
    affirmation: 'It is okay to not be okay. Your feelings deserve space.',
    suggestion: 'Let us help you process these emotions gently.',
    tools: ['journal', 'affirmations', 'jar'],
    science: 'Processing sadness through externalization (journaling) helps the brain organize emotional experiences and reduces physiological stress.',
  },
  {
    id: 'angry',
    label: 'I feel angry',
    emoji: '😡',
    color: 'rose',
    affirmation: 'Anger is often a signal. Let it flow through you without control.',
    suggestion: 'Let us find a safe way to release this intensity.',
    tools: ['breathe', 'release', 'pmr'],
    science: 'Anger triggers the sympathetic nervous system. Controlled breathing and muscle relaxation (PMR) activate the parasympathetic "rest and digest" response.',
  },
  {
    id: 'anxious',
    label: 'I feel anxious',
    emoji: '😰',
    color: 'amber',
    affirmation: 'You are safe. This feeling is a wave that will pass.',
    suggestion: 'Let us anchor you back to the present moment.',
    tools: ['breathe', 'grounding', 'stillness'],
    science: 'Anxiety involves over-activity in the amygdala. Grounding exercises re-engage the prefrontal cortex, bringing the focus back to physical reality.',
  },
]

/** Look up an emotion by its id string */
export const getEmotion = (id) => EMOTIONS.find((e) => e.id === id) ?? null

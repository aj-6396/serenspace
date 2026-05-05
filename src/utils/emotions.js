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
    emoji: '😊',
    color: 'emerald',
    badgeClass: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    affirmation: 'Happiness is a beautiful gift. Enjoy this moment of brightness!',
    tools: ['values', 'journal', 'breathe'],
    science: 'Positive affect is linked to increased dopamine. Setting intentions now can help sustain this upward spiral.',
  },
  {
    id: 'neutral',
    label: 'I feel neutral',
    emoji: '😐',
    color: 'slate',
    badgeClass: 'bg-slate-50 text-slate-600 border-slate-100',
    affirmation: 'It is perfectly okay to just be. A steady baseline is a place of peace.',
    tools: ['journal', 'values', 'breathe'],
    science: 'A neutral state is ideal for reflection. Gentle focus tasks can help you feel grounded and purposeful.',
  },
  {
    id: 'sad',
    label: 'I feel sad',
    emoji: '😞',
    color: 'teal',
    badgeClass: 'bg-teal-50 text-teal-600 border-teal-100',
    affirmation: 'It is okay to not be okay. Your feelings deserve space and kindness.',
    tools: ['thoughtCheck', 'journal', 'breathe'],
    science: 'Processing sadness through externalization (journaling) helps the brain organize emotional experiences.',
  },
  {
    id: 'angry',
    label: 'I feel angry',
    emoji: '😡',
    color: 'coral',
    badgeClass: 'bg-orange-50 text-orange-600 border-orange-100',
    affirmation: 'Anger is a signal, not a destination. Let it flow through you gently.',
    tools: ['breathe', 'grounding', 'journal'],
    science: 'Anger triggers the fight-or-flight response. Slow breathing can help deactivate this physiological surge.',
  },
  {
    id: 'anxious',
    label: 'I feel anxious',
    emoji: '😰',
    color: 'lavender',
    badgeClass: 'bg-purple-50 text-purple-600 border-purple-100',
    affirmation: 'You are safe. This feeling is a wave that will eventually reach the shore.',
    tools: ['breathe', 'bodyScan', 'grounding'],
    science: 'Anxiety often involves amygdala over-activity. Grounding refocuses the brain on present physical sensations.',
  },
]

/** Look up an emotion by its id string */
export const getEmotion = (id) => EMOTIONS.find((e) => e.id === id) ?? null

/**
 * aiService.js — AI service stub (future-ready)
 *
 * IMPORTANT: This file intentionally makes NO network calls.
 * When you are ready to integrate the Deno Edge Function, replace
 * the placeholder bodies below with real fetch() calls to your
 * Supabase Edge Function URL.
 *
 * API keys MUST live in the Edge Function environment — never here.
 */

/**
 * Send a message to the AI support assistant.
 * @param {string} message   - User's raw message text
 * @param {string} emotion   - Currently selected emotion id
 * @returns {Promise<{reply: string}>}
 */
export async function sendSupportMessage(message, emotion) {
  // TODO: Replace with real Edge Function call, e.g.:
  // const res = await fetch('/api/support', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ message, emotion }),
  // })
  // return res.json()

  console.warn('[aiService] AI integration not yet enabled. Returning placeholder.')
  return {
    reply: "I hear you. You're not alone in this.",
  }
}

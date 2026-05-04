/**
 * Deno Edge Function — AI Support Handler (Skeleton)
 *
 * File: supabase/functions/support/index.ts
 *
 * PURPOSE:
 * Securely proxies AI chat requests from the frontend.
 * API keys NEVER touch the browser — they live here as Deno env variables.
 *
 * DEPLOY:
 *   supabase functions deploy support
 *
 * ENV VARS (set in Supabase dashboard):
 *   AI_API_KEY      – your AI provider API key
 *   AI_API_ENDPOINT – e.g. https://api.openai.com/v1/chat/completions
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ── CORS Headers ────────────────────────────────────────────────
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",   // TODO: restrict to your domain in production
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── System prompt for the AI model ─────────────────────────────
const SYSTEM_PROMPT = `
You are a compassionate, non-judgmental mental wellness companion.
Your role is to listen, validate emotions, and gently suggest coping strategies.
You are NOT a therapist or medical professional.
Always remind users that professional help is available if needed.
Keep responses warm, brief (2-3 sentences), and empathetic.
Never minimise feelings. Never give medical advice.
`.trim();

// ── Request handler ─────────────────────────────────────────────
serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    // Parse request body
    const body = await req.json();
    const { message, emotion } = body as { message: string; emotion?: string };

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // ── TODO: Replace this block with your AI provider call ──────
    // Example with OpenAI-compatible API:
    //
    // const aiApiKey      = Deno.env.get("AI_API_KEY") ?? "";
    // const aiApiEndpoint = Deno.env.get("AI_API_ENDPOINT") ?? "";
    //
    // const aiResponse = await fetch(aiApiEndpoint, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${aiApiKey}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4o-mini",
    //     messages: [
    //       { role: "system", content: SYSTEM_PROMPT },
    //       { role: "user",   content: `Emotion context: ${emotion ?? "unspecified"}\n\n${message}` },
    //     ],
    //     max_tokens: 150,
    //     temperature: 0.7,
    //   }),
    // });
    //
    // const data = await aiResponse.json();
    // const reply = data.choices?.[0]?.message?.content ?? "I hear you.";
    // ─────────────────────────────────────────────────────────────

    // Placeholder response until AI is wired up
    const reply = "I hear you. You're not alone in this, and reaching out takes courage.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[support edge fn] Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});

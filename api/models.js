// Debug helper: lists Gemini models available to your API key.
// Visit /api/models in the browser when troubleshooting.

export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
  }

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    const supportsGenerate = (data?.models || [])
      .filter((m) => (m.supportedGenerationMethods || []).includes("generateContent"))
      .map((m) => ({
        name: m.name,
        displayName: m.displayName,
        inputTokenLimit: m.inputTokenLimit,
        outputTokenLimit: m.outputTokenLimit,
      }));

    return res.status(200).json({ count: supportsGenerate.length, models: supportsGenerate });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

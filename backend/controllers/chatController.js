import { getScriptedReply } from '../services/scriptService.js';
import { askModel } from '../services/llmService.js';

/**
 * Handle /api/message
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function handleChatMessage(req, res) {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: "Missing or invalid 'text' in request body." });
    }

    // 1) Scripted JSON rules first
    const scripted = getScriptedReply(text);
    if (scripted) {
        return res.json({ reply: scripted, source: 'script' });
    }

    // 2) LLM fallback
    try {
        const reply = await askModel(text);
        return res.json({ reply, source: 'llm' });
    } catch (err) {
        console.error('LLM error:', err);
        return res.status(500).json({ error: 'Failed to get response from model.' });
    }
}

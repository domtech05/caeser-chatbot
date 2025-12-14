import { askModel } from '../services/llmService.js';
import { findScriptedResponse } from '../data/scriptRules.js';

/**
 * Express controller for handling chat messages.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function handleChatMessage(req, res, next) {
    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: "Missing or invalid 'text' in request body." });
        }

        // 1) Try scripted response first
        const scripted = findScriptedResponse(text);
        if (scripted) {
            return res.json({ reply: scripted });
        }

        // 2) Fall back to the LLM
        const reply = await askModel(text);
        return res.json({ reply });
    } catch (err) {
        next(err);
    }
}

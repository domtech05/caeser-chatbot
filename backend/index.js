import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app = express();

// Read config from .env
const PORT = process.env.PORT || 3001;
const HF_URL = process.env.HF_URL;
const HF_TOKEN = process.env.HF_TOKEN;

// Warn if missing env vars
if (!HF_URL || !HF_TOKEN) {
    console.warn('Missing HF_URL or HF_TOKEN in .env file — LLM calls will fail.');
}

app.use(express.json());

// ----------------------------
// Health check route
// ----------------------------
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// ----------------------------
// LLM route using HuggingFace
// ----------------------------
app.post('/api/message', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Missing 'text' in request body." });
    }

    try {
        const resp = await fetch(HF_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                'Content-Type': 'application/json',
                'x-wait-for-model': 'true'
            },
            body: JSON.stringify({
                model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
                messages: [
                    // later we will add a proper system prompt here
                    { role: 'user', content: text }
                ]
            })
        });

        if (!resp.ok) {
            const errorText = await resp.text();
            console.error('HF API error:', resp.status, resp.statusText, errorText);
            return res.status(502).json({ error: 'Error from HuggingFace API' });
        }

        const data = await resp.json();

        let reply = data?.choices?.[0]?.message?.content ?? '';

        // Remove DeepSeek R1 chain-of-thought (<think>...</think>) from output
        reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

        if (!reply) reply = 'Sorry, I could not generate a response.';

        res.json({ reply });

    } catch (error) {
        console.error('Error inside /api/message:', error);
        res.status(500).json({ error: 'Server error when calling LLM' });
    }
});

// ----------------------------
// Start server
// ----------------------------
app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
});

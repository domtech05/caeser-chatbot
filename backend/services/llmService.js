import fetch from 'node-fetch';
import { HF_URL, HF_TOKEN } from '../config/env.js';

/**
 * Call the DeepSeek-R1 model via Hugging Face.
 * @param {string} prompt - The user prompt to send to the model.
 * @returns {Promise<string>} - Cleaned reply string.
 */
export async function askModel(prompt) {
    if (!HF_URL || !HF_TOKEN) {
        throw new Error('Hugging Face configuration missing (HF_URL / HF_TOKEN).');
    }

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
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ]
        })
    });

    if (!resp.ok) {
        const errorText = await resp.text();
        console.error('Hugging Face HTTP error:', resp.status, resp.statusText, errorText);
        throw new Error('Error from Hugging Face API');
    }

    const data = await resp.json();
    let reply = data?.choices?.[0]?.message?.content ?? '';

    // Remove DeepSeek's <think>...</think> sections
    reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    if (!reply) {
        reply = 'Sorry, I could not generate a response.';
    }

    return reply;
}

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { HF_URL, HF_TOKEN } from '../config/env.js';

/**
 * Resolve persona.json relative to this file.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const personaPath = path.join(__dirname, '..', 'data', 'persona.json');

function loadPersona() {
    const raw = fs.readFileSync(personaPath, 'utf-8');
    return JSON.parse(raw);
}

/**
 * Call the DeepSeek-R1 model via Hugging Face chat completions.
 * @param {string} userPrompt
 * @returns {Promise<string>}
 */
export async function askModel(userPrompt) {
    if (!HF_URL || !HF_TOKEN) {
        throw new Error('Hugging Face config missing (HF_URL / HF_TOKEN). Check .env.');
    }

    const persona = loadPersona();
    console.log('Persona loaded:', persona?.name);
    const systemPrompt = persona.systemPrompt;

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
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.4,
            top_p: 0.9
        })
    });

    if (!resp.ok) {
        const errorText = await resp.text();
        console.error('HF error:', resp.status, resp.statusText, errorText);
        throw new Error(`Hugging Face API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    let reply = data?.choices?.[0]?.message?.content ?? '';

    // Strip DeepSeek chain-of-thought blocks
    reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    return reply || 'Sorry, I could not generate a response.';
}

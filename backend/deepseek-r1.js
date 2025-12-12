import fetch from 'node-fetch';

const HF_URL = 'https://router.huggingface.co/v1/chat/completions';
const HF_TOKEN = 'hf_YOUR_TOKEN_HERE';

export async function callDeepSeek(prompt) {
    const resp = await fetch(HF_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
            'x-wait-for-model': 'true',
        },
        body: JSON.stringify({
            model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
            messages: [{ role: 'user', content: prompt }],
        }),
    });

    if (!resp.ok) {
        const errorText = await resp.text();
        console.error('DeepSeek HTTP error:', resp.status, resp.statusText, '\n', errorText);
        throw new Error(`DeepSeek request failed: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    let reply = data?.choices?.[0]?.message?.content ?? JSON.stringify(data, null, 2);

    // Remove <think> ... </think> sections, as in the lab
    reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    return reply;
}

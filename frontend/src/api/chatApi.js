/**
 * Send a chat message to the backend.
 * @param {string} text
 * @returns {Promise<{reply: string, source?: string}>}
 */
export async function sendMessage(text) {
    const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (HTTP ${res.status})`);
    }

    return res.json();
}

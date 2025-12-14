import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Resolve paths relative to this file (avoids WebStorm working-directory issues).
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rulesPath = path.join(__dirname, '..', 'data', 'rules.json');

/**
 * Load scripting rules from JSON.
 * @returns {Array<{id:string, matchAny:string[], reply:string}>}
 */
function loadRules() {
    const raw = fs.readFileSync(rulesPath, 'utf-8');
    return JSON.parse(raw);
}

/**
 * Return a scripted reply if any rule matches the user's text, otherwise null.
 * @param {string} userText
 * @returns {string|null}
 */
export function getScriptedReply(userText) {
    const text = userText.toLowerCase();
    const rules = loadRules();

    for (const rule of rules) {
        const matched = rule.matchAny?.some((p) => text.includes(p.toLowerCase()));
        if (matched) return rule.reply;
    }

    return null;
}

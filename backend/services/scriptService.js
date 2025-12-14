import fs from 'fs';
import path from 'path';

const rulesPath = path.join(process.cwd(), 'data', 'rules.json');

/**
 * Load scripting rules from JSON file.
 * Kept deliberately simple for coursework clarity.
 * @returns {Array<{id:string, matchAny:string[], reply:string}>}
 */
export function loadRules() {
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
        if (rule.matchAny?.some((p) => text.includes(p.toLowerCase()))) {
            return rule.reply;
        }
    }

    return null;
}

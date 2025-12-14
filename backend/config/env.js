import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralised config for environment variables.
 */
export const PORT = process.env.PORT || 3001;
export const HF_URL = process.env.HF_URL;
export const HF_TOKEN = process.env.HF_TOKEN;

if (!HF_URL || !HF_TOKEN) {
    console.warn(
        'HF_URL or HF_TOKEN not set in .env – LLM calls will fail until these are configured.'
    );
}

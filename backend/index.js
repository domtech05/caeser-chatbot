import express from 'express';
import { PORT } from './config/env.js';
import { handleChatMessage } from './controllers/chatController.js';

const app = express();

app.use(express.json());

// Health-check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Main chat endpoint
app.post('/api/message', handleChatMessage);

app.listen(PORT, () => {
    console.log('Backend listening on http://localhost:${PORT}');
});

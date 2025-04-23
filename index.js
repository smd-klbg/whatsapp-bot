const express = require('express');
const venom = require('venom-bot');

const app = express();
let client = null;

// Create the WhatsApp session
venom
  .create({
    session: 'whatsapp-bot', // session name
    multidevice: true,       // supports multi-device
    headless: true,          // set to false if you want to see browser
    useChrome: true,
    debug: false
  })
  .then((whatsappClient) => {
    client = whatsappClient;

    console.log('[whatsapp-bot] Client initialized');

    // Example listener
    client.onMessage((message) => {
      if (message.body === 'hi' && message.isGroupMsg === false) {
        client.sendText(message.from, 'Hello! How can I help you today?');
      }
    });
  })
  .catch((error) => {
    console.error('[whatsapp-bot] Error initializing client:', error);
  });

// QR endpoint (optional but helpful during development)
app.get('/qr', (req, res) => {
  if (!client) {
    return res.status(503).send('Client not initialized yet. Please wait...');
  }

  client.getWAVersion().then((version) => {
    res.send(`Client is running WA Version: ${version}`);
  }).catch(err => {
    res.status(500).send(`Error fetching WA version: ${err}`);
  });
});

// Home route
app.get('/', (req, res) => {
  res.send('WhatsApp Bot is running!');
});

// Use correct port for Render or fallback for local
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`==> Server is running on port ${PORT}`);
});

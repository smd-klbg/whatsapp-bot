const express = require('express');
const venom = require('venom-bot');
const app = express();

let client = null;
let qrData = null;

// Initialize WhatsApp session
venom
  .create(
    'whatsapp-bot',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log('Scan the QR below in terminal:\n');
      console.log(asciiQR);
      qrData = base64Qr;
    },
    (statusSession, session) => {
      console.log(`[whatsapp-bot] Status: ${statusSession}`);
    },
    {
      multidevice: true,
      headless: true,
      useChrome: true,
      debug: false
    }
  )
  .then((whatsappClient) => {
    client = whatsappClient;
    console.log('[whatsapp-bot] Client is ready.');
  })
  .catch((err) => {
    console.error('[whatsapp-bot] Initialization failed:', err);
  });

app.get('/', (req, res) => {
  res.send('WhatsApp Bot is running.');
});

app.get('/qr', (req, res) => {
  if (qrData) {
    res.send(`
      <h2>Scan this QR Code with your WhatsApp</h2>
      <img src="${qrData}" />
    `);
  } else {
    res.send('Client not initialized yet. Please wait or check logs.');
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`==> Server running on port ${PORT}`);
});

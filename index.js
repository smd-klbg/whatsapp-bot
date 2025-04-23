const express = require('express');
const venom = require('venom-bot');
const app = express();

let client = null;
let qrData = '';
let qrGenerated = false;

// Create WhatsApp client
venom
  .create(
    'whatsapp-bot',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log('[whatsapp-bot] QR code is ready. Scan it below:\n');
      console.log(asciiQR); // Visible in Render logs
      qrData = `data:image/png;base64,${base64Qr}`;
      qrGenerated = true;
    },
    (statusSession, session) => {
      console.log(`[whatsapp-bot] Status: ${statusSession}`);
    },
    {
      multidevice: true,
      headless: true,
      useChrome: true,
      debug: true,
    }
  )
  .then((_client) => {
    client = _client;
    console.log('[whatsapp-bot] Client initialized.');
  })
  .catch((err) => {
    console.error('[whatsapp-bot] Error initializing client:', err);
  });

// Express routes
app.get('/', (req, res) => {
  res.send('WhatsApp chatbot is running.');
});

app.get('/qr', (req, res) => {
  if (qrGenerated && qrData) {
    const html = `
      <html>
        <body>
          <h2>Scan the QR Code below with WhatsApp:</h2>
          <img src="${qrData}" />
        </body>
      </html>
    `;
    res.send(html);
  } else {
    res.send('QR not generated yet. Please wait a few seconds and refresh.');
  }
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`==> Server running on port ${PORT}`);
});

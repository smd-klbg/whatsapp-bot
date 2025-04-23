const express = require('express');
const venom = require('venom-bot');
const app = express();

let client = null;
let qrData = null;
let qrGenerated = false;

// Create WhatsApp session
venom
  .create(
    'whatsapp-bot',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log('[whatsapp-bot] QR code is ready. Scan it below:\n');
      console.log(asciiQR);
      qrData = base64Qr;
      qrGenerated = true;
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

// Show QR with delay to ensure it has time to generate
app.get('/qr', (req, res) => {
  if (!qrGenerated) {
    // Wait for 10 seconds to allow QR to be generated
    setTimeout(() => {
      if (qrGenerated && qrData) {
        res.send(`
          <h2>Scan this QR Code with your WhatsApp</h2>
          <img src="${qrData}" />
        `);
      } else {
        res.send('QR not generated yet. Please wait or check logs.');
      }
    }, 10000); // wait 10 seconds
  } else {
    res.send(`
      <h2>Scan this QR Code with your WhatsApp</h2>
      <img src="${qrData}" />
    `);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`==> Server running on port ${PORT}`);
});

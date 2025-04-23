const venom = require('venom-bot');

venom
  .create(
    'whatsapp-bot',  // Session name
    (base64Qr, asciiQR) => {
      console.log('[whatsapp-bot] QR Code Generated:');
      console.log(asciiQR);  // ASCII QR code for terminal/logging
      qrData = `data:image/png;base64,${base64Qr}`;  // QR code image in base64
      qrGenerated = true;  // Flag indicating QR code is generated
    },
    (statusSession, session) => {
      console.log(`[whatsapp-bot] Status: ${statusSession}`);
      if (statusSession === 'authenticated') {
        console.log('[whatsapp-bot] Logged in successfully.');
      } else if (statusSession === 'not_authenticated') {
        console.log('[whatsapp-bot] QR not scanned or login failed.');
      }
    },
    {
      multidevice: true,  // Enable multi-device support
      headless: false,  // Disable headless mode for debugging (change back to true after working)
      useChrome: true,   // Use Chrome browser
      debug: true,       // Enable debug mode for detailed logs
      waitForLogin: 60000, // Increased wait time (60 seconds)
    }
  )
  .then((client) => {
    console.log('[whatsapp-bot] Client initialized.');

    // You can also send a message to test if the bot is working
    client.sendText('your-phone-id', 'Hello from WhatsApp bot!')
      .then((result) => {
        console.log('Message sent successfully:', result);
      })
      .catch((err) => {
        console.error('Error sending message:', err);
      });
  })
  .catch((err) => {
    console.error('[whatsapp-bot] Error initializing client:', err);
  });

const venom = require('venom-bot');
const puppeteer = require('puppeteer-core');

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
      useChrome: true,    // Use Chrome browser
      headless: false,    // Disable headless mode for debugging
      debug: true,        // Enable debug mode for detailed logs
      waitForLogin: 60000, // Increased wait time (60 seconds)
      executablePath: '/usr/bin/chromium-browser', // Specify the path to chromium (Render environment)
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--headless', 
        '--disable-gpu', 
        '--disable-software-rasterizer', 
        '--remote-debugging-port=9222'
      ], // Additional arguments for Chromium
    }
  )
  .then((client) => {
    console.log('[whatsapp-bot] Client initialized.');

    // Send a test message to verify everything is working
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

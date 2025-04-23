const venom = require('venom-bot');
const puppeteer = require('puppeteer-core');

// Step 1: Create the bot
venom
  .create(
    'whatsapp-bot', // Session name
    (base64Qr, asciiQR) => {
      // Log the QR Code (ASCII for terminal and base64 for images)
      console.log('[whatsapp-bot] QR Code generated:');
      console.log(asciiQR); // ASCII QR code for debugging
      console.log('[whatsapp-bot] Base64 QR:', base64Qr); // For rendering image in web app
    },
    (statusSession, session) => {
      // Log the session status (this will let us know if the login was successful)
      console.log('[whatsapp-bot] Status:', statusSession);
      if (statusSession === 'authenticated') {
        console.log('[whatsapp-bot] Successfully logged in.');
      } else {
        console.log('[whatsapp-bot] Not authenticated yet.');
      }
    },
    {
      multidevice: true, // Use multi-device support (important for the latest WhatsApp)
      headless: false,   // Disable headless mode so we can see the browser
      debug: true,       // Enable debug logging
      waitForLogin: 60000, // Wait time before giving up (60 seconds)
      useChrome: true,    // Ensure it uses the Chrome browser
      executablePath: '/usr/bin/chromium-browser', // Path to Chromium on Render or other cloud platform
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--headless', 
        '--disable-gpu',
        '--remote-debugging-port=9222', 
        '--disable-software-rasterizer'
      ],
    }
  )
  .then((client) => {
    // Once the client is initialized, log a success message
    console.log('[whatsapp-bot] WhatsApp bot initialized.');

    // Example of sending a test message
    client.sendText('your-phone-id', 'Hello from WhatsApp bot!')
      .then((result) => {
        console.log('Message sent:', result);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  })
  .catch((error) => {
    console.error('[whatsapp-bot] Error initializing bot:', error);
  });

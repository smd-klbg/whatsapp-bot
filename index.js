const venom = require('venom-bot');
const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

// Start express server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

// Create venom session
venom
  .create({
    session: 'whatsapp-bot',
  })
  .then((client) => start(client))
  .catch((err) => {
    console.error('Error creating session:', err);
  });

// Bot logic
function start(client) {
  client.onMessage((message) => {
    console.log('Message:', message.body);

    // Handle button responses
    if (message.body === 'Option 1') {
      client.sendText(message.from, 'You selected Option 1');
    } else if (message.body === 'Option 2') {
      client.sendText(message.from, 'You selected Option 2');
    } else {
      // Send interactive buttons
      client.sendButtons(
        message.from,
        'Please choose one of the following options:',
        [
          { buttonText: { displayText: 'Option 1' } },
          { buttonText: { displayText: 'Option 2' } }
        ],
        'Click a button below'
      );
    }
  });

  // Handle QR Code logs
  client.onStateChange((state) => {
    console.log('State:', state);
  });
}

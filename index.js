const venom = require('venom-bot');
const express = require('express');

const app = express();
const port = process.env.PORT || 10000;

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening at http://0.0.0.0:${port}`);
});

venom.create().then((client) => {
    console.log('Bot created, waiting for QR Code...');
    
    client.onQrCode((qrCode) => {
        console.log('QR Code:', qrCode); // This logs the QR code string
    });

    client.onStateChange((state) => {
        console.log(`State changed: ${state}`);
    });

    client.onMessage((message) => {
        console.log("Message received:", message.body);
        if (message.body === '1') {
            client.sendText(message.from, 'Option 1 selected!');
        } else if (message.body === '2') {
            client.sendText(message.from, 'Option 2 selected!');
        } else {
            client.sendText(message.from, 'Please select a valid option: 1 or 2.');
        }
    });
}).catch(err => {
    console.error("Error creating venom bot:", err);
});

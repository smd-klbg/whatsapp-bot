const venom = require('venom-bot');
const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening at http://0.0.0.0:${port}`);
});

venom.create().then((client) => {
    console.log('Bot created, waiting for QR Code...');
    
    // Handle the QR code generation and log it
    client.onQrCode((qrCode) => {
        console.log('QR Code:', qrCode); // This logs the QR code string
    });

    // Handle state change events (e.g., connected, disconnected)
    client.onStateChange((state) => {
        console.log(`State changed: ${state}`);
        if (state === 'DISCONNECTED') {
            console.log('Bot has disconnected. Reconnecting...');
            // Reconnect logic here if needed
        }
    });

    // Handle incoming messages
    client.onMessage((message) => {
        console.log("Message received:", message.body);

        // Send buttons to user
        if (message.body === '1') {
            client.sendText(message.from, 'Option 1 selected!');

const venom = require('venom-bot');
const express = require('express');

// Create an express app
const app = express();
const port = process.env.PORT || 10000; // Render requires the app to listen on the correct port

// Make the app listen on 0.0.0.0 to ensure it can be accessed externally
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening at http://0.0.0.0:${port}`);
});

venom.create().then((client) => {
    client.onMessage((message) => {
        if (message.body === '1') {
            client.sendText(message.from, 'You selected: 📦 View Products');
        } else if (message.body === '2') {
            client.sendText(message.from, 'You selected: 💬 Talk to Support');
        } else if (message.body === '3') {
            client.sendText(message.from, 'You selected: 📣 Subscribe to Offers');
        }
    });

    function sendMenu(client, chatId) {
        client.sendText(
            chatId,
            `Please choose an option:\\n1. 📦 View Products\\n2. 💬 Talk to Support\\n3. 📣 Subscribe to Offers`
        );
    }
});

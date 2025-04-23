const venom = require('venom-bot');

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
      `Please choose an option:\n1. 📦 View Products\n2. 💬 Talk to Support\n3. 📣 Subscribe to Offers`
    );
  }
});
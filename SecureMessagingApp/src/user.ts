import WebSocket from 'ws';

const ws = new WebSocket('ws://0.0.0.0:3000');

let username: string = '';
let recipient: string = '';

ws.on('open', () => {
    console.log('Connected to the server');
    console.log('Enter your username and then press Enter:');
});

process.stdin.on('data', (data) => {
    const input = data.toString().trim();

    if (!username) {
        username = input;
        console.log('Username set. Now type the recipient\'s name and then press Enter:');
        return;
    }

    if (!recipient) {
        recipient = input;
        console.log('Recipient set. Now start to type your messages and then press Enter to send:');
        return;
    }

    const message = {
        from: username,
        to: recipient,
        text: input,
    };

    ws.send(JSON.stringify(message));
});

ws.on('message', (data: string) => {
    try{
        const message = JSON.parse(data);
        console.log(`Received from ${message.from}: ${message.text}`);
    }catch{
        console.error('Error parsing message');
    }
});

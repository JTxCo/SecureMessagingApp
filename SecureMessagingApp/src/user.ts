// user.ts
import { paginateScan } from '@aws-sdk/client-dynamodb';
import WebSocket from 'ws';

//const ws = new WebSocket('ws://localhost:3000');
const ws = new WebSocket('ws://0.0.0.0:3000');

ws.on('open', () => {
    console.log('Connected to the server');
    console.log('Start typing messages (press Enter to send):');
});

ws.on('message', (message: string) => {
    try{
        const parsedMessage = JSON.parse(message);
        const actualMessage = parsedMessage.message;
        console.log('Received: ', actualMessage);
    }catch{
        console.error('Error parsing message');
    }
});

process.stdin.on('data', (data) => {
    const message = data.toString().trim();
    ws.send(JSON.stringify({ message }));
});

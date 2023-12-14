// server.ts
import * as WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 3000, host:  '0.0.0.0'});
const clients: Map<string, WebSocket> = new Map();  // Maps usernames to WebSocket instances

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (data: string) => {
        try{    
            const message = JSON.parse(data);
            if (!message.from || !message.to || !message.text) {
                throw new Error('Invalid message');
            }

            // When the username is sent for the first time,
            // map it to the WebSocket instance in the 'clients' map
            if (!clients.has(message.from)) {
                clients.set(message.from, ws);
                console.log(`User ${message.from} connected`);
                return;
            }

            console.log(`Received from ${message.from}: ${message.text}`);
            
            
            const recipientWs = clients.get(message.to);
            if (recipientWs) {
                recipientWs.send(data); // Forward the message to the recipient
            } else {
                console.log(`User ${message.to} is not connected.`);
            }

        } catch (error){
            console.error('Error parsing message: ', error);
        }
    });

    // Handle WebSocket 'close' event here...
});

console.log('WebSocket server is running on port 3000');

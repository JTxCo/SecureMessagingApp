// server.ts
import * as WebSocket from 'ws';

//const wss = new WebSocket.Server({ port: 3000});
const wss = new WebSocket.Server({ port: 3000, host:  '0.0.0.0'});
const clients: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
    clients.push(ws);

    ws.on('message', (message: string) => {
        try{    
            const parsedMessage = JSON.parse(message);
            console.log('Received: ', parsedMessage.message);
            clients.forEach((client) => {
                if (client !== ws){
                    client.send(JSON.stringify(parsedMessage));
                }
            })
        }
        catch (error){
            console.error('Error parsing message: ', error);
        }
    });

    ws.on('close', () => {
        // Remove the disconnected client
        clients.splice(clients.indexOf(ws), 1);
    });
});

console.log('WebSocket server is running on port 3000');

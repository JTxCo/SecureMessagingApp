// server side
import * as WebSocket from 'ws';
import { Message } from './index';

export function webSocketServer(port: number): void{
    const wss = new WebSocket.Server({ port: 3000});
    //const wss = new WebSocket.Server({ port: 3000, host:  '0.0.0.0'});
    const clients: WebSocket[] = [];

    wss.on('connection', (ws: WebSocket) => {
        clients.push(ws);

        ws.on('message', (message: string) => {
            try{    
                const parsedMessage = JSON.parse(message);
                const actualMessage = parsedMessage.message !== undefined ? parsedMessage.message: parsedMessage;
                //console.log('Received: ', parsedMessage.text);
                console.log('Recieved: ', actualMessage);
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
}
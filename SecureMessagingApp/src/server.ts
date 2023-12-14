import * as WebSocket from 'ws';
import { Message, getUserFromDatabasByID, getContactFromDatabaseByID} from './Database';
import { Network_Message } from './Model/Communication/network-Message';

const ws = new WebSocket.Server({ port: 3000, host:  '0.0.0.0'});
const clients: Map<string, WebSocket> = new Map();  // Maps usernames to WebSocket instances

ws.on('connection', (ws: WebSocket) => {
    let currentUserName: string = "";

    ws.on('message', (data: string) => {
        try {
            const message: Network_Message = JSON.parse(data);
            currentUserName = message.senderUsername;
            const recipientUsername = message.receiverUsername;
            
            console.log(`Received from ${currentUserName}: ${message.text}`);
            
            const recipientWs = clients.get(recipientUsername);
            if (recipientWs) {
                recipientWs.send(data); // Forward the message to the recipient
            } else {
                console.log(`User ${recipientUsername} is not connected.`);
            }

        } catch (error) {
            console.error('Error parsing message: ', error);
        }
    });

    ws.on('close', () => {
        if (currentUserName) {
            clients.delete(currentUserName);
            console.log(`User ${currentUserName} disconnected`);
        }
    });

    // Store the WebSocket instance in the clients map using a unique identifier,
    // such as the 'currentUserName' in this case
    clients.set(currentUserName, ws);

    console.log(`User ${currentUserName} connected`); // Display the username of the connecting device
});

console.log('WebSocket server is running on port 3000');

import * as WebSocket from 'ws';
import { Message, getUserFromDatabasByID, getContactFromDatabaseByID} from './Database';
import { Network_Message } from './Model/Communication/network-Message';

const ws = new WebSocket.Server({ port: 3000, host:  '0.0.0.0'});
const clients: Map<string, WebSocket> = new Map();  // Maps usernames to WebSocket instances

let currentUserName: string = " ";

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

console.log('WebSocket server is running on port 3000');;





/* old code
wss.on('connection', (ws: WebSocket) => {
    let currentUserName: string = " ";

    ws.on('message', async (data: string) => {
        try {
            const message: Message = JSON.parse(data);
            let senderName: string = '';
            if (message.senderUserId) {
                const user = await getUserFromDatabasByID(message.senderUserId)||undefined;
                if (user) {
                    senderName = user.firstName + ' ' + user.lastName;
                    currentUserName = user.username||" ";
                }
              } else if (message.senderContactId) {
                const contact = await getContactFromDatabaseByID(message.senderContactId);
                if (contact) {
                    senderName = contact.firstName + ' ' + contact.lastName;
                    currentUserName = contact.userName||" ";
                }
              } else {
                console.log("No sender found");
              }
            const senderID: number| undefined = message.senderContactId || message.senderUserId;
            if (!message.id || !senderID||!message.text) {
                throw new Error('Invalid message');
            }

            if (!clients.has(currentUserName)) {
                clients.set(currentUserName, ws);
                console.log(`User ${currentUserName} connected`);
            }
            
            console.log(`Received from ${currentUserName}: ${message.text}`);
            
            const recipientWs = clients.get(message.);
            if (recipientWs) {
                recipientWs.send(data); // Forward the message to the recipient
            } else {
                console.log(`User ${} is not connected.`);
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
});



*/
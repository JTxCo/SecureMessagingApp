// wsClient.ts

import WebSocket from 'ws';
import { saveMessageToDatabase, Message, createMessage } from './Index';
import { Network_Message } from './network-Message';
import { createMessageStatus } from '../../Database/MessageStatus/MessageStatusFactory 2';
import { FSgetData } from '../../Controller';
import { getContactFromDatabaseByUserName } from '../../Database/Contact-Operations';


let ws: WebSocket

const connect = (onNewMessage: (msg: Network_Message) => void) => {
  ws = new WebSocket('ws://localhost:3000');

  ws.on('open', () => console.log('Connected to server'));

  ws.on('message', async (data: string) => {
    try {
      const msg: Network_Message = JSON.parse(data); 
      
      // Invoke createMessage method to generate a Message instance
      const userIdString = FSgetData('username');
      if(userIdString === undefined){
        console.log('Error: User not logged in');
        return;
      }
      const userID =  parseInt(userIdString);
      if(isNaN(userID)){
        console.log('Error: User not logged in');
        return;
      }
      if(userID === undefined){
        console.log('Error: User not logged in');
        return;
      }
      const contactID = await getContactFromDatabaseByUserName(msg.senderUsername);
      if(contactID === null){
        console.log('Error: Contact not found');
        return;
      }
      const message = await createMessage(
        msg.id, 
        msg.text, 
        new Date(msg.timestamp), 
        createMessageStatus( msg.status), 
        msg.chatID, 
        true, 
        userID, 
        contactID.id
      );
      
      // Save message into local database
        saveMessageToDatabase(message);
        onNewMessage(msg);
    } catch {
      console.error('Error parsing message');
    }
  });
};

const sendMessage = (message: Network_Message) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.error('WebSocket connection not open');
  }
};

export default { connect, sendMessage };

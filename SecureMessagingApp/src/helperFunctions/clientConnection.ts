import ws from 'ws';
import wsClient from '../Model/Communication/wsClient';
import { Network_Message } from '../Model/Communication/network-Message';
import { Message } from '../Database';
import { input } from '../Controller';

const handleNewMessage = (message: Network_Message|Message) => {
    console.log('Received a new message:', message);
    // Handle the incoming message as desired
  };
wsClient.connect(handleNewMessage);
input.question('what do you want to send', (text: string) => {  

    const message = new Network_Message(1,'test', 'Jim', 'hello', new Date(), 'sent', 1);
    wsClient.sendMessage(message);
});

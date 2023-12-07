// client side
import WebSocket from 'ws';
import { Message } from './index';
import { SentStatus } from './index';
import { createMessageStatus } from './index';

export function client(port: number): void {
    const ws = new WebSocket('ws://localhost:3000');
    //const ws = new WebSocket('ws://0.0.0.0:3000');

    ws.on('open', () => {
        console.log('Connected to the server');
        console.log('Start typing messages (press Enter to send):');

    });

    ws.on('message', (message: string) => {
        try{
            const parsedMessage = JSON.parse(message);
            const actualMessage = parsedMessage.message !== undefined ? parsedMessage.message: parsedMessage;
            //const actualMessage = JSON.stringify(parsedMessage);
            //console.log('Received: ', actualMessage);
            console.log('Recieved: ', actualMessage);
        }catch (error) {
            console.error('Error parsing message', error);
        }
    });
    let inputBuffer = '';
    process.stdin.on('data', (data) => {
        /*const input = data.toString().trim();
        const sentStatus = createMessageStatus('sent');
        const newMessage = new Message(
            1,
            message,
            new Date(),
            sentStatus,
            1,
            true
        );
        //console.log('stringify message: ', JSON.stringify(newMessage));
        ws.send(JSON.stringify({ message }));
    });
        //const input = data.toString.trim();
        if(input === ''){
            if(inputBuffer.trim() !== ''){
                const newMessage = {
                    message: inputBuffer.trim(),
                };
            
                console.log("Sent Message: ", newMessage.message);
                ws.send(JSON.stringify(newMessage));
                inputBuffer = '';
            }
        }
        else{
            inputBuffer += input + ' ';
        }*/
        const message = data.toString().trim();
        ws.send(JSON.stringify({ message }));
    });

}

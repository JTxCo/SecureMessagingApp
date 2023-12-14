// wsClient.ts

import WebSocket from 'ws';

let ws: WebSocket;

const connect = (onMessage: (message: any) => void) => {
  ws = new WebSocket('ws://localhost:3000');

  ws.on('open', () => console.log('Connected to the server'));

  ws.on('message', (data: string) => {
    try {
      const message = JSON.parse(data);
      onMessage(message);
    } catch {
      console.error('Error parsing message');
    }
  });

  ws.on('close', () => console.log('Disconnected from server'));
};

const sendMessage = (message: { from: string, to: string, text: string }) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.error('WebSocket connection not open');
  }
};

export default { connect, sendMessage };

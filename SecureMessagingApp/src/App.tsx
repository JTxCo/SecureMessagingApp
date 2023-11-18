// Import the MessageEncryption class
import {MessageEncryption} from './Security';

// generateSecretKey();
const messageEncryption = new MessageEncryption('secretKey');
const encryptedMessage: string =
  messageEncryption.encryptMessage('Hello World!');
console.log(encryptedMessage);
const decryptedMessage: string =
  messageEncryption.decryptMessage(encryptedMessage);
console.log(decryptedMessage);

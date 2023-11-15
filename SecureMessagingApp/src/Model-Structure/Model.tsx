// Import  MessageEncryption class
import {MessageEncryption, generateSecretKey, getSecretKey} from './Security';
(async () => {
await generateSecretKey();
const messageEncryption = getSecretKey();
const encryptedMessage: string =
  messageEncryption.encryptMessage('Hello World!');
console.log(encryptedMessage);
const decryptedMessage: string =
  messageEncryption.decryptMessage(encryptedMessage);
console.log(decryptedMessage);
}
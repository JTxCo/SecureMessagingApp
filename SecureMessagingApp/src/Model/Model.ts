import { generateSecretKey, } from './Security';
import { MessageEncryption } from './Security/MessageEncryption';
(async () => {
  const secretKey = await generateSecretKey();

  if (secretKey === null) {
    console.error('No secret key found. Please generate a new one.');
    return;
  }

  const messageEncryption = new MessageEncryption(secretKey);
  const encryptedMessage = messageEncryption.encryptMessage('Hello World!');
  console.log(encryptedMessage);
  
  const decryptedMessage = messageEncryption.decryptMessage(encryptedMessage)
  console.log(decryptedMessage);
})();

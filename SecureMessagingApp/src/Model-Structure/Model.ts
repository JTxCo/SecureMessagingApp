import {MessageEncryption, generateSecretKey, getSecretKey} from './Security';

(async () => {
  await generateSecretKey();
  const secretKey = await getSecretKey();

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

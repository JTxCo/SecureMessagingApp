import * as CryptoJS from 'crypto-js';
export class MessageEncryption {
  private secretKey: string;
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  public encryptMessage(message: string): string {
    return CryptoJS.AES.encrypt(message, this.secretKey).toString();
  }
}

const messageEncryption = new MessageEncryption('secretKey');
console.log(messageEncryption.encryptMessage('Hello World!'));

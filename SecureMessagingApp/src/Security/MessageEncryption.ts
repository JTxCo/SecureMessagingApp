import * as CryptoJS from 'crypto-js';
export class MessageEncryption {
  private secretKey: string;
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  public getSecretKey(): string {
    return this.secretKey;
  }
  public encryptMessage(message: string): string {
    return CryptoJS.AES.encrypt(message, this.secretKey).toString();
  }
  public decryptMessage(message: string): string {
    return CryptoJS.AES.decrypt(message, this.secretKey).toString(
      CryptoJS.enc.Utf8,
    );
  }
}


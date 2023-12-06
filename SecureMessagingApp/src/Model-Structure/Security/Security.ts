import * as crypto from 'crypto';
import * as SecureStore from 'expo-secure-store';

export async function generateSecretKey(): Promise<string> {
  const secretKey = crypto.randomBytes(32).toString('hex');
  await storeSecretKey(secretKey);
  return secretKey;
}

export async function storeSecretKey(secretKey: string): Promise<void> {
  // Store the secret key in the device's secure storage
  await SecureStore.setItemAsync('secretKey', secretKey);
}

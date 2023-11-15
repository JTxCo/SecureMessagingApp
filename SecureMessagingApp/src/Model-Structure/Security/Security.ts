import * as crypto from 'crypto';
import * as SecureStore from 'expo-secure-store';

export async function generateSecretKey(): Promise<void> {
  const secretKey = crypto.randomBytes(32).toString('hex');
  await storeSecretKey(secretKey);
}

export async function storeSecretKey(secretKey: string): Promise<void> {
  // Store the secret key in the device's secure storage
  await SecureStore.setItemAsync('secretKey', secretKey);
}
// Retrieve the secret key from the device's secure storage, there is a possibility of it being null so in that case it can return it as null
export async function getSecretKey(): Promise<string|null> {
  // Retrieve the secret key from the device's secure storage
  return await SecureStore.getItemAsync('secretKey');
}
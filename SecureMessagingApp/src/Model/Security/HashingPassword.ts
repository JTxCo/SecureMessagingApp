import bycrypt from 'bcryptjs';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt = await bycrypt.genSalt(saltRounds);
  return await bycrypt.hash(password, salt);
}
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bycrypt.compare(password, hashedPassword);
}
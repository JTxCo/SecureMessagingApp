// ...

import { hashPassword } from '../Model/Security/HashingPassword';
import { User } from './User';
import { SQLiteDBAccess } from './SqliteDBAccess';
import bycrypt from 'bcryptjs';

const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();
export async function registerUser(id: number, username: string, password: string, publicKey: string, firstName: string, lastName: string): Promise<void> {
  try{
    const user = await createUser(id, username, password, publicKey, firstName, lastName)
    await saveUserToDatabase(user);
  }
  catch(err){
    console.log("could not register user: " + err);
    throw err;
  }
}


export async function createUser(id: number, username: string, password: string, publicKey: string, firstName: string, lastName: string): Promise<User> {
  const hashedPassword = await hashPassword(password);
  return new User(id, username, hashedPassword, publicKey, firstName, lastName);
}

export async function updateUserInDatabase(user: User): Promise<void> {
  await prisma.user.update({
    where: { id: user.id },
    data: {
      hashedPassword: user.hashedPassword,
      publicKey: user.publicKey,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
}

export async function saveUserToDatabase(user: User): Promise<void> {
  await prisma.user.create({
    data: {
      id: user.id,
      username: user.username,
      hashedPassword: user.hashedPassword,
      publicKey: user.publicKey,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
}

export async function checkPassword(username: string, password: string): Promise<boolean> {
  const user = await prisma.user.findFirst({ where: { username: username } });
  if (user) {
    return comparePasswords(password, user.hashedPassword);
  } else {
    return false;
  }
}

export async function comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
  return bycrypt.compare(inputPassword, hashedPassword);
}
export async function getUserFromDatabasByID(id: number): Promise<User | undefined> {
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (user) {
      return new User(user.id, user.username, user.hashedPassword, user.publicKey, user.firstName, user.lastName);
    } else {
      return undefined;
    }
}
export async function getUserFromDatabasByUsername(username: string): Promise<User | undefined> {
  const user = await prisma.user.findFirst({ where: { username: username } });
  if (user) {
    return new User(user.id, user.username, user.hashedPassword, user.publicKey, user.firstName, user.lastName);
  } else {
    return undefined;
  }
}

export function getAllUsersFromDatabase(): Promise<User[]> {
  return prisma.user.findMany();
}

export function deleteUserFromDatabase(id: number): Promise<any> {
  return prisma.user.delete({ where: { id: id } });
}
export function deleteAllUsersFromDatabase(): Promise<any> {
  return prisma.user.deleteMany();
}
// ...

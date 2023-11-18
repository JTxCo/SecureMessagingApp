// ...

import { hashPassword } from './../Model-Structure/Security/HashingPassword';
import { User } from './User';
import { SQLiteDBAccess } from './SqliteDBAccess';

const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();

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
  const hashedInputPassword = await hashPassword(inputPassword);
  return hashedInputPassword == hashedPassword;
}

export async function getUserFromDatabase(id: number): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (user) {
      return new User(user.id, user.username, user.hashedPassword, user.publicKey, user.firstName, user.lastName);
    } else {
      return null;
    }
  }

export function getAllUsersFromDatabase(): Promise<User[]> {
  return prisma.user.findMany();
}

export function deleteUserFromDatabase(id: number): Promise<any> {
  return prisma.user.delete({ where: { id: id } });
}

// ...

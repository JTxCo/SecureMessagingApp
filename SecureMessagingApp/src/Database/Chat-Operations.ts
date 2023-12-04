import {Chat, IndividualChat, GroupChat, SQLiteDBAccess, User, Contact, Message } from './';



const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();


export async function createChat(id: number, chatName: string, userId: number, user: User, members: Contact[], Messages: Message[]): Promise<Chat> {
  if(members.length > 1) {
    return new GroupChat(id, chatName, userId, user, members, Messages);
  }
  return new IndividualChat(id, chatName, userId, user, members, Messages);
}
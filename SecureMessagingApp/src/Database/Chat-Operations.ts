import {Chat, IndividualChat, GroupChat, SQLiteDBAccess, User, Contact,Message, createMessageStatus } from './';
import { createMessage, getMessagesFromDatabaseByChatId, setReadyToSend } from './Message-Operations';
import { getUserFromDatabasByID } from './User-Operations';
import { getContactFromDatabaseByID } from './Contact-Operations';
import { FSgetData } from './FS-Storage';


const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();
export function createChat(id: number, chatName: string, userId: number, members: Contact[], messages: Message[]): Chat {
  if (members.length == 1) {
    return new IndividualChat(id, chatName, userId, members, messages);
  }
  return new GroupChat(id, chatName, userId, members, messages);
}


export async function saveChatToDatabase(chat: Chat): Promise<void> {
  const operations = [];

      operations.push(
          prisma.chat.create({
              data: {
                  id: chat.id,
                  name: chat.chatName,
                  userId: chat.userId,
              },
          })
      );

      // First, get unique contacts from database
      const foundContactsPromises = chat.members.map(member => prisma.contact.findUnique({ where: { id: member.id } }));

      // Wait for all promises to resolve
      const foundContacts = await Promise.all(foundContactsPromises);

      // Prepare operations to connect members (Contacts)
      for(let contact of foundContacts) {
          if (!contact) {
              throw new Error(`Contact not found`);
          }
    
          operations.push(
              prisma.chat.update({
                  where: { id: chat.id },
                  data: {
                    contacts: {
                        connect: {
                            id: contact.id,
                        },
                    },
                  },
              })
          );
      }

      // Execute transaction
      try {
          await prisma.$transaction(operations);
      } catch (error) {
          console.log("Failed to create chat: ", error);
      }
}





export async function getChatFromDatabaseByChatId(id: number) : Promise<Chat | null> {
  const chat = await prisma.chat.findUnique({ 
    where: { id: id }, 
    include: { 
      contacts: true, 
      messages: true, 
      user: true 
    } 
  });

  if (!chat) {
    return null;
  }

  // use Promise.all to run all tasks in parallel
  const messages = await Promise.all(chat.messages.map(async (msg) => {
    let user = undefined;
    let contact = undefined;

    if (msg.senderUserId) {
      user = await getUserFromDatabasByID(msg.senderUserId);
    }

    if (msg.senderContactId) {
      contact = await getContactFromDatabaseByID(msg.senderContactId);
    }

    return createMessage(
      msg.id,
      msg.text,
      msg.timestamp,
      createMessageStatus(msg.status),
      msg.chatId,
      msg.readyToSend,
      user?.id,
      contact?.id,
    );
  }));

  return createChat(chat.id, chat.name, chat.userId, chat.contacts, messages);
}

export async function getAllChatsFromDatabase(): Promise<Chat[]> {
  const chats = await prisma.chat.findMany({
    include: {
      contacts: true,
      messages: true,
      user: true,
    },
  });

  // use Promise.all to run all tasks in parallel
  return await Promise.all(chats.map(async (chat) => {
    // use Promise.all to run all tasks in parallel
    const messages = await getMessagesFromDatabaseByChatId(chat.id);
    return createChat(chat.id, chat.name, chat.userId, chat.contacts, messages);
  }));
}

export async function getChatsFromDatabaseByUserId(): Promise<Chat[]> {
  const userIdString = FSgetData('username');
  if (userIdString === undefined) {
    throw new Error('User ID not found');
  }
  const userId: number = parseInt(userIdString);
  const chats = await prisma.chat.findMany({
    where: { userId: userId },
    include: {
      contacts: true,
      messages: true,
      user: true,
    },
  });

  const chatPromises = chats.map(async (chat) => {
    const updatedChat = await getChatFromDatabaseByChatId(chat.id);
    return updatedChat;
  });

  const updatedChats = await Promise.all(chatPromises);
  return updatedChats.filter((chat) => chat !== null) as Chat[];
}

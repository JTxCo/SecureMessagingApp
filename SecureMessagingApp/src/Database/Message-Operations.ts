import {  getUserFromDatabasByID } from "./User-Operations";
import{ Message, User,Chat, Contact, MessageStatus, SQLiteDBAccess,createMessageStatus } from "./";
import { getContactFromDatabaseByID } from "./Contact-Operations";

const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();
//might optimize this function and remove the if satement
export async function createMessage(id: number, text: string, timestamp: Date, status: MessageStatus, chatID: number, readyToSend: boolean, senderUserId?: number, senderContactId?: number ): Promise<Message> {
  if(senderUserId) {
    return new Message(id, text, timestamp, status, chatID,readyToSend, senderUserId, undefined);
  }
  return new Message(id, text, timestamp, status, chatID ,readyToSend, undefined, senderContactId);
}
export function setReadyToSend(message: Message): void {
  message.readyToSend = true;
}

export async function saveMessageToDatabase(message: Message): Promise<void> {
  if(message.senderUserId) {
    await prisma.message.create({
      data: {
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
        chatId: message.chatId,
        status: message.status.getStatus(),
        readyToSend: message.readyToSend,
        senderUserId: message.senderUserId,
      },
    });
  } else {
    await prisma.message.create({
      data: {
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
        chatId: message.chatId,
        status: message.status.getStatus(),
        senderContactId: message.senderContactId,
      },
    });
  }
}
async function getUserAndContactFromMessage(message: {senderUserId: number | null, senderContactId: number | null}): Promise<{ user: User | undefined, contact: Contact | undefined }> {
  let senderUser: User | undefined;
  let senderContact: Contact | undefined;

  if (message.senderUserId !== null) {
    senderUser = await getUserFromDatabasByID(message.senderUserId);
  }

  if (message.senderContactId !== null) {
    senderContact = await getContactFromDatabaseByID(message.senderContactId);
  }

  return { user: senderUser, contact: senderContact };
}

//This funcrtion uses the User/Contact operations to create a user/contact object from the database, and then creates a message object from the database with associated into
//  if one does not exist it is null 
export async function getMessageFromDatabase(id: number): Promise<Message | null> {
  const message = await prisma.message.findUnique({
    where: { id: id },
  });

  if (message) {
    const { user: senderUser, contact: senderContact } = await getUserAndContactFromMessage(message);

    return createMessage(
      message.id,
      message.text,
      new Date(message.timestamp),
      createMessageStatus(message.status),
      message.chatId,
      message.readyToSend,
      senderUser?.id,
      senderContact?.id
    );
  } 

  return null;
}


  //this will return every message froma chatId in the database. It will create a message object for each message in the database, and then return an array of messages
  export async function getMessagesFromDatabaseByChatId(chatId: number): Promise<Message[]> {
    const messages = await prisma.message.findMany({ 
      where: { chatId: chatId },
      orderBy: {
        timestamp: 'asc', // order by timestamp in ascending manner
      },
    });
            
    return Promise.all(messages.map(async (message) => {
      const { user: senderUser, contact: senderContact } = await getUserAndContactFromMessage(message);
      
      return createMessage(
        message.id,
        message.text,
        message.timestamp,
        createMessageStatus(message.status),
        message.chatId,
        message.readyToSend,
        senderUser?.id,
        senderContact?.id
      );
    }));
  }
  
  

  export async function updateMessageInDatabase(message: Message): Promise<void> {
    if(message.senderUserId) {
      await prisma.message.update({
        where: { id: message.id },
        data: {
          text: message.text,
          timestamp: message.timestamp,
          chatId: message.chatId,
          status: message.status.getStatus(),
          senderUserId: message.senderUserId,
        },
      });
    } else {
      await prisma.message.update({
        where: { id: message.id },
        data: {
          text: message.text,
          timestamp: message.timestamp,
          chatId: message.chatId,
          status: message.status.getStatus(),
          senderContactId: message.senderContactId,
        },
      });
    }
  }
  
  export async function deleteMessageFromDatabase(message: Message): Promise<void> {
    await prisma.message.delete({
      where: { id: message.id },
    });
  }


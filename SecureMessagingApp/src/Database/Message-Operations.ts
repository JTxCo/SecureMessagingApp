import { Message } from "./Message";
import { User } from "./User";
import { Contact } from "./Contact";
import * as MessageStatus from "./MessageStatus";
import { SQLiteDBAccess } from "./SqliteDBAccess";
import { createUser, getUserFromDatabase } from "./User-Operations";
import { getContactFromDatabaseByID } from "./Contact-Operations";

const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();

export async function createMessage(id: number, text: string, timestamp: Date, chatId: number, status: MessageStatus.MessageStatus, senderUser?: User, senderContact?: Contact): Promise<Message> {
  if(senderUser) {
    return new Message(id, text, timestamp, chatId, status, senderUser);
  }
  return new Message(id, text, timestamp, chatId, status, senderContact);
}
export function setReadyToSend(message: Message): void {
  message.readyToSend = true;
}

export async function saveMessageToDatabase(message: Message): Promise<void> {
  if(message.senderUser) {
    await prisma.message.create({
      data: {
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
        chatId: message.chatId,
        status: message.status.getStatus(),
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

//This funcrtion uses the User/Contact operations to create a user/contact object from the database, and then creates a message object from the database with associated into
//  if one does not exist it is null
export async function getMessageFromDatabase(id: number): Promise<Message | null> {
    const message = await prisma.message.findUnique({
      where: { id: id },
    });
    
    if (message) {
      let senderUser: User | undefined;
      let senderContact: Contact | undefined;
      if(message.senderUserId) {
      const senderUser = await getUserFromDatabase(message.senderUserId);
      }
      else {
        const senderContact = await getContactFromDatabaseByID(message.senderContactId);
      }
      return createMessage(
          message.id,
          message.text,
          new Date(message.timestamp),
          message.chatId,
          MessageStatus.MessageStatusFactory.createMessageStatus(message.status),
          senderUser,
          senderContact
      );
    } else {
      return null;
    }
  }
  //this will return every message froma chatId in the database. It will create a message object for each message in the database, and then return an array of messages
  export async function getMessagesFromDatabaseByChatId(chatId: number): Promise<Message[]> {
    const messages = await prisma.message.findMany({ where: { chatId: chatId } });
    return Promise.all(messages.map(async (message) => {
      
      let senderUser;
      let senderContact;
  
      if (message.senderUserId) {
        senderUser = await getUserFromDatabase(message.senderUserId); 
      }
      if (message.senderContactId) {
        senderContact = await getContactFromDatabaseByID(message.senderContactId);  
      }
  
      return createMessage(
        message.id,
        message.text,
        new Date(message.timestamp),
        message.chatId,
        MessageStatus.MessageStatusFactory.createMessageStatus(message.status),
        senderUser,
        senderContact
      );
    }));
  }
    
  

  export async function updateMessageInDatabase(message: Message): Promise<void> {
    if(message.senderUser) {
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


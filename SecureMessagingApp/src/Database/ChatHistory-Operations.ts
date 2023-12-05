import {Chat, User, Contact, ChatHistory, Message, SQLiteDBAccess, createMessageStatus } from './';
import { getContactFromDatabaseByID } from './Contact-Operations';
import { createMessage, getMessagesFromDatabaseByChatId } from './Message-Operations';
import { getUserFromDatabasByID } from './User-Operations';

const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();

export function createChatHistory(chat: Chat): ChatHistory {
    return new ChatHistory(chat.id);//might change to accepting a chat
}

async function fetchMessages(): Promise<Message[]> {
    const messages = await prisma.message.findMany();
    return Promise.all(
        messages.map(async (message) => createMessage(
            message.id, 
            message.text, 
            message.timestamp, 
            createMessageStatus(message.status), 
            message.chatId, 
            message.readyToSend, 
            await getUserFromDatabasByID(message.senderUserId),
            await getContactFromDatabaseByID(message.senderContactId)
        ))
    );
}

  
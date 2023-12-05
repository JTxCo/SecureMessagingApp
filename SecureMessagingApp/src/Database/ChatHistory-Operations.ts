import {Chat, User, Contact, ChatHistory, Message, SQLiteDBAccess, MessageStatusFactory } from './';
import { createMessage, getMessagesFromDatabaseByChatId } from './Message-Operations';

const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();
const messageStatusFactory = new MessageStatusFactory();

export function createChatHistory(chat: Chat): ChatHistory {
    return new ChatHistory(chat.id);//might change to accepting a chat
}

async function fetchMessages(): Promise<Message[]> {
    const messages = await prisma.message.findMany();
    return Promise.all(messages.map((message) => createMessage(message.id, message.text, message.timestamp, MessageStatusFactory.createMessageStatus(message.status), getChatFromDatabaseByChatId(message.chatId), message.senderUserId, message.senderContactId)));
  }
  
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
        messages.map(async (message) => {

            // Initialize as undefined
            let user, contact = undefined;

            // Fetch only if ID is not null
            if (message.senderUserId !== null) {
                user = await getUserFromDatabasByID(message.senderUserId);
            }

            // Fetch only if ID is not null
            if (message.senderContactId !== null) {
                contact = await getContactFromDatabaseByID(message.senderContactId);
            }
            
            return createMessage(
                message.id, 
                message.text, 
                message.timestamp, 
                createMessageStatus(message.status), 
                message.chatId, 
                message.readyToSend, 
                user, // undefined if senderUserId was null
                contact // undefined if senderContactId was null
            );
        })
    );
}


//does not need to save to DB because it is just part of Chat that holds previous messages

    

  
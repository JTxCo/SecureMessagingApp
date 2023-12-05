import {Chat, IndividualChat, GroupChat, SQLiteDBAccess, User, Contact,Message, createMessageStatus } from './';
import { createMessage, setReadyToSend } from './Message-Operations';
import { getUserFromDatabasByID } from './User-Operations';
import { getContactFromDatabaseByID } from './Contact-Operations';


const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();


export async function createChat(id: number, chatName: string, userId: number, user: User, members: Contact[], Messages: Message[]): Promise<Chat> {
  if(members.length > 1) {
    return new GroupChat(id, chatName, userId, user, members, Messages);
  }
  return new IndividualChat(id, chatName, userId, user, members, Messages);
}
export async function saveChatToDatabase(chat: Chat): Promise<void> {
  const operations = [];

  // Prepare chat creation operation
  operations.push(
      prisma.chat.create({
          data: {
              id: chat.id,
              name: chat.chatName,
              userId: chat.userId,
          },
      })
  );

  // Prepare operations to find and connect members (Contacts)
  for(let member of chat.members) {
      operations.push(
          prisma.contact.findUnique({ where: { id: member.id } })
          .then((contact) => {
              if (!contact) {
                  throw new Error(`Contact with id ${member.id} not found`);
              }

              return prisma.chat.update({
                  where: { id: chat.id },
                  data: {
                      contacts: {
                          connect: {
                              id: member.id,
                          },
                      },
                  },
              });
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
  const messages = [];
  for (let msg of chat.messages) {
    const message = await createMessage(
      msg.id, 
      msg.text, 
      msg.timestamp, 
      createMessageStatus(msg.status), 
      msg.chatId, 
      msg.readyToSend, 
      await getUserFromDatabasByID(msg.senderUserId),
      await getContactFromDatabaseByID(msg.senderContactId)
    );
    messages.push(message);
  }
  return createChat(chat.id, chat.name, chat.userId, chat.user, chat.contacts, messages);
}


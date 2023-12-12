import { createContact, saveContactToDatabase, getData, Contact, saveMessageToDatabase, FSgetData, getAllContactsFromDatabase,  createChatOperation_CLI, input, AddContact, getAllChatsFromDatabase, createMessage } from './';
import { createMessageStatus } from './Database/MessageStatus/MessageStatusFactory';
import { Chat, User, Message, getUserFromDatabasByID } from './Database';
import { getChatsFromDatabaseByUserId } from './Database/Chat-Operations';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getMessagesFromDatabaseByChatId } from './Database/Message-Operations';
import { getContactFromDatabaseByID } from './Database/Contact-Operations';
export async function chatsClI(): Promise<void> {
    const chats = await getChatsFromDatabaseByUserId();
    chats.forEach((chat, index) => {
      const {chatName} = chat;
      console.log(`${index+1}. ${chatName}`);
    });
    if(chats.length === 0){
        console.log('You have no chats.')     
        console.log('\n');
        return;
    }
    const chatInput = await getChatSelection(chats); // need to await the promise
    console.log('\n');
    const specificChat = chats[chatInput-1];
    await getChatCommand(specificChat);
}

async function getChatCommand(specificChat: Chat): Promise<void> {
    console.log('Please select an option:');
    console.log('1. Send a message');
    console.log('2. Show chat history');
    console.log('3. Show chat members');
    console.log('4. Add a member to chat');
    console.log('5. Remove a member from chat');
    console.log('6. Rename chat');
    console.log('Press enter to exit');

    const choice: string = await new Promise((resolve) => {
        input.question('Enter your choice: ', resolve);
    });

    switch (choice) {
        case '1':
            const message: string = await new Promise((resolve) => {
                input.question('Enter your message: ', resolve);
            });
            await sendAMessage(message, specificChat.id);
            break;
        case '2':
            // showing chat history 
            console.log('\nChat history: \n');
            const messages: Message[] = await getMessagesFromDatabaseByChatId(specificChat.id);
            for (const message of messages) {
                let sender: string;
                let senderFirstName: string = '';
                let senderLastName: string = '';
                if (message.senderUserId) {
                const user = await getUserFromDatabasByID(message.senderUserId);
                if (user) {
                    senderFirstName = user.firstName;
                    senderLastName = user.lastName;
                } else {
                    // User not found. You can handle this case as you see fit.
                    continue;  // Skip current iteration
                }
            }
                else if (message.senderContactId) {
                    const contact = await getContactFromDatabaseByID(message.senderContactId);
                    if (contact) {
                    senderFirstName = contact.firstName;
                    senderLastName = contact.lastName;
                    } else {
                    // Contact not found. You can handle this case as you see fit.
                    continue;  // Skip current iteration
                    }
                }
                
                console.log(`Message from ${senderFirstName} ${senderLastName} at ${message.timestamp}: `);
                console.log(message.text);
                console.log('\n');
            }
            break;
              
        case '3':
            // show members
            seeMembers(specificChat.members);
            break;
        case '4':
            // your logic here
            break;
        case '5':
            // your logic here
            break;
        case '6':
            // your logic here
            break;
        case '':
            // Exit
            return;
        default:
            console.error('Invalid choice'); 
            console.log('Not a valid number choice. Please try again. \n');
            await getChatCommand(specificChat); // Await the function call
            return;
    }
    await getChatCommand(specificChat); // Re-invoke the function for another operation
}




async function sendAMessage(text: string, chatID :number ): Promise<void> {
    const id = Math.floor(Math.random() * 10000); 
    const userIdString = FSgetData('username');
    const userId: number = userIdString !== undefined ? parseInt(userIdString) : (() => {
      throw new Error('User ID not found');
    })();
    console.log('You chose to send a message. \n');
    console.log('Your message says: ', text);
    const DraftStatus = createMessageStatus('draft');
    const message = await createMessage(id, text, new Date(), DraftStatus, chatID, true, userId, undefined);
    saveMessageToDatabase(message);
    console.log(`Message sent: ${text}`);
}







async function getChatSelection(chats: Chat[]): Promise<number> {
    const chatInput: string =  await new Promise((resolve) => {
        input.question('Which chat # do you want to select: ', resolve);
    });
    const inputNum: number = parseInt(chatInput);
    if(inputNum > chats.length || inputNum < 1) { // compare inputNum with chats.length
        console.error('Invalid choice');
        console.log('Not a valid number choice. Please try again. \n');
        getChatSelection(chats);
    }
    return inputNum;
}

export function seeMembers(members: Contact[]): void {
        console.log('Members:');
        members.forEach((member) => {
            const { firstName, lastName } = member;
            console.log(`${firstName} ${lastName}`);
        });
}

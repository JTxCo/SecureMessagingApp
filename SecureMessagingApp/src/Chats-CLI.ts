import { createContact, saveContactToDatabase, getData, Contact, saveMessageToDatabase, FSgetData, getAllContactsFromDatabase,  createChatOperation_CLI, input, AddContact, getAllChatsFromDatabase, createMessage } from './';
import { createMessageStatus } from './Database/MessageStatus/MessageStatusFactory';
import { Chat, User } from './Database';
import { getChatsFromDatabaseByUserId } from './Database/Chat-Operations';
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
    return new Promise((resolve, reject) => {
        console.log('Please select an option:');
        console.log('1. Send a message');
        console.log('2. Show chat history');
        console.log('3. Show chat members');
        console.log('4. Add a member to chat');
        console.log('5. Remove a member from chat');
        console.log('6. Rename chat');
    
        input.question('Enter your choice: ', async (choice: string) => {
            switch (choice) {
                case '1':
                    input.question('Enter your message: ', async (message: string) => {
                        await sendAMessage(message);
                        resolve(); // Resolve after the switch completes to signal promise completion
                    });
                    break; 
                case '2':
                    // your logic here
                    break;
                case '3':
                    // your logic here
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
                default:
                    console.error('Invalid choice');
                    console.log('Not a valid number choice. Please try again. \n');
                    break;
            }
            resolve(); // Resolve after the switch completes to signal promise completion
        });
    });
}



async function sendAMessage(text: string): Promise<void> {
    const id = Math.floor(Math.random() * 10000); // placeholder
    const userIdString = FSgetData('username');
    const userId: number = userIdString !== undefined ? parseInt(userIdString) : (() => {
      throw new Error('User ID not found');
    })();
    console.log('You chose to send a message. \n');
    console.log('Your message says: ', text);
    const DraftStatus = createMessageStatus('draft');
    const message = await createMessage(id, text, new Date(), DraftStatus, 1, true, userId, undefined);
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

    export function seeMembers(members: Contact[]): Promise<void> {
        return new Promise((resolve) => {
          input.question('Do you want to see the members (y/n)? ', (answer) => {
            if(answer.toLowerCase() === 'y'){
              console.log('You answered yes.');
              console.log('Members:');
              members.forEach((member) => {
                const {firstName, lastName} = member;
                console.log(`${firstName} ${lastName}`);
              });
            }
            resolve(); // When done with processing user's answer, resolve the promise
          });
        });
      }
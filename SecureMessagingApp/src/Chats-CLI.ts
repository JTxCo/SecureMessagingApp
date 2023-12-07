import { createContact, saveContactToDatabase, getData, Contact, FSgetData, getAllContactsFromDatabase,  createChatOperation_CLI, input, AddContact, getAllChatsFromDatabase } from './';
import { Chat } from './Database';
export async function chatsClI(): Promise<void> {
    const chats = await getAllChatsFromDatabase();
    chats.forEach((chat, index) => {
      const {chatName} = chat;
      console.log(`${index+1}. ${chatName}`);
    });
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
                    // your logic here
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
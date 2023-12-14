import { createContact, saveContactToDatabase, getData, Contact, FSgetData, getAllContactsFromDatabase,  createChatOperation_CLI, input, AddContact, getAllChatsFromDatabase, chatsClI, getUserFromDatabasByID} from '.';

export function getUserChoice(): void {
  console.log('Welcome to the messaging app!');

  async function askForChoice(): Promise<void> {
    console.log('Please select an option:');
    console.log('1. Create a new contact');
    console.log('2. Show all contacts');
    console.log('3. Create a new chat');
    console.log('4. Show my chats');
    console.log('5. View user info');
    console.log('Enter to log out of app');

    const choice: string = await new Promise((resolve) => {
      input.question('Enter your choice: ', resolve);
    });

    switch (choice) {
      case '1':
        console.log('You chose to create a new contact. \n');
        const addedContact = await AddContact();
        if(addedContact === undefined){
          console.log('Contact not added. \n');
        }
        else{
          console.log('Contact added. \n');
        }
        await askForChoice();
        break;

      case '2':
        console.log('You chose to show all contacts. \n');
        const contacts = await getAllContactsFromDatabase();
        if(contacts.length === 0){
          console.log('You have no contacts.')     
          console.log('\n');
          await askForChoice();
          break;
        }
        contacts.forEach((contact) => {
          const {firstName, lastName} = contact;
          console.log(`Name: ${firstName} ${lastName}`);
        });
        console.log('\n');
        await askForChoice();
        break;

      case '3':
        console.log('You chose to create a chat. \n');
        const createdChat = await createChatOperation_CLI();
        await askForChoice();
        break;
      case '4':
        console.log('You chose to show all chats. \n');
        await chatsClI();
        await askForChoice();
        break;
      case '5':
        console.log('You chose to view user info. \n');
        const id = FSgetData('username');
        if(id === undefined){
          console.log('User not found. \n');
          await askForChoice();
          break;
        }
        const user = await getUserFromDatabasByID(parseInt(id));
        if(user === undefined){
          console.log('User not found. \n');
          await askForChoice();
          break;
        }
        console.log(`Username: ${user.username}`);
        console.log(`First Name: ${user.firstName}`);
        console.log(`Last Name: ${user.lastName}`);
        console.log('\n');
        await askForChoice();
        break;
      case "":
        console.log("You chose to exit the app.");
        input.close();
        break;

      default:
        console.error('Invalid choice');
        console.log('Not a valid number choice. Please try again. \n');
        await askForChoice();
    }
  }

  askForChoice();
}

import { input, AddContact, getAllContactsFromDatabase, Contact, getContactsFromDatabaseByName, GroupChat, IndividualChat, FSgetData, saveChatToDatabase, createChat, Message } from ".";
import {  } from "../Database/Chat-Operations";


export async function createChatOperation_CLI(): Promise<GroupChat|IndividualChat|undefined> {
    console.log("chat operation");
    const chatName: string = await new Promise((resolve) => {
      input.question("Enter the name of the chat: ", resolve);
    });
    const contact = await addOrSelectContact();
    if (!contact) {
      console.error('No contact selected');
        return;
    }
    console.log(`You selected ${contact.firstName} ${contact.lastName} (${contact.userName})`);
    const members: Contact[] = [contact];
    await addMore(members);
    console.log(`You selected ${members.length} contacts`);
    const id = Math.floor(Math.random() * 10000); // placeholder
    const userIdString = FSgetData('username');
    const userId: number = userIdString !== undefined ? parseInt(userIdString) : (() => {
      throw new Error('User ID not found');
    })();
  
    // Prepare empty messages array
    const messages: Message[] = [];
  
    const createdChat = createChat(id, chatName, userId, members, messages);
    console.log(`Created chat: ${createdChat.chatName}`);
    saveChatToDatabase(createdChat);
    return createdChat;
  }
  
async function addMore(members: Contact[]) {
    const answer: string = await new Promise((resolve) => {
      input.question("Do you want to add another contact? (y/n) ", resolve);
    });
    if (answer === 'y') {
      const additionalContact = await addOrSelectContact();
      if (!additionalContact) {
        console.error('No contact selected');
        return;
      } else {
        members.push(additionalContact);
        await addMore(members);
      }
    }
  }
  
async function addOrSelectContact(): Promise<Contact|undefined> {
    // Wrap callback inside new promised
    const selection: string = await new Promise((resolve) => {
      input.question('Do you want to select a user or add a user: add or select ', resolve);
    });
  
    switch (selection) {
      case 'add':
        console.log("add user");
        return AddContact();
      case 'select':
        console.log("select user");
        return selectContact();
    }
  }
  
  async function selectContact(): Promise<Contact | undefined> {
    const contacts = await getAllContactsFromDatabase();
  
    contacts.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.firstName} ${contact.lastName} - (${contact.userName})`);
    });
    console.log('\n');
  
    const contactInput: string = await new Promise((resolve) => {
      input.question('Which user # do you want to select:  ', resolve);
    });
    
    const inputNum: number = parseInt(contactInput);
    if(inputNum > contacts.length || inputNum < 1) {
        console.error('Invalid choice');
        console.log('Not a valid number choice. Please try again. \n');
        addOrSelectContact();
    }
    const name = contacts[inputNum - 1];
    const firstName = name.firstName;
    const lastName = name.lastName;
  
    const dbContacts = await getContactsFromDatabaseByName(firstName, lastName);
    let chosenContact: Contact | undefined;
    if (dbContacts.length === 0) {
      console.error('No contact found');
      return undefined;
    }
    else if (dbContacts.length === 1) {
        console.log('One contact found.');
        chosenContact = dbContacts[0];
        console.log(`Chosen contact: ${chosenContact.firstName} ${chosenContact.lastName} `);
        return chosenContact;
    }
    else {
        console.log('Multiple contacts found. Please select one:');
        dbContacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.firstName} ${contact.lastName} - (${contact.userName})`);
        });
        const choice: string = await new Promise((resolve) => {
            input.question('Enter the number or username of the contact you want: ', resolve);
            });
        chosenContact = isNaN(parseInt(choice)) ? dbContacts.find(contact => contact.userName === choice) : dbContacts[parseInt(choice) - 1];
        
        if (chosenContact) {
          console.log('Chosen contact username is:', chosenContact.userName);
        } else {
          console.log('No contact was chosen');
        } 
        return chosenContact;
    } 
}
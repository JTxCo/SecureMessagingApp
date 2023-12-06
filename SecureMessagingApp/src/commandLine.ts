import readline from 'readline';

export const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Contact {
  name: string;
  phone: string;
}

const contacts: Contact[] = [];
const phoneNumbersSeen: string[] = [];

export function isPhoneNumberUnique(phone: string): boolean {
  return !phoneNumbersSeen.includes(phone);
}

export function getUserChoice(): void {
  console.log('Welcome to the messaging app!');
  
  function askForChoice(): void {
    console.log('Please select an option:');
    console.log('1. Create a new contact');
    console.log('2. Create a new single chat');
    console.log('3. Create a new group chat');
    console.log('4. Log out of app');

    input.question('Enter your choice: ', (choice: string) => {
      switch(choice) {
        case '1':
          input.question('Enter contact name: ', (name: string) => {
            input.question('Enter contact phone number: ', (phone: string) => {
              if (isPhoneNumberUnique(phone)) {
                contacts.push({ name, phone });
                phoneNumbersSeen.push(phone);
                console.log(`Contact ${name} created!`);
              } else {
                console.log('Phone number already exists');
              }
              askForChoice(); // ask for user's choice again after processing their current one
            });
          });
          break;
        default:
          throw new Error('Invalid choice');
      }
    });
  }
  
  askForChoice();
}

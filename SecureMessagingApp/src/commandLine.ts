import readline from 'readline';

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Contact {
  name: string;
  phone: string;
}

const contacts: Contact[] = [];
const phoneNumbersSeen: string[] = [];

function isPhoneNumberUnique(phone: string): boolean {
  return !phoneNumbersSeen.includes(phone);
}

function getUserChoice(): void {
  console.log('Welcome to the messaging app!');
  
  function askForChoice(): void {
    console.log('Please select an option:');
    console.log('1. Create a new contact');
    console.log('2. Create a new single chat');
    console.log('3. Create a new group chat');
    console.log('4. Log out of app');

    input.question('Enter your choice: ', (choice: string) => {
      
      // All of your other logic here...
      
    });
  }

  askForChoice();
}

export { getUserChoice, input };

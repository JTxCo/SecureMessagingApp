const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const users = [];

function getUserChoice() {
  console.log('Welcome to the messaging app!');
  console.log('Please select an option:');
  console.log('1. Create a new contact');
  console.log('2. Create a new single chat');
  console.log('3. Create a new group chat');

  rl.question('Enter your choice: ', (choice) => {
    if (choice === '1') {
      console.log('You chose to create a new contact.');
      rl.question("Enter name of new contact: ", (name) => {
        rl.question("Enter phone number of new contact: ", (phone) => {
            const newUser = {name, phone};
            users.push(newUser);
            console.log("New contact Name: " + name);
            console.log("New contact phone number: " + phone);
            rl.close();
        });
      });
      // Add logic to create a new user here.
    } else if (choice === '2') {
      console.log('You chose to create a new single chat.');
      //TODO: select user from users list to make new chat
      rl.close();
      // Add logic to create a new single chat here.
    } else if (choice === '3') {
      console.log('You chose to create a new group chat.');
      //TODO: select multiple users from user list to make new chat
      rl.close();

      // Add logic to create a new group chat here.
    } else {
      console.log('Invalid choice. Please select 1, 2, or 3.');
      rl.close();

      //TODO: maybe add option to select a user to send a message to

    }

  });
}

getUserChoice();

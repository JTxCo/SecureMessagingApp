import { getUserChoice, input } from './commandLine.mjs'; // Import the function from commandLine.js

const userInfo = [];

console.log('Welcome to the messaging app!');


function logIn() {
    function askForChoice() {
      console.log('Please select an option:');
      console.log('1. Register');
      console.log('2. Log in');
      console.log('3. Exit Messaging App');
  
      input.question('Enter your choice: ', (choice) => {
        if (choice === '1') {
          console.log('You chose to register.');
          input.question("Enter new username: ", (username) => {
            input.question("Enter new password: ", (password) => {
              const newUser = { username, password };

              userInfo.push(newUser);
              console.log(`Username: ${newUser.username}, Password: ${newUser.password}`);

              askForChoice(); // Ask for another choice
            });
          });
        } else if (choice === '2') {
            console.log('You chose to log in.');
            input.question("Enter your username: ", (inputUsername) => {
              input.question("Enter your password: ", (inputPassword) => {
                // Check if the provided username and password match any stored user
                const user = userInfo.find(u => u.username === inputUsername && u.password === inputPassword);
    
                if (user) {
                  console.log("Successfully logged in.");
                  console.log("");
                  getUserChoice();
                } else {
                  console.log("Incorrect username or password.");
                  askForChoice();
                }
                //askForChoice(); // Ask for another choice
              });
            });
        }  else if (choice === '3') {
          console.log('Exiting messaging app. Goodbye.');
          input.close();
        } else {
          console.log('Invalid choice. Please select 1, 2, or 3.');
          askForChoice(); // Ask for another choice
        }
      });
    }
  
    askForChoice(); // Start asking for the initial choice
  }
  
logIn();
  
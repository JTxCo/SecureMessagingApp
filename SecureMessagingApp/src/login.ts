// import { , getUserFromDatabasByID, Contact } from "./";
import { getUserChoice, input } from './commandLine'; // Import the function from commandLine.ts
import { User, checkPassword, createUser, comparePasswords, saveUserToDatabase, registerUser, getUserFromDatabasByUsername} from './';
  
  
  
  console.log('Welcome to the messaging app!');
  
  function logIn() {
    function askForChoice() {
      console.log('Please select an option:');
      console.log('1. Register');
      console.log('2. Log in');
      console.log('3. Exit Messaging App');
  
      input.question('Enter your choice: ', (choice: string) => {
        if (choice === '1') {
            console.log('You chose to register.');
            input.question("Enter new username: ", (username: string) => {
              input.question("Enter new password: ", (password: string) => {
                input.question("Enter public key: ", (publicKey: string) => {
                  input.question("Enter first name: ", (firstName: string) => {
                    input.question("Enter last name: ", (lastName: string) => {
                      // Generate a unique user ID and hash the password in real use case
                      const id = Math.floor(Math.random() * 10000); // placeholder
                        try{
                            registerUser(id, username, password, publicKey, firstName, lastName);
                            console.log(`Registered user .`);
                        }
                        catch(err){
                            console.log(" error occured when creating new user: " + err);
                        }
                      askForChoice(); // Ask for another choice
                    });
                  });
                });
              });
            });
          
        }
        else if (choice === '2') {
            console.log('You chose to log in.');
            input.question("Enter your username: ", (inputUsername: string) => {
                input.question("Enter your password: ", (inputPassword: string) => {
                    checkPassword(inputUsername, inputPassword).then((result) => {
                        if (result) {
                            console.log(`You are now logged in as ${inputUsername}.`);
                            getUserChoice();
                        } else {
                            console.log('Invalid username or password.');
                            askForChoice();  // Ask for another choice
                        }
                    });
                });
            });
        }
        
            else if (choice === '3') {
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
  
  
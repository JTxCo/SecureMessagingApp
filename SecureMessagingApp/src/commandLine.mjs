import readline from 'readline';
import {newContact, findContact} from './contacts.mjs';


const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const phoneNumbersSeen = [];

function isPhoneNumberUnique(phone) {
  return !phoneNumbersSeen.includes(phone);
}

function getUserChoice() {
  console.log('Welcome to the messaging app!');
  function askForChoice() {
    console.log('Please select an option:');
    console.log('1. Create a new contact');
    console.log('2. Create a new single chat');
    console.log('3. Create a new group chat');
    console.log('4. Log out of app');

    input.question('Enter your choice: ', (choice) => {
      if (choice === '1') {
        console.log('You chose to create a new contact.');
        input.question("Enter name of new contact: ", (name) => {
          input.question("Enter phone number of new contact: ", (phone) => {
            if (phoneNumbersSeen.includes(phone)) {
              console.log("Contact with that phone number already exists. Cannot create a contact with the same phone number.");
              askForChoice();
            } else {
              phoneNumbersSeen.push(phone);
              newContact(name, phone);
              //const newUser = { name, phone }; 
              //contacts.push(newUser); //moved to contacts.mjs
              //console.log(contacts);
              askForChoice(); //Ask for another choice
            }
          });
        });
      } 
      else if (choice === '2') {
        console.log('You chose to create a new single chat.');
        input.question("Enter the name or phone number of the person you want to create a new chat with: ", (recipient) => {
          if (/^\d+$/.test(recipient)) {
            // It's a phone number
            if (phoneNumbersSeen.includes(recipient)) {
              console.log("Phone number already exists. Cannot create a chat with the same phone number.");
            } else {
              console.log("New chat made with phone number: " + recipient);
            }
          } else {
            // It's not a phone number, check if it's a name

            //const matchingUser = contacts.find(user => user.name === recipient); //moved to contacts.mjs
            const matchingUser = findContact(recipient);//TODO: fix this so that users are found

            if (matchingUser) {
              console.log("New chat made with: " + matchingUser.name);
            } else {
              console.log("User cannot be found.");
            }
          }
          askForChoice(); // Ask for another choice
        });
      } 
      else if (choice === '3') {
        console.log('You chose to create a new group chat.');
        input.question("Enter the number of people to be added to the group chat: ", (numParticipants) => {
          const participants = [];
          let count = 0;

          function collectParticipants() {
            if (count < numParticipants) {
              input.question("Enter the name or phone number of participant " + (count + 1) + ": ", (inputData) => {
                if (/^\d+$/.test(inputData)) {
                  if (isPhoneNumberUnique(inputData)) {
                    phoneNumbersSeen.push(inputData);
                    participants.push(inputData);
                    count++;
                  } else {
                    console.log("Phone number already exists. Cannot add the same phone number to the group chat.");
                  }
                } else {
                  const matchingUser = findContact();
                  if (matchingUser) {
                    participants.push(inputData);
                    count++;
                  } else {
                    console.log("User cannot be found. Please re-enter a different name or phone number.");
                  }
                }

                if (count < numParticipants) {
                  collectParticipants(); // Continue collecting participants
                } else {
                  const names = participants.filter(participant => !/^\d+$/.test(participant));
                  const phoneNumbers = participants.filter(participant => /^\d+$/.test(participant));

                  const matchingUsers = names
                    .map(name => findContact())
                    .filter(user => user !== undefined);

                  console.log("Group chat participants:");
                  console.log("You");
                  matchingUsers.forEach(user => {
                    console.log(user.name);
                  });
                  

                  if (phoneNumbers.length > 0) {
                    phoneNumbers.forEach(phoneNumber => {
                      console.log(phoneNumber);
                    });
                  }

                  if (matchingUsers.length === 0 && phoneNumbers.length === 0) {
                    console.log("No valid participants found.");
                  }

                  askForChoice(); // Ask for another choice
                }
              });
            }
          }
          // Start the process by collecting the number of participants.
          collectParticipants();
        });
      } else if (choice === '4') {
        console.log('Logging out of app. Goodbye.');
        input.close();
      } else {
        console.log('Invalid choice. Please select 1, 2, 3, or 4.');
        askForChoice(); // Ask for another choice
      }
    });
  }

  askForChoice(); // Start asking for the initial choice
}

export {getUserChoice, input};



import { input, Contact, saveContactToDatabase, createContact, FSgetData } from ".";  
  export function AddContact(): Promise<Contact | undefined> {
    console.log("add contact");
  
    return new Promise<Contact | undefined>((resolve) => {
      console.log('\n');
      console.log('Please enter the following information:');
      input.question('Enter contact username: ', (username: string) => {
        if (!username) {
          console.error('Username is required');
          resolve(undefined); // Reject the promise with undefined or handle the error in another appropriate way
          return;
        }
  
        // Validate username format (Example: Alphanumeric characters only)
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
          console.error('Username must contain only alphanumeric characters');
          resolve(undefined);
          return;
        }
  
        input.question('Enter contact firstname: ', (firstName: string) => {
          if (!firstName) {
            console.error('First name is required');
            resolve(undefined); // Reject the promise with undefined or handle the error in another appropriate way
            return;
          }
          //only letters
          if(!/^[a-zA-Z]+$/.test(firstName)){
            console.error('First name must contain only letters');
            resolve(undefined);
            return;
          }
          input.question('Enter contact lastname: ', (lastName: string) => {
            if (!lastName) {
              console.error('Last name is required');
              resolve(undefined); // Reject the promise with undefined or handle the error in another appropriate way
              return;
            }
            //only letters
            if(!/^[a-zA-Z]+$/.test(lastName)){
              console.error('Last name must contain only letters');
              resolve(undefined);
              return;
            }
            input.question('Enter contact public key: ', async (publicKey: string) => {
              if (!publicKey) {
                console.error('Public key is required');
                resolve(undefined); // Reject the promise with undefined or handle the error in another appropriate way
                return;
              }
              //only numbers
              if(!/^[0-9]+$/.test(publicKey)){
                console.error('Public key must contain only numbers');
                resolve(undefined);
                return;
              }
              //need more checks, but these will suffice
  
              const id = Math.floor(Math.random() * 10000); // placeholder
              const userIdString = FSgetData('username');
              const userId: number = userIdString !== undefined ? parseInt(userIdString) : (() => {
                throw new Error('User ID not found');
              })();
              let contact: Contact;
              try {
                contact = await createContact(id, username, firstName, lastName, publicKey, userId);
              } catch (error: unknown) {
                console.error((error as Error).message);
                resolve(undefined); // Reject the promise with undefined or handle the error in another appropriate way
                return;
              }
              saveContactToDatabase(contact);
              console.log(`Created contact: ${contact.firstName} ${contact.lastName} (${contact.userName})`);
              resolve(contact); // Resolve the promise with the contact value
            });
          });
        });
      });
    });
  }
  
  
  
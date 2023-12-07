import { input, Contact, saveContactToDatabase, createContact, FSgetData } from ".";

export function AddContact(): Promise<Contact | undefined> {
    console.log("add contact");
  
    return new Promise<Contact | undefined>((resolve) => {
      input.question('Enter contact username: ', (username: string) => {
        input.question('Enter contact firstname: ', (firstName: string) => {
          input.question('Enter contact lastname: ', (lastName: string) => {
            input.question('Enter contact public key: ', async (publicKey: string) => {
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
  

  
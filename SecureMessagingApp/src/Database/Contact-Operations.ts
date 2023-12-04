import { Contact } from './Contact';
import { SQLiteDBAccess } from './SqliteDBAccess';


const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();

export async function createContact(id: number, userName: string, firstName: string, lastName: string, publicKey: string, userId: number): Promise<Contact> {
  return new Contact(id, userName, firstName, lastName, publicKey, userId); 
}

export async function updateContactInDatabase(contact: Contact): Promise<void> {
    await prisma.contact.update({
      where: { id: contact.id },
      data: {
        userName: contact.userName,
        userId: contact.userId,
        firstName: contact.firstName,
        lastName: contact.lastName,
        
      },
    });
  }
  
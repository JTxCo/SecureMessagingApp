import { Contact } from './Contact';
import { SQLiteDBAccess } from './SqliteDBAccess';


const sqlite = SQLiteDBAccess.getInstance();
const prisma = sqlite.getPrismaClient();

export async function createContact(id: number, userName: string, firstName: string, lastName: string, publicKey: string, userId: number): Promise<Contact> {
  return new Contact(id, userName, firstName, lastName, publicKey, userId); 
}
export async function saveContactToDatabase(contact: Contact): Promise<void> {
    await prisma.contact.create({
      data: {
        id: contact.id,
        userName: contact.userName,
        firstName: contact.firstName,
        lastName: contact.lastName,
        publicKey: contact.publicKey,
        userId: contact.userId,
      },
    });
}
export async function getContactFromDatabaseByID(id: number): Promise<Contact | undefined> {
    const contact = await prisma.contact.findUnique({ where: { id: id } });
    if (contact) {
      return new Contact(contact.id, contact.userName, contact.firstName, contact.lastName, contact.publicKey, contact.userId);
    } else {
      return undefined;
    }
  }
export async function getContactFromDatabaseByUserName(userName: string): Promise<Contact | null> {
  const contact = await prisma.contact.findFirst({ where: { userName: userName } });
  if (contact) {
    return new Contact(contact.id, contact.userName, contact.firstName, contact.lastName, contact.publicKey, contact.userId);
  } else {
    return null;
  }
}
export async function getContactsFromDatabaseByName(firstName: string, lastName: string): Promise<Contact[]> {
  const contacts = await prisma.contact.findMany({ where: { firstName: firstName, lastName: lastName } });
  return contacts.map(contact => new Contact(contact.id, contact.userName, contact.firstName, contact.lastName, contact.publicKey, contact.userId));
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
 
  export async function getAllContactsFromDatabase(): Promise<Contact[]> {
    const contacts = await prisma.contact.findMany();
    return contacts.map((contact) => new Contact(contact.id, contact.userName, contact.firstName, contact.lastName, contact.publicKey, contact.userId));
  }
  
  export async function deleteContactFromDatabase(contact: Contact): Promise<void> {
    await prisma.contact.delete({
      where: { id: contact.id },
    });
  }
export async function deleteAllContactsFromDatabase(): Promise<void> {
    await prisma.contact.deleteMany(); 
}
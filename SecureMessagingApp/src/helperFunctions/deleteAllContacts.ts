import { deleteAllContactsFromDatabase } from "../Database";

async function DeleteContacts(){
    await deleteAllContactsFromDatabase();
}

DeleteContacts();
import { getAllContactsFromDatabase } from "../Database/Contact-Operations";

async function fetchContacts() {
    const contacts = await getAllContactsFromDatabase();
    console.log(contacts);
}

fetchContacts();
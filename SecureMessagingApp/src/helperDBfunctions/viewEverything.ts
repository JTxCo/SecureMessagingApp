import { getAllChatsFromDatabase } from "../Database";
import { getAllContactsFromDatabase } from "../Database/Contact-Operations";
import { getAllUsersFromDatabase } from "../Database/User-Operations";

async function fetchChats() {
    const chats = await getAllChatsFromDatabase();
    console.log(chats);
}
async function fetchContacts() {
    const contacts = await getAllContactsFromDatabase();
    console.log(contacts);
}
async function fetchUsers() {
    const users = await getAllUsersFromDatabase();
    console.log(users);
}

fetchChats();
fetchContacts();
fetchUsers();

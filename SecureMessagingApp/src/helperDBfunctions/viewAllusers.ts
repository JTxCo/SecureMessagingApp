import {User } from "./../Database";
import { getAllUsersFromDatabase } from "../Database/User-Operations";

async function fetchUsers() {
    const users: User[] = await getAllUsersFromDatabase();
    console.log(users);
}

fetchUsers();
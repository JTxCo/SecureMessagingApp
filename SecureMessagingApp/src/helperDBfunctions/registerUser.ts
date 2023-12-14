import { User, registerUser, getUserFromDatabasByID } from "../Controller";
import { getAllUsersFromDatabase } from "../Database/User-Operations";
console.log('Welcome to the messaging app!');
async function initApp() {
    await registerUser(67, "user1", "password1", "publicKey1", "firstName1", "lastName1");
    console.log('Registered user.');

    // Now call fetchUsers
    fetchUsers();
}
async function fetchUsers() {
    const users: User[] = await getAllUsersFromDatabase();
    console.log(users);
}

// Call the initApp function
initApp();
// fetchUsers();
// fetchUsers();




import { getUserFromDatabasByID, Contact } from "./Database";
export { getUserFromDatabasByID, Contact} from "./Database";
import { User, GroupChat, IndividualChat, Chat  } from "./Database";
export { User, GroupChat, IndividualChat } from "./Database";
import { saveUserToDatabase,createUser, checkPassword, comparePasswords, deleteUserFromDatabase} from "./Database/User-Operations";
export { saveUserToDatabase,createUser, checkPassword, comparePasswords } from "./Database/User-Operations";
import { registerUser } from "./Database/User-Operations";
export { registerUser } from "./Database/User-Operations";
import { SQLiteDBAccess } from "./Database";
export { SQLiteDBAccess } from "./Database";
export {getUserFromDatabasByUsername} from "./Database/User-Operations";
export {getAllUsersFromDatabase, deleteAllUsersFromDatabase} from "./Database/User-Operations";
import { saveData, getData, updateData } from "./Database/AsyncStorage";
export { saveData, getData, updateData } from "./Database/AsyncStorage";
// import { getUserChoice, input } from './comma'; // Import the function from commandLine.ts


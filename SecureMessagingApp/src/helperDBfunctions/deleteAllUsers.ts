
import { FSdeleteUsername } from '.';
import {deleteAllUsersFromDatabase} from '../Database/User-Operations';
async function DeleteUsers(){
    await deleteAllUsersFromDatabase();
}
FSdeleteUsername();
DeleteUsers();
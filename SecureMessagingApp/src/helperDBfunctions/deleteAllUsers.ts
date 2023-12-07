import {deleteAllUsersFromDatabase} from '../Database/User-Operations';
async function DeleteUsers(){
    await deleteAllUsersFromDatabase();
}
DeleteUsers();
import { Chat } from "./";
import { User } from "./";
import { Contact } from "./";
import { Message} from "./";


export class IndividualChat implements Chat{
    id: number;
    chatName: string;
    userId: number;
    user: User;
    members: Contact[];
    Messages: Message[];
    constructor(id: number, chatName: string, userId: number, user: User, members: Contact[], Messages: Message[]){
        this.id = id;
        this.chatName = chatName;
        this.userId = userId;
        this.user = user;
        this.members = members;
        this.Messages = Messages;
    }
}
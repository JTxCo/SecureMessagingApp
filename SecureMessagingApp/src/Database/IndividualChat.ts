import { Chat } from "./";
import { User } from "./";
import { Contact } from "./";
import { Message} from "./";


export class IndividualChat implements Chat{
    id: number;
    chatName: string;
    userId: number;
    members: Contact[];
    messages: Message[];
    constructor(id: number, chatName: string, userId: number, members: Contact[], Messages: Message[]){
        this.id = id;
        this.chatName = chatName;
        this.userId = userId;
        this.members = members;
        this.messages = Messages;
    }
    
}
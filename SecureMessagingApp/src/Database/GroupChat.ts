import {Chat} from './Chat';
import { Contact } from './Contact';
import { Message } from './MessageStatus';
import { User } from './User';

export class GroupChat implements Chat{
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
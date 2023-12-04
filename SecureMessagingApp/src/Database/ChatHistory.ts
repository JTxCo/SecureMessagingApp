import {Chat, User, Contact, Message } from './';



export class ChatHistory{

    chatID: number;
    messages: Message[];
    constructor(chatID: number){
        this.chatID = chatID;
    }
    

}
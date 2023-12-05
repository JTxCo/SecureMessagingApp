import { Chat } from './Chat'
import { User } from './User'
import { Contact } from './Contact'
import { MessageStatus } from './MessageStatus'
export class Message {
    //Each message is stored with an ID, text, date, which chat it was int, what status it has, if the user sent it, or if a contact sent it
    id: number
    text: string
    timestamp: Date
    chatId: number
    status: MessageStatus
    senderUserId?: number
    senderContactId?: number
    chat: Chat
    senderUser?: User
    senderContact?: Contact
    readyToSend: boolean = false

    constructor(id: number, text: string, timestamp: Date, status: MessageStatus, chat: Chat, senderUser?: User, senderContact?: Contact) {
        this.id = id
        this.text = text
        this.timestamp = timestamp
        this.chatId = chat.id
        this.status = status
        this.chat = chat
        if (senderUser) this.senderUser = senderUser, this.senderUserId = senderUser.id
        if (senderContact) this.senderContact = senderContact, this.senderContactId = senderContact.id
}  
}
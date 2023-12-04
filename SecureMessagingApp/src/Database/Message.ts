import { Chat } from './Chat'
import { User } from './User'
import { Contact } from './Contact'
import { MessageStatus } from './MessageStatus'
export class Message {
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

    constructor(id: number, text: string, timestamp: Date, chatId: number, status: MessageStatus, chat: Chat, senderUser?: User, senderContact?: Contact) {
        this.id = id
        this.text = text
        this.timestamp = timestamp
        this.chatId = chatId
        this.status = status
        this.chat = chat

        if (senderUser) this.senderUser = senderUser, this.senderUserId = senderUser.id
        if (senderContact) this.senderContact = senderContact, this.senderContactId = senderContact.id
}  
}
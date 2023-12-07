import { Chat } from './Chat'
import { User } from './User'
import { Contact } from './Contact'
import { MessageStatus } from './MessageStatus'
import { getChatFromDatabaseByChatId } from './Chat-Operations'
export class Message {
    //Each message is stored with an ID, text, date, which chat it was int, what status it has, if the user sent it, or if a contact sent it
    id: number
    text: string
    timestamp: Date
    chatId: number
    status: MessageStatus
    senderUserId?: number
    senderContactId?: number
    chatID: number
    // senderUser?: User
    // senderContact?: Contact
    readyToSend: boolean = false

    constructor(id: number, text: string, timestamp: Date, status: MessageStatus, chatID: number,readyToSend: boolean, senderUserId?:number , senderContactId?: number ) {
        this.id = id
        this.text = text
        this.timestamp = timestamp
        this.chatId = chatID
        this.status = status
        this.chatID = chatID
        this.readyToSend = readyToSend
        // if (senderUserId) this.senderUser = senderUser, this.senderUserId = senderUser.id
        // if (senderContactId) this.senderContact = senderContact, this.senderContactId = senderContact.id
        this.senderUserId = senderUserId
        this.senderContactId = senderContactId
}  
}
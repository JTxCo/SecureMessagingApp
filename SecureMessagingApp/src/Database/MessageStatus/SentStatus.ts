import { MessageStatus, Message } from "..";

export class SentStatus implements MessageStatus {
    onEnter(message: Message) {
        message.status = new SentStatus();
    }   
    onExit(Message: Message): MessageStatus {
        if () {
            return new SentStatus();
        }
        
    }
    getStatus() {
        return "sent";
    }
}
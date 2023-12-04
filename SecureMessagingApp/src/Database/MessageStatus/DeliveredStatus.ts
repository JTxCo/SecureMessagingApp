import { SentStatus, MessageStatus, Message, ReadStatus } from "./";

export class DeliveredStatus implements MessageStatus {
    onEnter(message: Message) {
        message.status = new DeliveredStatus();
    }   
    onExit(Message: Message): MessageStatus {
        if () {
            return new ReadStatus();
        }
        
    }
    getStatus() {
        return "delivered";
    }
}
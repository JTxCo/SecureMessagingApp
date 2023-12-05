import { MessageStatus, Message, DeliveredStatus } from "..";

export class SentStatus implements MessageStatus {
    onEnter(message: Message) {
        message.status = new SentStatus();
    }   
    onExit(Message: Message): MessageStatus {
        if (Message.readyToSend) {
            return new DeliveredStatus();
        }
       return Message.status;
    }
    getStatus() {
        return "sent";
    }
}
import { MessageStatus, Message, SentStatus } from "..";
export class DraftStatus implements MessageStatus {
    onEnter(message: Message) {
        message.status = new DraftStatus();
    }   
    onExit(Message: Message): MessageStatus {
        if (Message.readyToSend) {
            return new SentStatus();
        }
       return Message.status;
    }
    getStatus() {
        return "draft";
    }
}
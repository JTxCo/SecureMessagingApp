import { MessageStatus, Message } from "..";

export class ReadStatus implements MessageStatus {
    onEnter(message: Message) {
        message.status = new ReadStatus();
    }   
    onExit(message: Message): MessageStatus { return this;}//since this is the last state for a messaage it will stay here
    getStatus() {
        return "read";
    }
}
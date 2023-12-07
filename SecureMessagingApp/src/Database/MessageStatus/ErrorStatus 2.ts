
import { MessageStatus, Message } from './';

export class ErrorStatus implements MessageStatus {
    onEnter(message: Message) {
        message.status = new ErrorStatus();
    }   
    onExit(message: Message): MessageStatus { return this;}//since this is the last state for a messaage it will stay here
    getStatus() {
        return "error";
    }
}
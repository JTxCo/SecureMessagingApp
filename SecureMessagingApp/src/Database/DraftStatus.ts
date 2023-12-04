import { MessageStatus } from "./MessageStatus";
import { Message } from "./Message";
import {SentStatus} from "./SentStatus";
export class DraftStatus implements MessageStatus {
    onEnter(message: Message) {
        message.status = new DraftStatus();
    }   
    onExit(Message: Message): MessageStatus {
        if () {
            return new SentStatus();
        }
        
    }
    getStatus() {
        return "draft";
    }
}
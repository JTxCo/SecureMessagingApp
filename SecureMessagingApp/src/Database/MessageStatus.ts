import { Message } from "./Message";
export interface MessageStatus {
    onEnter(message: Message): void;
    onExit(message: Message): MessageStatus;
    getStatus(): string;
  }
  
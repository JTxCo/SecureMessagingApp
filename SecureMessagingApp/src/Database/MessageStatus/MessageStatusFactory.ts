
import * as MessageStatus from './';


export class MessageStatusFactory {
    public static createMessageStatus(status: string): MessageStatus.MessageStatus {
        switch (status) {
            case 'draft':
                return new MessageStatus.DraftStatus();
            case 'sent':
                return new MessageStatus.SentStatus();
            case 'delivered':
                return new MessageStatus.DeliveredStatus();
            case 'read':
                return new MessageStatus.ReadStatus();
            case 'error':
                return new MessageStatus.ErrorStatus();
            default:
                throw new Error('Invalid status');
        }
    }
}
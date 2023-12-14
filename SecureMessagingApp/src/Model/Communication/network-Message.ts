export class Network_Message{

    /* 
    This class is used to simplify what is being sent across the network.
    it includes a destination so that the server knows where to send the message.
    Currently the destination is a username, at a later time it might be beneficial to change this to a chatID or userID.
    */
    id: number;
    senderUsername: string;
    receiverUsername: string;
    text: string;
    timestamp: Date;
    status: string;
    chatID: number;

    constructor(id: number, senderUsername: string, receiverUsername: string, text: string, timestamp: Date, status: string, chatID: number){
        this.id = id;
        this.senderUsername = senderUsername;
        this.receiverUsername = receiverUsername;
        this.text = text;
        this.timestamp = timestamp;
        this.status = status;
        this.chatID = chatID;
    }
}
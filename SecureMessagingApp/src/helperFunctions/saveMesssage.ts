import { FSgetData } from "../Database/FS-Storage";
import { createMessage, saveMessageToDatabase } from "../Database/Message-Operations";
import { createMessageStatus } from "../Database/MessageStatus/MessageStatusFactory 2";

async function performOperation() {
    const status = createMessageStatus("draft");
    const userIDData = await FSgetData("username");
    
    // Convert string to number
    const userID = userIDData ? parseInt(userIDData) : undefined;

    if ( userID === undefined) {
        console.error("Cannot convert userID to a number");
        return;
    }
    const id = Math.floor(Math.random() * 10000);
    const message = await createMessage(id, "Hello", new Date(), status, 4794, false, 2995, undefined);
    await saveMessageToDatabase(message); // assuming saveMessageToDatabase is also async function based on your previous code
}
performOperation();

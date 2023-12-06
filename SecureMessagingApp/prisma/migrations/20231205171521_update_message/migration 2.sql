-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "readyToSend" BOOLEAN NOT NULL DEFAULT false,
    "senderUserId" INTEGER,
    "senderContactId" INTEGER,
    CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Message_senderContactId_fkey" FOREIGN KEY ("senderContactId") REFERENCES "Contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("chatId", "id", "senderContactId", "senderUserId", "status", "text", "timestamp") SELECT "chatId", "id", "senderContactId", "senderUserId", "status", "text", "timestamp" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE INDEX "idx_message_senderUserId" ON "Message"("senderUserId");
CREATE INDEX "idx_message_senderContactId" ON "Message"("senderContactId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

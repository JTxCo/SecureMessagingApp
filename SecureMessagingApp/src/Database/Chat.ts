import { Message } from ".";
import { User } from "./User";
import { Contact } from "./Contact";
/*
model Chat {
  id             Int       @id @default(autoincrement())
  name           String
  userId         Int
  user           User      @relation(fields: [userId], references: [id])
  contacts       Contact[]
  messages       Message[]
}
*/
export interface Chat {
id: number
chatName: string
userId: number
user: User
members: Contact[]
Messages: Message[]

}
export class Contact {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    publicKey: string;
    userId: number;
  
    constructor(id: number, username: string, firstName: string, lastName: string, publicKey: string, userId: number) {
      this.id = id;
      this.userName = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.publicKey = publicKey;
      this.userId = userId;
    }
  }
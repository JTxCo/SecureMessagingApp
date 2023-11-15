import { hashPassword,  } from './../Model-Structure/Security/HashingPassword';
export class User {
    id: number;
    username: string;
    hashedPassword: string;
    publicKey: string;
  
    constructor(id: number, username: string, hashedPassword: string, publicKey: string) {
      this.id = id;
      this.username = username;
      this.hashedPassword = hashedPassword;
      this.publicKey = publicKey;
    }
    // Include here any methods that are specific to each user
    static async create(id: number, username: string, password: string, publicKey: string): Promise<User> {
        const hashedPassword = await hashPassword(password);
        return new User(id, username, hashedPassword, publicKey);
    }
  }
  
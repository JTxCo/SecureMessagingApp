export class User {
  id: number;                 // The unique identifier of the user
  username: string;           // The username of the user
  hashedPassword: string;     // The hashed password of the user
  publicKey: string;          // The public key of the user for encryption
  firstName: string;          // The first name of the user
  lastName: string;           // The last name of the user

  /**
   * Constructs a new User instance.
   * @param id The unique identifier of the user.
   * @param username The username of the user.
   * @param hashedPassword The hashed password of the user.
   * @param publicKey The public key of the user for encryption.
   * @param firstName The first name of the user.
   * @param lastName The last name of the user.
   */
  constructor(id: number, username: string, hashedPassword: string, publicKey: string, firstName: string, lastName: string) {
    this.id = id;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.publicKey = publicKey;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

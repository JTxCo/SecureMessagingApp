export class Contact{
id: number;
userName : string;
firstName : string;
lastName : string;
userId: number

/**
 * Constucts a new Contact instance
 * Each Contact is a separate person/app instance that the user can message
 * @param id : The unique identifier of the contact
 * @param userName : The username of the contact
 * @param firstName : The first name of the contact
 * @param lastName : The last name of the contact
 * @param userId : The unique identifier of the user who created the contact, only used in assoiation 
 */


constructor(id: number, userName : string, firstName : string, lastName : string, userId: number){
    this.id = id;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userId = userId;
}
}
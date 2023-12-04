//file for adding, finding, and everything involving contacts
const contacts = [];

function newContact(name, phone){
    const newUser = {name, phone}
    contacts.push(newUser);
    console.log(contacts);
}

function findContact(recipient){
    contacts.find(user => user.name === recipient);
}

export {newContact, findContact}

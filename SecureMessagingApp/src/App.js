"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the MessageEncryption class
var Security_1 = require("./Security");
// generateSecretKey();
var messageEncryption = new Security_1.MessageEncryption('secretKey');
var encryptedMessage = messageEncryption.encryptMessage('Hello World!');
console.log(encryptedMessage);
var decryptedMessage = messageEncryption.decryptMessage(encryptedMessage);
console.log(decryptedMessage);

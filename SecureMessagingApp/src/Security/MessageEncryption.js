"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEncryption = void 0;
var CryptoJS = require("crypto-js");
var MessageEncryption = /** @class */ (function () {
    function MessageEncryption(secretKey) {
        this.secretKey = secretKey;
    }
    MessageEncryption.prototype.getSecretKey = function () {
        return this.secretKey;
    };
    MessageEncryption.prototype.encryptMessage = function (message) {
        return CryptoJS.AES.encrypt(message, this.secretKey).toString();
    };
    MessageEncryption.prototype.decryptMessage = function (message) {
        return CryptoJS.AES.decrypt(message, this.secretKey).toString(CryptoJS.enc.Utf8);
    };
    return MessageEncryption;
}());
exports.MessageEncryption = MessageEncryption;

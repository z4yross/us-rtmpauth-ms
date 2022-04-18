import CryptoJS from "crypto-js";

const nonsense = "Q#_T:#%R:;G3R:g,va-.4g.-4ra"

export function encryptKey(uid, key) {
    let keyHash = CryptoJS.AES.encrypt(key, `${nonsense}${uid}`).toString();
    return keyHash;
}

export function decryptKey(uid, keyhash) {
    let keyBytes = CryptoJS.AES.decrypt(keyhash, `${nonsense}${uid}`);
    let keyString = keyBytes.toString(CryptoJS.enc.Utf8);
    return keyString;
}

export function generateKey() {
    return makeid(15);
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
import { initializeApp } from "firebase-admin/app";

let loc = process.cwd();
let keyPath = process.env.KEY_PATH ||  loc + '/server/utils/firestore/keys/';
let keyName = 'firestorekeys.json'

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = keyPath + keyName;

export default initializeApp();
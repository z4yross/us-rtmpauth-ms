import app from './initializeApp';
import { getFirestore } from "firebase-admin/firestore"; 
import { decryptKey, encryptKey, generateKey } from '../crypto';
import errorStrings from '../errors';
import { initializeQueue, NTF_QUEUE } from '../msgq/init';
import { sendStreamNotification } from '../msgq/msg';

const db = getFirestore(app);
const channel = initializeQueue();

export async function checkStreamKey(uid, key){
    try {
        const userRef = db.collection("users").doc(uid);
        const userSnap = await userRef.get();

        if(!userSnap.exists) throw new Error(errorStrings.NO_USER);

        const keyDB = decryptKey(uid, userSnap.data().keyHash);
        if(keyDB !== key) throw new Error(errorStrings.WRONG_KEY);

        if(channel) sendStreamNotification(channel, NTF_QUEUE, uid, true);

        return true;
    } catch(error){
        throw error
        
    } 
} 

export async function setNewStreamKey(uid){
    try {
        const userRef = db.collection("users").doc(uid);
        
        let newKey = generateKey();
        let keyHash = encryptKey(uid, newKey);

        await userRef.set({'keyHash': keyHash}, { merge: true });

        return newKey;
    } catch(error){
        throw error
        
    } 
}   



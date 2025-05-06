import { ref, onValue, serverTimestamp, push } from "firebase/database";
import { database } from "../../firebaseConfig";

function generateChatId(uid1, uid2) {
    return [uid1, uid2].sort().join("_");
}

export function listenForMessages(currentUserId, otherUserId, callback) {
    const chatId = generateChatId(currentUserId, otherUserId);
    const messagesRef = ref(database, `messages/${chatId}`);
    onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const messages = Object.values(data).map((msg) => ({
                ...msg,
                timestamp: msg.timestamp,
            }));
            callback(messages);
        }
    });
}

export function sendMessage(senderId, recipientId, text) {
    const chatId = generateChatId(senderId, recipientId);
    const messagesRef = ref(database, `messages/${chatId}`);
    push(messagesRef, {
        senderId,
        recipientId,
        text,
        timestamp: serverTimestamp(),
    });
}
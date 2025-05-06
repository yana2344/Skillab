import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

async function fetchUserData(userId) {
    const ref = doc(db, "users", userId);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
        return snapshot.data();
    } else {
        console.log("No such user!");
    }
}

export { fetchUserData };
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function fetchRandomCourses() {
    // Fetch random courses from the "users" collection for the homepage carousel
    const usersRef = collection(db, "users");
    const userSnapshot = await getDocs(usersRef);
    const users = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    let allCourses = [];

    for (const user of users) {
        const coursesRef = collection(db, "users", user.id, "teacher_courses");
        const courseSnapshot = await getDocs(coursesRef);
        const courses = courseSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        allCourses = [...allCourses, ...courses];
    }

    // Shuffle courses randomly
    const shuffledCourses = allCourses.sort(() => 0.5 - Math.random());

    // Pick only 6 random courses
    return shuffledCourses.slice(0, 6);
}
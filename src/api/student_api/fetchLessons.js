import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getCourseById = async (user, lessonId) => {
    try {
        if (!user) {
            throw new Error("User not authenticated");
        }

        const courseRef = doc(db, "users", user.uid, "teacher_courses", lessonId);
        const snapshot = await getDoc(courseRef);

        if (snapshot.exists()) {
            const data = snapshot.data();
            return {
                id: snapshot.id,
                title: data.title || "",
                author: data.author || "",
                description: data.description || "",
                rating: data.rating || "",
                feedbacks: data.feedbacks || [],
                chapters: data.chapters || [],
            };
        } else {
            console.warn("No lesson found with that ID.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching lesson by ID:", error);
        return null;
    }
};
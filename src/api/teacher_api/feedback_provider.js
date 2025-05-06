import { doc, updateDoc, arrayUnion, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthProvider";

export const useFeedback = () => {
    const { user } = useAuth();

    async function saveFeedback(userId, courseId, rating, feedback) {
        try {
            const courseRef = doc(db, "users", userId, "teacher_courses", courseId);

            await updateDoc(courseRef, {
                feedbacks: arrayUnion({
                    rating,
                    feedback,
                    feedbackAuthor: user.name,
                    createdAt: new Date().toISOString(),
                }),
            });

            console.log("Feedback saved!");
        } catch (error) {
            console.error("Error saving feedback:", error);
        }
    }

    const fetchRandomFeedbacks = async () => {
        if (!user) throw new Error("User not authenticated");

        const usersRef = doc(db, "users");

        const querySnapshot = await getDocs(usersRef);

        const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        let allCourses = [];
        let feedbacks = [];

        for (const user of users) {
            const coursesRef = collection(db, "users", user.id, "teacher_courses");
            const courseSnapshot = await getDocs(coursesRef);
            const courses = courseSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            allCourses = [...allCourses, ...courses];
        }

        for (const course of allCourses) {
            if (course.feedbacks && course.feedbacks.length > 0) {
                feedbacks = [...feedbacks, ...course.feedbacks];
            }
            // Filter out feedbacks that are empty or null
        }

        // Shuffle courses randomly
        const shuffledfeedbacks = feedbacks.sort(() => 0.5 - Math.random());

        // Pick only 6 random courses
        return shuffledfeedbacks.slice(0, 6);
    };

    return { saveFeedback, fetchRandomFeedbacks };
};
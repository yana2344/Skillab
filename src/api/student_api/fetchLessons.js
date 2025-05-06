import { doc, addDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthProvider";

export const useCourses = () => {
    const { user } = useAuth();

    const applyToLesson = async (course) => {
        const userCoursesRef = collection(db, "users", user.uid, "appliedCourses");

        try {
            await addDoc(userCoursesRef, {
                course: course,
                appliedAt: new Date().toISOString(),
                courseId: course.id,
            });
            console.log("Student applied to course!");
        } catch (error) {
            console.error("Error applying to course:", error);
        }
    };

    const getAppliedLessons = async () => {
        const ref = collection(db, "users", user.uid, "appliedCourses");
        const snapshot = await getDocs(ref);

        const courses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return courses;
    };

    const getLesson = async (teacherId, courseId) => {
        const ref = doc(db, "users", teacherId, "teacher_courses", courseId);
        const snapshot = await getDoc(ref);

        const courses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return courses;
    };

    return { applyToLesson, getAppliedLessons, getLesson };
};
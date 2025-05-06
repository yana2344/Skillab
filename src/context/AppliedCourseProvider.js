import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
// for applied courses state management
const AppliedCourseContext = createContext();

export const useAppliedCourses = () => useContext(AppliedCourseContext);

export const AppliedCourseProvider = ({ children }) => {
    const { user } = useAuth();
    const [appliedCourses, setCourses] = useState([]);

    useEffect(() => {
        const fetchAppliedCourses = async () => {
            if (!user) return;
            const ref = doc(db, "users", user.uid, "appliedCourses", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setCourses(snap.data().courses || []);
            }
        };
        fetchAppliedCourses();
    }, [user]);

    const toggleAppliedCourse = async (course) => {
        if (!user) return;
        const ref = doc(db, "users", user.uid, "appliedCourses", user.uid);

        let updatedAppliedCourses = [];
        const exists = appliedCourses.find((c) => c.id === course.id);

        if (exists) {
            // Remove the course if it already exists
            updatedAppliedCourses = appliedCourses.filter((c) => c.id !== course.id);
        } else {
            // Add the course if it doesn't exist
            updatedAppliedCourses = [
                ...appliedCourses,
                {
                    id: course.id,
                    title: course.title,
                    thumbnailUrl: course.thumbnailUrl,
                    description: course.description,
                    author: course.author,
                    rating: course.rating,
                    feedbacks: course.feedbacks,
                    chapters: course.chapters,
                    createdAt: course.createdAt,
                },
            ];
        }

        setCourses(updatedAppliedCourses);
        await setDoc(ref, { courses: updatedAppliedCourses });
    };

    const isApplied = (courseId) => appliedCourses.some((c) => c.id === courseId);

    return (
        <AppliedCourseContext.Provider value={{ appliedCourses, toggleAppliedCourse, isApplied }}>
            {children}
        </AppliedCourseContext.Provider>
    );
};
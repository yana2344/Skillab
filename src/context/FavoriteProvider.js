import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;
            const ref = doc(db, "favorites", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setFavorites(snap.data().courses || []);
            }
        };
        fetchFavorites();
    }, [user]);

    const toggleFavorite = async (course) => {
        if (!user) return;
        const ref = doc(db, "favorites", user.uid);

        let updatedFavorites = [];
        const exists = favorites.find((c) => c.id === course.id);

        if (exists) {
            // Remove the course if it already exists
            updatedFavorites = favorites.filter((c) => c.id !== course.id);
        } else {
            // Add the course if it doesn't exist
            updatedFavorites = [
                ...favorites,
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

        setFavorites(updatedFavorites);
        await setDoc(ref, { courses: updatedFavorites });
    };

    const isFavorite = (courseId) => favorites.some((c) => c.id === courseId);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</FavoritesContext.Provider>
    );
};
import { db, storage } from "../../firebaseConfig";
import { collection, addDoc, getDoc, getDocs, doc, deleteDoc} from "firebase/firestore";
import { deleteObject, listAll } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthProvider";

export const useTeacherCourse = () => {
  const { user } = useAuth();

  const deleteCourse = async (courseId) => {
    if (!user) throw new Error("User not authenticated");

    const courseRef = doc(db, "users", user.uid, "teacher_courses", courseId);
    await deleteDoc(courseRef);

  };

  const saveCourse = async ({ title, description, thumbnailFile, chapters, status }) => {
    if (!user) throw new Error("User not authenticated");

    console.log("Thumbnail:", thumbnailFile.type);

    // 1. Upload thumbnail

    //const extension = thumbnail.name.split(".").pop(); // Get file extension
    //const thumbnailRef = ref(storage, `users/${user.uid}/courses/${title}/thumbnail.${extension}`);
    const thumbnailRef = ref(storage, `users/${user.uid}/courses/${title}/thumbnail.jpg`);
    await uploadBytes(thumbnailRef, thumbnailFile);
    const thumbnailUrl = await getDownloadURL(thumbnailRef);

    // 2. Upload each chapter video
    const uploadedChapters = [];
    for (const chapter of chapters) {
      const uploadedLessons = [];

      for (const lesson of chapter.lessons) {
        const lessonVideoRef = ref(
            storage,
            `users/${user.uid}/courses/${title}/chapters/${chapter.title}/${lesson.title}`
        );
        await uploadBytes(lessonVideoRef, lesson.videoFile);
        const lessonVideoUrl = await getDownloadURL(lessonVideoRef);

        uploadedLessons.push({
          title: lesson.title,
          videoUrl: lessonVideoUrl,
        });
      }

      uploadedChapters.push({
        title: chapter.title,
        lessons: uploadedLessons,
      });
    }

    // 3. Save course data
    const courseData = {
      title,
      description,
      thumbnailUrl,
      author: user.name || "Unknown",
      rating: 0,
      feedbacks: [],
      chapters: uploadedChapters,
      createdAt: new Date(),
      isPublished: status,
    };

    const userCoursesRef = collection(db, "users", user.uid, "teacher_courses");
    await addDoc(userCoursesRef, courseData);
  };

  // Function to fetch courses for a specific user
  const fetchAllCourses = async () => {
    if (!user) throw new Error("User not authenticated");

    const courseRef = collection(db, "users", user.uid, "teacher_courses");

    const querySnapshot = await getDocs(courseRef);

    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return courses;
  };

  const getCourseById = async (courseId) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const courseRef = doc(db, "users", user.uid, "teacher_courses", courseId);
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
          thumbnailUrl: data.thumbnailUrl || "",
          createdAt: data.createdAt || "",
          isPublished: data.isPublished || false,
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

  return { saveCourse, fetchAllCourses, getCourseById, deleteCourse};
};
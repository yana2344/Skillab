import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    CardMedia,
    Grid,
    Select,
    MenuItem,
    Skeleton,
} from "@mui/material";
import { Add, Delete, CloudUpload, VideoLibrary } from "@mui/icons-material";
import Header from "../../../components/layout/Header";
import BoxCard from "../../../components/gridLayout/BoxCard";
import CellGridCustom from "../../../components/gridLayout/CellGridCustom";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CustomContainer from "../../../components/widgets/customContainer";
import { useSaveCourse } from "../../../api/teacher_api/course_provider";
import CancelIcon from "@mui/icons-material/Cancel";
import { useParams } from "react-router-dom";

function AddNewCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [chapters, setChapters] = useState([]);
    const fileInputRef = useRef(null);
    const { saveCourse, getCourseById } = useSaveCourse();
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { courseId } = useParams();
    const isEditing = Boolean(courseId);
    const [status, setStatus] = useState(false); // Default to "Draft"
    const [loadingCourse, setLoadingCourse] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const fetchCourse = async () => {
                try {
                    setLoadingCourse(true);
                    const courseData = await getCourseById(courseId);
                    setTitle(courseData.title);
                    setDescription(courseData.description);
                    setThumbnailPreview(courseData.thumbnailUrl);
                    setChapters(courseData.chapters);
                    setStatus(courseData.isPublished);
                    console.log(courseData);
                } catch (error) {
                    console.error("Error fetching course:", error);
                } finally {
                    setLoadingCourse(false);
                }
            };
            fetchCourse();
        }
    }, [isEditing, courseId]);

    // Validate title and description when they change
    useEffect(() => {
        if (title.trim() && description.trim()) {
            setTitleError(false);
            setDescriptionError(false);
        }
    }, [title, description]);

    const handleThumbnailChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            // Create a FileReader to read the file from user's device
            const reader = new FileReader();

            const file = e.target.files[0];

            let totalFileSize = file.size;
            let round = (totalFileSize / 1000000).toFixed(1);

            if (round > 1) {
                alert("File size exceeds 1 MB");
                return;
            }

            // save file as base64
            setThumbnailFile(file);
            // Set the onload event to update the thumbnail preview state
            reader.onload = () => {
                setThumbnailPreview(reader.result);
            };
            // Read the file as a Data URL (base64 encoded string)
            reader.readAsDataURL(file);
        }
    };

    // Add a chapter
    const addChapter = () => {
        const newChapter = {
            id: Date.now(), // or use uuid
            title: "",
            lessons: [],
        };
        setChapters((prev) => [...prev, newChapter]);
    };

    // Add a lesson to a chapter
    const addLessonToChapter = (chapterId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        lessons: [...(chapter.lessons || []), { id: Date.now(), title: "", videoFile: null, videoPreview: null }],
                    }
                    : chapter
            )
        );
    };

    // Update a lesson title
    const updateLessonTitle = (chapterId, lessonId, newTitle) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        lessons: chapter.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, title: newTitle } : lesson
                        ),
                    }
                    : chapter
            )
        );
    };

    const updateChapterTitle = (chapterId, newTitle) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) => (chapter.id === chapterId ? { ...chapter, title: newTitle } : chapter))
        );
    };

    const removeChapter = (id) => {
        setChapters(chapters.filter((chapter) => chapter.id !== id));
    };

    const removeLessonFromChapter = (chapterId, lessonId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        lessons: chapter.lessons.filter((lesson) => lesson.id !== lessonId),
                    }
                    : chapter
            )
        );
    };

    const handleLessonVideoChange = (chapterId, lessonId, e) => {
        const file = e.target.files[0];
        if (!file) return;

        let totalFileSize = file.size;
        let round = (totalFileSize / 1000000).toFixed(1);

        if (round > 50) {
            alert("File size exceeds 50 MB");
            return;
        }

        const videoUrl = URL.createObjectURL(file);

        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        lessons: chapter.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, videoFile: file, videoPreview: videoUrl } : lesson
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleLessonVideoRemove = (chapterId, lessonId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        lessons: chapter.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, videoFile: null, videoPreview: null } : lesson
                        ),
                    }
                    : chapter
            )
        );
    };

    const deleteAll = () => {
        setTitle("");
        setDescription("");
        setThumbnailPreview(null);
        setThumbnailFile(null);
        setChapters([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (chapters.length === 0) {
            alert("Please add at least one chapter.");
            setLoading(false);
            return;
        }
        if (!title.trim() || !description.trim()) {
            setTitleError(!title.trim());
            setDescriptionError(!description.trim());
            alert("Please fill all fields.");
            setLoading(false);
            return;
        }
        if (!thumbnailPreview) {
            alert("Please upload a thumbnail image.");
            setLoading(false);
            return;
        }

        for (const chapter of chapters) {
            if (!chapter.title.trim()) {
                alert("Please fill all chapter titles.");
                setLoading(false);
                return;
            }
            if (!chapter.lessons || chapter.lessons.length === 0) {
                alert(`Chapter "${chapter.title}" must have at least one lesson.`);
                setLoading(false);
                return;
            }
            for (const lesson of chapter.lessons) {
                if (!lesson.title.trim() || !lesson.videoFile) {
                    alert(`Please make sure all lessons in "${chapter.title}" have a title and a video.`);
                    setLoading(false);
                    return;
                }
            }
        }

        try {
            if (isEditing) {
                //await updateCourse(courseId, { title, description, thumbnailFile, chapters });
            } else {
                await saveCourse({ title, description, thumbnailFile, chapters, status });
                alert("Course created successfully!");
            }
        } catch (error) {
            console.error("Error saving the course:", error);
        } finally {
            setLoading(false); // Stop loading
            setTitle("");
            setDescription("");
            setThumbnailPreview(null);
            setThumbnailFile(null);
            setChapters([]);
            setStatus("Draft");
        }
    };

    return (
        <div>
            <Box m="20px">
                <Header
                    title={isEditing ? "Edit Course" : "Add New Course"}
                    subtitle={isEditing ? "Here you can edit your course" : "Here you can add a new course"}
                />

                <Box sx={{ mt: 4 }}>
                    {/* Course Info */}
                    <CustomContainer flexDirection="column" p="20px">
                        {/* Thumbnail Upload */}
                        <BoxCard rowGap="20px">
                            <CellGridCustom gridColumn="span 4">
                                <Typography variant="subtitle2" gutterBottom>
                                    Course Thumbnail
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    {loadingCourse ? (
                                        <Skeleton variant="rectangular" width={160} height={90} sx={{ borderRadius: 2 }} />
                                    ) : thumbnailPreview ? (
                                        <Box position="relative">
                                            <CardMedia
                                                component="img"
                                                image={thumbnailPreview}
                                                alt="Thumbnail Preview"
                                                sx={{ width: 160, height: 90, borderRadius: 2, objectFit: "cover" }}
                                            />
                                            <IconButton
                                                size="small"
                                                color="error"
                                                sx={{ position: "absolute", top: 4, right: 4, bgcolor: "background.paper" }}
                                                onClick={() => {
                                                    setThumbnailPreview(null);
                                                    setThumbnailFile(null);
                                                }}>
                                                <CancelIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            startIcon={<CloudUpload />}
                                            onClick={() => fileInputRef.current?.click()}
                                            sx={{ width: 160, height: 90 }}>
                                            Upload Image
                                        </Button>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleThumbnailChange} accept="image/*" hidden />
                                </Box>
                            </CellGridCustom>

                            <CellGridCustom gridColumn="span 4">
                                <Typography variant="subtitle2" gutterBottom>
                                    Course Status
                                </Typography>
                                <Select value={status} onChange={(e) => setStatus(e.target.value)} fullWidth variant="outlined">
                                    <MenuItem value={false}>Draft</MenuItem>
                                    <MenuItem value={true}>Publish</MenuItem>
                                </Select>
                            </CellGridCustom>
                        </BoxCard>

                        {/* Title */}
                        <TextField
                            fullWidth
                            label="Course Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                            required
                            error={titleError} // Show error if title is empty
                            helperText={`${title.length}/70 characters`}
                            slotProps={{ htmlInput: { maxLength: 70 } }}
                        />

                        {/* Description */}
                        <TextField
                            fullWidth
                            label="Course Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            margin="normal"
                            required
                            multiline
                            rows={4}
                            error={descriptionError}
                            helperText={`${description.length}/500 characters`}
                            slotProps={{ htmlInput: { maxLength: 500 } }}
                        />
                    </CustomContainer>

                    <Box sx={{ height: 40 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h4">Course Chapters</Typography>
                        <Button variant="contained" startIcon={<Add />} onClick={addChapter}>
                            Add Chapter
                        </Button>
                    </Box>

                    {/* Chapters Section */}
                    {chapters.length === 0 ? (
                        <CustomContainer flexDirection="column" p={3} alignItems="center" gap={2}>
                            <AutoStoriesIcon fontSize="large" color="action" />
                            <Typography align="center" color="text.secondary">
                                No chapters added yet. Click the "Add Chapter" button to start.
                            </Typography>
                        </CustomContainer>
                    ) : (
                        chapters.map((chapter, index) => (
                            <CustomContainer key={chapter.id} flexDirection="column" p={3}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Box display="flex" alignItems="center" gap={3} width={"80%"}>
                                        <Typography variant="h6">Chapter {index + 1}</Typography>
                                        <TextField
                                            label="Chapter Title"
                                            value={chapter.title}
                                            onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                                            margin="dense"
                                            required
                                            fullWidth
                                            variant="standard"
                                            slotProps={{ htmlInput: { maxLength: 70 } }}
                                            helperText={`${chapter.title.length}/70 characters`}
                                        />
                                    </Box>

                                    <IconButton color="error" onClick={() => removeChapter(chapter.id)}>
                                        <Delete />
                                    </IconButton>
                                </Box>

                                {/* Lessons Section */}
                                <Box mt={2}>
                                    <Grid container spacing={2} flexDirection="column">
                                        {chapter.lessons?.length > 0 ? (
                                            chapter.lessons.map((lesson, lessonIndex) => (
                                                <Grid item key={lesson.id} bgcolor={"#111111"} p={2} borderRadius={2}>
                                                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                                                        <TextField
                                                            label={`Lesson ${lessonIndex + 1} Title`}
                                                            value={lesson.title}
                                                            onChange={(e) => updateLessonTitle(chapter.id, lesson.id, e.target.value)}
                                                            margin="dense"
                                                            fullWidth
                                                            slotProps={{ htmlInput: { maxLength: 70 } }}
                                                            helperText={`${lesson.title.length}/70 characters`}
                                                        />
                                                        <IconButton color="error" onClick={() => removeLessonFromChapter(chapter.id, lesson.id)}>
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </Box>

                                                    {/* Video Upload */}
                                                    <Box display="flex" alignItems="center" gap={2}>
                                                        {lesson.videoPreview ? (
                                                            <Box position="relative">
                                                                <CardMedia
                                                                    component="video"
                                                                    src={lesson.videoPreview}
                                                                    controls
                                                                    sx={{ width: 160, height: 90, borderRadius: 2 }}
                                                                />
                                                                <IconButton
                                                                    size="small"
                                                                    color="error"
                                                                    sx={{ position: "absolute", top: 4, right: 4 }}
                                                                    onClick={() => handleLessonVideoRemove(chapter.id, lesson.id)}>
                                                                    <CancelIcon fontSize="small" />
                                                                </IconButton>
                                                            </Box>
                                                        ) : (
                                                            <Button
                                                                variant="outlined"
                                                                startIcon={<VideoLibrary />}
                                                                onClick={() =>
                                                                    document.getElementById(`lesson-video-${chapter.id}-${lesson.id}`)?.click()
                                                                }>
                                                                Upload Video
                                                            </Button>
                                                        )}
                                                        <input
                                                            id={`lesson-video-${chapter.id}-${lesson.id}`}
                                                            type="file"
                                                            accept="video/*"
                                                            hidden
                                                            onChange={(e) => handleLessonVideoChange(chapter.id, lesson.id, e)}
                                                        />
                                                    </Box>
                                                </Grid>
                                            ))
                                        ) : (
                                            <Typography color="text.secondary">No lessons yet.</Typography>
                                        )}
                                    </Grid>

                                    <Button
                                        variant="outlined"
                                        startIcon={<Add />}
                                        sx={{ mt: 2 }}
                                        onClick={() => addLessonToChapter(chapter.id)}>
                                        Add Lesson
                                    </Button>
                                </Box>
                            </CustomContainer>
                        ))
                    )}

                    <Box sx={{ height: 20 }} />

                    {/* Buttons */}
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" type="button" onClick={deleteAll}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default AddNewCourse;
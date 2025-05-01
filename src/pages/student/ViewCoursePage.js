import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    Typography,
    Paper,
    Box,
    Collapse,
    IconButton,
    CircularProgress,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    FormControlLabel,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCourseById } from "../../api/student_api/fetchLessons";
import { useAuth } from "../../context/AuthProvider";

const ViewCoursePage = () => {
    const [activeChapter, setActiveChapter] = useState(0);
    const [activeLesson, setActiveLesson] = useState(0);
    const [expandedChapters, setExpandedChapters] = useState([0]);
    const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [value, setValue] = React.useState(2);
    const [course, setCourse] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCourse = async () => {
            const courseData = await getCourseById(user, "fApdPdUlgpPAezDZRGtu");
            setCourse(courseData);
            setValue(courseData.rating);
            console.log(courseData);
        };

        fetchCourse();
    }, []);

    const courseData = [
        {
            title: "Getting Started with React",
            lessons: [
                { title: "Introduction to the Course", duration: "5:30", completed: true },
                { title: "Setting Up Your Development Environment", duration: "12:45", completed: true },
                { title: "Creating Your First React App", duration: "18:20", completed: false },
            ],
        },
        // Additional chapters omitted for brevity
    ];

    const totalLessons = course?.chapters?.reduce((acc, chapter) => acc + (chapter.lessons.length || 0), 0) || 0;
    const completedLessons =
        course?.chapters?.reduce(
            (acc, chapter) => acc + (chapter?.lessons?.filter((lesson) => lesson.completed)?.length || 0),
            0
        ) || 0;

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const currentChapter = course?.chapters[activeChapter] || { lessons: [] };
    const currentLesson = currentChapter.lessons[activeLesson];

    const toggleChapter = (index) => {
        setExpandedChapters(
            expandedChapters.includes(index) ? expandedChapters.filter((i) => i !== index) : [...expandedChapters, index]
        );
    };

    const navigateToLesson = (chapterIndex, lessonIndex) => {
        setActiveChapter(chapterIndex);
        setActiveLesson(lessonIndex);
        if (!expandedChapters.includes(chapterIndex)) {
            setExpandedChapters([...expandedChapters, chapterIndex]);
        }
    };

    const goToPreviousLesson = () => {
        if (activeLesson > 0) {
            setActiveLesson(activeLesson - 1);
        } else if (activeChapter > 0) {
            setActiveChapter(activeChapter - 1);
            setActiveLesson(courseData[activeChapter - 1].lessons.length - 1);
        }
    };

    const goToNextLesson = () => {
        if (activeLesson < currentChapter.lessons.length - 1) {
            setActiveLesson(activeLesson + 1);
        } else if (activeChapter < courseData.length - 1) {
            setActiveChapter(activeChapter + 1);
            setActiveLesson(0);
        }
    };

    const markAsComplete = () => {
        alert("Lesson marked as complete!");
    };

    const filteredCourseData = searchQuery
        ? course?.chapters
            .map((chapter) => ({
                ...chapter,
                lessons: chapter.lessons.filter((lesson) => lesson.title.toLowerCase().includes(searchQuery.toLowerCase())),
            }))
            .filter((chapter) => chapter.lessons.length > 0)
        : course?.chapters || [];

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Left Sidebar */}
            <Box sx={{ flex: 2, bgcolor: "black", maxWidth: "33.33%", p: 2 }}>
                <Box>
                    <Typography variant="h6">{course.title}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <CircularProgress variant="determinate" value={progressPercentage} size={40} sx={{ mr: 2 }} />
                        <Box>
                            <Typography variant="body2">Course Progress</Typography>
                            <Typography variant="body2">
                                {completedLessons} of {totalLessons} lessons completed
                            </Typography>
                        </Box>
                    </Box>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search lessons"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <List>
                        {filteredCourseData.map((chapter, chapterIndex) => (
                            <Box key={chapterIndex}>
                                <ListItem button onClick={() => toggleChapter(chapterIndex)}>
                                    <ListItemText primary={chapter.title} />
                                    <IconButton>
                                        {expandedChapters.includes(chapterIndex) ? <ExpandMoreIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </ListItem>
                                <Collapse in={expandedChapters.includes(chapterIndex)} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {chapter.lessons.map((lesson, lessonIndex) => (
                                            <ListItem button onClick={() => navigateToLesson(chapterIndex, lessonIndex)} key={lessonIndex}>
                                                <ListItemText primary={lesson.title} secondary={lesson.duration} />
                                                {lesson.completed && <CheckIcon />}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                                <Divider />
                            </Box>
                        ))}
                    </List>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 2, p: 3 }}>
                {/* Video Player */}
                <Paper sx={{ height: 400, position: "relative", bgcolor: "grey.200" }}>
                    <img
                        src="https://public.readdy.ai/ai/img_res/1cea81e17c922a5857d5654cdbe28a4c.jpg"
                        alt="Video"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                        <IconButton color="primary" sx={{ backgroundColor: "white" }}>
                            <PlayArrowIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Paper>

                {/* Video Controls */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={goToPreviousLesson}
                        disabled={activeChapter === 0 && activeLesson === 0}
                        startIcon={<ArrowBackIcon />}>
                        Previous Lesson
                    </Button>
                    <Button variant="contained" color="success" onClick={markAsComplete} startIcon={<CheckIcon />}>
                        Mark as Complete
                    </Button>
                    <Button variant="outlined" onClick={goToNextLesson}>
                        Next Lesson
                    </Button>
                </Box>

                {/* Lesson Content */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body2" color="primary">
                        Chapter {activeChapter + 1}: {course.title}
                    </Typography>
                    <Typography variant="h4">{currentLesson.title}</Typography>

                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {course.description}
                    </Typography>

                    <Rating sx={{ mt: 1 }} name="read-only" value={value} readOnly />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {course.rating}
                    </Typography>

                    {/* Notes Section */}
                    <Box sx={{ mt: 3 }}>
                        <Box>
                            <TextField fullWidth variant="outlined" label="Add Notes" multiline rows={4} sx={{ mt: 2 }} />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "10px" }}>
                            <Button variant="contained" color="success" onClick={markAsComplete}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ViewCoursePage;
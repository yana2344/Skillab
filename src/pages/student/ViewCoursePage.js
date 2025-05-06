import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Typography,
    Paper,
    Box,
    Collapse,
    IconButton,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
    useTheme,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { tokens } from "../../theme";
import RatingDialog from "../../components/dialog/RatingDialog";
import { useFeedback } from "../../api/teacher_api/feedback_provider";
// to watch the course
const ViewCoursePage = () => {
    const [activeChapter, setActiveChapter] = useState(0);
    const [activeLesson, setActiveLesson] = useState(0);
    const [expandedChapters, setExpandedChapters] = useState([0]);
    const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [value, setValue] = React.useState(2);
    const [courses, setCourse] = useState([]);

    const { saveFeedback } = useFeedback();
    const location = useLocation();
    const { course } = location.state || {};

    const totalLessons = course?.chapters?.reduce((acc, chapter) => acc + (chapter.lessons.length || 0), 0) || 0;
    const completedLessons =
        course?.chapters?.reduce(
            (acc, chapter) => acc + (chapter?.lessons?.filter((lesson) => lesson.completed)?.length || 0),
            0
        ) || 0;

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const currentChapter = course?.chapters?.[activeChapter] ?? { lessons: [] };

    const currentLesson = currentChapter?.lessons?.[activeLesson] ?? null;

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
            setActiveLesson(course[activeChapter - 1].lessons.length - 1);
        }
    };

    const goToNextLesson = () => {
        if (activeLesson < currentChapter.lessons.length - 1) {
            setActiveLesson(activeLesson + 1);
        } else if (activeChapter < course.chapters.length - 1) {
            setActiveChapter(activeChapter + 1);
            setActiveLesson(0);
        }
    };

    const markAsComplete = () => {
        const updatedCourse = { ...course };
        const lessonToUpdate = updatedCourse.chapters[activeChapter].lessons[activeLesson];
        lessonToUpdate.completed = !lessonToUpdate.completed;
        setCourse(updatedCourse);
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
            <Box sx={{ flexGrow: 8, bgcolor: colors.primary[800], maxWidth: "33.33%", p: 2 }}>
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
                    <video
                        controls
                        src={currentLesson.videoUrl}
                        alt="Video"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
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
                        Chapter {activeChapter + 1}: {currentChapter.title}
                    </Typography>
                    <Typography variant="h4">{currentLesson.title}</Typography>

                    <Rating sx={{ mt: 1 }} name="read-only" value={value} readOnly />

                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography
                            variant="body1"
                            sx={{
                                mt: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                            }}>
                            {course.description}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", mt: 2, flexDirection: "column" }}>
                        <Box
                            sx={{
                                display: "flex",
                            }}>
                            <Typography variant="h4" sx={{ mt: 4 }}>
                                Instructor: {course.author}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",

                                justifyContent: "space-between",
                            }}>
                            <Button
                                startIcon={<ContactMailIcon />}
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, display: "flex", alignItems: "center" }}
                                onClick={() => {
                                    navigate("/student_chat", {
                                        state: { course },
                                    });
                                }}>
                                Contact Instructor
                            </Button>
                            <Button
                                startIcon={<ThumbUpOffAltIcon />}
                                variant="filled"
                                color="primary"
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    "&:hover": {
                                        color: colors.black[700],
                                    },
                                }}
                                onClick={() => {
                                    setOpen(true);
                                }}>
                                Leave FeedBack
                            </Button>
                        </Box>
                    </Box>

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
            <RatingDialog
                open={open}
                onClose={() => setOpen(false)}
                onClick={async (rating, feedback) => {
                    await saveFeedback(course.author_id, course.id, rating, feedback);

                    setOpen(false);
                }}
            />
        </Box>
    );
};

export default ViewCoursePage;
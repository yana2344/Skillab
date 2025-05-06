import React, { useState, useEffect } from "react";
import { Typography, Container, Box, Button, Grid, Card, CardContent, Stack } from "@mui/material";
import {
    Star,
    StarHalf,
    People,
    AccessTime,
    VideoLibrary,
    Article,
    Code,
    Download,
    AllInclusive,
    PhoneIphone,
    Verified,
    Replay,
} from "@mui/icons-material";
import StudentRating from "../../components/courseDetailsPage/studentRating";
import CurriculumSection from "../../components/courseDetailsPage/curriculum";
import Reviews from "../../components/courseDetailsPage/reviews";
import { useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { useCourses } from "../../api/student_api/fetchLessons";
import { useFavorites } from "../../context/FavoriteProvider";
import { useAppliedCourses } from "../../context/AppliedCourseProvider";

const CourseDetailsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { applyToLesson } = useCourses();
    const location = useLocation();
    const { course } = location.state || {}; //get course from state passed from the previous page
    const { toggleFavorite, isFavorite } = useFavorites();
    const { toggleAppliedCourse, isApplied } = useAppliedCourses();

    const [expandedSection, setExpandedSection] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [author, setAuthor] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                //setLoadingCourse(true);
                //const courseData = await getCourseById(courseId);
                setTitle(course.title);
                setDescription(course.description);
                setThumbnailPreview(course.thumbnailUrl);
                setChapters(course.chapters);
                setAuthor(course.author);
            } catch (error) {
                console.error("Error fetching course:", error);
            } finally {
                //setLoadingCourse(false);
            }
        };
        fetchCourse();
    }, [course]);

    const toggleSection = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    const [helpfulReviews, setHelpfulReviews] = useState({});
    const markHelpful = (reviewId, isHelpful) => {
        setHelpfulReviews({ ...helpfulReviews, [reviewId]: isHelpful });
    };

    // const handleApplyNowClick = () => {
    //   applyToLesson(course);

    //   alert(`Apply Now clicked for course ID: ${course.id}`);
    // };

    return (
        <Box minHeight="100vh" bgcolor={colors.black[100]}>
            {/* Course Banner */}
            <Box position="relative" height={320}>
                <Box
                    component="img"
                    src={thumbnailPreview}
                    alt="Course Banner"
                    sx={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
                />
                <Container
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <Box maxWidth={600}>
                        <Button size="small" variant="contained" color="primary" sx={{ borderRadius: "16px", mb: 2 }}>
                            BESTSELLER
                        </Button>
                        <Typography variant="h3" color="common.white" fontWeight="bold" gutterBottom>
                            {title ?? ""}
                        </Typography>
                        <Typography variant="h6" color="common.white" gutterBottom>
                            {description}
                        </Typography>
                        <Stack direction="row" spacing={2} color="grey.300" alignItems="center" mb={1}>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <Star color="warning" />
                                <Star color="warning" />
                                <Star color="warning" />
                                <Star color="warning" />
                                <StarHalf color="warning" />
                                <Typography>4.8 ({course.feedbacks.length} ratings)</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <People /> <Typography>34,782 students</Typography>
                            </Stack>
                        </Stack>
                        <Typography color="grey.300" fontSize={14}>
                            Created by {author} • Last updated April 2025 • English
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Course Info Section */}
            <Container sx={{ py: 6, bgcolor: colors.white[500] }}>
                <Card sx={{ mb: 6, bgcolor: colors.black[100] }}>
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Course Features:
                                </Typography>
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center">
                                        <VideoLibrary sx={{ mr: 1 }} />
                                        <Typography color="inherit">42 hours on-demand video</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center">
                                        <Article sx={{ mr: 1 }} />
                                        <Typography>85 articles and resources</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center">
                                        <Code sx={{ mr: 1 }} />
                                        <Typography>35 coding exercises</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center">
                                        <Download sx={{ mr: 1 }} />
                                        <Typography>Downloadable source code</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    You'll Get:
                                </Typography>
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center">
                                        <AllInclusive sx={{ mr: 1 }} />
                                        <Typography>Full lifetime access</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center">
                                        <PhoneIphone sx={{ mr: 1 }} />
                                        <Typography>Access on mobile and TV</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center">
                                        <Verified sx={{ mr: 1 }} />
                                        <Typography>Certificate of completion</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center">
                                        <Replay sx={{ mr: 1 }} />
                                        <Typography>30-Day Money-Back Guarantee</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Stack direction="row" spacing={2} mt={4}>
                            <Button fullWidth variant="contained" color="primary" onClick={() => toggleAppliedCourse(course)}>
                                {isApplied(course.id) ? "Already Applied" : "Apply Now"}
                            </Button>
                            <Button fullWidth variant="outlined" color="primary" onClick={() => toggleFavorite(course)}>
                                {isFavorite(course.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Additional sections (Description, Curriculum, Feedback) */}
                {course.feedbacks.length > 0 ? (
                    <Card sx={{ mb: 6, bgcolor: colors.black[100] }}>
                        <CardContent>
                            {" "}
                            <Reviews feedbacks={course.feedbacks} />{" "}
                        </CardContent>
                    </Card>
                ) : null}
                <Card sx={{ mb: 6 }}>
                    <CardContent> {/* <CurriculumSection chapters={chapters} />{" "} */}</CardContent>
                </Card>

                <Card sx={{ mb: 6, bgcolor: colors.black[100] }}>
                    <CardContent>
                        {" "}
                        <StudentRating />
                    </CardContent>
                </Card>
            </Container>

            {/* Mobile Apply Button */}
            <Box
                display={{ xs: "block", lg: "none" }}
                position="fixed"
                bottom={0}
                left={0}
                right={0}
                bgcolor="background.paper"
                boxShadow={3}
                p={2}
                zIndex={10}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="h5">$94.99</Typography>
                    <Typography color="text.secondary" sx={{ textDecoration: "line-through" }}>
                        $199.99
                    </Typography>
                </Stack>
                <Button variant="contained" color="primary" fullWidth onClick={() => toggleAppliedCourse(course)}>
                    Apply Now
                </Button>
            </Box>
        </Box>
    );
};

export default CourseDetailsPage;
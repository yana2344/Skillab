import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import CustomCard from "../../components/customCard";
import { Box, Grid, Typography } from "@mui/material";
import { useTeacherCourse} from "../../api/teacher_api/course_provider";
import { useNavigate } from "react-router-dom";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

// const courses = [
//   { title: "React Basics", description: "Learn the fundamentals of React.js.", image: unsplash, status: "live" },
//   { title: "Advanced JavaScript", description: "Master closures, async, and more.", image: unsplash, status: "draft" },
//   { title: "Advanced JavaScript", description: "Master closures, async, and more.", image: unsplash, status: "live" },
//   {
//     title: "UI/UX Design",
//     description: "Improve your design skills with best practices.",
//     image: `url(${unsplash})`,
//     status: "draft",
//   },
// ];

function Courses() {
    const [courses, setCourses] = useState([]);
    const { fetchAllCourses, deleteCourse } = useTeacherCourse();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const navigate = useNavigate();

    const openDeleteDialog = (courseId) => {
        setSelectedCourseId(courseId);
        setOpenDialog(true);
    };

    const closeDeleteDialog = () => {
        setSelectedCourseId(null);
        setOpenDialog(false);
    };
    const confirmDelete = async () => {
        if (!selectedCourseId) return;

        try {
            await deleteCourse(selectedCourseId);
            setCourses((prev) => prev.filter((course) => course.id !== selectedCourseId));
        } catch (error) {
            console.error("Failed to delete course:", error);
        } finally {
            closeDeleteDialog();
        }
    };


    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            console.log("Deleting course with ID:", courseId); // перевірка

            try {
                await deleteCourse(courseId);
                setCourses((prevCourses) => prevCourses.filter((c) => c.id !== courseId));
            } catch (error) {
                console.error("Failed to delete course:", error);
            }
        }
    };

    useEffect(() => {
        fetchAllCourses().then(setCourses).catch(console.error);
    }, []);

    return (
        <div>
            <Header title={"My courses"} />
            <Dialog
                open={openDialog}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Course?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this course? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ flexGrow: 1, padding: 4 }}>
                {courses.length === 0 ? (
                    <Box p={3} alignItems="center" justifyContent="center" display="flex" flexDirection="column" gap={2}>
                        <FormatListBulletedAddIcon fontSize="large" color="action" />
                        <Typography align="center" color="text.secondary">
                            No courses added yet. Click the "Add New Course" button on the sidebar.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2} alignItems="stretch">
                        {courses.map((course, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <CustomCard
                                    title={course.title}
                                    description={course.description}
                                    image={course.thumbnailUrl}
                                    status={course.isPublished ? "Live" : "Draft"}
                                    color={course.isPublished ? "success" : "warning"}
                                    onClick={() => navigate(`/course/edit/${course.id}`)}
                                    onDelete={() => openDeleteDialog(course.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </div>
    );
}

export default Courses;
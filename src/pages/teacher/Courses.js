import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import CustomCard from "../../components/customCard";
import { Box, Grid, Typography } from "@mui/material";
import { useTeacherCourse } from "../../api/teacher_api/course_provider";
import { useNavigate } from "react-router-dom";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";

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
    const { fetchAllCourses } = useTeacherCourse();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllCourses().then(setCourses).catch(console.error);
    }, []);

    return (
        <div>
            <Header title={"My courses"} />
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
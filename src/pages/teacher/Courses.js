import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import CustomCard from "../../components/CustomCard";
import { Box, Grid } from "@mui/material";
import { useSaveCourse } from "../../api/teacher_api/course_provider";
import { useNavigate } from "react-router-dom";

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
  const { fetchAllCourses } = useSaveCourse();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCourses().then(setCourses).catch(console.error);
  }, []);

  return (
      <div>
        <Header title={"My courses"} />
        <Box sx={{ flexGrow: 1, padding: 4 }}>
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
        </Box>
      </div>
  );
}

export default Courses;
import React, { useEffect, useState } from "react";

import HeroSection from "../../components/landingPage/hero";
import CourseCarousel from "../../components/landingPage/carousel";
import Footer from "../../components/layout/Footer";
import Logos from "../../components/landingPage/logos";
import { fetchRandomCourses } from "../../api/fetchRandomCourses";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../../api/teacher_api/feedback_provider";
import HomepageReviews from "../../components/landingPage/homepageReviews";

function LandingPage() {
    const { fetchRandomFeedbacks } = useFeedback();
    const [courses, setCourses] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRandomCourses().then(setCourses);
    }, []);

    // useEffect(() => {
    //   fetchRandomFeedbacks().then(setFeedbacks);

    // }, []);

    const handleCourseClick = (course) => {
        navigate(`/course_details/${course.id}`, {
            state: { course },
        });
    };

    return (
        <div>
            <HeroSection />

            <Box sx={{ py: 4, px: 4 }}>
                <Typography variant="h2" textAlign="center">
                    Discover Our Latest Courses
                </Typography>
                <CourseCarousel courses={courses} onCourseClick={handleCourseClick} />
                <HomepageReviews feedbacks={feedbacks} />
            </Box>
            <Logos />
            <Footer />
        </div>
    );
}

export default LandingPage;
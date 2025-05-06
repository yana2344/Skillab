import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StudentLessonCard from "../../components/cards/studentLessonCard";

const CourseCarousel = ({ courses, onCourseClick }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {courses.map((course, index) => (
                <StudentLessonCard index={index} course={course} onClick={() => onCourseClick(course)} />
            ))}
        </Slider>
    );
};

export default CourseCarousel;
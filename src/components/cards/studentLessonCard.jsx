import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography, Box } from "@mui/material";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";
import { useFavorites } from "../../context/FavoriteProvider";

function StudentLessonCard({ course, index, onClick, width }) {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <Card
            onClick={onClick}
            key={index}
            sx={{
                display: "flex",
                flexDirection: "column",
                width: width,
                margin: 2,
                backgroundColor: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: 3,
                    transform: "scale(1.02)",
                },

                borderRadius: 2,
            }}>
            <CardMedia sx={{ height: 140 }} component="img" src={course.thumbnailUrl} alt={course.title} />

            <CardContent sx={{ position: "relative" }}>
                {/* {isFavorite ? (
          <Favorite
            onClick={toggleFavorite(course)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "red",
              fontSize: 30,
            }}
          />
        ) : null} */}
                <Typography gutterBottom variant="h5" component="div" color="black">
                    {course.title}
                </Typography>
                <Typography variant="body2" color="grey.600">
                    Rating: {course.feedbacks.length} ★
                </Typography>
                <Typography variant="body2" color="grey.600">
                    Author: {course.author}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default StudentLessonCard;
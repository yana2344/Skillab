import { Card, CardContent, Typography, Box, Rating } from "@mui/material";

const reviews = [
    {
        name: "Alice Johnson",
        rating: 5,
        feedback: "Great course! Very informative and easy to follow.",
    },
    {
        name: "Bob Smith",
        rating: 4,
        feedback: "Good content, but could use more real-world examples.",
    },
    {
        name: "Charlie Lee",
        rating: 5,
        feedback: "Excellent! The instructor explains everything clearly.",
    },
];

export default function HomepageReviews() {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {reviews.map((review, index) => (
                <Card key={index} variant="outlined">
                    <CardContent>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1" fontWeight="bold">
                                {review.name}
                            </Typography>
                            <Rating value={review.rating} readOnly />
                        </Box>
                        <Typography variant="body2" mt={1}>
                            {review.feedback}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
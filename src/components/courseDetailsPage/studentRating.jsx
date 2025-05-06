import { Box, Typography, Stack, LinearProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const ratingData = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 16 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
];

export default function StudentRating() {
    return (
        <Box className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Student Feedback
            </Typography>

            <Stack direction={{ xs: "column", md: "row" }} gap={8} className="mb-8">
                {/* Rating Block */}
                <Box
                    width={{ xs: "100%", md: "33%" }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center">
                    <Typography variant="h2" fontWeight="bold" color="primary">
                        4.8
                    </Typography>
                    <Stack direction="row" spacing={0.5} my={1} color="warning.main">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarHalfIcon />
                    </Stack>
                    <Typography color="text.secondary">Course Rating</Typography>
                </Box>

                {/* Progress Bars */}
                <Box width={{ xs: "100%", md: "67%" }}>
                    <Stack spacing={2}>
                        {ratingData.map((item, idx) => (
                            <Stack key={idx} direction="row" alignItems="center" spacing={2}>
                                <Box width="80px">
                                    <Typography variant="body2">{item.stars} stars</Typography>
                                </Box>
                                <Box flex={1}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={item.percentage}
                                        sx={{
                                            height: 8,
                                            borderRadius: 5,
                                            backgroundColor: "#e0e0e0",
                                            "& .MuiLinearProgress-bar": {
                                                backgroundColor: "#2563eb", // blue-600
                                            },
                                        }}
                                    />
                                </Box>
                                <Box width="40px" textAlign="right">
                                    <Typography variant="body2" color="text.secondary">
                                        {item.percentage}%
                                    </Typography>
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}
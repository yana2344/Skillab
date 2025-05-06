import { Box, Typography, Stack, Avatar, IconButton } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import StarIcon from "@mui/icons-material/Star";

export default function Reviews({ feedbacks }) {
    // Function to format the date
    dayjs.extend(relativeTime);

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" mb={4}>
                Reviews
            </Typography>

            {/* Review 1 */}
            <Box borderBottom="1px solid #e5e7eb" pb={6}>
                <Stack direction="row" spacing={2} mb={3} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.light", color: "primary.main" }}>
                        {feedbacks[0].feedbackAuthor.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography fontWeight="medium">{feedbacks[0].feedbackAuthor}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                            <Stack direction="row" spacing={0.5} color="warning.main">
                                {[...Array(feedbacks[0].rating)].map((_, i) => (
                                    <StarIcon key={i} fontSize="small" />
                                ))}
                            </Stack>
                            <Typography variant="body2">{dayjs(feedbacks[0].createdAt).fromNow()}</Typography>
                        </Stack>
                    </Box>
                </Stack>

                <Typography color="text.secondary" mb={3}>
                    {feedbacks[0].feedback}
                </Typography>
            </Box>
        </Box>
    );
}
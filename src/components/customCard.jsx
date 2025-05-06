import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Typography, Chip, Stack } from "@mui/material";
// layout for teacher courses card
export default function CustomCard({ title, description, image, status, color, onClick }) {
    return (
        <Card sx={{ width: 345, height: 276 }}>
            <CardMedia sx={{ height: 140 }} src={image} title={title} component="img" />

            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Chip label={status} color={color} size="small" />
                </Stack>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                    }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onClick}>
                    Edit
                </Button>
                <Button size="small">View course</Button>
            </CardActions>
        </Card>
    );
}
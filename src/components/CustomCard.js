import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Typography, Chip, Stack } from "@mui/material";

export default function CustomCard({ title, description, image, status }) {
    return (
        <Card sx={{ width: 345 }}>
            <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />

            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Chip label={status} color={status === "live" ? "success" : "warning"} size="small" />
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">View course</Button>
            </CardActions>
        </Card>
    );
}
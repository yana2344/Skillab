import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
// leave the review
export default function RatingDialog({ onClick, onClose, open }) {
    const [rating, setRating] = useState(4); // default value
    const [feedback, setFeedback] = useState("");

    if (!open) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        onClick(rating, feedback);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                sx: {
                    display: "block",
                    width: "100%",
                },
                paper: {
                    component: "form",
                    onSubmit: handleSubmit,
                },
            }}>
            <DialogTitle>Leave a feedback</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Rating
                        sx={{ mt: 1 }}
                        name="read-only"
                        onChange={(event, newValue) => {
                            setRating(newValue);
                            console.log(newValue);
                        }}
                        value={rating}
                    />
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="feedback"
                    label="Let us know about your experience"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => {
                        setFeedback(event.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Send</Button>
            </DialogActions>
        </Dialog>
    );
}
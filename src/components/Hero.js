import { Box, Typography, Button } from "@mui/material";
import hero from "../resources/hero.jpg";

const HeroSection = () => {
    //send a link for picture u like ❤️
    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
                px: 4,
                bgImageOpacity: 1,
            }}>
            <Box sx={{ maxWidth: 600 }}>
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    Welcome to Our Websitejjj
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Discover amazing content and explore new opportunities.
                </Typography>
                <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                    Get Started
                </Button>
            </Box>
        </Box>
    );
};

export default HeroSection;
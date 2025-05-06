import { Box, Typography, Button, Grid } from "@mui/material";
import Lottie from "lottie-react";
import { useRef, useEffect } from "react";
import animationData from "../../resources/Animation - 1743850990100.json";

const HeroSection = () => {
    const lottieRef = useRef();

    useEffect(() => {
        const anim = lottieRef.current;
        if (anim) {
            const lastVisibleFrame = 100; // 👈 set this to where the animation still looks good
            anim.playSegments([0, lastVisibleFrame], true);
        }
    }, []);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 4,
                backgroundColor: "#f5f5f5",
            }}
        >
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h2" fontWeight="bold" gutterBottom>
                            Welcome to Our Website
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Discover amazing content and explore new opportunities.
                        </Typography>
                        <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                            Get Started
                        </Button>
                    </Box>
                </Grid>

                {/* Lottie Animation Section */}
                <Grid item xs={12} md={6}>
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={animationData}
                        loop={false}
                        autoplay={false} // we’re controlling it manually
                        style={{ width: "100%", maxWidth: 500 }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default HeroSection;

import React from "react";
import LandingPageNavBar from "../../components/layout/Navbar";
import HeroSection from "../../components/landingPage/hero";
import { Box } from "@mui/material";
import Footer from "../../components/layout/Footer";

function LandingPage() {
  return (
    <div>
        <HeroSection />
        <Footer />
    </div>
  );
}

export default LandingPage;

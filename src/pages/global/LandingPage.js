import React from "react";
import LandingPageNavBar from "../../components/layout/Navbar";
import HeroSection from "../../components/Hero";
import { Box } from "@mui/material";
import Footer from "../../components/layout/Footer";

function LandingPage() {
  return (
    <div>
        <LandingPageNavBar />
        <HeroSection />
        <HeroSection />
        <Footer />
    </div>
  );
}

export default LandingPage;

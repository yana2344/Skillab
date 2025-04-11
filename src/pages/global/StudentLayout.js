import React from "react";
import { Outlet } from "react-router-dom";
import LandingPageNavBar from "../../components/layout/Navbar";

const StudentLayout = () => {
    return (
        <div>
            {" "}
            <LandingPageNavBar />
            <Outlet />{" "}
        </div>
    );
};

export default StudentLayout;
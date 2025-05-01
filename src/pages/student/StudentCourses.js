import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import Header from "../../components/layout/Header";
import { useNavigate } from "react-router-dom";

function StudentCourses() {
  const [tab, setTab] = useState("1");
  const navigate = useNavigate();

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
      <Box m="20px">
        <Header title={"My Courses"} subtitle="Welcome to your courses" />
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="All my courses" value="1" />
              <Tab label="Favourites" value="2" />
              <Tab label="Certificates" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Button variant="contained" color="success" onClick={navigate("/student_courses/:1")}>
              Mark as
            </Button>
          </TabPanel>

          <TabPanel value="2">item 2</TabPanel>
          <TabPanel value="3">item 3</TabPanel>
        </TabContext>
      </Box>
  );
}

export default StudentCourses;
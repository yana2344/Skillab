import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import Header from "../../components/layout/Header";
import { useNavigate } from "react-router-dom";
import StudentLessonCard from "../../components/cards/studentLessonCard";
import { useFavorites } from "../../context/FavoriteProvider";
import { useAppliedCourses } from "../../context/AppliedCourseProvider";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

function StudentCourses() {
  const [tab, setTab] = useState("1");
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { appliedCourses } = useAppliedCourses();
  const certificates = [];

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
            {appliedCourses.length === 0 ? (
                <Box p={3} alignItems="center" justifyContent="center" display="flex" flexDirection="column" gap={2}>
                  <OndemandVideoIcon fontSize="large" color="action" />
                  <Typography align="center" color="text.secondary">
                    No courses added yet.
                  </Typography>
                </Box>
            ) : (
                <Grid container spacing={2} alignItems="stretch">
                  {appliedCourses.map((course, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <StudentLessonCard
                            width={330}
                            index={index}
                            course={course}
                            onClick={() =>
                                navigate(`/student_courses/${course.id}`, {
                                  state: { course },
                                })
                            }
                        />
                      </Grid>
                  ))}
                </Grid>
            )}
          </TabPanel>

          {/* favorites */}

          <TabPanel value="2">
            {favorites.length === 0 ? (
                <Box p={3} alignItems="center" justifyContent="center" display="flex" flexDirection="column" gap={2}>
                  <HeartBrokenIcon fontSize="large" color="action" />
                  <Typography align="center" color="text.secondary">
                    You do not have favorites courses yet.
                  </Typography>
                </Box>
            ) : (
                <Grid container spacing={2} alignItems="stretch">
                  {favorites.map((course, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <StudentLessonCard
                            width={330}
                            index={index}
                            course={course}
                            onClick={() =>
                                navigate(`/course_details/${course.id}`, {
                                  state: { course },
                                })
                            }
                        />
                      </Grid>
                  ))}
                </Grid>
            )}
          </TabPanel>
          <TabPanel value="3">
            {certificates.length === 0 ? (
                <Box p={3} alignItems="center" justifyContent="center" display="flex" flexDirection="column" gap={2}>
                  <HistoryEduIcon fontSize="large" color="action" />
                  <Typography align="center" color="text.secondary">
                    You do not have certificates yet.
                  </Typography>
                </Box>
            ) : (
                <Grid container spacing={2} alignItems="stretch">
                  {certificates.map((certificate, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <StudentLessonCard
                            width={330}
                            index={index}
                            course={certificate}
                            onClick={() =>
                                navigate(`/course_details/${certificate.id}`, {
                                  state: { certificate },
                                })
                            }
                        />
                      </Grid>
                  ))}
                </Grid>
            )}
          </TabPanel>
        </TabContext>
      </Box>
  );
}

export default StudentCourses;
import { ColorModeContext, useMode } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";
import Layout from "./pages/global/Layout";
import LayoutContainer from "./pages/global/LayoutContainer";
import StudentLayout from "./pages/global/StudentLayout";
import LandingPage from "./pages/homepage/LandingPage";
import Courses from "./pages/teacher/Courses";
import Dashboard from "./pages/teacher/Dashboard";
import StudentCourses from "./pages/student/StudentCourses";
import AddNewCourse from "./pages/teacher/AddNewCourse";
import Users from "./pages/teacher/Users";
import AccountPage from "./pages/student/AccountPage";
import Login from "./pages/global/Login";
import NotFound404 from "./pages/global/NotFound404";
import ViewCoursePage from "./pages/student/ViewCoursePage";
import CourseDetailsPage from "./pages/homepage/CourseDetailsPage";
import { FavoritesProvider } from "./context/FavoriteProvider";
import { AppliedCourseProvider } from "./context/AppliedCourseProvider";
import Chat from "./pages/teacher/Chat";
import StudentChat from "./pages/student/StudentChat";

function App() {
  const [theme, colorMode] = useMode();

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppliedCourseProvider>
              <FavoritesProvider>
                <div>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route path="/login" element={<Login />} />
                      {/* <Route path="/register" element={<Register />}></Route>
                <Route path="/password-reset" element={<ResetPswd />} /> */}
                      <Route path="*" element={<NotFound404 />} />

                      <Route element={<ProtectedRoute />}>
                        {/* Student routes */}
                        <Route path="/" element={<StudentLayout />}>
                          <Route index element={<LandingPage />} />
                          <Route path="/student_courses" element={<StudentCourses />} />
                          <Route path="/student_courses/:id" element={<ViewCoursePage />} />
                          <Route path="/account" element={<AccountPage />} />
                          <Route path="/course_details/:courseId" element={<CourseDetailsPage />} />
                          <Route path="/student_chat" element={<StudentChat />} />
                        </Route>
                        {/* Teacher routes */}
                        <Route path="/" element={<LayoutContainer />}>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/courses" element={<Courses />} />

                          <Route path="/users" element={<Users />} />
                          <Route path="/course/new" element={<AddNewCourse />} />
                          <Route path="/course/edit/:courseId" element={<AddNewCourse />} />
                          <Route path="/chat" element={<Chat />} />
                        </Route>
                      </Route>
                    </Route>
                  </Routes>
                </div>
              </FavoritesProvider>
            </AppliedCourseProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </LocalizationProvider>
  );
}

export default App;
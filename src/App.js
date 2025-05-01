import { ColorModeContext, useMode } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";
import Layout from "./pages/global/Layout";
import LayoutContainer from "./pages/global/LayoutContainer";
import StudentLayout from "./pages/global/StudentLayout";
import LandingPage from "./pages/global/LandingPage";
import Courses from "./pages/teacher/Courses";
import CoursePage from "./pages/teacher/CoursePage";
import Dashboard from "./pages/teacher/Dashboard";
import StudentCourses from "./pages/student/StudentCourses";
import AddNewCourse from "./pages/teacher/courses/AddNewCourse";
import Users from "./pages/teacher/Users";
import AccountPage from "./pages/student/AccountPage";
import Login from "./pages/global/Login";
import NotFound404 from "./pages/global/NotFound404";
import ViewCoursePage from "./pages/student/ViewCoursePage";

function App() {
  const [theme, colorMode] = useMode();

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
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
                    </Route>
                    {/* Teacher routes */}
                    <Route path="/" element={<LayoutContainer />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/courses/:id" element={<CoursePage />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/course/new" element={<AddNewCourse />} />
                      <Route path="/course/edit/:courseId" element={<AddNewCourse />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </LocalizationProvider>
  );
}

export default App;
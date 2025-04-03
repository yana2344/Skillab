import { ColorModeContext, useMode } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/global/Layout";
import LayoutContainer from "./pages/global/LayoutContainer";
import LandingPage from "./pages/global/LandingPage";
import Courses from "./pages/teacher/Courses";
import CoursePage from "./pages/teacher/CoursePage";
import Dashboard from "./pages/teacher/Dashboard";
import StudentCourses from "./pages/student/StudentCourses";
import AddNewClass from "./pages/teacher/AddNewClass";

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
                <Route index element={<LandingPage />} />
                <Route path="/" element={<LayoutContainer />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<CoursePage />} />
                  <Route path="/student_courses" element={<StudentCourses />} />
                  <Route path="/add_new_class" element={<AddNewClass />} />
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

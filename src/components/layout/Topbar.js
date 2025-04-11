import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import RightSidebar from "./rightSidebar";
import { getAuth, signOut } from "firebase/auth";
import Button from "@mui/material/Button";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [openRightSidebar, setOpenRightSidebar] = useState(false);
  const auth = getAuth();

  //manage sidebar
  const handleToggle = () => {
    setOpenRightSidebar(!openRightSidebar);
  };

  const logout = async () => {
    signOut(auth)
        .then(() => console.log("Signed out"))
        .catch((err) => console.error(err));
    localStorage.clear();
    navigate("/login");
  };

  const goToHomepage = () => {
    navigate("/");
  };

  return (
      <Box display="flex" justifyContent="space-between" p={2} boxShadow="rgba(0, 0, 0, 0.64) 0px 3px 8px">
        {/* SEARCH BAR */}
        <Box display="flex" backgroundColor={colors.white[500]} borderRadius="3px" border="1px solid #0f1a24">
          <InputBase sx={{ ml: 2, flex: 1, color: colors.primary[500] }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon sx={{ color: colors.primary[500] }} />
          </IconButton>
        </Box>
        {/* ICONS */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          <IconButton onClick={handleToggle}>
            <NotificationsOutlinedIcon />
          </IconButton>
          <Button onClick={goToHomepage} color="inherit">
            Student view
          </Button>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Box>
        <RightSidebar handleToggle={handleToggle} open={openRightSidebar} />
      </Box>
  );
};

export default Topbar;
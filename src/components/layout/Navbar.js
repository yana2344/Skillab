import * as React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

export default function LandingPageNavBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  //manage menu logout
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAnchorEl(null);
    setAuth({});
    localStorage.clear();
    navigate("/login");
  };

  const dashboard = () => {
    setAnchorEl(null);
    navigate("/dashboard");
  };
  const account = () => {
    setAnchorEl(null);
    navigate("/account");
  };
  const courses = () => {
    setAnchorEl(null);
    navigate("/student_courses");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <Button color="inherit">My favorite</Button>
          <Button color="inherit">Udemy Business</Button>
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}>
            <PersonOutlinedIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{ "aria-labelledby": "basic-button" }}>
            <MenuItem onClick={dashboard}>Teacher dashboard</MenuItem>
            <MenuItem onClick={account}>My account</MenuItem>
            <MenuItem onClick={courses}>My courses</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

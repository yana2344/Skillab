import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar, sidebarClasses, SubMenu, menuClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Add, Chat } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";
import ExtensionIcon from "@mui/icons-material/Extension";
import FeedbackIcon from "@mui/icons-material/Feedback";
import imagePic from "../../resources/user.png";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.secondary[500],
            }}
            onClick={() => {
                setSelected(title);
                localStorage.setItem("selectedItem", title);
            }}
            icon={icon}
            component={<Link to={to} />}>
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const SubMenuCustom = ({ label, icon, children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <SubMenu
            rootStyles={{
                [`.${menuClasses.subMenuContent}`]: {
                    backgroundColor: colors.primary[900],
                    margin: "0px 0px 0px 20px",
                },
                [`.${menuClasses.button}`]: {
                    color: "white",
                },
            }}
            label={label}
            icon={icon}>
            {children}
        </SubMenu>
    );
};

const SidebarPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState(localStorage.getItem("selectedItem") || "DASHBOARD");

    const { collapseSidebar, collapsed } = useProSidebar();

    useEffect(() => {
        localStorage.setItem("selectedItem", selected);
    }, [selected]);

    return (
        <Box sx={{ maxHeight: "100vh", height: "100%" }}>
            <Sidebar
                collapsed={collapsed}
                rootStyles={{
                    borderRightColor: colors.primary[900],

                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: colors.primary[900],
                        height: "100vh",
                    },
                }}>
                <Menu
                    closeOnClick={true}
                    iconShape="square"
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            // only apply styles on first level elements of the tree
                            if (level === 0) {
                                return {
                                    color: disabled ? "#fff" : colors.secondary[500],
                                    backgroundColor: active ? colors.primary[600] : undefined,
                                    ":hover": { backgroundColor: colors.primary[600] },
                                    borderRadius: "10px",
                                };
                            }
                        },
                    }}>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => collapseSidebar()}
                        icon={collapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.white[500],
                        }}>
                        {!collapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.white[500]}>
                                    SKILLAB
                                </Typography>
                                <IconButton onClick={() => collapseSidebar(collapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!collapsed ? (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Link to={"/account"}>
                                    <Avatar alt="profile-user" src={imagePic} sx={{ width: 100, height: 100, cursor: "pointer" }} />
                                </Link>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h2" color={colors.white[500]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                                    {/* {"userData?.first_name"} */}
                                    {"YANA"}
                                </Typography>
                                <Typography variant="h5" color={colors.black[800]}>
                                    {"IT Developer"}
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Box height="100px"></Box>
                    )}

                    <Box paddingLeft={collapsed ? undefined : "1%"}>
                        <Item
                            title="DASHBBOARD"
                            to="/dashboard"
                            icon={<SpaceDashboardIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="USERS"
                            to="/users"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <SubMenuCustom label="COURSES" icon={<VideoSettingsIcon />}>
                            <Item
                                title="Add new course"
                                to="/course/new"
                                icon={<Add />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="My courses"
                                to="/courses"
                                icon={<VideoSettingsIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </SubMenuCustom>

                        <SubMenuCustom label="MESSAGES" icon={<Chat />}>
                            <Item
                                title="Incoming"
                                to="/incoming_mess"
                                icon={<EmailIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Item title="Sent" to="sent_mess" icon={<SendIcon />} selected={selected} setSelected={setSelected} />
                        </SubMenuCustom>

                        <SubMenuCustom label="SETTINGS" icon={<SettingsIcon />}>
                            <Item
                                title="Notification"
                                to="/notifications"
                                icon={<EngineeringIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Categorie"
                                to="/categories"
                                icon={<FeedbackIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item title="Bag" to="/bags" icon={<ExtensionIcon />} selected={selected} setSelected={setSelected} />
                        </SubMenuCustom>
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default SidebarPage;
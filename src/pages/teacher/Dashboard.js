import React from "react";
import Header from "../../components/layout/Header";
import CategoryIcon from "@mui/icons-material/Category";
import ExtensionIcon from "@mui/icons-material/Extension";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import BoxCard from "../../components/gridLayout/boxCard";
import CellGridCustom from "../../components/gridLayout/CellGridCustom";
import StatsCard from "../../components/widgets/StatsCard";

const cards = [
    {
        icon: <PeopleOutlinedIcon sx={{ fontSize: 40 }} />,
        title: "Total users",
        desc: "300",
        perc: "+20%",
    },
    {
        icon: <CategoryIcon sx={{ fontSize: 40 }} />,
        title: "My Courses",
        desc: "25",
    },
    { icon: <ExtensionIcon sx={{ fontSize: 40 }} />, title: "New messages", desc: "2" },
];

const handleOpenPage = (id) => () => {
    if (id === 0) {
        // navigate("/users-stats", { state: { usersList: usersList } });
    }
};

function Dashboard() {
    return (
        <Box m="20px">
            <Header title={"My Dashboard"} subtitle="Welcome to your dashboard" />
            <BoxCard>
                {cards.map((card, index) => (
                    <CellGridCustom key={index} gridColumn="span 4">
                        <StatsCard m="20px" p="20px">
                            <Box display="flex" flexDirection="column" flex={2} justifyContent="space-between">
                                <Typography textTransform="uppercase">{card.title}</Typography>
                                <Typography variant="h2" color="secondary">
                                    {card.desc}
                                </Typography>
                                <Typography variant="h4" color="secondary">
                                    {card.perc ? card.perc : ""}
                                </Typography>
                            </Box>
                            <Box display="flex" flex={1} alignItems="center" flexDirection="column">
                                {card.icon}
                                <Box marginTop="30px" display="flex" alignItems="center">
                                    <Button
                                        sx={{ textTransform: "lowercase" }}
                                        key={index}
                                        onClick={handleOpenPage(index)}
                                        endIcon={<ArrowForwardIosOutlined sx={{ p: "5px" }} color="primary" />}>
                                        dettagli
                                    </Button>
                                </Box>
                            </Box>
                        </StatsCard>
                    </CellGridCustom>
                ))}
            </BoxCard>
        </Box>
    );
}

export default Dashboard;
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/system";
import { Tab } from "@mui/material";
import Header from "../../components/layout/Header";
import AdminInfoTab from "../../components/account/accountInfoTab";
import ChangePasswdTab from "../../components/account/changePasswdTab";
// import { AdminSkeleton } from "../../components/widget/skeleton";

const AccountPage = () => {
    //const { userData, isLoading } = useSWRFetchAccount();
    const loading = Boolean(true);
    const [tab, setTab] = useState("1");

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Box m="20px">
            <Header title="ACCOUNT" subtitle="Edit your information" />
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab label="Info" value="1" />
                        <Tab label="Change Password" value="2" />
                    </TabList>
                </Box>

                {/* <TabPanel value="1">{loading ? <AdminSkeleton /> : <AdminInfoTab data={"data"} />}</TabPanel> */}
                <TabPanel value="1">{<AdminInfoTab data={"data"} />}</TabPanel>

                <TabPanel value="2">
                    <ChangePasswdTab />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default AccountPage;
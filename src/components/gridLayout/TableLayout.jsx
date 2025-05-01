import { Box, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

// table data for users list
const TableLayout = ({ children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            m="20px 0 0 0"
            height="70vh"
            sx={{
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
                "& .MuiDataGrid-root": {
                    border: "none",
                    "--DataGrid-containerBackground": `${colors.secondary[600]}`,
                },
                "& .MuiDataGrid-cell": {},
                // "& .name-column--cell": {
                //   color: colors.secondary[100],
                // },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.secondary[600],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-row": {
                    backgroundColor: colors.primary[400],
                    ":hover": { cursor: "pointer" },
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.secondary[600],
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.secondary[200]} !important`,
                },
            }}>
            {children}
        </Box>
    );
};

export default TableLayout;
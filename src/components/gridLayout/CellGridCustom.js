import { Box } from "@mui/material";
// colomn layout
const CellGridCustom = ({ children, gridColumn, width,height, alignItems, justifyContent }) => {
    return (
        <Box

            gridColumn={gridColumn}
            display="flex"
            flexDirection="column"
            width={width}
            height={height}
            alignItems={alignItems}
            justifyContent={justifyContent}>
            {children}
        </Box>
    );
};

export default CellGridCustom;
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Header = ({ title, subtitle, width }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px" width={width}>
            <Typography variant="h2" color={colors.black[900]} fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
                {title}
            </Typography>
            <Typography variant="h5" color={colors.secondary[400]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
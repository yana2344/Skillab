import { Paper } from "@mui/material";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";

const CustomContainer = ({ children, flexDirection, m, p, alignItems, gap }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Paper
            sx={{
                gap: gap,
                m: m,
                p: p,
                mb: "20px",
                borderRadius: "15px",
                display: "flex",
                flexDirection: { flexDirection },
                alignItems: { alignItems },
                backgroundColor: colors.primary[400],
            }}
            elevation={3}
            height="70%">
            {children}
        </Paper>
    );
};

export default CustomContainer;
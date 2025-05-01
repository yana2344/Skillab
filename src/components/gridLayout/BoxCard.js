import { Box } from "@mui/material";

const BoxCard = ({ children, backgroundColor, m, p, rowGap, boxShadow, height }) => {
    return (
        <Box
            width="100%"
            m={m}
            height={height}
            borderRadius={3}
            boxShadow={boxShadow}
            rowGap={rowGap}
            columnGap="20px"
            p={p}
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            //gridAutoRow="100px"

            backgroundColor={backgroundColor}>
            {children}
        </Box>
    );
};

export default BoxCard;
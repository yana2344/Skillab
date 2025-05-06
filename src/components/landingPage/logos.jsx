import cmpLogosImg from "../../resources/logos.png";
import { Box, Container } from "@mui/material";

export default function Logos() {
    return (
        <Box>
            <Container>
                <img src={cmpLogosImg} alt="partner comp logo" style={{ maxWidth: "100%" }} />
            </Container>
        </Box>
    );
}
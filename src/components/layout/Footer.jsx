import { Box, Container, Typography, styled } from "@mui/material";

// * Styled Components
const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        textAlign: "center",
    },
}));

const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
    },
}));

const FooterLink = styled("span")(({ theme }) => ({
    fontSize: "16px",
    color: "#7A7A7E",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
        color: "#000",
    },
}));

export default function Footer() {
    return (
        <Box sx={{ py: 10 }}>
            <CustomContainer>
                <CustomContainer>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "inerthite",
                                fontWeight: "700",
                                mb: 2,
                            }}>
                            Products
                        </Typography>

                        <FooterLink>Our Courses</FooterLink>
                        <br />
                        <FooterLink>Categories</FooterLink>
                        <br />
                        <FooterLink>Teachers</FooterLink>
                        <br />
                        <FooterLink>Blog</FooterLink>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "inerthite",
                                fontWeight: "700",
                                mb: 2,
                            }}>
                            Resources
                        </Typography>

                        <FooterLink>Who we are</FooterLink>
                        <br />
                        <FooterLink>Stories</FooterLink>
                        <br />
                        <FooterLink>Video</FooterLink>
                        <br />
                        <FooterLink>Free Trial</FooterLink>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "inerthite",
                                fontWeight: "700",
                                mb: 2,
                            }}>
                            Company
                        </Typography>

                        <FooterLink>Partnerships</FooterLink>
                        <br />
                        <FooterLink>Terms of use</FooterLink>
                        <br />
                        <FooterLink>Privacy</FooterLink>
                        <br />
                        <FooterLink>Sitemap</FooterLink>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "inerthite",
                                fontWeight: "700",
                                mb: 2,
                            }}>
                            Get in touch
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "16px",
                                color: "#7A7A7E",
                                fontWeight: "500",
                                mb: 2,
                            }}>
                            You’ll find your next course.
                        </Typography>

                        <IconBox></IconBox>
                    </Box>
                </CustomContainer>
            </CustomContainer>
        </Box>
    );
}
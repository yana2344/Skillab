import { LoadingButton } from "@mui/lab";
import { MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import BoxCard from "../gridLayout/BoxCard";
import CellGridCustom from "../gridLayout/CellGridCustom";
import ImageUpload from "../../components/widgets/imageUpload.jsx";
// import { MuiDataPicker } from "../widget/MuiDataPicker";
// import SnackBarCustom from "../widget/SnackBarCustom";
import CustomContainer from "../widgets/customContainer.js";

const AdminInfoTab = ({ data }) => {
    const emailRef = useRef();

    const nameRef = useRef();
    const surnameRef = useRef();
    const [name, setFirstName] = useState(data?.first_name);
    const [lastName, setLastName] = useState(data?.last_name);
    const [email, setEmail] = useState(data?.email);
    const [gender, setGender] = useState("uomo");
    const [image, setImage] = useState(data?.image);

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    //snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        //setOpenSnackbar(false);
    };

    const sendImage = (file) => {
        setImage(file);
    };

    const submitForm = (event) => {
        event.preventDefault();
        const data = { first_name: name, last_name: lastName, image_base64: image };
    };

    useEffect(() => {
        setFirstName(data?.first_name);
    }, [data]);

    return (
        <form onSubmit={submitForm}>
            <BoxCard>
                <CellGridCustom gridColumn="span 3">
                    <CustomContainer flexDirection="column" p="50px 20px" alignItems="center">
                        <ImageUpload alt={"user3"} src={image} sendImage={sendImage} />
                    </CustomContainer>
                </CellGridCustom>
                <CellGridCustom gridColumn="span 9">
                    <CustomContainer flexDirection="column" p="20px">
                        <BoxCard rowGap="30px">
                            <CellGridCustom gridColumn="span 4" width="90%">
                                <label htmlFor="email">Email</label>
                                <TextField
                                    disabled
                                    inputRef={emailRef}
                                    type="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    value={email}></TextField>
                            </CellGridCustom>

                            <CellGridCustom gridColumn="span 4" width="90%">
                                <label htmlFor="name">Nome</label>
                                <TextField
                                    name="name"
                                    type="text"
                                    id="name"
                                    required
                                    value={name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    inputRef={nameRef}></TextField>
                            </CellGridCustom>
                            <CellGridCustom gridColumn="span 4" width="90%">
                                <label htmlFor="surname">Cognome</label>
                                <TextField
                                    type="text"
                                    id="surname"
                                    required
                                    inputRef={surnameRef}
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}></TextField>
                            </CellGridCustom>
                            {/* Row 2 */}
                            <CellGridCustom gridColumn="span 4" width="90%">
                                <label htmlFor="dob">Data di nascita</label>
                                {/* <MuiDataPicker /> */}
                            </CellGridCustom>

                            <CellGridCustom gridColumn="span 3" width="90%">
                                <label id="gender-label">Genere</label>
                                <Select labelId="gender-label" id="demo-simple-select" value={gender} onChange={handleChange}>
                                    <MenuItem value={"uomo"}>Uomo</MenuItem>
                                    <MenuItem value={"donna"}>Donna</MenuItem>
                                    <MenuItem value={"altro"}>Altro</MenuItem>
                                </Select>
                            </CellGridCustom>
                            <CellGridCustom gridColumn="span 4" width="90%">
                                <label htmlFor="city">Città</label>
                                <TextField
                                    disabled
                                    // inputRef={cityRef}
                                    type="text"
                                    id="city"
                                    value="Roma"
                                    required></TextField>
                            </CellGridCustom>
                            {/* ROW 3 */}
                            <Box gridColumn="span 9"></Box>
                            <Box gridColumn="span 3" display="flex" alignItems="center" justifyContent="center" marginTop="20px">
                                <LoadingButton
                                    //loading={loading}
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    sx={{ borderRadius: 2 }}>
                                    Salva modifiche
                                </LoadingButton>
                            </Box>
                        </BoxCard>
                    </CustomContainer>
                </CellGridCustom>
                {/* <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} /> */}
            </BoxCard>
        </form>
    );
};

export default AdminInfoTab;
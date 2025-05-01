// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Box } from "@mui/system";
// import { Typography, InputAdornment, IconButton, FormControl, OutlinedInput, FormHelperText } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import TextField from "@mui/material/TextField";
// import SnackBarCustom from "../../components/widget/SnackBarCustom";
// import * as Yup from "yup";
// import axios from "../../api/axios";
// import CustomAlertDialog from "../../components/modalDialog/CustomAlertDialog";
// import CustomForm from "../../components/form/customForm";

// const REGISTER_URL = "/staff/signup/";

// const Register = () => {
//   const [pswd, setPswd] = useState("");
//   const [token, setInvCode] = useState("");
//   const [message, setMessage] = useState();
//   const [severity, setSeverity] = useState();
//   const [isLoading, setLoading] = useState(false);
//   const [open, setOpenSnackbar] = useState();
//   const [status, setStatus] = useState(false);
//   const [openAlert, setOpenAlert] = useState();

//   const [view, setView] = useState(false);
//   const [helperText, setHelperText] = useState({});

//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const title = "Congratulazioni";
//   const desc = "Account creato con successo! Adesso effettua il login.";

//   //manage show password
//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpenSnackbar(false);
//   };
//   const openSnackbar = () => {
//     setOpenSnackbar(true);
//   };

//   const handleCloseAlert = () => {
//     setOpenAlert(false);
//   };

//   const tokenVerification = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.get(`${REGISTER_URL}${token}/`, {
//         headers: { "Content-Type": "application/json" },
//       });
//       console.log(JSON.stringify(response?.data));
//       if (response.status === 200) {
//         setStatus(true);
//         setInvCode(token);
//         openSnackbar(true);
//         setSeverity("success");
//         setMessage("Codice verificato con successo!");
//         setLoading(false);
//       }
//     } catch (error) {
//       //handle error
//       setLoading(false);
//     }
//   };

//   const validationSchema = Yup.object({
//     pswd: Yup.string()
//       .min(8, "Password deve contenere minimo 8 caratteri")
//       .matches(/^[a-zA-Z0-9]+$/, "Password deve essere alfanumerica"),
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     validationSchema
//       .validate({ pswd })
//       .then(() => {
//         //handle registration
//       })
//       .catch((error) => {
//         //handle error
//       });
//   };

//   const ValidationCard = () => {
//     return (
//       <Box
//         boxShadow={"5px 5px 10px #111"}
//         marginLeft="20px"
//         p="20px"
//         width="300px"
//         height="150px"
//         borderRadius="20px"
//         position="relative"
//         left="370px"
//         backgroundColor="rgb(19,33,45)">
//         <Typography variant="h5">Caratteristiche Password</Typography>
//         <ul>
//           <li>Minimo 8 caratteri</li>
//           <li>Alfanumerica</li>
//         </ul>
//       </Box>
//     );
//   };

//   return (
//     //if
//     <CustomForm justifyContent="space-around" m="30px">
//       <Box m="30px 0px 0px 0px">
//         <Typography variant="h1" textAlign="center" fontWeight="bold" marginBottom="30px">
//           REGISTER
//         </Typography>
//         {status === false ? (
//           <Typography variant="p" textAlign="center" fontWeight="bold">
//             To be able to login, enter your code invitation
//           </Typography>
//         ) : (
//           <Typography variant="p" textAlign="center" fontWeight="bold">
//             Enter a new password
//           </Typography>
//         )}
//       </Box>
//       {status === false ? (
//         <Box display="flex" width="100%" flexDirection="column">
//           <Box display="flex" flexDirection="column" margin-bottom="20px">
//             <label htmlFor="token">Codice invito</label>
//             <TextField
//               margin="dense"
//               //focused
//               onChange={(e) => setInvCode(e.target.value)}
//               type="text"
//               id="token"
//               fullWidth
//               required></TextField>
//           </Box>
//           <Box m="30px 0px 20px 0px" display="flex" justifyContent="center">
//             <LoadingButton
//               loading={isLoading}
//               sx={{ borderRadius: 2, width: "50%" }}
//               color="primary"
//               variant="contained"
//               //onClick={tokenVerification}
//             >
//               Verify code
//             </LoadingButton>
//           </Box>
//         </Box>
//       ) : (
//         <Box display="flex" width="100%" flexDirection="column">
//           <form onSubmit={handleSubmit}>
//             <Box display="flex" flexDirection="column" margin-bottom="20px">
//               <label htmlFor="token">Invitation Code</label>
//               <TextField margin="dense" disabled type="text" id="token" fullWidth required value={token}></TextField>
//             </Box>
//             <Box display="flex" flexDirection="column">
//               <FormControl variant="outlined">
//                 <Box marginBottom="8px" marginTop="8px">
//                   <label htmlFor="password">Password</label>
//                 </Box>
//                 <OutlinedInput
//                   error={helperText.pswd}
//                   aria-describedby="password-helper-text"
//                   onFocus={() => setView(true)}
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   value={pswd}
//                   onChange={(e) => setPswd(e.target.value)}
//                   required
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         edge="end">
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//                 {helperText.pswd && <FormHelperText id="password-helper-text">{helperText.pswd}</FormHelperText>}
//               </FormControl>

//               <Box m="30px 0px 20px 0px" display="flex" justifyContent="center">
//                 <LoadingButton
//                   loading={isLoading}
//                   sx={{ borderRadius: 2, width: "50%" }}
//                   color="primary"
//                   variant="contained"
//                   type="submit">
//                   Register
//                 </LoadingButton>
//               </Box>
//             </Box>
//           </form>
//         </Box>
//       )}

//       <Box marginTop="30px">
//         <Link to="/login" style={{ textDecoration: "none" }}>
//           <Typography color="white" sx={{ ":hover": { color: "rgb(51,198,182)" } }}>
//             Already an account? Login
//           </Typography>
//         </Link>
//       </Box>

//       <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} />
//       <CustomAlertDialog
//         open={openAlert}
//         onClose={handleCloseAlert}
//         title={title}
//         desc={desc}
//         confirmModal={() => navigate("/login")}
//       />
//       {view && <ValidationCard />}
//     </CustomForm>
//   );
// };

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { set } from "date-fns";
// import SnackBarCustom from "../../components/widget/SnackBarCustom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    //   const [open, setOpenSnackbar] = useState();
    const navigate = useNavigate();

    //   const handleCloseSnackbar = (event, reason) => {
    //     if (reason === "clickaway") {
    //       return;
    //     }
    //     setOpenSnackbar(false);
    //   };
    //   const openSnackbar = () => {
    //     setOpenSnackbar(true);
    //   };

    //manage show password
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);

        const validationSchema = Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        });

        validationSchema
            .validate({ password, email, name })
            .then(() => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        updateProfile(user, {
                            displayName: name,
                        })
                            .then(() => {
                                // Profile updated successfully
                                console.log("User registered and profile updated:", user);
                                setLoading(false);
                                // Redirect or show success message
                                navigate("/login");
                            })
                            .catch((error) => {
                                //handle error
                                setError(error.message);
                                setLoading(false);
                            });
                    })
                    .catch((error) => {
                        //handle error
                        setError(error.message);
                        setLoading(false);
                    });
                setLoading(false);
                setName("");
                setEmail("");
                setPassword("");
                setShowPassword(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 4, maxWidth: 400, mx: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />

            {/* {loading ? "Creating..." : "Create Course"} */}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} isLoading={isLoading}>
                Register
            </Button>

            {/* <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} /> */}
        </Box>
    );
};

export default RegisterPage;
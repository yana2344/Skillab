import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography, InputAdornment, IconButton, FormControl, OutlinedInput, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
// import SnackBarCustom from "../../components/widget/SnackBarCustom";
import CustomForm from "../../components/form/customForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthProvider";

const LOGIN_URL = "/staff/login";

const Login = () => {
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const emailRef = useRef();
    const [helperText, setHelperText] = useState({});
    const [emailErrMsg, setEmailErrMsg] = useState();
    const [pswdErrMsg, setPaswErrMsg] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log(email, password);
        //setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in!");
            navigate("/"); // 👈 redirect to homepage
        } catch (err) {
            console.error("Login error:", err.message);
        }
        //setLoading(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const snapshot = await getDocs(collection(db, "users"));
            setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchUsers();
    }, []);

    //If you're on /login but already logged in, you can redirect:
    useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    //manage show password
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <CustomForm>
            <Box m="30px 0px 40px 0px">
                <Typography variant="h1" textAlign="center" fontWeight="bold">
                    LOGIN
                </Typography>
            </Box>
            {/* <form onSubmit={handleSubmit}> */}
            <Box display="flex" flexDirection="column" height="40vh" justifyContent="space-around">
                <label htmlFor="email">Email</label>
                <TextField
                    //focused
                    error={emailErrMsg}
                    helperText={emailErrMsg}
                    type="email"
                    id="email"
                    inputRef={emailRef}
                    fullWidth
                    autoComplete="on"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}></TextField>
                <FormControl variant="outlined">
                    <label htmlFor="password">Password</label>
                    <OutlinedInput
                        error={helperText.pswd}
                        aria-describedby="password-helper-text"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    {helperText.pswd && <FormHelperText id="password-helper-text">{helperText.pswd}</FormHelperText>}
                </FormControl>
                <Box m="20px 0px 0px 0px" display="flex" justifyContent="center">
                    {/* <button onClick={handleSubmit}>Login</button> */}
                    <LoadingButton
                        loading={isLoading}
                        sx={{ borderRadius: 2, width: "50%" }}
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                        type="submit">
                        Login
                    </LoadingButton>
                </Box>
                <Box marginTop="30px">
                    <Link to="/password-reset" style={{ textDecoration: "none" }}>
                        <Typography color="white" sx={{ ":hover": { color: "rgb(51,198,182)" } }}>
                            Forgot Password?
                        </Typography>
                    </Link>
                </Box>
            </Box>
            {/* </form> */}
            {/* <SnackBarCustom severity="error" open={open} onClose={handleCloseSnackbar} text={errMessage} /> */}
        </CustomForm>
    );
};

export default Login;
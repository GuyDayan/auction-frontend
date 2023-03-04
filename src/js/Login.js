import React, {useEffect, useState} from 'react';
import '../css/login.css';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {Button, FormControl, InputAdornment, Link, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {sendApiPostRequest} from "./ApiRequests"
import {BASE_URL, FEATURES_PATH, LOGIN_PATH, MINIMAL_PASSWORD_LENGTH, MINIMAL_USERNAME_LENGTH} from "./Globals"
import FrontWarnings from "./FrontWarnings";
import Cookies from "js-cookie";
import BackErrors from "./BackErrors";



function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorCode, setErrorCode] = useState(0);


    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token !== undefined){
            navigate(`/${FEATURES_PATH}`)
        }
    }, []);


    function handleSubmit() {
        sendApiPostRequest(BASE_URL+LOGIN_PATH , {username,password} , (response) =>{
            const data = response.data;
            if (data.success){
                Cookies.set("token" , data.token)
                navigate(`/${FEATURES_PATH}`)
            }else {
                setErrorCode(data.errorCode)
                setTimeout(()=>{
                    setErrorCode(0)
                },5000)
            }
        })

    }


    function handleDisable() {
        let disabled = true;
        const containsOnlyLetters = /^[A-Za-z]+$/.test(username);
        if (username.length >= MINIMAL_USERNAME_LENGTH){
            if (containsOnlyLetters){
                if (password.length >= MINIMAL_PASSWORD_LENGTH){
                    disabled = false
                }
            }
        }
        return disabled;
    }

    function userErrorMessage() {
        let usernameMessage = "";
        let usernameToCheck =username.trim()
        const containsOnlyLetters = /^[A-Za-z]+$/.test(usernameToCheck);
        if (usernameToCheck.length < MINIMAL_USERNAME_LENGTH && usernameToCheck.length > 0){
            usernameMessage = "Username must be larger that 6 letters"
            if (!containsOnlyLetters){
                usernameMessage = "Username must be larger that 6 letters and contain letters only"
            }
        }else {
            if (!containsOnlyLetters){
                usernameMessage = "Username must contain letters only!"
            }
        }
        return usernameMessage;
    }

    function passwordErrorMessage() {
        let passwordMessage = "";
        if (password.length < MINIMAL_PASSWORD_LENGTH){
            passwordMessage = "Password must contain at least 6 chars"
        }
        return passwordMessage
    }

    return (
        <div>
            <div className={"avatar-container"}>
                <Avatar className={"avatar"}>
                    <LockOutlinedIcon />
                </Avatar>
            </div>
            <div>
                <Typography className={"login-title"} component="h1" variant="h5">
                    Login Page
                </Typography>
            </div>
            <div>
                <div className={"form-container"}>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"username"} type={"text"} label={"Username"} value={username} onChange={e=>setUsername(e.target.value)} variant={"outlined"} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"password"} type={"password"} label={"Password"} variant={"outlined"} value={password} onChange={e=>setPassword(e.target.value)} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    {username.length > 0 && <FrontWarnings message = {userErrorMessage()}/>}
                    {password.length > 0 && <FrontWarnings message = {passwordErrorMessage()}/>}
                    <div className={"form-field"}>
                        <Button type={"submit"} variant={"contained"} disabled={handleDisable()} onClick={handleSubmit}>Sign In</Button>
                    </div>
                    <div className={"form-field"}>
                        <Link style={{cursor:"pointer"}} underline="hover" variant="body2" onClick={()=>navigate("signup")}>
                            Don't have an account? Sign Up
                        </Link>
                    </div>
                    {errorCode !== 0 && <BackErrors errorCode = {errorCode}/>}
                </div>
            </div>
        </div>
    );
}

export default Login;
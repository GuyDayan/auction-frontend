import React, {useEffect, useState} from 'react';
import '../css/login.css';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {Button, FormControl, InputAdornment, Link, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {sendApiPostRequest} from "./ApiRequests"
import {
    BASE_URL, ERROR_EMAIL_NOT_VALID, ERROR_FULLNAME_NOT_VALID, ERROR_WEAK_PASSWORD,
    ERROR_WEAK_USERNAME,
    LOGIN_URL_PARAM, MINIMAL_PASSWORD_LENGTH,
    MINIMAL_USERNAME_LENGTH,
    PRODUCTS_FOR_SALE_URL_PARAM
} from "./Globals"
import FrontWarnings from "./FrontWarnings";
import Cookies from "js-cookie";
import BackErrors from "./BackErrors";
import {
    passwordWarningMessage,
    usernameWarningMessage,
    handleDisableButton,
    emailValidation,
    fullNameValidation
} from "./Utils";
import {getErrorMessage} from "./GenerateErrorMessage";
import '../css/login.css';




function Login(props) {

    const [username, setUsername] = useState('GuyDayan');
    const [password, setPassword] = useState('123456');
    const [errorCode, setErrorCode] = useState(0);
    const [frontWarning, setFrontWarning] = useState({showError: false, errorCode: ""});
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token !== undefined) {
            navigate(`/${PRODUCTS_FOR_SALE_URL_PARAM}`)
        }
    }, []);


    function handleSubmit() {
        let {showError, errorCode} = validateLoginFields();
        if (!showError) {
            sendApiPostRequest(BASE_URL + LOGIN_URL_PARAM, {username, password}, (response) => {
                const data = response.data;
                if (data.success) {
                    Cookies.set("token", data.token)
                    Cookies.set("userId", data.userId)
                    window.location.reload();
                } else {
                    setErrorCode(data.errorCode)
                    // if(username.length > 0) setFrontError(frontError.concat(usernameWarningMessage(username)))
                    // if(password.length > 0) setFrontError(frontError.concat(passwordWarningMessage(password)))
                    setTimeout(() => {
                        // setFrontError([]);
                        setErrorCode(0)
                    }, 5000)
                }
            })
        } else {
            setFrontWarning({showError: true, errorCode: errorCode})
        }


    }

    function validateLoginFields() {
        let showError = true;
        let errorCode = ""
        if ((username.length < MINIMAL_USERNAME_LENGTH)) {
            errorCode = ERROR_WEAK_USERNAME;
        } else {
            if ((password.length < MINIMAL_PASSWORD_LENGTH)) {
                errorCode = ERROR_WEAK_PASSWORD;
            } else {
                showError = false;
            }
        }
            return {errorCode, showError}

    }


        return (
            <div className='outer-login-menu'>
            <div className='login'>
                <div className={"avatar-container"}>
                    <Avatar className={"avatar"}>
                        <LockOutlinedIcon/>
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
                                <TextField id={"username"} type={"text"} label={"Username"} value={username}
                                           onChange={e => setUsername(e.target.value)} variant={"outlined"}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <AccountCircle/>
                                                   </InputAdornment>
                                               ),
                                           }}/>
                            </FormControl>
                        </div>
                        <div className={"form-field"}>
                            <FormControl variant={"standard"}>
                                <TextField id={"password"} type={"password"} label={"Password"} variant={"outlined"}
                                           value={password} onChange={e => setPassword(e.target.value)} InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon/>
                                        </InputAdornment>
                                    ),
                                }}/>
                            </FormControl>
                        </div>
                        {/*{username.length > 0 && <FrontWarnings message = {usernameWarningMessage(username)}/>}*/}
                        {/*{password.length > 0 && <FrontWarnings message = {passwordWarningMessage(password)}/>}*/}
                        <div className={"form-field"}>
                            <Button type={"submit"} variant={"contained"} onClick={handleSubmit}>Sign In</Button>
                        </div>
                        <div className={"form-field"}>
                            <Link style={{cursor: "pointer"}} underline="hover" variant="body2"
                                  onClick={() => navigate("signup")}>
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                        {errorCode !== 0 && <BackErrors errorCode={errorCode}/>}
                        {frontWarning.showError && <FrontWarnings message = {getErrorMessage(frontWarning.errorCode)}/>}
                        {/*{errorCode === 0 && <FrontWarnings }*/}
                    </div>
                </div>
            </div>
                <div className='stats'>
                    Staticts
                </div>
            </div>
        );
}

export default Login;
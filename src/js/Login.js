import React, {useEffect, useState} from 'react';
import '../css/login.css';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {getStatsRequest, sendApiPostRequest} from "./utils/ApiRequests"
import {
    ADMIN_PARAM,
    BASE_URL, ERROR_WEAK_PASSWORD,
    ERROR_WEAK_USERNAME,
    LOGIN_URL_PARAM, MANAGE_URL_PARAM, MINIMAL_PASSWORD_LENGTH,
    MINIMAL_USERNAME_LENGTH,
    PRODUCTS_FOR_SALE_URL_PARAM, SIGNUP_URL_PARAM, STATS_PARAM_EVENT,
} from "./utils/Globals"
import FrontWarnings from "./errors/FrontWarnings";
import Cookies from "js-cookie";
import BackErrors from "./errors/BackErrors";
import '../css/login.css';
import {handleDisableButton} from "./utils/Utils";
import Paper from "@mui/material/Paper";


function Login(props) {

    const [username, setUsername] = useState('GuyDayan');
    const [password, setPassword] = useState('123456');
    const [errorCode, setErrorCode] = useState(0);
    const [stats, setStats] = useState({totalUsers: '', totalAuctions: '', totalBids: ''});
    const [frontWarning, setFrontWarning] = useState({showError: false, errorCode: ""});
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token !== undefined) {
            const userType = Cookies.get("userType");
            if (userType == ADMIN_PARAM){
                navigate(`/${MANAGE_URL_PARAM}`)
            }else {
                navigate(`/${PRODUCTS_FOR_SALE_URL_PARAM}`)
            }
        } else {
            getStatsRequest({}, res => {
                if (res.data.success) {
                    setStats(res.data.stats)
                }
            })
            const sse = new EventSource(BASE_URL + "login-page-handler");
            sse.onmessage = (message) => {
                const data = message.data;
                if (data == STATS_PARAM_EVENT) {
                    getStatsRequest({}, res => {
                        if (res.data.success) {
                            setStats(res.data.stats)
                        }
                    })
                }
            }
        }
    }, []);


    function handleSubmit() {
        let {showError, errorCode} = validateLoginFields();
        if (!showError) {
            sendApiPostRequest(BASE_URL + LOGIN_URL_PARAM, {username, password}, (response) => {
                const data = response.data;
                if (data.success) {
                    Cookies.set("token", data.token)
                    Cookies.set("userType", data.userType)
                    Cookies.set("userId", data.userId)
                    window.location.reload();
                } else {
                    setFrontWarning({showError: false, errorCode: ""})
                    setErrorCode(data.errorCode)
                    setTimeout(() => {
                        setErrorCode(0)
                    }, 15000)
                }
            })
        } else {
            setFrontWarning({showError: true, errorCode: errorCode})
        }
    }

    function validateLoginFields() {
        setErrorCode(0)
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

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (
        <div className='outer-login-menu'>
            <div className='login'>
                <div className={"l-container"}>
                    <div>
                        <div className={"form-container"}>
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
                                    <TextField id={"password"} type={"password"} label={"Password"}
                                               variant={"outlined"}
                                               value={password} onChange={e => setPassword(e.target.value)}
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <LockIcon/>
                                                       </InputAdornment>
                                                   ),
                                               }}/>
                                </FormControl>
                            </div>
                            <div className={"form-field"}>
                                <Button disabled={handleDisableButton([username, password])} type={"submit"}
                                        variant={"contained"} onClick={handleSubmit}>Sign In</Button>
                            </div>
                            <div className={"form-field"}>
                                <Link style={{cursor: "pointer"}} underline="hover" variant="body2"
                                      onClick={() => navigate(`/${SIGNUP_URL_PARAM}`)}>
                                    Don't have an account? Sign Up
                                </Link>
                            </div>
                            <div>
                                {frontWarning.showError && <FrontWarnings errorCode={frontWarning.errorCode}/>}
                            </div>
                            {errorCode !== 0 && <BackErrors errorCode={errorCode} horizontal={"left"}/>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='stats'>
                <div>
                    <div className="live-container">
                        <div className="live-label">
                            <div className="live-update">
                                <div className="live-update_icon">
                                </div>
                            </div>
                            <span>Live Updates</span>
                        </div>
                    </div>
                    <Stack className={"stats-fields-container"} divider={<Divider orientation="vertical" flexItem/>}
                           spacing={2}>
                        <Item style={{color: "#1565C0", width: "10rem"}}>Total Users:
                            <div style={{fontWeight: "bold"}}>{stats.totalUsers}</div>
                        </Item>
                        <Item style={{color: "#1565C0", width: "10rem"}}>Total Auctions: <div
                            style={{fontWeight: "bold"}}>{stats.totalAuctions}</div></Item>
                        <Item style={{color: "#1565C0", width: "10rem"}}>Total Bids: <div
                            style={{fontWeight: "bold"}}>{stats.totalBids}</div></Item>
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default Login;
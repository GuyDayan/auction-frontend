import {Toolbar, AppBar, IconButton, Typography, Stack, Button} from "@mui/material";
import { CurrencyBitcoin as BitcoinIcon } from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {LOGIN_URL_PARAM} from "./Globals";
import {getCookies} from "./Utils";


function Navbar() {

    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState(false);
    const {token,userId} = getCookies();

    useEffect(() => {
        if (token !== undefined){
            setLoggedIn(true)
        }
    }, []);

    function handleLogOut(){
        Cookies.remove("token");
        Cookies.remove("userId");
        setLoggedIn(false);
        navigate(`/${LOGIN_URL_PARAM}`)
    }




    return(
        <AppBar position={"static"} sx={{ bgcolor: '#10A37F' }}>
            <Toolbar>
                <IconButton size={"large"} edge={"start"} color={'inherit'} aria-label={'logo'}>
                    <BitcoinIcon />
                </IconButton>
                <Typography variant={'h6'} component={'div'}>
                    Auction App
                </Typography>

                <Stack direction={'row'} spacing={2} marginLeft={'auto'}>
                    <Button disabled={token==undefined} onClick={()=>navigate("features")} color={"inherit"}>Features</Button>
                    {
                        !loggedIn ?
                        <>
                        <Button onClick={()=>navigate("login")}  color={"inherit"}>Login</Button>
                        <Button onClick={()=>navigate("signup")} color={"inherit"}>Sign Up</Button>
                        </>
                        :
                        <>
                            <Button onClick={handleLogOut} color={"inherit"}>Log Out</Button>
                        </>
                    }
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar


import {Toolbar, AppBar, IconButton, Typography, Stack, Button} from "@mui/material";
import { CurrencyBitcoin as BitcoinIcon } from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {FEATURES_PATH} from "./Globals";


function Navbar() {

    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState(true);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token !== undefined){
            setLoggedIn(true)
        }
    }, []);

    function handleLogOut(){
        Cookies.remove();
        setLoggedIn(false);
        navigate('/login')
    }




    return(
        <AppBar position={"static"} sx={{ bgcolor: '#10A37F' }}>
            <Toolbar>
                <IconButton size={"large"} edge={"start"} color={'inherit'} aria-label={'logo'}>
                    <BitcoinIcon />
                </IconButton>
                <Typography variant={'h6'} component={'div'}>
                    Tender App
                </Typography>
                <Stack direction={'row'} spacing={2} marginLeft={'auto'}>
                    { !loggedIn ?
                        <>
                        <Button onClick={() => navigate("login")} color={"inherit"}>Login</Button>
                        <Button onClick={()=>navigate("signup")} color={"inherit"}>Sign Up</Button>
                        </>
                        :
                        <>
                            <Button onClick={()=>navigate("features")} color={"inherit"}>Features</Button>
                            <Button onClick={handleLogOut} color={"inherit"}>Log Out</Button>
                        </>
                    }
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar


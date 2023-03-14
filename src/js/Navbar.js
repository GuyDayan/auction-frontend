import {Toolbar, AppBar, IconButton, Typography, Stack, Button, Fade, MenuItem, Menu} from "@mui/material";
import {CurrencyBitcoin as BitcoinIcon} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {ADD_PRODUCT_URL_PARAM, LOGIN_URL_PARAM, PRODUCTS_FOR_SALE_URL_PARAM} from "./Globals";
import {getCookies} from "./Utils";


function Navbar() {

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const {token, userId} = getCookies();
    const [fullName, setFullName] = useState('guy');
    const [credit, setCredit] = useState(999);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    useEffect(() => {
        if (token !== undefined) {
            console.log("navbar")
            setLoggedIn(true)
        }
    }, []);

    function handleLogOut() {
        Cookies.remove("token");
        Cookies.remove("userId");
        setLoggedIn(false);
        navigate(`/${LOGIN_URL_PARAM}`)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(anchorEl)
    };
    const handleClose = (link) => {
        setAnchorEl(null);
        navigate(link)
    };


    return (
        <AppBar position={"static"} sx={{bgcolor: '#10A37F'}}>
            <Toolbar>
                <IconButton size={"large"} edge={"start"} color={'inherit'} aria-label={'logo'}>
                    <BitcoinIcon/>
                </IconButton>
                <Typography variant={'h6'} component={'div'}>Auction App</Typography>
                {
                    loggedIn &&
                    <Typography variant={'h6'} component={'div'} style={{ flexGrow: 1, textAlign: 'center' }}>{fullName} (Credit: {credit}$)</Typography>

                }
                <Stack direction={'row'} spacing={2} marginLeft={'auto'}>
                    <Button
                        color={"inherit"}
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        disabled={token == undefined}
                        onClick={handleClick}>
                        Features
                    </Button>
                    <Menu id="fade-menu" MenuListProps={{'aria-labelledby': 'fade-button',}} anchorEl={anchorEl}
                          open={open} onClose={handleClose} TransitionComponent={Fade}>
                        <MenuItem onClick={() => handleClose(ADD_PRODUCT_URL_PARAM)}>Add new product</MenuItem>
                        <MenuItem onClick={() => handleClose(PRODUCTS_FOR_SALE_URL_PARAM)}>Auctions</MenuItem>
                    </Menu>
                    {
                        !loggedIn ?
                            <>
                                <Button onClick={() => navigate("login")} color={"inherit"}>Login</Button>
                                <Button onClick={() => navigate("signup")} color={"inherit"}>Sign Up</Button>
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


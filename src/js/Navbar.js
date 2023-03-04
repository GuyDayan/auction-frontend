import {Toolbar, AppBar, IconButton, Typography, Stack, Button} from "@mui/material";
import { CurrencyBitcoin as BitcoinIcon } from '@mui/icons-material';
import {useNavigate} from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();




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
                    <Button onClick={()=>navigate("features")} color={"inherit"}>Features</Button>
                    <Button onClick={()=>navigate("login")} color={"inherit"}>Login</Button>
                    <Button onClick={()=>navigate("signup")} color={"inherit"}>Sign Up</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar


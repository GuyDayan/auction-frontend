import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import ShopIcon from '@mui/icons-material/Shop';import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Cookies from "js-cookie";
import {useEffect} from "react";
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_USER_DETAILS_REQUEST_PATH} from "./Globals";
import {
    Button,
    Divider,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    ListItemAvatar,
    ListItemText, TextField
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import '../css/userDetails.css';
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FrontWarnings from "./FrontWarnings";
import {addProductMessage, addUserCreditMessage} from "./Utils";

function UserDetails(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userSearchId = searchParams.get('userId');
    const [currentUser, setCurrentUser] = useState('');
    const [creditToAdd, setCreditToAdd] = useState(0);
    const [frontWarning, setFrontWarning] = useState({showError:false,errorType:""});
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');


    useEffect(() => {
        sendApiGetRequest(BASE_URL + GET_USER_DETAILS_REQUEST_PATH, {userId : userSearchId}, res => {
            if (res.data.success) {
                setCurrentUser(res.data.userDetailsModel)
            } else {

            }
        })
    }, [])


    function handleAddCredit() {
        let {showError,errorType} = validateCreditToAdd();
        if (!showError){

        }else {
            setFrontWarning({showError: true, errorType: errorType})
        }
    }
    function validateCreditToAdd() {
        let showError = true;
        let errorType = "";
        if (creditToAdd % 1 === 0){
            if (creditToAdd >= 0){
                showError = false;
            }else {
                errorType = "less-than-zero-error"
            }
        }else {
            errorType ="integer-number-error"
        }
        return {errorType,showError}
    }


    return (
        <div>
            <List className={"details-container"}>
                <ListItem >
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Username" secondary={currentUser.username} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ShopIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Total Products For Sale" secondary={currentUser.totalAuctions} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <CreditCardIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Credit" secondary={currentUser.credit + " $"} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem style={{marginLeft:"10px"}}>
                    <FormControl style={{width:"50%"}} variant="standard">
                        <TextField id={"credit"} type={"number"} label={"Amount"} variant={"standard"} value={creditToAdd} onChange={e=>setCreditToAdd(e.target.value)} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">$</InputAdornment>
                            ),
                        }}/>
                    </FormControl>
                    <Button onClick={handleAddCredit} style={{width:"50%" , marginLeft:"5%" , marginTop:"5%"}} variant="contained">Add Credit</Button>
                </ListItem>
                <div style={{marginTop:"20px"}}>
                    {frontWarning.showError && <FrontWarnings message = {addUserCreditMessage(frontWarning.errorType)}/>}
                </div>
            </List>
        </div>


    );
}

export default UserDetails;
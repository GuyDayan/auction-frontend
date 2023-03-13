import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_ALL_USERS_REQUEST_PATH} from "./Globals";
import {Divider, List, ListItem, ListItemText} from "@mui/material";
import '../css/managePage.css'

function ManagePage(props) {
    const[users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        sendApiGetRequest(BASE_URL+GET_ALL_USERS_REQUEST_PATH ,{} , response => {
            if (response.data.success) {
                setUsers(response.data.users)
            }
        })
    }, [])

    function handleCLick(userId) {
        navigate(`/user-details?userId=${userId}`)
    }

    return (
        <List sx={{width: '100%', maxWidth: 360, maxHeight:300 , height: '100%'}}>
            {
                users.map(user=> {
                    return (
                        <ListItem onClick={handleCLick(user.id)} className="user-card">
                            <ListItemText primary={user.username} secondary={<div>Creation Date :<div style={{fontWeight:"bold"}}>{user.creation_date}</div></div> }/>
                            <Divider variant="inset" component="li" />
                        </ListItem>
                    )
                })
            }
        </List>
    );

}

export default ManagePage;
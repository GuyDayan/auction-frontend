import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect} from "react";
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_USER_DETAILS_REQUEST_PATH} from "./Globals";

function UserDetails(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userSearchId = searchParams.get('userId');
    const [currentUser, setCurrentUser] = useState('');
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');


    useEffect(() => {
        sendApiGetRequest(BASE_URL + GET_USER_DETAILS_REQUEST_PATH, {token, userId, userSearchId}, res => {
            if (res.data.success) {
                setCurrentUser(res.data.user)
            } else {

            }
        })
    }, [])
    return (
        <div>
            {
                currentUser.name
            }
        </div>
    );
}

export default UserDetails;
import React, {useEffect, useState} from 'react';
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_MY_BIDS_REQUEST_PATH, GET_MY_PRODUCTS_REQUEST_PATH} from "./Globals";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {getCookies} from "./Utils";

function MyBids(props) {

    const [myBids, setMyBids] = useState([]);
    const [bidsData, setBidsData] = useState([{productId:'' , bid:'',isOpen:'', isWon: ''}]);
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();
    const {token,userId} = getCookies();

    useEffect(() => {
        sendApiGetRequest(BASE_URL+ GET_MY_BIDS_REQUEST_PATH, {token,userId} , res=>{
            if (res.data.success){
                setMyBids(res.data.bidsList);
            }else {

            }
        })
    }, []);



    return (
        <div>

        </div>
    );
}

export default MyBids;
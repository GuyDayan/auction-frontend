import React, {useEffect, useState} from 'react';
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_MY_BIDS_REQUEST_PATH, GET_MY_PRODUCTS_REQUEST_PATH} from "./Globals";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MyProduct from "./MyProduct";

function MyBids(props) {

    const [myBids, setMyBids] = useState([]);
    const [bidsData, setBidsData] = useState([{productId:'' , bid:'',isOpen:'', isWon: ''}]);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState(0);
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token')
        const userId = Cookies.get('userId')
        setToken(token)
        setUserId(userId)
        sendApiGetRequest(BASE_URL+ GET_MY_BIDS_REQUEST_PATH, {token,userId} , res=>{
            if (res.data.success){

            }else {

            }
        })
    }, []);



    return (
        <div>
            {/*<TableComponent tableType={'bidsTable'} tableList={myBids}/>*/}
        </div>
    );
}

export default MyBids;
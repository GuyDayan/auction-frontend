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
import MyBid from "./MyBid";
import {SingleTableRow} from "./SingleTableRow";


function MyBids(props) {

    const [myBids, setMyBids] = useState([]);
    const [bidsData, setBidsData] = useState([{productId:'' , bid:'',isOpen:'', isWon: ''}]);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState(0);
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();
    const columns = []

    useEffect(() => {
        const token = Cookies.get('token')
        const userId = Cookies.get('userId')
        setToken(token)
        setUserId(userId)
        sendApiGetRequest(BASE_URL+ GET_MY_BIDS_REQUEST_PATH, {token,userId} , res=>{
            if (res.data.success){
                setMyBids(res.data.myBids);
            }else {

            }
        })
    }, []);



    return (
        <div>
            {
            myBids.length === 0 ? "No Bids yet" :
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Offer</TableCell>
                            <TableCell>Open/Closed</TableCell>
                            <TableCell>Won/Lost</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            myBids.map((bid) => (
                                <SingleTableRow bid={bid} type={'bidsTable'}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            }

        </div>
    );
}

export default MyBids;
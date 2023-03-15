import React, {useEffect, useState} from 'react';
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_MY_BIDS_REQUEST_PATH, GET_MY_PRODUCTS_REQUEST_PATH} from "./Globals";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import GenericTable from "./GenericTable";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {SingleTableRow} from "./SingleTableRow";
import Paper from "@mui/material/Paper";


function MyBids(props) {

    const [myBids, setMyBids] = useState([]);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState(0);
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();
    const columns = [
        {label:"Product Id"} ,
        {label:"Product name"} ,
        {label:"Offer"} ,
        {label:"Open For Sale"},
        {label:"Bid Won"},
        {label:"Details" },
    ]

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
                    <TableHead align="center">
                        <TableRow >
                            {
                                columns.map(col => <TableCell>{col.label}</TableCell>)
                            }
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
           {/*<GenericTable data={myBids} columns={columns} />*/}
        </div>
    );
}

export default MyBids;


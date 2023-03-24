import React, {useEffect, useState} from 'react';
import {sendApiGetRequest} from "./utils/ApiRequests";
import {
    BASE_URL,
    GET_MY_BIDS_REQUEST_PATH,

    GET_PRODUCT_DETAILS_REQUEST_PATH, LOGIN_URL_PARAM, MANAGE_URL_PARAM, USER_PARAM
} from "./utils/Globals";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import GenericTable from "./utils/GenericTable";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import {getCookies} from "./utils/Utils";
import BackErrors from "./errors/BackErrors";


function MyBids(props) {

    const [myBids, setMyBids] = useState([]);
    const {token,userId,userType} = getCookies()
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
        if (userType === USER_PARAM) {
            if (token) {
                sendApiGetRequest(BASE_URL + GET_MY_BIDS_REQUEST_PATH, {token, userId}, res => {
                    if (res.data.success) {
                        setMyBids(res.data.myBids);
                    } else {
                        setTimeout(()=>{
                            setErrorCode(0)
                        },5000)
                    }
                })
            }
        } else {
            navigate(`/${MANAGE_URL_PARAM}`)
        }
    }, []);

    function handleProductDetails(productId) {
        sendApiGetRequest(BASE_URL + GET_PRODUCT_DETAILS_REQUEST_PATH, {token, userId, productId}, res => {
            if (res.data.success) {
                navigate(`/product-details?productId=${productId}`)
            } else {
                setTimeout(()=>{
                    setErrorCode(0)
                },5000)
            }
        })
    }



    return (
        <div>
            {
                myBids.length === 0 ? "No Bids yet" :
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead align="center">
                                <TableRow>
                                    {
                                        columns.map(col => <TableCell>{col.label}</TableCell>)
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    myBids.map((bid) => (
                                        <>
                                            <TableRow className="table-row" key={bid.id}
                                                      sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell component="th" scope="row">{bid.productId}</TableCell>
                                                <TableCell component="th" scope="row">{bid.productName}</TableCell>
                                                <TableCell component="th" scope="row">{bid.offer}</TableCell>
                                                <TableCell component="th"
                                                           scope="row">{bid.openForSale ? "Open" : "Closed"}</TableCell>
                                                <TableCell component="th"
                                                           scope="row">{!bid.openForSale && bid.bidWinning ? "Won" : bid.openForSale ? "Bid is still open" : "Lost"}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Button size={"small"}
                                                            onClick={() => handleProductDetails(bid.productId)}>Product
                                                        Details</Button>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
            {errorCode !== 0 && <BackErrors errorCode={errorCode} horizontal={"center"}/>}
        </div>
    );
}

export default MyBids;


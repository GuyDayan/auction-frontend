import React from 'react';
import TableRow from "@mui/material/TableRow";
import {Button, TableCell} from "@mui/material";
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_PRODUCT_DETAILS_REQUEST_PATH} from "./Globals";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function MyBid(props) {
    const bid =props.bid;
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    const navigate = useNavigate();

    function handleProductDetails() {
        const productId = bid.productId;
        sendApiGetRequest(BASE_URL+GET_PRODUCT_DETAILS_REQUEST_PATH,{token,userId,productId} , res=>{
            if (res.data.success){
                navigate(`/product-details?productId=${productId}`)
            } else {
                console.log('fail')
            }
        })
    }

    return (
        <TableRow key={bid.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
            <TableCell component="th" scope="row">{bid.productName}</TableCell>
            <TableCell component="th" scope="row">{bid.offer}</TableCell>
            <TableCell component="th" scope="row">{bid.openForSale ? "Open" : "Closed"}</TableCell>
            <TableCell component="th" scope="row">{!bid.openForSale && bid.bidWinning ? "Won" : bid.openForSale ? "Bid is still open" : "Lost"}</TableCell>
            <TableCell component="th" scope="row">
                <Button size={"small"} onClick={handleProductDetails}>Product Details</Button>
            </TableCell>
        </TableRow>
    );
}

export default MyBid;
import React, {useState} from 'react';
import TableRow from "@mui/material/TableRow";
import {Button, TableCell} from "@mui/material";
import {sendApiGetRequest} from "./utils/ApiRequests";
import {BASE_URL, GET_PRODUCT_DETAILS_REQUEST_PATH} from "./utils/Globals";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {getCookies} from "./utils/Utils";
import BackErrors from "./errors/BackErrors";

function MyBid(props) {
    const bid =props.bid;
    const {token,userId,userType} = getCookies()
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();

    function handleProductDetails() {
        const productId = bid.productId;
        sendApiGetRequest(BASE_URL+GET_PRODUCT_DETAILS_REQUEST_PATH,{token,userId,productId} , res=>{
            if (res.data.success){
                navigate(`/product-details?productId=${productId}`)
            } else {
                setErrorCode(res.data.errorCode)
                setTimeout(()=>{
                    setErrorCode(0)
                },5000)
            }
        })
    }

    return (
        <>
            <TableRow key={bid.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                <TableCell component="th" scope="row">{bid.productName}</TableCell>
                <TableCell component="th" scope="row">{bid.offer}</TableCell>
                <TableCell component="th" scope="row">{bid.openForSale ? "Open" : "Closed"}</TableCell>
                <TableCell component="th" scope="row">{!bid.openForSale && bid.bidWinning ? "Won" : bid.openForSale ? "Bid is still open" : "Lost"}</TableCell>
                <TableCell component="th" scope="row">
                    <Button size={"small"} onClick={handleProductDetails}>Product Details</Button>
                </TableCell>
            </TableRow>
            {errorCode !== 0 && <BackErrors errorCode={errorCode} horizontal={"center"}/>}

        </>
    );
}

export default MyBid;
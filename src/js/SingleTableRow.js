import React from 'react';
import TableRow from "@mui/material/TableRow";
import {Button, TableCell} from "@mui/material";
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_PRODUCT_DETAILS_REQUEST_PATH} from "./Globals";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export function SingleTableRow(props) {
    let data;
    const rowType = props.type;
    switch(rowType){
        case 'bidsTable':
            data = props.bid;
            break;
        case 'productTable':
            data = props.product;
            break;
    }

    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    const navigate = useNavigate();

    function handleProductDetails() {
        const productId = data.productId;
        sendApiGetRequest(BASE_URL+GET_PRODUCT_DETAILS_REQUEST_PATH,{token,userId,productId} , res=>{
            if (res.data.success){
                navigate(`/product-details?productId=${productId}`)
            } else {
                console.log('fail')
            }
        })
    }
    console.log(data)

    return (
        <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
            {rowType === 'bidsTable' ?
                <>
                <TableCell component="th" scope="row">{data.productName}</TableCell>
                <TableCell component="th" scope="row">{data.offer}</TableCell>
                </>
                :
                <>
                <TableCell component="th" scope="row">{data.name}</TableCell>
                <TableCell component="th" scope="row">{data.biggestBid}</TableCell>
                </>
            }
            <TableCell component="th" scope="row">{data.openForSale ? "Open" : "Closed"}</TableCell>
            { (rowType === 'bidsTable') &&
                <>
                <TableCell component="th"
                           scope="row">{!data.openForSale && data.bidWinning ? "Won" : data.openForSale ? "Bid is still open" : "Lost"}</TableCell>
                <TableCell component="th" scope="row">
                <Button size={"small"} onClick={handleProductDetails}>Product Details</Button>
                </TableCell>
                </>
            }
        </TableRow>
    );
}


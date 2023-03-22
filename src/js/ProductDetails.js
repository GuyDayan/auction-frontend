import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {
    BASE_URL, ERROR_PRICE_CANNOT_BE_NEGATIVE, ERROR_WEAK_PASSWORD, ERROR_WEAK_USERNAME,
    GET_PRODUCT_DETAILS_REQUEST_PATH, MINIMAL_PASSWORD_LENGTH,
    MINIMAL_USERNAME_LENGTH,
    PLACE_BID_REQUEST_PATH, PRODUCT_STARTING_PRICE_MUST_BE_INTEGER,
    USER_PARAM
} from "./Globals";
import '../css/productdetails.css'
import {Button, CardHeader, CardMedia, FormControl, IconButton, InputAdornment, TextField} from "@mui/material";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BackErrors from "./BackErrors";
import {getCookies, handleDisableButton} from "./Utils";
import FrontWarnings from "./FrontWarnings";
import GenericTable from "./GenericTable";

function ProductDetails(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    const {token,userId,userType} = getCookies()
    const [product, setProduct] = useState('');
    const [offer, setOffer] = useState(0);
    const [errorCode, setErrorCode] = useState(0);
    const [myBids, setMyBids] = useState([]);
    const [frontWarning, setFrontWarning] = useState({showError: false, errorCode: ""});
    const columns = [{varName:"bidDate",label:"Bid Date"} , {varName:"offer",label:"Bid Price"} ,]



    useEffect(() => {
        sendApiGetRequest(BASE_URL + GET_PRODUCT_DETAILS_REQUEST_PATH, {token, userId, productId}, res => {
            if (res.data.success) {
                setProduct(res.data.product)
                setMyBids(res.data.product.myBids)
            } else {
                setErrorCode(res.data.errorCode)
                setTimeout(()=>{
                    setErrorCode(0)
                },5000)
            }
        })
    }, [])

    function validateBidPrice() {
        let showError = true;
        let errorCode = ""
        if (!(offer % 1 === 0)) {
            errorCode = PRODUCT_STARTING_PRICE_MUST_BE_INTEGER;
        } else {
            if ((offer < 0)) {
                errorCode = ERROR_PRICE_CANNOT_BE_NEGATIVE;
            } else {
                showError = false;
            }
        }
        return {errorCode, showError}
    }

    function handleSubmit() {
        let {showError, errorCode} = validateBidPrice();
        if (!showError){
            sendApiPostRequest(BASE_URL + PLACE_BID_REQUEST_PATH, {token, userId, productId, offer}, res => {
                if (res.data.success) {
                    window.location.reload();
                } else {
                    setErrorCode(res.data.errorCode)
                    setTimeout(() => {
                        setErrorCode(0)
                    }, 5000)
                }
            })
        }else {
            setFrontWarning({showError: true, errorCode: errorCode})
        }
    }

    return (
        <div style={{display:"flex" , justifyContent:"left" , alignItems:"left" , margin:"10px" }}>
            <Card sx={{ width:650, height:500}}>
                <CardHeader action={<IconButton aria-label="settings"><Inventory2Icon /></IconButton>} title={product.name}/>
                <CardMedia component="img" height="130" image={product.logoUrl} alt={product.name}/>
                <CardContent>
                    <Typography gutterBottom variant="h8" component="div">Seller: {product.sellerUsername}</Typography>
                    <Typography gutterBottom variant="h10" component="div">Opening Date:{product.openingSaleDate}</Typography>
                    <Typography gutterBottom variant="h10" component="div">Total Bids: {product.totalBids}</Typography>
                    <Typography gutterBottom variant="h10" component="div">Description: <br/>{product.description}</Typography>

                    {
                        userType == USER_PARAM &&
                        <>
                            <div style={{marginTop:"100px"}}>
                                <TextField id={"bidPrice"} size={"small"} type={"number"} label={"Bid Price"} variant={"outlined"} value={offer} onChange={e => setOffer(e.target.value)}/>
                                <Button disabled={handleDisableButton([offer])} onClick={handleSubmit}>PLACE BID</Button>
                            </div>
                        </>
                    }
                </CardContent>
                {errorCode !== 0 && <BackErrors errorCode={errorCode} horizontal={"center"}/>}
                {frontWarning.showError && <FrontWarnings errorCode = {frontWarning.errorCode}/>}
            </Card>
            <GenericTable columns={columns} data={myBids} tableTitle={"My Bids History"}/>
        </div>
    );
}

export default ProductDetails;
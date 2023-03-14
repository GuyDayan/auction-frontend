import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {BASE_URL, GET_PRODUCT_DETAILS_REQUEST_PATH, PLACE_BID_REQUEST_PATH} from "./Globals";
import Cookies from "js-cookie";
import '../css/productDetails.css'
import {Button, CardHeader, CardMedia, FormControl, IconButton, InputAdornment, TextField} from "@mui/material";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BackErrors from "./BackErrors";

function ProductDetails(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    const [product, setProduct] = useState('');
    const [offer, setOffer] = useState(0);
    const [errorCode, setErrorCode] = useState(0);
    const [myBids, setMyBids] = useState([]);

    useEffect(() => {
        sendApiGetRequest(BASE_URL + GET_PRODUCT_DETAILS_REQUEST_PATH, {token, userId, productId}, res => {
            if (res.data.success) {
                setProduct(res.data.product)
                setMyBids(res.data.product.myBids)
            } else {

            }
        })
    }, [])

    function handleSubmit() {
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
    }

    return (
        <div style={{display:"flex" , justifyContent:"left" , alignItems:"left" , margin:"10px" }}>
            <Card sx={{ maxWidth: 500 , maxHeight:500}}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <Inventory2Icon />
                        </IconButton>
                    } title={product.name}/>
                <CardMedia component="img" height="130" image={product.logoUrl} alt={product.name}/>
                <Typography gutterBottom variant="h8" component="div">Seller: {product.sellerUsername}</Typography>
                <CardContent>
                        <Typography gutterBottom variant="h8" component="div">Opening Date:{product.openingSaleDate}</Typography>
                        <Typography gutterBottom variant="h8" component="div">Description: <br/>{product.description}</Typography>
                        <Typography gutterBottom variant="h8" component="div">Total Bids: {product.totalBids}</Typography>
                        <Typography gutterBottom variant="h8" component="div">My Bids: {myBids.length}
                            {
                                myBids.length > 0 && myBids.map(bid => <div>{bid.offer}</div>)
                            }
                        </Typography>
                    <div>
                        <TextField id={"bidPrice"} size={"small"} type={"number"} label={"Bid Price"} variant={"outlined"} value={offer} onChange={e => setOffer(e.target.value)}/>
                        <Button onClick={handleSubmit}>PLACE BID</Button>
                    </div>
                </CardContent>
            </Card>
            {/*reder table bid */}
            <div>
                {errorCode !== 0 && <BackErrors errorCode={errorCode}/>}
            </div>
        </div>
    );
}

export default ProductDetails;
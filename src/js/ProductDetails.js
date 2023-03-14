import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {BASE_URL, GET_PRODUCT_DETAILS_REQUEST_PATH, PLACE_BID_REQUEST_PATH} from "./Globals";
import Cookies from "js-cookie";
import '../css/productDetails.css'
import {Button, FormControl, InputAdornment, TextField} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BackErrors from "./BackErrors";
import Typography from "@mui/material/Typography";

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
        <div>
            <div className='product-container'>
                <div className="product-details">
                    <Typography gutterBottom variant="h6" component="div">Product Name:<br/> {product.name}</Typography>
                    <Typography gutterBottom variant="h6" component="div">Seller
                        Username: <br/>{product.sellerUsername}</Typography>
                    <Typography gutterBottom variant="h5" component="div">Opening
                        Date: <br/>{product.openingSaleDate}</Typography>
                    <Typography gutterBottom variant="h7"
                                component="div">Description: <br/>{product.description}</Typography>
                    <Typography gutterBottom variant="h7" component="div">Total Bids On
                        Product: <br/>{product.totalBids}</Typography>
                    <Typography gutterBottom variant="h8" component="div">My Bids:
                        {
                            myBids.length > 0 && myBids.map(bid => <div>{bid.offer}</div>)
                        }
                    </Typography>
                </div>
                <img src={product.logoUrl} className={'product-image'}/>
            </div>
            <div className='product-input'>
            <TextField id={"bidPrice"} size={"small"} type={"number"} label={"Bid Price"} variant={"outlined"} value={offer} onChange={e => setOffer(e.target.value)}/>
            <Button onClick={handleSubmit}>ADD BID</Button>
            </div>
            <div>
                {errorCode !== 0 && <BackErrors errorCode={errorCode}/>}
            </div>
        </div>
    );
}

export default ProductDetails;
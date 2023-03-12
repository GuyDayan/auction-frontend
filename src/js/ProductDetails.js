import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {BASE_URL, GET_PRODUCT_DETAILS_REQUEST_PATH, PLACE_BID_REQUEST_PATH} from "./Globals";
import Cookies from "js-cookie";
import '../css/productDetails.css'
import {Button, FormControl, InputAdornment, TextField} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BackErrors from "./BackErrors";

function ProductDetails(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    const [product, setProduct] = useState('');
    const [bidPrice, setBidPrice] = useState(0);
    const [errorCode, setErrorCode] = useState(0);
    // const tempObj = {
    //     "success": true,
    //     "errorCode": null,
    //     "product": {
    //         "id": 1,
    //         "name": "Bamba",
    //         "logoUrl": "https://png.pngtree.com/png-clipart/20201216/original/pngtree-neon-love-sign-png-image_5720861.jpg",
    //         "openingSaleDate": "2023-03-12 22:32",
    //         "description": "Snack",
    //         "sellerUsername": "Yossis",
    //         "totalBids": 1,
    //         "myBids": [
    //             {
    //                 "id": 1,
    //                 "productId": 1,
    //                 "offer": 120,
    //                 "bidDate": "2023-03-12 22:32"
    //             },
    //             {
    //                 "id": 2,
    //                 "productId": 1,
    //                 "offer": 150,
    //                 "bidDate": "2023-03-12 22:32"
    //             },
    //             {
    //                 "id": 3,
    //                 "productId": 1,
    //                 "offer": 190,
    //                 "bidDate": "2023-03-12 22:32"
    //             }
    //         ],
    //         "openForSale": true
    //     }
    // };

    useEffect(() => {
        sendApiGetRequest(BASE_URL+GET_PRODUCT_DETAILS_REQUEST_PATH,{token,userId,productId} ,res=>{
            if (res.data.success){
                setProduct(product)
            }else {

            }
        })
    }, [])

    function handleSubmit(){
        sendApiPostRequest(BASE_URL+PLACE_BID_REQUEST_PATH, {token, userId, productId , bidPrice} , res=>{
            if(res.data.success){
                window.location.reload();
            }else {
                setErrorCode(res.data.errorCode)
                setTimeout(()=>{
                    setErrorCode(0)
                },5000)
            }
        })
    }

    return (
        <div>
        <div className={'product-container'}>
            <div className="product-details">
            <h2> {product.product.name}</h2>
                <p><strong>Seller:</strong>
                    <br/>
                {product.product.sellerUsername}</p>
                <p><strong>Opening Date:</strong>
                <br/>
                {product.product.openingSaleDate}</p>
                <p><strong>Description:</strong>
                <br/>
                {product.product.description}</p>
                <p><strong>Total Bids:</strong>
                <br/>

                {product.product.totalBids}</p>
                <p><strong>My Bids:</strong>
                <br/>
                {product.product.myBids.map(bid => (
                    <p>{bid.offer}$</p>
                ))}</p>

        </div>
            <img src={product.product.logoUrl}  className={'product-image'}/>
        </div>
                <TextField id={"bidPrice"}
                           size={"small"}
                           type={"number"}
                           label={"Bid Price"}
                           variant={"outlined"}
                           value={bidPrice} onChange={e=>setBidPrice(e.target.value)} />
            <Button>ADD BID</Button>
            <div>
                {errorCode !== 0 && <BackErrors errorCode = {errorCode}/>}
            </div>
        </div>
    );
}

export default ProductDetails;
import React, {useEffect, useState} from 'react';
import ProductForSaleCard from "./ProductForSaleCard";
import "../css/auctions.css"
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {getProductsForSaleRequest, sendApiGetRequest} from "./utils/ApiRequests";
import {
    ADD_PRODUCT_URL_PARAM,
    BASE_URL,
    CLOSE_AUCTION_PARAM_EVENT,
    GET_PRODUCTS_FOR_SALE_REQUEST_PATH,
    PLACE_BID_PARAM_EVENT, USER_PARAM
} from "./utils/Globals";
import Cookies from "js-cookie";
import SearchIcon from '@mui/icons-material/Search';
import {getCookies} from "./utils/Utils";
import NotificationBar from "./customs/NotificationBar";
import {useNavigate} from "react-router-dom";
import BackErrors from "./errors/BackErrors";


function ProductsForSale(props) {

    const [searchValue, setSearchValue] = useState('');
    const [productsForSale, setProductsForSale] = useState([]);
    const {token,userId,userType} = getCookies();
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();
    const [showBidNotification, setShowBidNotification] = useState(false);
    const [showCloseAuctionNotification, setShowCloseAuctionNotification] = useState(false);
    const [bidderUsername, setBidderUsername] = useState('');
    const [closeAuctionUsername, setCloseAuctionUsername] = useState('');


    useEffect(() => {
        let sse;
        if (token !== undefined && userId !== 0) {
             sse = new EventSource(BASE_URL + "main-page-handler?token="+token);
            sse.onmessage = (message) => {
                const data = JSON.parse(message.data);
                if (data.eventType == PLACE_BID_PARAM_EVENT){
                    setShowBidNotification(true)
                    setBidderUsername(data.bidderUsername)
                    setTimeout(()=>{
                        setShowBidNotification(false)
                    },5000)
                }
                if (data.eventType == CLOSE_AUCTION_PARAM_EVENT){
                    setShowCloseAuctionNotification(true)
                    setCloseAuctionUsername(data.sellerUsername)
                    setTimeout(()=>{
                        setShowCloseAuctionNotification(false)
                    },5000)
                }
            }
            getProductsForSaleRequest({token,userId} , response =>{
                    if (response.data.success) {
                        setProductsForSale(response.data.products)
                    } else {
                        setErrorCode(response.data.errorCode)
                        setTimeout(()=>{
                            setErrorCode(0)
                        },5000)
                    }
            })
        }
        return () => {
            sse.close();
        };
    }, []);


    const filter = () => {
        return productsForSale.filter(product => {
            return product.name.includes(searchValue)
        })
    }

    return (
        <>
            <div style={{display:"flex" , marginRight:"auto" , margin:"3px"}}>
                {userType === USER_PARAM &&
                    <Button onClick={() => navigate(`/${ADD_PRODUCT_URL_PARAM}`)} variant="contained">Add New
                        Product+</Button>
                }
            </div>
            {showBidNotification && <NotificationBar message={bidderUsername + " has place a bid on your product"}/>}
            {showCloseAuctionNotification && <NotificationBar message={ closeAuctionUsername + "  has closed the auction on the product you bid on"}/>}
            <div>
                <Box component="form" sx={{'& .MuiTextField-root': {m: 1, width: '35ch',justifyContent:"center",alignItems:"center" , marginTop:"15px"},}} noValidate autoComplete="off">
                    <TextField style={{width: '300px'}} value={searchValue} onChange={e => setSearchValue(e.target.value)} id="outlined-textarea" label="Search Product" placeholder="Search" multiline
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <SearchIcon />
                                       </InputAdornment>
                                   ),
                               }}
                    />
                </Box>
            </div>
            <div>
                <div className={"products-sale-container"}>
                    {
                        productsForSale.length === 0 ? <div >No Products For Sale</div> :
                            filter().length === 0 ? <div>No Products Found </div>:
                                filter().map(product =>
                                    <div key={product.id}>
                                        <ProductForSaleCard product={product}/>
                                    </div>
                                )
                    }
                </div>
            </div>
            {errorCode !== 0 && <BackErrors errorCode={errorCode} horizontal={"center"}/>}
        </>

    );
}

export default ProductsForSale;
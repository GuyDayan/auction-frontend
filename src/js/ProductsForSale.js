import React, {useEffect, useState} from 'react';
import ProductForSaleCard from "./ProductForSaleCard";
import "../css/auctions.css"
import {Box, InputAdornment, TextField} from "@mui/material";
import {getProductsForSaleRequest, sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_PRODUCTS_FOR_SALE_REQUEST_PATH, PLACE_BID_PARAM} from "./Globals";
import Cookies from "js-cookie";
import SearchIcon from '@mui/icons-material/Search';
import {getCookies} from "./Utils";
import NotificationBar from "./NotificationBar";


function ProductsForSale(props) {

    const [searchValue, setSearchValue] = useState('');
    const [productsForSale, setProductsForSale] = useState([]);
    const cookies = getCookies();
    const token = cookies.token
    const userId = cookies.userId
    const [showBidNotification, setShowBidNotification] = useState(false);
    const [bidderUsername, setBidderUsername] = useState('');

    useEffect(() => {
        if (token !== undefined && userId !== 0) {
            const sse = new EventSource(BASE_URL + "main-page-handler?token="+token);
            sse.onmessage = (message) => {
                const data = JSON.parse(message.data);
                if (data.eventType == PLACE_BID_PARAM){
                    setShowBidNotification(true)
                    setBidderUsername(data.bidderUsername)
                    setTimeout(()=>{
                        setShowBidNotification(false)
                    },5000)
                }
            }
            getProductsForSaleRequest({token,userId} , response =>{
                    if (response.data.success) {
                        setProductsForSale(response.data.products)
                    } else {
                        //
                    }
            })
        }

    }, []);


    const filter = () => {
        return productsForSale.filter(product => {
            return product.name.includes(searchValue)
        })
    }

    return (
        <div>
            <Box component="form" sx={{'& .MuiTextField-root': {m: 1, width: '25ch'},}} noValidate autoComplete="off">
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
            <div className={'productList'}>
                {
                    productsForSale.length === 0 ? "No Products For Sale" :
                        filter().length === 0 ? "No Products Found" :
                            filter().map(product =>
                                <div className={"singleProd"} key={product.id}>
                                    <ProductForSaleCard product={product}/>
                                </div>
                            )
                }
            </div>
            <div>
                {showBidNotification && <NotificationBar message={bidderUsername + " has place a bid on your product"}/>}
            </div>
        </div>
    );
}

export default ProductsForSale;
import React, {useEffect, useState} from 'react';
import ProductForSaleCard from "./ProductForSaleCard";
import "../css/auctions.css"
import {Box, TextField} from "@mui/material";
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_PRODUCTS_FOR_SALE_REQUEST_PATH} from "./Globals";
import Cookies from "js-cookie";


function ProductsForSale(props) {

    const [searchValue, setSearchValue] = useState('');
    const [productsForSale, setProductsForSale] = useState([]);
    const [token, setToken] = useState(undefined);
    const [userId, setUserId] = useState(0);


    useEffect(() => {
        const token = Cookies.get('token');
        const userId = Cookies.get('userId');
        setToken(token)
        setUserId(userId)
        if (token !== undefined && userId !== 0) {
            sendApiGetRequest(BASE_URL + GET_PRODUCTS_FOR_SALE_REQUEST_PATH, {token, userId}, response => {
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
             return product.name.startsWith(searchValue)
        })
    }

    return (
        <div>
            <Box component="form" sx={{'& .MuiTextField-root': {m: 1, width: '25ch'},}} noValidate autoComplete="off">
                <TextField style={{width:'300px'}} value={searchValue} onChange={e => setSearchValue(e.target.value)} id="outlined-textarea"
                           label="Search Product" placeholder="Search" multiline/>
            </Box>
            <div className={'productList'}>
                {
                    productsForSale.length === 0 ? "No Products For Sale" :
                        searchValue.length === 0 ?
                            productsForSale.map(product =>
                            <div className={"singleProd"} key={product.id}>
                                <ProductForSaleCard product={product}/>
                            </div>
                        )
                            :
                            filter().map(product =>
                                <div className={"singleProd"} key={product.id}>
                                    <ProductForSaleCard product={product}/>
                                </div>
                            )
                }

            </div>
        </div>
    );
}

export default ProductsForSale;
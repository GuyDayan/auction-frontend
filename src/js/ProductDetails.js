import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_PRODUCT_DETAILS_REQUEST_PATH} from "./Globals";
import Cookies from "js-cookie";

function ProductDetails(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    const [product, setProduct] = useState('');

    useEffect(() => {
        sendApiGetRequest(BASE_URL+GET_PRODUCT_DETAILS_REQUEST_PATH,{token,userId,productId} ,res=>{
            if (res.data.success){
                setProduct(product)
            }else {

            }
        })
    }, []);

    return (
        <div>

        </div>
    );
}

export default ProductDetails;
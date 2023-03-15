import React, {useEffect, useState} from 'react';
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_MY_PRODUCTS_REQUEST_PATH} from "./Globals";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MyProduct from "./MyProduct";
import {SingleTableRow} from "./SingleTableRow";
import GenericTable from "./GenericTable";

function MyProducts(props) {

    const [myProducts, setMyProducts] = useState([]);
    const [productsData, setProductsData] = useState([{productId:'' , biggestBid:'',isOpen:''}]);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState(0);
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();
    const columns = [
        {varName:"id" , label:"Product Id"} ,
        {varName:"name" , label:"Product name"} ,
        {varName:"biggestBid" , label:"Biggest Bid"} ,
        {varName:"openForSale" ,label:"Open For Sale"}
    ]

    useEffect(() => {
        const token = Cookies.get('token')
        const userId = Cookies.get('userId')
        setToken(token)
        setUserId(userId)
        sendApiGetRequest(BASE_URL+ GET_MY_PRODUCTS_REQUEST_PATH, {token,userId} , res=>{
            if (res.data.success){
                setMyProducts(res.data.productsList);
            }else {

            }
        })
    }, []);

    return (

        <div>
            <GenericTable columns={columns} data={myProducts} />
        </div>


    );
}

export default MyProducts;
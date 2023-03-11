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

function MyProducts(props) {

    const [myProducts, setMyProducts] = useState([]);
    const [productsData, setProductsData] = useState([{productId:'' , biggestBid:'',isOpen:''}]);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState(0);
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();

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
            {
                myProducts.length === 0 ? "No Products yet" :
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Biggest Bid</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    myProducts.map((product) => (
                                        <MyProduct product={product}/>
                                ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </div>
    );
}

export default MyProducts;
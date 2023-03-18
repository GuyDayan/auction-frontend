import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {getProductsForSaleRequest, sendApiGetRequest} from "./ApiRequests";
import {
    ADMIN_PARAM,
    BASE_URL,
    GET_ALL_OPEN_AUCTIONS_REQUEST_PATH,
    GET_MANAGE_DETAILS_REQUEST_PATH, GET_PRODUCTS_FOR_SALE_REQUEST_PATH,
    LOGIN_URL_PARAM
} from "./Globals";
import {Divider, FormControl, InputAdornment, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import '../css/managepage.css'
import ProductForSaleCard from "./ProductForSaleCard";
import {getCookies} from "./Utils";


function ManagePage(props) {
    const[users, setUsers] = useState([]);
    const [productsForSale, setProductsForSale] = useState([]);
    const [systemCredit, setSystemCredit] = useState(0);
    const cookies = getCookies();
    const token = cookies.token;
    const userType = cookies.userType;
    const userId = cookies.userId;

    const navigate = useNavigate();

    useEffect(() => {
        if (userType == ADMIN_PARAM){
            if (token){
                sendApiGetRequest(BASE_URL+GET_MANAGE_DETAILS_REQUEST_PATH ,{token,userId} , response => {
                    if (response.data.success) {
                        setUsers(response.data.users)
                        setSystemCredit(response.data.credit)
                    }
                })
                getProductsForSaleRequest({token,userId} , response =>{
                    if (response.data.success) {
                        setProductsForSale(response.data.products)
                    } else {
                        //
                    }
                })
            }
        }else {
            navigate(`/${LOGIN_URL_PARAM}`)
        }

    }, [])

    function handleCLick(userId) {
        navigate(`/user-details?userId=${userId}`)
    }

    return (
        <div>
            <div>
                <Typography className={"credit-title"} component="h1" variant="h5">
                    System Credit : {systemCredit}
                </Typography>
            </div>
            <div className={"manage-container"}>
                <div className={"users-container"}>
                    <List>
                        {
                            users.map(user=> {
                                return (
                                    <ListItem onClick={()=>handleCLick(user.id)} className="user-card">
                                        <ListItemText primary={user.username} secondary={<div>Creation Date :<div style={{fontWeight:"bold"}}>{user.creationDate}</div></div> }/>
                                        <Divider variant="inset" component="li" />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>


                <div className={"products-container"}>
                    {
                        productsForSale.length === 0 ? "No Products For Sale" :
                            productsForSale.map(product=> <ProductForSaleCard product={product}/>)
                    }
                </div>

            </div>
            </div>

    );

}

export default ManagePage;
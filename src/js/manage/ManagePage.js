import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {getProductsForSaleRequest, sendApiGetRequest} from "../utils/ApiRequests";
import {
    ADMIN_PARAM,
    BASE_URL,
    GET_ALL_OPEN_AUCTIONS_REQUEST_PATH,
    GET_MANAGE_DETAILS_REQUEST_PATH, GET_PRODUCTS_FOR_SALE_REQUEST_PATH,
    LOGIN_URL_PARAM
} from "../utils/Globals";
import {Divider, FormControl, InputAdornment, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import '../../css/managepage.css'
import ProductForSaleCard from "../ProductForSaleCard";
import {getCookies} from "../utils/Utils";


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
        if (userType === ADMIN_PARAM){
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

    function handleUserCLick(userId) {
        navigate(`/user-details?userId=${userId}`)
    }
    function handleProductCLick(productId) {
        navigate(`/product-details?productId=${productId}`)
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
                            Users
                            <List>
                                {
                                    users.length === 0 ? "No Users Exists" :
                                        users.map(user => {
                                        return (
                                            <ListItem onClick={() => handleUserCLick(user.id)} className="item-card">
                                                <ListItemText primary={"Username"} secondary={<div style={{fontWeight: "bold"}}>{user.username}</div>}/>
                                                <Divider variant="inset" component="li"/>
                                                <ListItemText primary={"Creation Date"} secondary={<div style={{fontWeight: "bold"}}>{user.creationDate}</div>}/>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </div>
                        <div className={"products-container"}>
                            Products
                            <List>
                                {
                                    productsForSale.length === 0 ? "No Products Exists" :
                                        productsForSale.map(product => {
                                            return (
                                                <ListItem onClick={() => handleProductCLick(product.id)} className="item-card">
                                                    <ListItemText primary={"Product Name"} secondary={<div style={{fontWeight: "bold"}}>{product.name}</div>}/>
                                                    <Divider variant="inset" component="li"/>
                                                    <ListItemText primary={"Opening Sale Date"} secondary={<div style={{fontWeight: "bold"}}>{product.openingSaleDate}</div>}/>
                                                </ListItem>
                                            )
                                        })
                                }
                            </List>

                        </div>

                    </div>

            </div>

    );

}

export default ManagePage;
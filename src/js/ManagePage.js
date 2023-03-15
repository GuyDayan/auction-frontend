import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {sendApiGetRequest} from "./ApiRequests";
import {
    BASE_URL,
    GET_ALL_OPEN_AUCTIONS_REQUEST_PATH,
    GET_MANAGE_DETAILS_REQUEST_PATH,
    GET_PRODUCTS_FOR_SALE_REQUEST_PATH,
    LOGIN_URL_PARAM
} from "./Globals";
import {Divider, FormControl, InputAdornment, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import '../css/managepage.css'
import AccountCircle from "@mui/icons-material/AccountCircle";
import Cookies from "js-cookie";
import ProductForSaleCard from "./ProductForSaleCard";


function ManagePage(props) {
    const[users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const uniqueToken = Cookies.get('uniqueToken');
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (uniqueToken){
            sendApiGetRequest(BASE_URL+GET_MANAGE_DETAILS_REQUEST_PATH ,{uniqueToken} , response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                    sendApiGetRequest(BASE_URL+GET_ALL_OPEN_AUCTIONS_REQUEST_PATH , {uniqueToken} ,response=>{
                        setProducts(response.data.products)
                    } )
                }
            })
        }else {
            navigate(`/${LOGIN_URL_PARAM}`)
        }

    }, [])

    function handleCLick(userId) {
        navigate(`/user-details?userId=${userId}`)
    }

    return (
        <div>
                <List sx={{width: '70%', maxWidth: 360, maxHeight:300 , height: '100%'}}>
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
            {
                <div style={{width:"30%",height:"100%" , marginLeft:"auto"}}>
                    {
                        products.length === 0 ? "No Products For Sale" :
                            products.map(product=> <ProductForSaleCard product={product} type={"manage"}/>)
                    }
                </div>
            }
        </div>

    );

}

export default ManagePage;
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {sendApiGetRequest} from "./ApiRequests";
import {ADMIN_PARAM, BASE_URL, GET_PRODUCT_DETAILS_REQUEST_PATH, USER_PARAM} from "./Globals";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import '../App.css'
import {getCookies} from "./Utils";


function ProductForSaleCard(props) {

    const product = props.product
    const cookies = getCookies();
    const token = cookies.token
    const userType = cookies.userType;
    const userId = cookies.userId;
    const navigate = useNavigate();


    function handleProductDetails() {
        const productId = product.id;
        sendApiGetRequest(BASE_URL+GET_PRODUCT_DETAILS_REQUEST_PATH,{token,userId,productId} , res=>{
            if (res.data.success){
                navigate(`/product-details?productId=${productId}`)
            } else {
                console.log('fail')
            }
        })
    }

    return (
        <div>
            <Card   sx={{maxWidth:"200px" , height:"300px",borderRadius:"1px solid black;" ,margin:"10px"}}>
                <img src={product.logoUrl} style={{width:'30%',height:'30%'}}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{product.name}</Typography>
                    <Typography className="headline-var">Opening Sale Date</Typography>
                    <Typography className="subtitle-var">{product.openingSaleDate}</Typography>
                    {

                        <div>
                            <Typography className="headline-var">Total Bids: <span style={{color:"black"}}>{product.totalBids}</span></Typography>
                            <Typography className="headline-var">My Total Bids: <span style={{color:"black"}}>{product.myTotalBids}</span></Typography>
                        </div>

                    }
                </CardContent>
                <CardActions>
                    <Button onClick={handleProductDetails} size="small">See more details</Button>
                </CardActions>
            </Card>
        </div>

    );
}

export default ProductForSaleCard;
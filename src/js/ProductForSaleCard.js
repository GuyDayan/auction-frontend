import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_PRODUCT_DETAILS_REQUEST_PATH} from "./Globals";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import '../App.css'


function ProductForSaleCard(props) {

    const product = props.product
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
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
        <Card sx={{ maxWidth: "100%"  }}>
            <img src={product.logoUrl} style={{width:'30%',height:'30%'}}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{product.name}</Typography>
                    <Typography className="headline-var">Opening Sale Date</Typography>
                    <Typography className="subtitle-var">{product.openingSaleDate}</Typography>
                    <Typography className="headline-var">Total Bids</Typography>
                    <Typography className="subtitle-var">{product.totalBids}</Typography>
                    <Typography className="headline-var">My Total Bids</Typography>
                    <Typography className="subtitle-var">{product.myTotalBids}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleProductDetails} size="small">See more details</Button>
            </CardActions>
        </Card>
    );
}

export default ProductForSaleCard;
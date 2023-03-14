import React, {useState} from 'react';
import "../css/features.css"
import {Button} from "@mui/material";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {ADD_PRODUCT_URL_PARAM, LOGIN_URL_PARAM, PRODUCTS_FOR_SALE_URL_PARAM} from "./Globals";
import {getCookies} from "./Utils";

function Features(props) {
    const navigate = useNavigate();

    const {token,userId} = getCookies();
    const [features, setFeatures] = useState([
        {title:"Add Product For Sale" , desc:"To add product for sale pls click below button" , buttonText:"Add new product", link:`/${ADD_PRODUCT_URL_PARAM}`},
        {title:"Auctions" , desc:"To watch products on sale pls click the below button" , buttonText:"Move to auctions", link:`/${PRODUCTS_FOR_SALE_URL_PARAM}`},
    ]);

    useEffect(() => {
        if (token == undefined){
            navigate(`/${LOGIN_URL_PARAM}`)
        }
    }, []);



    return (
        <>
            <div className={"features-list"}>
                {
                    features.map(feature=>
                        <Card className={"card-container"}>
                            <CardContent>
                                <Typography variant="h5" component="div">{feature.title}</Typography>
                                <br/>
                                <Typography variant="body2">{feature.desc}</Typography>
                            </CardContent>
                            <CardActions style={{justifyContent:"center"}}>
                                <Button variant="outlined" onClick={()=>navigate(feature.link)} size="small">{feature.buttonText}</Button>
                            </CardActions>
                        </Card>)
                }

            </div>
        </>

    );
}

export default Features;

// <Button variant="outlined" disabled={!loggedIn} onClick={()=>navigate('add-product', {replace: true})}>Add A MyProduct</Button>
// <Button variant="outlined" disabled={!loggedIn}>My Auctions</Button>
// <Button variant="outlined" disabled={!loggedIn}>My Products</Button>
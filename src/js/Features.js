import React, {useState} from 'react';
import "../css/features.css"
import {Button} from "@mui/material";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function Features(props) {
    const [loggedIn,setLoggedIn]= useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token !== undefined){
            setLoggedIn(true)
        }
    }, []);



    return (
        <div className={"featuresMenu"}>
            <div className={"featuresList"}>
                <Button variant="outlined" disabled={!loggedIn} onClick={()=>navigate('add-product', {replace: true})}>Add A Product</Button>
                <Button variant="outlined" disabled={!loggedIn}>My Auctions</Button>
                <Button variant="outlined" disabled={!loggedIn}>My Products</Button>
            </div>
        </div>
    );
}

export default Features;
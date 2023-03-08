import Avatar from "@mui/material/Avatar";
import {Button, FormControl, InputAdornment, Link, TextField, Typography} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DescriptionIcon from '@mui/icons-material/Description';
import BackErrors from "./BackErrors";
import React, {useEffect} from "react";
import {useState} from "react";
import {addProductMessage, handleDisableButton, priceWarningMessage, usernameWarningMessage} from "./Utils";
import {sendApiPostRequest} from "./ApiRequests";
import {ADD_PRODUCT_REQUEST_PATH, ADD_PRODUCT_URL_PARAM, BASE_URL, MY_PRODUCTS_URL_PARAM} from "./Globals";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import FrontWarnings from "./FrontWarnings";


export function AddProduct(props){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [startingPrice, setStartingPrice] = useState(0);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState(0);
    const [errorCode, setErrorCode] = useState(0);
    const [frontWarning, setFrontWarning] = useState({showError:false,errorType:""});
    const navigate = useNavigate();



    useEffect(() => {
        setToken(Cookies.get('token'))
        setUserId(Cookies.get('userId'))

    }, []);

    
    function handleSubmit(){
        let {showError,errorType} = validateAddProductFields();
        if (!showError){
            if (token != undefined && userId !== 0){
                sendApiPostRequest(BASE_URL+ADD_PRODUCT_REQUEST_PATH , {token,userId,name,description,logoUrl,startingPrice} , (response) =>{
                    const data = response.data;
                    if (data.success){
                        // add product add successfully message
                        navigate(`/${MY_PRODUCTS_URL_PARAM}`)
                    }else {
                        setErrorCode(data.errorCode)
                        setTimeout(()=>{
                            setErrorCode(0)
                        },5000)
                    }
                })
            }
        }else {
            setFrontWarning({showError: true, errorType: errorType})

        }

    }

    const validateAddProductFields = () => {
        let showError = false;
        let errorType = ""
        if (!(startingPrice % 1 === 0)){
            errorType = "price-error"
            showError = true;
        }
        return {errorType,showError}
    }



    function handleClear() {
        setName('')
        setDescription('')
        setLogoUrl('')
        setStartingPrice(0)
    }

    return(
        <div>
            <div className={"avatar-container"}>
                <Avatar className={"avatar"}>
                    <AddBusinessIcon />
                </Avatar>
            </div>
            <div>
                <Typography className={"login-title"} component="h1" variant="h5">Add New Product</Typography>
            </div>
            <div>
                <div className={"form-container"}>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"name"} type={"text"} label={"My Product Name"} value={name} onChange={e=>setName(e.target.value)} variant={"outlined"} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"description"} type={"text"} label={"Description"} variant={"outlined"} value={description} onChange={e=>setDescription(e.target.value)} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionIcon />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"imgUrl"} type={"text"} label={"ImageUrl"} variant={"outlined"} value={logoUrl} onChange={e=>setLogoUrl(e.target.value)} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ImageSearchIcon />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"startingPrice"} type={"number"} label={"Starting Price"} variant={"outlined"} value={startingPrice} onChange={e=>setStartingPrice(e.target.value)} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalOfferIcon />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    <div className={"form-field"}>
                        <Button type={"submit"} style={{ width: "140px" , margin:"5px"}} variant={"contained"} disabled={handleDisableButton("add-product",{productName: name, description, logoUrl, startingPrice})} onClick={handleSubmit}>Add Product</Button>
                        <Button type={"submit"} color={"error"} style={{ width: "140px" , margin:"5px"}} variant={"contained"} onClick={handleClear}>Clear</Button>
                    </div>
                    {frontWarning.showError && <FrontWarnings message = {addProductMessage(frontWarning.errorType)}/>}
                </div>
            </div>
        </div>
    )
}
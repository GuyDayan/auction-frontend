import Avatar from "@mui/material/Avatar";
import '../css/auctions.css'
import {Button, FormControl, InputAdornment, TextField, Typography} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DescriptionIcon from '@mui/icons-material/Description';
import BackErrors from "./errors/BackErrors";
import React, {useEffect} from "react";
import {useState} from "react";
import {getCookies, handleDisableButton,} from "./utils/Utils";
import {sendApiPostRequest} from "./utils/ApiRequests";
import {
    ADD_PRODUCT_REQUEST_PATH,
    ADMIN_PARAM,
    BASE_URL, MANAGE_URL_PARAM,
    MY_PRODUCTS_URL_PARAM,
    PRODUCT_STARTING_PRICE_MUST_BE_INTEGER
} from "./utils/Globals";
import {useNavigate} from "react-router-dom";
import FrontWarnings from "./errors/FrontWarnings";


export function AddProduct(props){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [startingPrice, setStartingPrice] = useState(0);
    const {token,userId,userType} = getCookies()
    const [errorCode, setErrorCode] = useState(0);
    const [frontWarning, setFrontWarning] = useState({showError:false,errorCode:""});
    const navigate = useNavigate();

    useEffect(() => {
        if(userType === ADMIN_PARAM){
            navigate(`/${MANAGE_URL_PARAM}`)
        }
    }, [])







    
    function handleSubmit(){
        let {showError,errorCode} = validateAddProductFields();
        if (!showError){
            if (token != undefined && userId !== 0){
                sendApiPostRequest(BASE_URL+ADD_PRODUCT_REQUEST_PATH , {token,userId,name,description,logoUrl,startingPrice} , (response) =>{
                    const data = response.data;
                    if (data.success){
                        // add product add successfully message
                        navigate(`/${MY_PRODUCTS_URL_PARAM}`)
                        window.location.reload()
                    }else {
                        setErrorCode(data.errorCode)
                        setTimeout(()=>{
                            setErrorCode(0)
                        },5000)
                    }
                })
            }
        }else {
            setFrontWarning({showError:true, errorCode: errorCode})

        }
    }

    const validateAddProductFields = () => {
        let showError = false;
        let errorCode = ""
        if (!(startingPrice % 1 === 0)){
            errorCode = PRODUCT_STARTING_PRICE_MUST_BE_INTEGER;
            showError = true;
        }
        return {errorCode,showError}
    }



    function handleClear() {
        setName('')
        setDescription('')
        setLogoUrl('')
        setStartingPrice(0)
    }

    return(
        <div>
            <div>
                <div className={"form-container-add-product"}>
                    <div className={"avatar-container"}>
                        <Avatar className={"avatar"}>
                            <AddBusinessIcon />
                        </Avatar>
                    </div>
                    <div>
                        <Typography className={"login-title"} component="h1" variant="h5">Add New Product</Typography>
                    </div>
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
                        <Button type={"submit"}
                                style={{ width: "140px" , margin:"5px"}}
                                variant={"contained"}
                                disabled={handleDisableButton([name, description, logoUrl, startingPrice])}
                                onClick={handleSubmit}>Add Product
                        </Button>
                        <Button type={"submit"} color={"error"} style={{ width: "140px" , margin:"5px"}} variant={"contained"} onClick={handleClear}>Clear</Button>
                    </div>
                    {errorCode !== 0 && <BackErrors errorCode={errorCode} horizontal={"center"}/>}
                    {frontWarning.showError && <FrontWarnings errorCode = {frontWarning.errorCode}/>}
                </div>
            </div>
        </div>
    )
}
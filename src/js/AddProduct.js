import Avatar from "@mui/material/Avatar";
import {Button, FormControl, InputAdornment, Link, TextField, Typography} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DescriptionIcon from '@mui/icons-material/Description';
import FrontWarnings from "./FrontWarnings";
import BackErrors from "./BackErrors";
import React from "react";
import {useState} from "react";
import {
    descriptionWarningMessage,
    handleDisableButton,
    minimumPriceWarning,
    productNameWarning,
} from "./Utils";

export function AddProduct(props){
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [minPrice, setMinPrice] = useState(1);

    function handleSubmit(){
        console.log('added a product')
    }

    return(
        <div>
            <div className={"avatar-container"}>
                <Avatar className={"avatar"}>
                    <AddBusinessIcon />
                </Avatar>
            </div>
            <div>
                <Typography className={"login-title"} component="h1" variant="h5">
                    Add A Product
                </Typography>
            </div>
            <div>
                <div className={"form-container"}>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"name"} type={"text"} label={"Name"} value={productName} onChange={e=>setProductName(e.target.value)} variant={"outlined"} InputProps={{
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
                            <TextField id={"imgUrl"} type={"text"} label={"ImageUrl"} variant={"outlined"} value={imgUrl} onChange={e=>setImgUrl(e.target.value)} InputProps={{
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
                            <TextField id={"minPrice"} type={"text"} label={"MinimumPrice"} variant={"outlined"} value={minPrice} onChange={e=>setMinPrice(e.target.value)} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalOfferIcon />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    {productName.length > 0 && <FrontWarnings message = {productNameWarning(productName)}/>}
                    {description.length > 0 && <FrontWarnings message={descriptionWarningMessage(description)} />}
                    {/*check image url is valid*/}
                    {minPrice !== 0 && <FrontWarnings message={minimumPriceWarning(minPrice)} />}
                    <div className={"form-field"}>
                        <Button type={"submit"} variant={"contained"} disabled={handleDisableButton("AddProduct",{productName,description, minPrice , imgUrl})} onClick={handleSubmit}>Add Product</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
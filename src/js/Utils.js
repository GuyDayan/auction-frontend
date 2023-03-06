import {MINIMAL_DESCRIPTION_LENGTH, MINIMAL_PASSWORD_LENGTH, MINIMAL_USERNAME_LENGTH} from "./Globals";

export const usernameWarningMessage = (username) => {
    let usernameMessage = "";
    let usernameToCheck =username.trim()
    const containsOnlyLetters = /^[A-Za-z]+$/.test(usernameToCheck);
    if (usernameToCheck.length < MINIMAL_USERNAME_LENGTH && usernameToCheck.length > 0){
        usernameMessage = "Username must be larger that 6 letters"
        if (!containsOnlyLetters){
            usernameMessage = "Username must be larger that 6 letters and contain letters only"
        }
    }else {
        if (!containsOnlyLetters){
            usernameMessage = "Username must contain letters only!"
        }
    }
    return usernameMessage;
}

export const passwordWarningMessage = (password) => {
    let passwordMessage = "";
    if (password.length < MINIMAL_PASSWORD_LENGTH){
        passwordMessage = "Password must contain at least 6 chars"
    }
    return passwordMessage
}

export const  fullNameWarningMessage =(fullName) => {
    const nameRegex = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/;
    let fullNameMessage ='';

    if (!nameRegex.test(fullName)) {
        fullNameMessage = "Full name must contain at least 2 chars and only letters"
    }
    return fullNameMessage;
}

export const emailWarningMessage=(email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailMessage =''


    if (!emailRegex.test(email)) {
        emailMessage ="email is not valid"
    }

    return emailMessage;
}

export const productNameWarning=(productName) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    let productNameMessage =''


    if (!regex.test(productName)) {
        productNameMessage ="Product name must contain letters and/or numbers"
    }

    return productNameMessage;
}

export const descriptionWarningMessage = (description) => {
    let descriptionMessage = "";
    if (description.length < MINIMAL_DESCRIPTION_LENGTH){
        descriptionMessage = "Description must contain at least 10 chars"
    }
    return descriptionMessage;
}

export const minimumPriceWarning =(minPrice) => {
    let minPriceMessage = '';
    if(minPrice <= 0){
        minPriceMessage = "Minimum Price should be more than 0"
    }
    return minPriceMessage;
}

export const handleDisableButton = (type,obj) => {
    if (type === "login"){
        const {username,password} = obj
        let loginDisable = true;
        if (username.length >= MINIMAL_USERNAME_LENGTH){
            if (containsOnlyLetters(username)){
                if (password.length >= MINIMAL_PASSWORD_LENGTH){
                    loginDisable = false
                }
            }
        }
        return loginDisable;
    }
    if (type === "sign-up"){
        let signUpDisable = true;
        const {username , password , repeatPassword , fullName} = obj
        if (username.length >= MINIMAL_USERNAME_LENGTH){
            if (containsOnlyLetters(username)){
                if (password.length >= MINIMAL_PASSWORD_LENGTH && repeatPassword >= MINIMAL_PASSWORD_LENGTH){
                    const parts = fullName.split(" ");
                    if (parts.length === 2){
                        signUpDisable = false;
                    }
                }
            }
        }
        return signUpDisable;
    }

    if(type ==="AddProduct"){
        let addProductDisable = true;
        const {productName,description, minPrice , imgUrl} = obj;
        if(productName.length > 0){
            if(description.length > MINIMAL_DESCRIPTION_LENGTH){
                if(minPrice >= 1){
                    addProductDisable = false;
                }
            }
        }
        return addProductDisable;
    }

  }


export const containsOnlyLetters = (obj) =>{
    return /^[A-Za-z]+$/.test(obj);
}



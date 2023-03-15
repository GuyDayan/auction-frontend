import {MINIMAL_PASSWORD_LENGTH, MINIMAL_USERNAME_LENGTH} from "./Globals";
import Cookies from "js-cookie";


export const getCookies = () => {
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    return {token,userId}
}

export const addUserCreditMessage =(errorType) => {
    let message = ''
    if (errorType === 'integer-number-error'){
        message = "Price must be an integer"
    }
    if (errorType === 'less-than-zero-error'){
        message = "Price must be greater than zero"
    }
    return message;
}
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
        fullNameMessage = "Full name must contain at least 2 words and only letters"
    }
    return fullNameMessage;
}

export const emailWarningMessage=(email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailMessage =''
    if (!emailRegex.test(email)) {
        emailMessage ="email is invalid"
    }
    return emailMessage;
}

export const addProductMessage = (errorType) => {
    let message = ''
    if (errorType === 'integer-error'){
        message = "Price must be an integer"
    }
    return message;
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
    if(type === "add-product"){
        let addProductDisable = true;
        const {productName, description, logoUrl, startingPrice} = obj;
        if(productName.length > 0){
            if(description.length > 0){
                if(startingPrice > 0){
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






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

export const  fullNameValidation =(fullName) => {
    const nameRegex = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/;

    if (!nameRegex.test(fullName)) {
        return false;
    }
    return true;
}

export const emailValidation=(email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    return true;
}

export const addProductMessage = (errorType) => {
    let message = ''
    if (errorType === 'integer-error'){
        message = "Price must be an integer"
    }
    return message;
}



export const handleDisableButton = (type,obj) => {
    if (type === "login") {
        const {username, password} = obj
        let loginDisable = true;
        if (username.length >= 1) {
            if (password.length >= 1) {
                loginDisable = false
            }
            return loginDisable;
        }
    }
    if (type === "sign-up"){
        let signUpDisable = true;
        const {username , password , repeatPassword , fullName} = obj
        if (username.length >= 1){
            if (password.length >= 1){
                if (fullName.length >=1 ){
                    if (repeatPassword.length >=1){
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






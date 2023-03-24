import {ADMIN_PARAM, BASE_URL, MINIMAL_PASSWORD_LENGTH, MINIMAL_USERNAME_LENGTH, USER_PARAM} from "./Globals";
import Cookies from "js-cookie";
import {sendApiGetRequest} from "./ApiRequests";



export const getCookies = () => {
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    const userType = Cookies.get("userType");
    return {token,userId,userType};
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








export const handleDisableButton = (arr) =>{
    let disabled =true;
    let filteredArray = arr.filter(item=> item.length === 0 || item === 0);
    if (filteredArray.length === 0) disabled=false;
    return disabled;
}

export const containsOnlyLetters = (obj) =>{
    return /^[A-Za-z]+$/.test(obj);
}






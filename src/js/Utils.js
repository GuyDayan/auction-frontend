import {MINIMAL_PASSWORD_LENGTH, MINIMAL_USERNAME_LENGTH} from "./Globals";

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

export const handleDisableButton = (type,obj) => {
    if (type == "login"){
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
    if (type == "sign-up"){
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


  }


export const containsOnlyLetters = (obj) =>{
    return /^[A-Za-z]+$/.test(obj);
}



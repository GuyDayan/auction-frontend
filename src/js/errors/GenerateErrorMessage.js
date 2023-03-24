import {MINIMAL_PASSWORD_LENGTH, MINIMAL_USERNAME_LENGTH} from "../utils/Globals";

export const getErrorMessage = (errorCode) => {

    let errorMessage = ""
    switch (errorCode) {
        case 10:
            errorMessage = "General Error"
            break;
        case 11:
            errorMessage="Missing params"
            break;
        case 66:
            errorMessage = "Price can't be less than 0"
            break
        case 80:
            errorMessage = "Product name is required";
            break;
        case 81:
            errorMessage = "Product description is required"
            break;
        case 82:
            errorMessage = "Product logo is required";
            break;
        case 83:
            errorMessage = "Product starting price is required";
            break;
        case 84:
            errorMessage = "Product starting price must be integer";
            break;
        case 85:
            errorMessage = "Missing product id";
            break;
        case 86:
            errorMessage = "Product doesn't exist";
            break;
        case 87:
            errorMessage = "User not owner";
            break;
        case 88:
            errorMessage = "There is not enough bids to close auction";
            break;
        case 89:
            errorMessage = "You can't bid on your product";
            break;
        case 90:
            errorMessage = "Product not open for sale anymore";
            break;
        case 91:
            errorMessage = "Offer too low";
            break;
        case 92:
            errorMessage = "You don't have enough credit";
            break;
        case 413:
            errorMessage = "No permission for that action";
            break;
        case 999:
            errorMessage = `Username must be at least ${MINIMAL_USERNAME_LENGTH} letters`;
            break;
        case 1000:
            errorMessage = "Username is required!";
            break;
        case 1001:
            errorMessage = "Password is required!";
            break;
        case 1002:
            errorMessage = `Password must be at least ${MINIMAL_PASSWORD_LENGTH} letters`;
            break;
        case 1003:
            errorMessage = "Username already taken";
            break;
        case 1004:
            errorMessage = "Wrong username or password";
            break;
        case 1005:
            errorMessage = "No such token";
            break;
        case 1007:
            errorMessage = "Missing token";
            break;
        case 1008:
            errorMessage = "Passwords don't match";
            break;
        case 1009:
            errorMessage = "FullName is required";
            break;
        case 1010:
            errorMessage = "Email is required";
            break;
        case 1011:
            errorMessage = "Email is not valid!"
            break;
        case 1012:
            errorMessage = "Full Name is not valid"
            break;

    }
    return errorMessage;
}
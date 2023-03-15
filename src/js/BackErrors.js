import React, {useState} from 'react';
import {Alert, AlertTitle, Snackbar} from "@mui/material";



function BackErrors(props) {
    const errorCode = props.errorCode;

    const findMessage = () => {
        let errorMessage = ""
        switch (errorCode) {
            case 10:
                errorMessage = "General Error"
                break;
            case 80:
                errorMessage = "MyProduct name is required";
                break;
            case 81:
                errorMessage = "MyProduct description is required"
                break;
            case 82:
                errorMessage = "MyProduct logo is required";
                break;
            case 83:
                errorMessage = "MyProduct starting price is required";
                break;
            case 84:
                errorMessage = "MyProduct starting price must be integer";
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
                errorMessage = "Username is invalid";
                break;
            case 1000:
                errorMessage = "Username is required!";
                break;
            case 1001:
                errorMessage = "Password is required!";
                break;
            case 1002:
                errorMessage = "Password is weak!";
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
        }
        return errorMessage;
    }

    return (
        <div>
            {/*<Alert className={"alert-container"} severity="error">*/}
            {/*    <strong>{findMessage()}</strong>*/}
            {/*</Alert>*/}
            <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    <strong>{findMessage()}</strong>
                </Alert>
            </Snackbar>
        </div>
    );
}

export default BackErrors;
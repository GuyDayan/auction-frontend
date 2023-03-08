import React, {useState} from 'react';
import {MINIMAL_PASSWORD_LENGTH,MINIMAL_USERNAME_LENGTH} from "./Globals";

import {Alert, AlertTitle} from "@mui/material";



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
                errorMessage = "MyProduct doesn't exist";
                break;
            case 87:
                errorMessage = "User not owner";
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


        }
        return errorMessage;
    }

    return (
        <div>
            <Alert className={"alert-container"} severity="error">
                <strong>{findMessage()}</strong>
            </Alert>
        </div>
    );
}

export default BackErrors;
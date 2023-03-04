import React, {useState} from 'react';
import {MINIMAL_PASSWORD_LENGTH,MINIMAL_USERNAME_LENGTH} from "./Globals";

import {Alert, AlertTitle} from "@mui/material";



function BackErrors(props) {
    const errorCode = props.errorCode;


    const findMessage = () => {
        let errorMessage = ""
        switch (errorCode) {
            case 999:
                errorMessage = "Username is invalid"
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
                errorMessage = "Wrong username11 or password";
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
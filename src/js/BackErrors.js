import React, {useState} from 'react';
import {Alert, AlertTitle, Snackbar} from "@mui/material";
import {getErrorMessage} from "./GenerateErrorMessage";



function BackErrors(props) {
    let horizontal = props.horizontal == undefined ? "center" : props.horizontal;

    return (
        <div>
            <Snackbar open={true} anchorOrigin={{ vertical: 'bottom' , horizontal:horizontal}}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    <strong>{getErrorMessage(props.errorCode)}</strong>
                </Alert>
            </Snackbar>
        </div>
    );
}

export default BackErrors;
import React from 'react';
import {Alert ,Snackbar} from "@mui/material";




function NotificationBar(props) {
    return (
        <div className='sse-notifications' >
            <Alert severity="success" sx={{ width: '20%', borderRadius:'5px'}}>
                {props.message}
            </Alert>
        </div>
    );
}

export default NotificationBar;
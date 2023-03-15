import React from 'react';
import {Alert} from "@mui/material";

function NotificationBar(props) {
    return (
        <div className='sse-notifications' >
            <Alert severity="success" sx={{ width: '20%', borderRadius:'5px', margin: '5px auto',textAlign: 'center' }}>
                {props.message}
            </Alert>
        </div>
    );
}

export default NotificationBar;
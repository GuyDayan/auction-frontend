import React from 'react';
import {Typography} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function SaleMessage(props) {
    let openForSale = props.openForSale;
    return (
        <div style={{ display: 'flex', alignItems: 'center' , justifyContent:"center"}}>
            {
                openForSale ?
                    <CheckCircleOutlineIcon color="success" style={{ marginRight: '5px' }} />
                    : <HighlightOffIcon color="error" style={{ marginRight: '5px' }} />
            }
            <Typography variant="body1">
                {openForSale ? 'Open For Sale' : 'Closed For Sale'}
            </Typography>
        </div>
    );

}

export default SaleMessage;
import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import {IconButton} from "@mui/material";

function FrontWarnings(props) {
    const message = props.message;
    return (
        <>
            {
              message !== "" &&
                <div>
                    <table style={{color:"#EF7A19" , marginRight:"auto" , marginLeft : "auto"}}>
                        <tr>
                            <IconButton size={"small"} edge={"start"} color={'inherit'} aria-label={'logo'}>
                                <WarningIcon />
                            </IconButton>
                            {message}
                        </tr>
                    </table>
                </div>
            }

        </>

    );
}

export default FrontWarnings;
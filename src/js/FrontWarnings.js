import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { IconButton} from "@mui/material";
import {getErrorMessage} from "./GenerateErrorMessage";

function FrontWarnings(props) {
    return (
        <>
            {
                <div>
                    <table style={{color:"#EF7A19" , marginRight:"auto" , marginLeft : "auto"}}>
                        <tr>
                            <IconButton size={"small"} edge={"start"} color={'inherit'} aria-label={'logo'}>
                                <WarningIcon />
                            </IconButton>
                            {/*{message}*/}
                            <strong>{getErrorMessage(props.errorCode)}</strong>
                        </tr>
                    </table>
                </div>
            }
        </>

    );
}

export default FrontWarnings;
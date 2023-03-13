import React, {useEffect, useState} from 'react';
import {sendApiGetRequest} from "./ApiRequests";
import {BASE_URL, GET_MY_BIDS_REQUEST_PATH, GET_MY_PRODUCTS_REQUEST_PATH} from "./Globals";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MyProduct from "./MyProduct";

function TableComponent(props) {
    const tableType = props.tableType;
    const tableList = props.tableList


    return (

        <div>
            {
                (tableList === 0) ? "No Products yet" :
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Bid</TableCell>
                                <TableCell>Status</TableCell>
                                { tableType === 'bidsTable' &&
                                    <TableCell>Won/Lost</TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {
                                    tableList.map((product) => (
                                        <MyProduct product={product}/>
                                    ))
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
}

export default TableComponent;
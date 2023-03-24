import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import {Button, makeStyles, Typography} from "@mui/material";

function GenericTable({ columns, data,tableTitle }) {

    return (
        <TableContainer>
            <Typography style={{fontSize:"25px" , color:"whitesmoke" , backgroundColor:"lightgray" , fontWeight:"bold" }}>{tableTitle}</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column) => (
                                <TableCell align={"center"}><strong>{column.label}</strong></TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((row) => (
                        <TableRow className="table-row">
                            {
                                columns.map((column) => (
                                <TableCell align={"center"} >
                                    {
                                        typeof row[column.varName] === 'boolean' ?
                                            row[column.varName] ? "Yes" : "No" : row[column.varName]
                                    }
                                </TableCell>
                            ))
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default GenericTable;
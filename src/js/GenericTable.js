import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import {Button, makeStyles} from "@mui/material";

function GenericTable({ columns, data }) {
    data.sort((a, b) => a.id - b.id);

    function handleDetailsClick(id) {
        console.log(id)
    }

    return (
        <TableContainer component={Paper}>
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
                                        column.type === "button"
                                        && <Button onClick={()=>handleDetailsClick(row.productId)}>Details</Button>
                                    }
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
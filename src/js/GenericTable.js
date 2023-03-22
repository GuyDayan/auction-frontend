import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

function GenericTable({ columns, data ,tableTitle }) {


    return (
        <TableContainer>
            <div style={{fontWeight:"bold",fontFamily:"cursive" ,fontSize:"1.5rem", color:"#757575"}}>
                {tableTitle}

            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column) => (
                                <TableCell align={"center"}><strong>{column.label}</strong></TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {data.length === 0 && "No Data"}
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
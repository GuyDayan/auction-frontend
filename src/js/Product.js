import React from 'react';
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";

function Product(props) {
    const product =props.product;
    return (
        <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{product.name}</TableCell>
            <TableCell component="th" scope="row">{product.biggestBid}</TableCell>
            <TableCell component="th" scope="row">{product.open ? "Open" : "Closed"}</TableCell>
        </TableRow>
    );
}

export default Product;
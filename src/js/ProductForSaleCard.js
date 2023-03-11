import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, Modal, TextField} from "@mui/material";

function ProductForSaleCard(props) {

    const product = props.product
    const [placeBid, setPlaceBid] = useState(false);
    const [bid, setBid] = useState(0);



    function handlePlaceBid() {
        console.log(bid)
    }

    return (
        <Card sx={{ maxWidth: "100%"  }}>
            <img src={product.logoUrl} style={{width:'30%',height:'30%'}}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Starting Price : {product.startingPrice}$
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Biggest Bid : {product.biggestBid}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Creation Date {product.creationDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.openForSale ? "Open For Sale" : "Not For Sale"}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handlePlaceBid} disabled={bid == 0} size="small">Place Bid</Button>
                <TextField style={{width:"150px"}} id={"bid"} type={"number"} value={bid} onChange={e=>setBid(e.target.value)} variant={"outlined"}/>
            </CardActions>
        </Card>
    );
}

export default ProductForSaleCard;
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ProductForSaleCard(props) {

    return (
        <Card sx={{ maxWidth: "100%"  }}>
            <img src={props.item.imgUrl} style={{width:'30%',height:'30%'}}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.item.prodName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.item.desc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.item.price}$
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add Bid</Button>
            </CardActions>
        </Card>
    );
}

export default ProductForSaleCard;
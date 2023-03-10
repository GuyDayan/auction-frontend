import React from 'react';
import ProductForSaleCard from "./ProductForSaleCard";
import "../css/auctions.css"

function ProductsForSale(props) {
    const tempData = [
        {prodName: "guy", desc: "bla bla bla",
            imgUrl:"https://www.bconnect.co.il/wp-content/uploads/2020/03/Jabra_Biz2300_duo-1.jpg", price: 37 },
        {prodName: "guy", desc: "bla bla bla",
            imgUrl:"https://www.bconnect.co.il/wp-content/uploads/2020/03/Jabra_Biz2300_duo-1.jpg", price: 37 },
        {prodName: "guy", desc: "bla bla bla",
            imgUrl:"https://www.bconnect.co.il/wp-content/uploads/2020/03/Jabra_Biz2300_duo-1.jpg", price: 37 },
        {prodName: "guy", desc: "bla bla bla",
            imgUrl:"https://www.bconnect.co.il/wp-content/uploads/2020/03/Jabra_Biz2300_duo-1.jpg", price: 37 },
        {prodName: "guy", desc: "bla bla bla",
            imgUrl:"https://www.bconnect.co.il/wp-content/uploads/2020/03/Jabra_Biz2300_duo-1.jpg", price: 37 },
        {prodName: "guy", desc: "bla bla bla",
            imgUrl:"https://www.bconnect.co.il/wp-content/uploads/2020/03/Jabra_Biz2300_duo-1.jpg", price: 37 },
        {prodName: "guy", desc: "bla bla bla",
            imgUrl:"https://www.bconnect.co.il/wp-content/uploads/2020/03/Jabra_Biz2300_duo-1.jpg", price: 37 },
        {prodName: "guy", desc: "bla bla bla",
            imgUrl:"https://www.bconnect.co.il/wp-content/uploads/2020/03/Jabra_Biz2300_duo-1.jpg", price: 37 },
        {prodName: "guy", desc: "bla bla bla",
            imgUrl:"https://www.bconnect.co.il/wp-content/uploads/2020/03/Jabra_Biz2300_duo-1.jpg", price: 37 },

    ] //temporary

    return (
        <div className={'productList'}>
            {
                tempData.map(item => (
                    <div className={"singleProd"}>
                    <ProductForSaleCard item={item} />
                    </div>
                ))
            }

        </div>
    );
}

export default ProductsForSale;
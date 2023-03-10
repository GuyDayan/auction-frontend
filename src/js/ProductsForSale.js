import React, {useState} from 'react';
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

    const [search,setSearch]= useState('');
    const setNewSearch=(e)=>{
        setSearch(e.target.value)
    }

    const filter=()=>{
        return tempData.filter((item => {
            let allow = false;
            if (item.prodName.startsWith(search)) {
                allow = true
            }
            return allow;
        }))
    }

    return (
        <div>
            <input value={search} onChange={setNewSearch}/>
        <div className={'productList'}>
            {
                search.length === 0 ?
                tempData.map((item) => (
                    <div className={"singleProd"} key={item.id}>
                    <ProductForSaleCard item={item} />
                    </div>
                ))
                    :
                    filter().map((item)=>(
                        <div className={"singleProd"} key={item.id}>
                            <ProductForSaleCard item={item} />
                        </div>
                    ))
            }
        </div>
        </div>
    );
}

export default ProductsForSale;
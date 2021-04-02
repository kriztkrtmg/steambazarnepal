import React, { useEffect, useState } from "react";
import "./storesection.css";
import Product from "../Product/Product";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import SearchIcon from "@material-ui/icons/Search";

import db from "../CONFIG";

function StoreSection() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    db.collection("product").onSnapshot((snapshot) =>
      setProduct(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="store__productContainer">
      <div className="store__productHeader">
        <div className="productHeader__title">
          <StoreRoundedIcon />
          <p>Select Item From Store</p>
        </div>
        <div className="productHeader__searchInput">
          <div className="searchInput__input">
            <input placeholder="Search Item" />
          </div>
          <div className="searchInput__inputSearchIcon">
            <SearchIcon />
          </div>
        </div>
        <div className="productHeader__filter">Sort By</div>
      </div>
      <div className="store__productList">
        {product.map((item) => (
          <Product
            id={item.id}
            key={item.data.id}
            gameIcon={item.data.gameIcon}
            image={item.data.image}
            name={item.data.name}
            price={item.data.price}
            quantity={item.data.quantity}
          />
        ))}
      </div>
    </div>
  );
}

export default StoreSection;

import React, { useEffect, useState } from "react";
import "./storesection.css";
import StoreItem from "../Product/StoreItem";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import db from "../CONFIG";

function StoreSection() {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDropdown = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  const handleLowToHighSort = (event) => {
    db.collection("product")
      .orderBy("price", "asc")
      .onSnapshot((snapshot) =>
        setProduct(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    setOpen(false);
  };

  const handleHighToLowSort = (event) => {
    db.collection("product")
      .orderBy("price", "desc")
      .onSnapshot((snapshot) =>
        setProduct(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    setOpen(false);
  };

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
          <p>Store</p>
        </div>
        <div className="productHeader__searchInput">
          <div className="searchInput__input">
            <input placeholder="Search Item" />
          </div>
          <div className="searchInput__inputSearchIcon">
            <SearchIcon />
          </div>
        </div>
        <div className="productHeader__filter">
          <button onClick={handleDropdown}>
            Sort By
            <ArrowDropDownIcon />
          </button>
          {open ? (
            <div className="filter__sort">
              <div className="filter__sortOption" onClick={handleLowToHighSort}>
                Low Price
              </div>
              <div className="filter__sortOption" onClick={handleHighToLowSort}>
                High Price
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="store__productList">
        {product.map((item) => (
          <StoreItem
            id={item.id}
            key={item.id}
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

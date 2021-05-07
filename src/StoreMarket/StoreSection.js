import React, { useEffect, useRef, useState } from "react";
import "./storesection.css";
import StoreItem from "../Product/StoreItem";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useDispatch } from "react-redux";
import { loadGameName } from "../features/product/productSlice";

import db from "../CONFIG";
import { ClickAwayListener } from "@material-ui/core";

function StoreSection() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDropdown = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  const handleLowToHighSort = (event) => {
    product.sort((first, second) => {
      return first.data.price - second.data.price;
    });

    setOpen(false);
  };

  const handleHighToLowSort = (event) => {
    product.sort((first, second) => {
      return second.data.price - first.data.price;
    });
    setOpen(false);
  };

  const anchorRef = useRef(null);

  const handleSortDropdownClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    db.collection("product").onSnapshot((snapshot) =>
      setProduct(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
    // eslint-disable-next-line
  }, []);

  const handleDota2 = () => {
    dispatch(loadGameName("Dota 2"));
    db.collection("product")
      .where("gameName", "==", "Dota 2")
      .onSnapshot((snapshot) =>
        setProduct(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  const handleCsgo = () => {
    dispatch(loadGameName("Counter-Strike: Global Offensive"));
    db.collection("product")
      .where("gameName", "==", "Counter-Strike: Global Offensive")
      .onSnapshot((snapshot) =>
        setProduct(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

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
          <div className="sort__byGame">
            <div className="sort__gameLogo" onClick={handleDota2}>
              <img
                src="https://1.bp.blogspot.com/-GplgZlvkXSc/Uk_3BipvAlI/AAAAAAAAAJE/NIU9Sm2vSVU/s1600/Dota2-Filled.png"
                alt=""
              />
            </div>
            <div className="sort__gameLogo" onClick={handleCsgo}>
              <img
                src="https://www.meme-arsenal.com/memes/d81f1fc73c38e2cfacbd493b5d58509c.jpg"
                alt=""
              />
            </div>
            {/*Rust Icon
            
            <div className="sort__gameLogo">
              <img src="https://i.imgur.com/znQvBMih.jpg" alt="" />
            </div>
            */}
          </div>
          <div className="button__sort">
            <button onClick={handleDropdown} ref={anchorRef}>
              Price
              <ArrowDropDownIcon />
            </button>
            {open ? (
              <ClickAwayListener onClickAway={handleSortDropdownClose}>
                <span className="filter__sort">
                  <div
                    className="filter__sortOption"
                    onClick={handleLowToHighSort}
                  >
                    Low
                  </div>
                  <div
                    className="filter__sortOption"
                    onClick={handleHighToLowSort}
                  >
                    High
                  </div>
                </span>
              </ClickAwayListener>
            ) : (
              ""
            )}
          </div>
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
            hero={item.data.hero}
            gameName={item.data.gameName}
            type={item.data.type}
            quality={item.data.quality}
            rarity={item.data.rarity}
          />
        ))}
      </div>
    </div>
  );
}

export default StoreSection;

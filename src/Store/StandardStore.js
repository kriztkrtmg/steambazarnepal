import React, { useEffect, useState } from "react";

//Redux and slices
import { useDispatch } from "react-redux";
import { loadGameName } from "../features/product/productSlice";

import db from "../CONFIG"; //Database import firebase firestore

//Material-UI imports
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

//Component Import
import StoreBotItem from "./StoreBotItem";

//Css import
import "./store.css";

function StandardStore() {
  const dispatch = useDispatch();
  const [storeItem, setStoreItem] = useState([]); //All object type items of the bot account in a array....
  const [sort, setSort] = useState(false); //Price sorting

  //Use effect hook--------------------
  useEffect(() => {
    db.collection("product").onSnapshot((snapshot) =>
      setStoreItem(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  //Price sorting
  const sortPrice = () => {
    setSort(!sort);
    sort
      ? storeItem.sort((first, second) => {
          return first.data.price - second.data.price;
        })
      : storeItem.sort((first, second) => {
          return second.data.price - first.data.price;
        });
  };

  //Game sorting----------------------
  //Dota2
  const handleDota2 = () => {
    dispatch(loadGameName("Dota 2"));
    db.collection("product")
      .where("gameName", "==", "Dota 2")
      .onSnapshot((snapshot) =>
        setStoreItem(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };
  //Csgo
  const handleCsgo = () => {
    dispatch(loadGameName("Counter-Strike: Global Offensive"));
    db.collection("product")
      .where("gameName", "==", "Counter-Strike: Global Offensive")
      .onSnapshot((snapshot) =>
        setStoreItem(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };
  //Function invoked when clicking "Store in secondary navbar(navbar of body container)"
  const resetFilter = () => {
    db.collection("product").onSnapshot((snapshot) =>
      setStoreItem(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  };

  return (
    <div className="store">
      <div className="storeHeader">
        <div className="storeHeader__left" onClick={resetFilter}>
          <StoreRoundedIcon />
          <p>Store</p>
        </div>

        <div className="storeHeader__center">
          <div className="filterByGame" onClick={handleDota2}>
            <img
              src="https://1.bp.blogspot.com/-GplgZlvkXSc/Uk_3BipvAlI/AAAAAAAAAJE/NIU9Sm2vSVU/s1600/Dota2-Filled.png"
              alt=""
            />
            <div className="gameTitle">Dota2</div>
          </div>
          <div className="filterByGame" onClick={handleCsgo}>
            <img
              src="https://www.meme-arsenal.com/memes/d81f1fc73c38e2cfacbd493b5d58509c.jpg"
              alt=""
            />
            <div className="gameTitle">CSGO</div>
          </div>
          <div className="filterByPrice" onClick={sortPrice}>
            <p>Price</p>
            {sort ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </div>
        </div>

        <div className="storeHeader__right">
          <div className="searchBox">
            <input placeholder="search item" />
          </div>
          <div className="search__icon">
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="storeBody">
        {storeItem.map((item) => (
          <StoreBotItem
            id={item.id}
            key={item.id}
            image={item.data.image}
            name={item.data.name}
            price={item.data.price}
            hero={item.data.hero}
            gameIcon={item.data.gameIcon}
            gameName={item.data.gameName}
            type={item.data.type}
            rarity={item.data.rarity}
            quality={item.data.quality}
          />
        ))}
      </div>
    </div>
  );
}

export default StandardStore;

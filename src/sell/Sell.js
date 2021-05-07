import React, { useEffect, useState } from "react";
import "./sell.css";
import db from "../CONFIG";
import SteamInventory from "./SteamInventory";
import SearchIcon from "@material-ui/icons/Search";

function Sell() {
  const [sellItem, setSellItem] = useState([]);

  useEffect(() => {
    db.collection("sell").onSnapshot((snapshot) =>
      setSellItem(
        snapshot.docs.map((item) => ({
          id: item.id,
          data: item.data(),
        }))
      )
    );
  }, []);

  const handleDota2 = () => {
    //dispatch(loadGameName("Dota 2"));
    db.collection("sell")
      .where("gameName", "==", "Dota 2")
      .onSnapshot((snapshot) =>
        setSellItem(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  const handleCsgo = () => {
    //dispatch(loadGameName("Counter-Strike: Global Offensive"));
    db.collection("sell")
      .where("gameName", "==", "Counter-Strike: Global Offensive")
      .onSnapshot((snapshot) =>
        setSellItem(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  return (
    <div className="sell">
      <div className="sell__steamInventory">
        <div className="steamInventory__header">
          <h4>Your Steam Inventory (Select an item to sell)</h4>
          <div className="searchSection">
            <div className="gameLogo" onClick={handleDota2}>
              <img
                src="https://1.bp.blogspot.com/-GplgZlvkXSc/Uk_3BipvAlI/AAAAAAAAAJE/NIU9Sm2vSVU/s1600/Dota2-Filled.png"
                alt=""
              />
            </div>
            <div className="gameLogo" onClick={handleCsgo}>
              <img
                src="https://www.meme-arsenal.com/memes/d81f1fc73c38e2cfacbd493b5d58509c.jpg"
                alt=""
              />
            </div>
            <div className="searchInput">
              <input placeholder="Search Item" />
            </div>
            <div className="inputSearchIcon">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="steamInventory__item">
          {sellItem.map((item) => (
            <SteamInventory
              id={item.id}
              key={item.id}
              gameIcon={item.data.gameIcon}
              name={item.data.name}
              image={item.data.image}
              price={item.data.price}
              quantity={item.data.quantity}
              hero={item.data.hero}
              quality={item.data.quality}
              gameName={item.data.gameName}
              type={item.data.type}
              rarity={item.data.rarity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sell;

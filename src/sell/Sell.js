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

  return (
    <div className="sell">
      <div className="sell__steamInventory">
        <div className="steamInventory__header">
          <h4>Your Steam Inventory (Select an item to sell)</h4>
          <div className="searchSection">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sell;

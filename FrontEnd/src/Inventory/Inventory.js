import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

//Css import
import "./inventory.css";

//Database import
import db from "../CONFIG";

//Material-Ui import
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

//Component Import
import ItemInventory from "./ItemInventory";

function Inventory() {
  const [inventoryItem, setInventoryItem] = useState([]); //Store all the item of website inventory in an array state
  const user = useSelector(selectUser);

  //Use effect hook---------------
  useEffect(() => {
    db.collection("inventory").onSnapshot((snapshot) =>
      setInventoryItem(
        snapshot.docs.map((item) => ({
          id: item.id,
          data: item.data(),
        }))
      )
    );
  }, []);
  return (
    <div className="webInventory">
      <div className="webInventory__header">
        <div className="webInventory__title">
          <ShoppingCartIcon />
          <h4>Your steambazar Inventory</h4>
        </div>
        <div className="webInventory__message">
          These are the items that you cancelled from your community sell
          listing or purchased from store and community market but did not claim
          yet.
        </div>
        <div className="webInventory__message">
          You can claim item by clicking the withdraw button and then accepting
          the trade offer on your steam account.
        </div>
        <div className="webInventory__message">
          Items listed here are only available to withdraw.
        </div>
      </div>
      {!user ? (
        <div style={{ height: "100vh", textAlign: "center" }}>
          <h1>User not logged in</h1>
          <h4>Login to view your site inventory</h4>
        </div>
      ) : (
        <div className="webInventory__itemContainer">
          {inventoryItem.map((item) => (
            <ItemInventory
              id={item.id}
              key={item.id}
              image={item.data.image}
              name={item.data.name}
              rarity={item.data.rarity}
              type={item.data.type}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Inventory;

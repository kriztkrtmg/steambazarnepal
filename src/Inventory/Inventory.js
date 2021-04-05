import React, { useEffect, useState } from "react";
import "./inventory.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import db from "../CONFIG";
import ItemInventory from "./ItemInventory";

function Inventory() {
  const [inventoryItem, setInventoryItem] = useState([]);

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
    <div className="inventory">
      <div className="inventory__header">
        <ShoppingCartIcon />
        <h4>Your Inventory</h4>
      </div>
      <div className="inventory__item">
        {inventoryItem.map((item) => (
          <ItemInventory
            id={item.id}
            key={item.data.id}
            gameIcon={item.data.gameIcon}
            name={item.data.name}
            image={item.data.image}
            price={item.data.price}
            quantity={item.data.quantity}
          />
        ))}
      </div>
    </div>
  );
}

export default Inventory;

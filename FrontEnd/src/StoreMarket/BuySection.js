import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./buysection.css";
import BuyItem from "../Product/buyItem";
import db from "../CONFIG";
import Bill from "./Bill";

function BuySection() {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    db.collection("buy").onSnapshot((snapshot) =>
      setCartItem(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="storemarket__buySection">
      <div className="storemarket__buyList">
        <div className="buylist__header">
          <ShoppingCartIcon />
          <h4>You Receive</h4>
        </div>
        <div className="buylist__list">
          {cartItem.map((item) => (
            <BuyItem
              id={item.id}
              key={item.id}
              gameIcon={item.data.gameIcon}
              name={item.data.name}
              image={item.data.image}
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

      <Bill cartItem={cartItem} />
    </div>
  );
}

export default BuySection;

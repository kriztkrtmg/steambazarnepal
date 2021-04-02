import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./buysection.css";
import ProductCart from "../Product/ProductCart";
import db from "../CONFIG";
import Bill from "./Bill";

function BuySection() {
  const [cartItem, setCartItem] = useState([]);

  const getTotalPrice = () => {
    let total = 0;
    cartItem.forEach((item) => {
      total += item.data.price * item.data.quantity;
    });
    return total;
  };

  const getCount = () => {
    let count = 0;
    cartItem.forEach((item) => {
      count += item.data.quantity;
    });
    return count;
  };

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
            <ProductCart
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

      <Bill getCount={getCount()} getTotalPrice={getTotalPrice} />
    </div>
  );
}

export default BuySection;

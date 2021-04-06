import React from "react";
import "./storeItem.css";
import NumberFormat from "react-number-format";
import db from "../CONFIG";

function StoreItem({ gameIcon, name, image, price, quantity, id }) {
  const handleStoreClick = (event) => {
    event.preventDefault();

    const cartItem = db.collection("buy").doc();

    cartItem.get().then((doc) => {
      cartItem.set({
        gameIcon: gameIcon,
        name: name,
        image: image,
        price: price,
        quantity: 1,
      });
    });
    /*
    cartItem.get().then((doc) => {
      if (doc.exists) {
        cartItem.update({
          quantity: doc.data().quantity + 1,
        });
      } else {
        cartItem.set({
          gameIcon: gameIcon,
          name: name,
          image: image,
          price: price,
          quantity: 1,
        });
      }
    });
    */

    const productItem = db.collection("product").doc(id);

    productItem.get().then((doc) => {
      if (doc.data().quantity > 1) {
        productItem.update({
          quantity: doc.data().quantity - 1,
        });
      } else {
        productItem.delete();
      }
    });
  };

  return (
    <div className="storeCard">
      <div className="storeItem" onClick={handleStoreClick}>
        <div className="storeItem__image">
          <img src={image} alt="" />
        </div>
        <h4>
          <NumberFormat
            value={price}
            displayType="text"
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"Rs: "}
          />
        </h4>

        <p>x{quantity}</p>
        <div className="storeItem__gameIcon">
          <img src={gameIcon} alt="" />
        </div>
      </div>
      <div className="storeItem__description">{name}</div>
    </div>
  );
}

export default StoreItem;

import React from "react";
import "./storeItem.css";
import NumberFormat from "react-number-format";
import db from "../CONFIG";
import ProductHover from "./ProductHover";

function StoreItem({
  gameIcon,
  name,
  image,
  price,
  quantity,
  id,
  gameName,
  hero,
  type,
  quality,
  rarity,
}) {
  const handleStoreClick = (event) => {
    event.preventDefault();

    const cartItem = db.collection("buy").doc(id);

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
          hero: hero,
          rarity: rarity,
          quality: quality,
          gameName: gameName,
          type: type,
        });
      }
    });

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
        <ProductHover name={name} rarity={rarity} type={type} hero={hero} />
      </div>
      <div className="storeItem__description">{name}</div>
    </div>
  );
}

export default StoreItem;

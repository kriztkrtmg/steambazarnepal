import React from "react";
import "./product.css";
import NumberFormat from "react-number-format";
import db from "../CONFIG";

function ProductCart({ gameIcon, name, image, price, quantity, id }) {
  const handleBuyClick = (event) => {
    event.preventDefault();

    const cartItem = db.collection("buy").doc(id);

    cartItem.get().then((doc) => {
      if (doc.data().quantity > 1) {
        cartItem.update({
          quantity: doc.data().quantity - 1,
        });
      } else {
        cartItem.delete();
      }
    });

    const productItem = db.collection("product").doc(id);

    productItem.get().then((doc) => {
      if (doc.exists) {
        productItem.update({
          quantity: doc.data().quantity + 1,
        });
      } else {
        productItem.set({
          gameIcon: gameIcon,
          name: name,
          image: image,
          price: price,
          quantity: 1,
        });
      }
    });
  };

  return (
    <div className="product" onClick={handleBuyClick}>
      <div className="product__image">
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
      <div className="product__gameIcon">
        <img src={gameIcon} alt="" />
      </div>
    </div>
  );
}

export default ProductCart;

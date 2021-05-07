import React from "react";
//import NumberFormat from "react-number-format";
import db from "../CONFIG";

function ItemInventory({ gameIcon, name, image, price, quantity, id }) {
  //Can't perform a React state update on an unmounted component.
  //This is a no-op, but it indicates a memory leak in your application.
  //To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  //I got this fucking stupid error on console....kaam chai vairaxa tara yo muji le dimaag kharab banayo...
  //M gonna fix this fucking stupid console error bug....

  const handleWithdraw = () => {
    db.collection("inventory").doc(id).delete();
  };

  return (
    <div className="inventory__cart">
      <div className="inventory__product">
        <div className="inventory__image">
          <img src={image} alt="" />
        </div>
        <p>x{quantity}</p>
        <div className="inventory__gameIcon">
          <img src={gameIcon} alt="" />
        </div>
      </div>
      <div className="inventory__data">
        <div className="inventory__Name">{name}</div>
        <button onClick={handleWithdraw}>WithDraw</button>
      </div>
    </div>
  );
}

export default ItemInventory;

import React, { useEffect, useState } from "react";
import "./discountStore.css";

//Database Import
import db from "../CONFIG";
import DiscountBotItem from "./DiscountBotItem";

function DiscountStore() {
  const [discountItem, setDiscountItem] = useState([]);

  useEffect(() => {
    db.collection("instantSell")
      .orderBy("price", "asc")
      .onSnapshot((snapshot) =>
        setDiscountItem(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="discountContainer">
      <div className="discountBody">
        {discountItem.map((item) => (
          <DiscountBotItem
            id={item.id}
            key={item.id}
            image={item.data.image}
            name={item.data.name}
            price={item.data.price}
            hero={item.data.hero}
            gameIcon={item.data.gameIcon}
            gameName={item.data.gameName}
            type={item.data.type}
            rarity={item.data.rarity}
            quality={item.data.quality}
          />
        ))}
      </div>
    </div>
  );
}

export default DiscountStore;

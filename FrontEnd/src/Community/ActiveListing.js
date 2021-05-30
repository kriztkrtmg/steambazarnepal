import React, { useEffect, useState } from "react";

//css imports
import "./activeListing.css";

//component import
import EachListItem from "./EachListItem";

//Database Import
import db from "../CONFIG";

function ActiveListing() {
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    db.collection("listing").onSnapshot((snapshot) =>
      setListItem(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="active__listing">
      {listItem.map((item) => (
        <EachListItem
          id={item.id}
          key={item.id}
          image={item.data.image}
          name={item.data.name}
          rarity={item.data.rarity}
          type={item.data.type}
          sellPrice={item.data.sellPrice}
          getPrice={item.data.getPrice}
          time={item.data.time}
        />
      ))}
    </div>
  );
}

export default ActiveListing;

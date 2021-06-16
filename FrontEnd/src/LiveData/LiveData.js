import React, { useEffect, useState } from "react";
import "./liveData.css";

//Database import
import db from "../CONFIG";

//Component Import
import RecentPurchase from "./RecentPurchase";

function LiveData() {
  const [liveData, setLiveData] = useState([]);
  useEffect(() => {
    db.collection("liveData")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) =>
        setLiveData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="container">
      <div className="title">Recent Purchases</div>
      <div className="liveData__dataContainer">
        {liveData.map((item) => (
          <RecentPurchase
            id={item.id}
            key={item.id}
            image={item.data.image}
            name={item.data.name}
            RpOrBal={item.data.RpOrBal}
            price={item.data.price}
            rarity={item.data.rarity}
            type={item.data.type}
            time={item.data.time}
            userImg={item.data.userImg}
            source={item.data.source}
          />
        ))}
      </div>
    </div>
  );
}

export default LiveData;

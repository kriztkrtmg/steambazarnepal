import React from "react";
import BuySection from "./BuySection";
import StoreSection from "./StoreSection";
import LandingPage from "./LandingPage";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import "./storeMarket.css";

function StoreMarket() {
  const user = useSelector(selectUser);

  return (
    <div className="storeMarket">
      {!user ? <LandingPage /> : ""}
      <div className="storeSection">
        <BuySection />
        <StoreSection />
      </div>
    </div>
  );
}

export default StoreMarket;

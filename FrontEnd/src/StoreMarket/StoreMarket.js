import React from "react";
/* import BuySection from "./BuySection";
import StoreSection from "./StoreSection"; */
import LandingPage from "./LandingPage";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import "./storeMarket.css";

function StoreMarket() {
  const user = useSelector(selectUser);

  return (
    <div className="storeMarket">
      {!user ? <LandingPage /> : ""}
      <div
        style={{
          height: "100vh",
          backgroundColor: "#1a1830",
          color: "#69cacb",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Welcome</h1>
        <h4>A webpage is still in progress</h4>
        <h4>
          This empty page will be replaced by landing page and some extra stuffs
        </h4>
      </div>
      {/* <div className="storeSection">
        <BuySection />
        <StoreSection />
      </div> */}
    </div>
  );
}

export default StoreMarket;

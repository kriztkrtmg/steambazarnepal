import React from "react";
import "./App.css";
import Header from "./Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StoreMarket from "./StoreMarket/StoreMarket";
import LandingPage from "./Landingpage/LandingPage";
import Inventory from "./Inventory/Inventory";
import Sell from "./sell/Sell";
import CommunityMarket from "./Community/CommunityMarket";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/storemarket">
            <StoreMarket />
          </Route>
          <Route exact path="/community">
            <CommunityMarket />
          </Route>
          <Route exact path="/inventory">
            <Inventory />
          </Route>
          <Route exact path="/sell">
            <Sell />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

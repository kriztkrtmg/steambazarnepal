import React from "react";
import "./App.css";
import Header from "./Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StoreMarket from "./StoreMarket/StoreMarket";
import Store from "./Store/Store";
import Inventory from "./Inventory/Inventory";
import Sell from "./sell/Sell";
import CommunityMarket from "./Community/CommunityMarket";
import CommunitySelectItem from "./Community/CommunitySelectItem";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/store">
            <Store />
          </Route>
          <Route exact path="/community">
            <CommunityMarket />
          </Route>
          <Route path="/community/:name" children={<CommunitySelectItem />} />
          <Route exact path="/inventory">
            <Inventory />
          </Route>
          <Route exact path="/sell">
            <Sell />
          </Route>
          <Route exact path="/">
            <StoreMarket />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { useHistory } from "react-router-dom";

//Material-ui imports
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EmailIcon from "@material-ui/icons/Email";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import DeckRoundedIcon from "@material-ui/icons/DeckRounded";
import StyleIcon from "@material-ui/icons/Style";

//Css import
import "./headerCenter.css";

function HeaderCenter() {
  const history = useHistory();
  return (
    <div className="header__center">
      <div className="header__option" onClick={() => history.push("/store")}>
        <StoreRoundedIcon />
        <div className="header__optionTitle">Store</div>
      </div>

      <div
        className="header__option"
        onClick={() => history.push("/community")}
      >
        <DeckRoundedIcon />
        <div className="header__optionTitle">Marketplace</div>
      </div>

      <div
        className="header__option"
        onClick={() => history.push("/inventory")}
      >
        <StyleIcon />
        <div className="header__optionTitle">inventory</div>
      </div>

      <div className="header__option" onClick={() => history.push("/sell")}>
        <LocalAtmIcon />
        <div className="header__optionTitle">sell</div>
      </div>

      <div className="header__option">
        <EmailIcon />
        <div className="header__optionTitle">support</div>
      </div>

      <div className="header__option">
        <ContactSupportIcon />
        <div className="header__optionTitle">guide</div>
      </div>
    </div>
  );
}

export default HeaderCenter;

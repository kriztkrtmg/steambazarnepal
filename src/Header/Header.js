import React, { useState } from "react";
import "./header.css";

import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EmailIcon from "@material-ui/icons/Email";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
//import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import DeckRoundedIcon from "@material-ui/icons/DeckRounded";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import StyleIcon from "@material-ui/icons/Style";
import NumberFormat from "react-number-format";

import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

import { useSelector, useDispatch } from "react-redux";

import {
  loginName,
  loginPhoto,
  selectUser,
  selectPhoto,
} from "../features/user/userSlice";

import { auth, provider } from "../CONFIG";
import { useHistory } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const photo = useSelector(selectPhoto);
  const user = useSelector(selectUser);
  const [sideDrawerToggle, setSideDrawerToggle] = useState(false);

  const history = useHistory();

  const handleToggle = () => {
    setSideDrawerToggle(!sideDrawerToggle);
  };

  const backdropClickHandler = () => {
    setSideDrawerToggle(false);
  };

  const handleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(loginName(result.user.displayName));
        dispatch(loginPhoto(result.user.photoURL));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="header">
      <div className="header__left" onClick={() => history.push("/")}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="facebook Logo"
        />
      </div>

      <div className="header__center">
        <div className="header__option">
          <StoreRoundedIcon />
          <div
            className="header__optionTitle"
            onClick={() => history.push("/storemarket")}
          >
            Store
          </div>
        </div>
        <div className="header__option">
          <DeckRoundedIcon />
          <div className="header__optionTitle">Marketplace</div>
        </div>
        <div className="header__option">
          <StyleIcon />
          <div className="header__optionTitle">inventory</div>
        </div>
        <div className="header__option">
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

      <div className="header__right">
        {!user ? (
          <div className="header__accountNull" onClick={handleLogin}>
            <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png"
              alt="logo"
            />
          </div>
        ) : (
          <>
            <div className="header__account">
              <div className="header__accountBalance">
                <div>
                  <NumberFormat
                    value={12345}
                    displayType="text"
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    prefix={"Rs:"}
                    suffix={"/-"}
                  />
                </div>
                <p>Balance</p>
              </div>
              <IconButton size="small">
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
            {/*<div className="header__option">
              <AddShoppingCartRoundedIcon />
              <div className="header__optionCart">1200</div>
            </div> */}

            <div className="header__account">
              <div className="header__accountProfile">
                <img src={photo} alt="facebook Logo" />
              </div>
              <div className="header__accountName">
                <div>{user}</div>
                <ArrowDropDownIcon />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="header__toggle" onClick={handleToggle}>
        <IconButton>
          {sideDrawerToggle ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <SideDrawer show={sideDrawerToggle} handleLogin={handleLogin} />
        {sideDrawerToggle ? (
          <Backdrop backdropClickHandler={backdropClickHandler} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Header;

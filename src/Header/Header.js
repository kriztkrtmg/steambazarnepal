import React, { useState } from "react";
import "./header.css";

import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EmailIcon from "@material-ui/icons/Email";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeckRoundedIcon from "@material-ui/icons/DeckRounded";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import StyleIcon from "@material-ui/icons/Style";
import NumberFormat from "react-number-format";

import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

import { useSelector, useDispatch } from "react-redux";

import {
  loginName,
  loginPhoto,
  selectUser,
  selectPhoto,
} from "../features/user/userSlice";
import {
  selectBalance,
  recharge,
  selectReward,
} from "../features/balance/balanceSlice";

import { auth, provider } from "../CONFIG";
import { useHistory } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const photo = useSelector(selectPhoto);
  const user = useSelector(selectUser);
  const balance = useSelector(selectBalance);
  const reward = useSelector(selectReward);
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

  const [rechargeDialog, setRechargeDialog] = useState(false); //To open recharge dialog box....
  const [rechargeAmount, setRechargeAmount] = useState(); //To get user input recharge amount....

  const handleRecharge = () => {
    setRechargeDialog(true);
  };

  const handleRechargeClose = () => {
    setRechargeDialog(false);
  };

  const handleRechargeSuccess = () => {
    dispatch(recharge(Number(rechargeAmount) || 0));
    setRechargeDialog(false);
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
          <div
            className="header__optionTitle"
            onClick={() => history.push("/inventory")}
          >
            inventory
          </div>
        </div>
        <div className="header__option">
          <LocalAtmIcon />
          <div
            className="header__optionTitle"
            onClick={() => history.push("/sell")}
          >
            sell
          </div>
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
          <img
            onClick={handleLogin}
            style={{ cursor: "pointer" }}
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png"
            alt="logo"
          />
        ) : (
          <>
            <div className="header__account">
              <div className="header__accountBalance">
                <div>
                  <NumberFormat
                    value={reward}
                    displayType="text"
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                  />
                </div>
                <p>Rp</p>
              </div>
            </div>
            <div className="header__account">
              <div className="header__accountBalance">
                <div>
                  <NumberFormat
                    value={balance}
                    displayType="text"
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    prefix={"Rs:"}
                    suffix={"/-"}
                  />
                </div>
                <p>Balance</p>
              </div>
              <AddCircleOutlineIcon
                className="balance__recharge"
                onClick={handleRecharge}
              />
            </div>

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

      <Dialog
        open={rechargeDialog}
        onClose={handleRechargeClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Balance Recharge</DialogTitle>
        <DialogContent>
          <input
            className="balanceRechargeInputBox"
            placeholder="Enter amount"
            type="number"
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRechargeClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRechargeSuccess} color="primary">
            Recharge
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;

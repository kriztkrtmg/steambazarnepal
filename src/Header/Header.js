import React, { useEffect, useRef, useState } from "react";
import "./header.css";

import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EmailIcon from "@material-ui/icons/Email";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeckRoundedIcon from "@material-ui/icons/DeckRounded";
import { ClickAwayListener, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import StyleIcon from "@material-ui/icons/Style";
import NumberFormat from "react-number-format";
//import RemoveIcon from "@material-ui/icons/Remove";
//import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SideDrawer from "./SideDrawer";
//import SideDrawerTest from "./SideDrawerTest";
import Backdrop from "./Backdrop";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useSelector, useDispatch } from "react-redux"; //A redux
import { useHistory } from "react-router-dom";
import { auth, provider } from "../CONFIG";

import logo from "../Steambazar.jpg";

import {
  loginName,
  loginPhoto,
  selectUser,
  selectPhoto,
  logoutName,
  logoutPhoto,
} from "../features/user/userSlice"; //Importing actions related to user

import {
  selectBalance,
  recharge,
  selectReward,
  balanceCut,
} from "../features/balance/balanceSlice"; //Importing actions related to balance

//A material-ui Lab code for snackbar (it's imported from material-ui)
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const photo = useSelector(selectPhoto);
  const user = useSelector(selectUser);
  const balance = useSelector(selectBalance);
  const reward = useSelector(selectReward);
  const [sideDrawerToggle, setSideDrawerToggle] = useState(false); //Sidedrawer for mobile nav
  const [rechargeDialog, setRechargeDialog] = useState(false); //To open recharge dialog box....
  const [rechargeAmount, setRechargeAmount] = useState(); //To get user input recharge amount....
  const [transferDialog, setTransferDialog] = useState(false); //To open transfer dialog box....
  const [transferAmount, setTransferAmount] = useState(); //To get user input transfer amount....
  const [highTransferBalance, setHighTransferBalance] = useState(false); //Show error anackbar if user withdraws more amount than site balance
  const [successTransfer, setSuccessTransfer] = useState(false); //Show success snackbar after withdraw
  const [profileDropdown, setProfileDropdown] = useState(false); //A dropdown menu when clicking userName on top right navbar.

  //Sidedrawer toggle function
  const handleToggle = () => {
    setSideDrawerToggle(!sideDrawerToggle);
  };

  const backdropClickHandler = () => {
    setSideDrawerToggle(false);
  };

  //Login function - Google Auth through firebase
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

  //LogOut function
  const handleLogOut = () => {
    dispatch(logoutName(null));
    dispatch(logoutPhoto(null));
  };

  //A function used to open and close the recharge dialog box
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

  //A function used to open and close withdraw dialog box
  const handleTransfer = () => {
    setTransferDialog(true);
  };

  const handleTransferClose = () => {
    setTransferDialog(false);
  };

  const handleTransferSuccess = () => {
    if (transferAmount > balance) {
      setHighTransferBalance(true);
    } else {
      dispatch(balanceCut(Number(transferAmount) || 0));
      setSuccessTransfer(true);
    }
    setTransferDialog(false);
  };

  //A function to pop up error snackbar
  const handleErrorSnackbar = () => {
    setHighTransferBalance(false);
  };

  //A function to pop up success snackbar
  const handleSuccessSnackbar = () => {
    setSuccessTransfer(false);
  };

  //A function used for profile dropdown
  const handleProfileDropdown = (event) => {
    setProfileDropdown((prevOpen) => !prevOpen);
  };

  const anchorRef = useRef(null);

  const handleDropdownClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setProfileDropdown(false);
  };

  const prevOpen = useRef(profileDropdown);

  useEffect(() => {
    if (prevOpen.current === true && profileDropdown === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = profileDropdown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header">
      <div className="header__left" onClick={() => history.push("/")}>
        <img
          src={logo}
          //src="https://cdn.discordapp.com/attachments/324760839397834753/833297581827293224/Group_1.png"
          //src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="SteamBazar"
        />
      </div>

      <div className="header__center">
        <div className="header__option" onClick={() => history.push("/store")}>
          <StoreRoundedIcon />
          <div className="header__optionTitle">Store</div>
          <span className="tooltip__text">Buy giftcards from store</span>
        </div>

        <div
          className="header__option"
          onClick={() => history.push("/community")}
        >
          <DeckRoundedIcon />
          <div className="header__optionTitle">Marketplace</div>
          <span className="tooltip__text">
            Buy an item from community market
          </span>
        </div>

        <div
          className="header__option"
          onClick={() => history.push("/inventory")}
        >
          <StyleIcon />
          <div className="header__optionTitle">inventory</div>
          <span className="tooltip__text">
            Purchased item will be stored here
          </span>
        </div>

        <div className="header__option" onClick={() => history.push("/sell")}>
          <LocalAtmIcon />
          <div className="header__optionTitle">sell</div>
          <span className="tooltip__text">
            Sell an item from your steam inventory
          </span>
        </div>

        <div className="header__option">
          <EmailIcon />
          <div className="header__optionTitle">support</div>
          <span className="tooltip__text">Issue or business queries</span>
        </div>

        <div className="header__option">
          <ContactSupportIcon />
          <div className="header__optionTitle">guide</div>
          <span className="tooltip__text">A quick walkthrough website</span>
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
              <span className="tooltip__text">Reward point</span>
            </div>
            <div className="header__account">
              {/*
              <RemoveIcon
                className="balance__transfer"
                onClick={handleTransfer}
              />
              */}

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
              <span className="tooltip__text">Your current balance</span>
              {/*
              <AddCircleOutlineIcon
                className="balance__recharge"
                onClick={handleRecharge}
              />
              */}
            </div>

            <div className="header__account">
              <div className="header__accountProfile">
                <img src={photo} alt="facebook Logo" />
              </div>
              <div
                className="header__accountName"
                onClick={handleProfileDropdown}
                ref={anchorRef}
              >
                <div>{user}</div>
                <ArrowDropDownIcon />
                {profileDropdown ? (
                  <ClickAwayListener onClickAway={handleDropdownClose}>
                    <div className="dropdown__menu">
                      <div className="dropdown__option">Set Trade URL</div>
                      <div
                        className="dropdown__option"
                        onClick={handleRecharge}
                      >
                        Recharge Balance
                      </div>
                      <div
                        className="dropdown__option"
                        onClick={handleTransfer}
                      >
                        Withdraw Balance
                      </div>
                      <div className="dropdown__option">
                        Transaction History
                      </div>
                      <div className="dropdown__option" onClick={handleLogOut}>
                        Log Out
                      </div>
                    </div>
                  </ClickAwayListener>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="header__toggle" onClick={handleToggle}>
        <IconButton>
          {sideDrawerToggle ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <SideDrawer
          show={sideDrawerToggle}
          handleLogin={handleLogin}
          handleLogOut={handleLogOut}
        />
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

      <Dialog
        open={transferDialog}
        onClose={handleTransferClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Transfer Balance to your Esewa
        </DialogTitle>
        <DialogContent>
          <input
            className="balanceRechargeInputBox"
            placeholder="Enter amount"
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
        </DialogContent>
        <p>This dialog box is not complete</p>
        <DialogActions>
          <Button onClick={handleTransferClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTransferSuccess} color="primary">
            Transfer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={highTransferBalance}
        autoHideDuration={6000}
        onClose={handleErrorSnackbar}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleErrorSnackbar} severity="error">
          Transfer failed!!! Transfer amount is higher than your balance.
        </Alert>
      </Snackbar>

      <Snackbar
        open={successTransfer}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbar}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleSuccessSnackbar} severity="success">
          Transfer successful.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Header;

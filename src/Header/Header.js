import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

//Redux and slices
import { useSelector, useDispatch } from "react-redux"; //A redux
import {
  loginName,
  loginPhoto,
  logoutName,
  logoutPhoto,
  notificationCount,
  notificationReset,
  selectUser,
  selectPhoto,
  selectNotification,
} from "../features/user/userSlice"; //Importing actions related to user
import {
  selectBalance,
  recharge,
  selectReward,
  balanceCut,
} from "../features/balance/balanceSlice"; //Importing actions related to balance

//Database
import { auth, provider } from "../CONFIG";
import db from "../CONFIG";
import firebase from "firebase";

//Component imports
import Backdrop from "./Backdrop";
import SideDrawer from "./SideDrawer";
import Notification from "./Notification";

//Css and other imports
import logo from "../Steambazar.jpg";
import "./header.css";
import NumberFormat from "react-number-format";

//Material-UI imports
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EmailIcon from "@material-ui/icons/Email";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeckRoundedIcon from "@material-ui/icons/DeckRounded";
import { Avatar, ClickAwayListener, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import StyleIcon from "@material-ui/icons/Style";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//A material-ui Lab code for snackbar (it's imported from material-ui)
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Header() {
  const history = useHistory(); //Routes
  const dispatch = useDispatch();
  const notificationCountValue = useSelector(selectNotification); //Notification count value
  const photo = useSelector(selectPhoto); //User photo
  const user = useSelector(selectUser); //User name
  const balance = useSelector(selectBalance); //User balance
  const reward = useSelector(selectReward); //User Reward Point
  const [sideDrawerToggle, setSideDrawerToggle] = useState(false); //Sidedrawer for mobile nav
  const [rechargeDialog, setRechargeDialog] = useState(false); //To open recharge dialog box....
  const [rechargeAmount, setRechargeAmount] = useState(); //To get user input recharge amount....
  const [transferDialog, setTransferDialog] = useState(false); //To open transfer dialog box....
  const [transferAmount, setTransferAmount] = useState(); //To get user input transfer amount....
  const [highTransferBalance, setHighTransferBalance] = useState(false); //Show error snackbar if user withdraws more amount than site balance
  const [profileDropdown, setProfileDropdown] = useState(false); //A dropdown menu when clicking userName on top right navbar.
  const [notificationDropdown, setNotificationDropdown] = useState(false); //A dropdown state of notification...
  const [tradeDialog, setTradeDialog] = useState(false); //Open set trade url dialog box
  const [tradeUrl, settradeUrl] = useState(); //To get user trade url

  //Function part---------------------------------------------------------------
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

  //Notification dropdown function
  const handleNotificationDropdown = (event) => {
    setNotificationDropdown((prevOpen) => !prevOpen);
    setProfileDropdown(false);
    dispatch(notificationReset());
  };

  //A function used for profile dropdown
  const handleProfileDropdown = (event) => {
    setProfileDropdown((prevOpen) => !prevOpen);
    setNotificationDropdown(false);
  };

  //A function to open trade Url dialog box
  const handleTradeUrl = () => {
    setTradeDialog(true);
  };
  //Trade Url dialog box close
  const handleTradeUrlClose = () => {
    setTradeDialog(false);
  };
  //Save button function
  const handleTradeUrlSuccess = () => {
    //Need to save the user input trade url in user's database....so some stuffs is need to be done later here..
    setTradeDialog(false);
  };

  //Recharge functions-----------------------------------
  //1: Recharge Dialog Box open
  const handleRecharge = () => {
    setRechargeDialog(true);
  };

  //Recharge dialogBox close
  const handleRechargeClose = () => {
    setRechargeDialog(false);
  };

  //Recharge balance proceed
  const handleRechargeSuccess = () => {
    dispatch(recharge(Number(rechargeAmount) || 0));
    dispatch(notificationCount());

    db.collection("notification").add({
      message: `Your steamBazar wallet has been credited for Rs: ${rechargeAmount} /-`,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      image:
        "https://cdn1.iconfinder.com/data/icons/business-and-finance-97/64/wallet-money-finance-cash-dollar-512.png",
    });
    setRechargeDialog(false);
  };

  //Cash out transfer balance functions
  //1: Open cashout dialog box
  const handleTransfer = () => {
    setTransferDialog(true);
  };

  //2: Close cashout dialog box
  const handleTransferClose = () => {
    setTransferDialog(false);
  };

  //3: Cashout proceed function
  const handleTransferSuccess = () => {
    if (transferAmount > balance) {
      setHighTransferBalance(true);
    } else {
      dispatch(balanceCut(Number(transferAmount) || 0));
      dispatch(notificationCount());
      db.collection("notification").add({
        message: `A transfer from webpage to your Esewa has been made. Cashout value Rs: ${transferAmount} /-`,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        image:
          "https://cdn3.iconfinder.com/data/icons/terminal-and-atm/100/ATM_terminal_pay_cash_out_cash_bank-07-512.png",
      });
    }
    setTransferDialog(false);
  };

  //Mobile sideDrawer toggle functions----------------
  //1: Open sidedrawer
  const handleToggle = () => {
    setSideDrawerToggle(!sideDrawerToggle);
  };
  //2: Close sidedrawer
  const backdropClickHandler = () => {
    setSideDrawerToggle(false);
  };

  //UX functions snackbars--------------------------------
  //A function to pop up error snackbar
  const handleErrorSnackbar = () => {
    setHighTransferBalance(false);
  };

  //Close notification dropdown and user profile dropdown
  const anchorRef = useRef(null);
  const handleDropdownClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setProfileDropdown(false);
    setNotificationDropdown(false);
  };
  const prevOpen = useRef(profileDropdown);
  //End of function part------------------------------------------------------------------

  //The use effect-------------------------------------------------------------
  useEffect(() => {
    if (prevOpen.current === true && profileDropdown === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = profileDropdown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //React Render----------------------------------------------------------------
  return (
    <div className="header">
      <div className="header__left" onClick={() => history.push("/")}>
        <img src={logo} alt="SteamBazar" />
      </div>

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

      <div className="header__right">
        {/*If user is not logged in*/}
        {!user ? (
          <img
            onClick={handleLogin}
            style={{ cursor: "pointer" }}
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png"
            alt="logo"
          />
        ) : (
          <>
            {/*If user is logged in */}
            <div
              className="header__accountLogo"
              onClick={handleNotificationDropdown}
            >
              <Avatar alt="Profile" src={photo} />
              {/*No new notification and new notification*/}
              {notificationCountValue === 0 ? (
                <div className="notification__countNull"></div>
              ) : (
                <div className="notification__count">
                  {notificationCountValue}
                </div>
              )}
            </div>
            {/*Notification drop down component part */}
            {notificationDropdown ? (
              <ClickAwayListener onClickAway={handleDropdownClose}>
                <div className="notification__container">
                  <div className="notification__header">Notifications</div>
                  <Notification />
                </div>
              </ClickAwayListener>
            ) : (
              ""
            )}
            {/*End of notification dropdown component part */}
            {/*Account name and balance display */}
            <div className="header__accountInfo">
              <div className="header__accountName">{user}</div>
              <div className="header__accountRpBalance">
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
                </div>
              </div>
            </div>
            <div
              className="header__accountDropdown"
              onClick={handleProfileDropdown}
              ref={anchorRef}
            >
              <ArrowDropDownIcon />
              {/*Profile dropdown part */}
              {profileDropdown ? (
                <ClickAwayListener onClickAway={handleDropdownClose}>
                  <div className="dropdown__menu">
                    <div className="dropdown__option" onClick={handleTradeUrl}>
                      Set Trade URL
                    </div>
                    <div className="dropdown__option" onClick={handleRecharge}>
                      Recharge Balance
                    </div>
                    <div className="dropdown__option" onClick={handleTransfer}>
                      Withdraw Balance
                    </div>
                    <div className="dropdown__option">Transaction History</div>
                    <div className="dropdown__option" onClick={handleLogOut}>
                      Log Out
                    </div>
                  </div>
                </ClickAwayListener>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
      {/*Mobile view toggle option */}
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

      {/*Starting of header function dialog box */}

      {/*Trade Url dialog box */}
      <Dialog
        open={tradeDialog}
        onClose={handleTradeUrlClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="balance__title">
          Enter your trade URL
        </DialogTitle>
        <DialogContent className="tradeUrl__content">
          <div className="trade__message">
            We need to know your Trade URL so our site can send you trade offer
            requests.
          </div>
          <div className="tradeUrl__input">
            <input
              placeholder="Trade URL"
              type="text"
              value={tradeUrl}
              onChange={(e) => settradeUrl(e.target.value)}
            />
          </div>
          <div className="tradeUrl__guide">
            " Steps to find your steam Trade Url "
            <ol>
              <li>
                Go to your steam inventory and click "Trade Offers" button.
              </li>
              <li>
                After that, click on "Who can send me Trade Offers?" button.
              </li>
              <li>
                You'll see 3 options : "Friends", "Trading Forums" and
                "Third-Party Sites".
              </li>
              <li>
                Copy Trade URL from Third-Party Sites option and paste it here.
              </li>
              <li>
                Your Trade Url looks something like this :
                https://steamcommunity.com/tradeoffer/new/?partner="number"&token="words"
              </li>
              <li>Click "Save".</li>
            </ol>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleTradeUrlClose}
            className="button__rechargeCancel"
          >
            Cancel
          </button>
          <button onClick={handleTradeUrlSuccess} className="button__recharge">
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/*Recharge balance dialog box */}
      <Dialog
        open={rechargeDialog}
        onClose={handleRechargeClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="balance__title">
          Filling up the balance
        </DialogTitle>
        <DialogContent>
          <div className="balance__input">
            <input
              placeholder="Enter amount (Rs)"
              type="number"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleRechargeClose}
            className="button__rechargeCancel"
          >
            Cancel
          </button>
          <button onClick={handleRechargeSuccess} className="button__recharge">
            Recharge
          </button>
        </DialogActions>
      </Dialog>

      {/*Cashout balance dialog box */}
      <Dialog
        open={transferDialog}
        onClose={handleTransferClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="balance__title">
          Cashout
        </DialogTitle>
        <DialogContent>
          <div className="balance__input">
            <input
              placeholder="Enter amount (Rs)"
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleTransferClose}
            className="button__rechargeCancel"
          >
            Cancel
          </button>
          <button onClick={handleTransferSuccess} className="button__recharge">
            Transfer
          </button>
        </DialogActions>
      </Dialog>

      {/*Success recharge snackbar */}
      {/* <Snackbar
        open={successRecharge}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbar}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <Alert onClose={handleSuccessSnackbar} severity="success">
          Recharge Successful.
        </Alert>
      </Snackbar> */}

      {/*Error snackbar when user input higher cashout value than available balance */}
      <Snackbar
        open={highTransferBalance}
        autoHideDuration={6000}
        onClose={handleErrorSnackbar}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <Alert onClose={handleErrorSnackbar} severity="error">
          Transfer failed!!! Transfer amount is higher than your balance.
        </Alert>
      </Snackbar>
      {/*Success cashout snackbar */}
      {/*  <Snackbar
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
      </Snackbar> */}
    </div>
  );
}

export default Header;

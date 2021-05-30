import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//Redux and slices
import {
  selectUser,
  selectPhoto,
  notificationCount,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBalance,
  recharge,
  selectReward,
  balanceCut,
} from "../features/balance/balanceSlice";

//Css import
import "./sidedrawer.css";

//Material-Ui import
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import DeckRoundedIcon from "@material-ui/icons/DeckRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EmailIcon from "@material-ui/icons/Email";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import StyleIcon from "@material-ui/icons/Style";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//Database import
import db from "../CONFIG";
import firebase from "firebase";

//Components import
import SideDrawerOption from "./SideDrawerOption";
import TransactionHistory from "./TransactionHistory";

//Other imports
import NumberFormat from "react-number-format";

//A material-ui Lab code for snackbar (it's imported from material-ui)
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SideDrawer({ show, handleLogin, handleLogOut }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const photo = useSelector(selectPhoto);
  const history = useHistory();

  const [tradeDialog, setTradeDialog] = useState(false); //Open set trade url dialog box
  const [tradeUrl, settradeUrl] = useState(); //To get user trade url

  const balance = useSelector(selectBalance);
  const reward = useSelector(selectReward);
  const [rechargeDialog, setRechargeDialog] = useState(false); //To open recharge dialog box....
  const [rechargeAmount, setRechargeAmount] = useState(); //To get user input recharge amount....

  const [transferDialog, setTransferDialog] = useState(false); //To open transfer dialog box....
  const [transferAmount, setTransferAmount] = useState(); //To get user input transfer amount....
  const [highTransferBalance, setHighTransferBalance] = useState(false);
  const [successTransfer, setSuccessTransfer] = useState(false);

  const [transactionDialog, setTransactionDialog] = useState(false); // Open transaction history dialog

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

    db.collection("transaction").add({
      date: firebase.firestore.FieldValue.serverTimestamp(),
      message: "Wallet Credited from Esewa",
      signBalance: true,
      costBalance: Number(rechargeAmount),
      walletBalance: Number(rechargeAmount) + Number(balance),
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

      db.collection("transaction").add({
        date: firebase.firestore.FieldValue.serverTimestamp(),
        message: "Wallet cashout to Esewa",
        signBalance: false,
        costBalance: Number(transferAmount),
        walletBalance: Number(balance) - Number(transferAmount),
      });
      setSuccessTransfer(true);
    }
    setTransferDialog(false);
  };

  const handleTransaction = () => {
    setTransactionDialog(true);
  };

  const handleDropdownClose = () => {
    setTransactionDialog(false);
  };

  const handleErrorSnackbar = () => {
    setHighTransferBalance(false);
  };

  const handleSuccessSnackbar = () => {
    setSuccessTransfer(false);
  };

  const storeMarket = () => {
    history.push("/store");
  };
  const community = () => {
    history.push("/community");
  };
  const inventory = () => {
    history.push("/inventory");
  };
  const sell = () => {
    history.push("/sell");
  };

  return (
    <div className={`slide_drawer ${show && "animate_slide"}`}>
      <SideDrawerOption
        title="store"
        Icon={StoreRoundedIcon}
        clickMe={storeMarket}
      />
      <SideDrawerOption
        title="marketplace"
        Icon={DeckRoundedIcon}
        clickMe={community}
      />
      <SideDrawerOption
        title="inventory"
        Icon={StyleIcon}
        clickMe={inventory}
      />
      <SideDrawerOption title="sell" Icon={LocalAtmIcon} clickMe={sell} />
      <SideDrawerOption title="support" Icon={EmailIcon} />
      <SideDrawerOption title="guide" Icon={ContactSupportIcon} />

      {!user ? (
        <div className="account__Null">
          <img
            onClick={handleLogin}
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png"
            alt="logo"
          />
        </div>
      ) : (
        <div className="account__profile">
          <div className="account__name">
            <img src={photo} alt="logo" />
            <div>{user}</div>
          </div>
          <div className="account__balance">
            <div>
              <NumberFormat
                value={reward}
                displayType="text"
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                prefix={"Reward Point (RP) = "}
              />
            </div>
          </div>
          <div className="account__balance">
            <div>
              <NumberFormat
                value={balance}
                displayType="text"
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                prefix={"Your Balance = Rs: "}
                suffix={" /-"}
              />
            </div>
          </div>
          <div className="account__dropdown" onClick={handleTradeUrl}>
            Set Trade Url
          </div>
          <div className="account__dropdown" onClick={handleRecharge}>
            Recharge Balance
          </div>
          <div className="account__dropdown" onClick={handleTransfer}>
            Withdraw Balance
          </div>
          <div className="account__dropdown" onClick={handleTransaction}>
            Transaction History
          </div>
          <div className="account__dropdown" onClick={handleLogOut}>
            Log Out
          </div>
        </div>
      )}

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

      {/*Transaction History Dialog box */}
      <Dialog
        fullScreen
        open={transactionDialog}
        onClose={handleDropdownClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="transaction__historyTop">
          <div className="transaction__title">
            {`${user}'s Transaction History`}
            <CloseIcon onClick={handleDropdownClose} />
          </div>
        </DialogTitle>
        <DialogContent>
          <TransactionHistory />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={highTransferBalance}
        autoHideDuration={null}
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

      <Snackbar
        open={successTransfer}
        autoHideDuration={null}
        onClose={handleSuccessSnackbar}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <Alert onClose={handleSuccessSnackbar} severity="success">
          Transfer successful.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SideDrawer;

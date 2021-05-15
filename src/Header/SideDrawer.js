import React, { useState } from "react";
import "./sidedrawer.css";
import SideDrawerOption from "./SideDrawerOption";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import DeckRoundedIcon from "@material-ui/icons/DeckRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EmailIcon from "@material-ui/icons/Email";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

import NumberFormat from "react-number-format";
import { selectUser, selectPhoto } from "../features/user/userSlice";
import StyleIcon from "@material-ui/icons/Style";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {
  selectBalance,
  recharge,
  selectReward,
  balanceCut,
} from "../features/balance/balanceSlice";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//A material-ui Lab code for snackbar (it's imported from material-ui)
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SideDrawer({ show, handleLogin, handleLogOut }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const photo = useSelector(selectPhoto);
  const history = useHistory();

  const balance = useSelector(selectBalance);
  const reward = useSelector(selectReward);
  const [rechargeDialog, setRechargeDialog] = useState(false); //To open recharge dialog box....
  const [rechargeAmount, setRechargeAmount] = useState(); //To get user input recharge amount....

  const [transferDialog, setTransferDialog] = useState(false); //To open transfer dialog box....
  const [transferAmount, setTransferAmount] = useState(); //To get user input transfer amount....
  const [highTransferBalance, setHighTransferBalance] = useState(false);
  const [successTransfer, setSuccessTransfer] = useState(false);

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
          <div className="account__dropdown">Set Trade Url</div>
          <div className="account__dropdown" onClick={handleRecharge}>
            Recharge Balance
          </div>
          <div className="account__dropdown" onClick={handleTransfer}>
            Withdraw Balance
          </div>
          <div className="account__dropdown">Transaction History</div>
          <div className="account__dropdown" onClick={handleLogOut}>
            Log Out
          </div>
        </div>
      )}
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

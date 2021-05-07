import React, { useState } from "react";
import NumberFormat from "react-number-format";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useSelector, useDispatch } from "react-redux";
import {
  selectBalance,
  balanceCut,
  rewardUp,
} from "../features/balance/balanceSlice";

import db from "../CONFIG";

function CommunityEachProduct({
  id,
  name,
  price,
  gameIcon,
  image,
  rarity,
  gameName,
  hero,
  type,
  quality,
}) {
  const dispatch = useDispatch();
  const [balanceLowMessage, setBalanceLowMessage] = useState(false); //Balance low message state
  const [confirmBillOpen, setConfirmBillOpen] = useState(false); //To open bill type of dialog
  const [successMessage, setSuccessMessage] = useState(false); //Message at bottom after purchase

  const balance = useSelector(selectBalance); //Fetch balance from balanceSlice

  //Dialog box open after clicking a button (Buy now)
  const handleClickOpenBalance = () => {
    if (price > balance) {
      setBalanceLowMessage(true); //Show error snackbar if balance is low than item price
    } else {
      setConfirmBillOpen(true); //Open dialog box for confirmation
    }
  };

  //Material-UI lab function for snackbar
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  //Function to close both success and error snackbar
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBalanceLowMessage(false);
    setSuccessMessage(false);
  };

  //Function to close confirmation dialog box
  const handleClose = () => {
    setConfirmBillOpen(false);
  };

  const purchaseReward = Number(parseInt(0.02 * price).toFixed()); // reward point calculation

  //Function after clicking confirm button of dialog box
  const handleConfirm = () => {
    //send item to inventory
    db.collection("inventory").doc().set({
      gameIcon: gameIcon,
      name: name,
      image: image,
      price: price,
      quantity: 1,
      hero: hero,
      rarity: rarity,
      gameName: gameName,
      type: type,
      quality: quality,
    });

    //Test item on sell container...directly send...just for test....
    db.collection("sell").doc().set({
      gameIcon: gameIcon,
      name: name,
      image: image,
      price: price,
      quantity: 1,
      hero: hero,
      rarity: rarity,
      gameName: gameName,
      type: type,
      quality: quality,
    });

    //delete item from community marketplace...i.e removing item when transaction completed
    db.collection("community").doc(id).delete();

    dispatch(balanceCut(price));
    dispatch(rewardUp(Number(purchaseReward) || 0));
    setConfirmBillOpen(false);
    setSuccessMessage(true);
  };

  return (
    <div className="community__eachProduct">
      <div className="community__eachProductImage">
        <img src={image} alt="" />
      </div>
      <div className="community__productName">{name}</div>
      <div className="community__eachProductTitle">
        <div className="community__eachProductPrice">
          <NumberFormat
            value={price}
            displayType="text"
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"Rs: "}
            suffix={" /-"}
          />
        </div>
        <div className="eachProduct__seller">
          <h4>Seller</h4>
          <img src={gameIcon} alt="" />
        </div>
        <div className="buy__now">
          <button onClick={handleClickOpenBalance}>Buy Now</button>
        </div>
      </div>

      <Dialog
        open={confirmBillOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to purchase {name} at Rs: {price}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will also receive {purchaseReward} reward point (RP) .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="button__cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="button__confirm" onClick={handleConfirm}>
            Confirm
          </button>
        </DialogActions>
      </Dialog>
      {/*Balance low message snackbar*/}
      <Snackbar
        open={balanceLowMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleCloseMessage} severity="error">
          Insufficient balance!
        </Alert>
      </Snackbar>

      {/*Success message snackbar*/}
      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleCloseMessage} severity="success">
          Thank you for the purchase!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CommunityEachProduct;

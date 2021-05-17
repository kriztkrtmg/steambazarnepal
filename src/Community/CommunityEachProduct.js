import React, { useState } from "react";

//Redux and slices
import { useSelector, useDispatch } from "react-redux";
import {
  selectBalance,
  balanceCut,
  rewardUp,
  selectReward,
} from "../features/balance/balanceSlice";
import { notificationCount, selectUser } from "../features/user/userSlice";

//Material-Ui imports
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//Other imports
import NumberFormat from "react-number-format";

//Database import
import db from "../CONFIG";
import firebase from "firebase"; //This is just for timestamp on notification..

//End of Imports---------------------------------------
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
  const [balanceLowMessage, setBalanceLowMessage] = useState(false); //Balance low snackbar
  const [confirmBillOpen, setConfirmBillOpen] = useState(false); //To open bill type of dialog
  const [successMessage, setSuccessMessage] = useState(false); //Success Snackbar
  const [noUser, setNoUser] = useState(false); //No user message snackbar

  const balance = useSelector(selectBalance); //Fetch balance from balanceSlice
  const reward = useSelector(selectReward); //Fetch balance from balanceSlice
  const purchaseReward = Number(parseInt(0.02 * price).toFixed()); // reward point calculation
  const user = useSelector(selectUser); //User name
  //Dialog box open after clicking a button (Buy now)
  const handleClickOpenBalance = () => {
    if (user) {
      if (price > balance) {
        setBalanceLowMessage(true); //Show error snackbar if balance is low than item price
      } else {
        setConfirmBillOpen(true); //Open dialog box for confirmation
      }
    } else {
      setNoUser(true);
    }
  };

  //Material-UI lab function for snackbar
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  //Function to close both success and error snackbar, and also No user snackbar
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBalanceLowMessage(false);
    setSuccessMessage(false);
    setNoUser(false);
  };

  //Function to close confirmation dialog box
  const handleClose = () => {
    setConfirmBillOpen(false);
  };

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

    dispatch(balanceCut(price)); //Balance deduct
    dispatch(rewardUp(Number(purchaseReward) || 0)); //Reward point added
    setConfirmBillOpen(false);
    setSuccessMessage(true);

    dispatch(notificationCount());
    db.collection("notification").add({
      message: `Item purchased from community market. Balance (Rs): ${price} /- has been deducted from your account.`,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      image:
        "https://img.favpng.com/9/17/25/trade-e-commerce-png-favpng-qXgRCswZmanhLQLwfNamrbFxG.jpg",
    });

    db.collection("transaction").add({
      date: firebase.firestore.FieldValue.serverTimestamp(),
      message: "Community Market transaction. ( Purchase )",
      signRP: true,
      costRP: Number(purchaseReward),
      signBalance: false,
      costBalance: Number(price),
      walletRP: Number(reward) + Number(purchaseReward),
      walletBalance: Number(balance) - Number(price),
    });

    /* dispatch(notificationCount());
    db.collection("notification").add({
      message: `An item you listed in the Community Market has been sold. Your website balance has been credited ${price} NPR.`,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      image:
        "data:image/png;base64,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",
    }); */
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
          <button className="buy__nowButton" onClick={handleClickOpenBalance}>
            Buy Now
          </button>
        </div>
      </div>
      {/*A dialog box open when user clicked Buy now button */}
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

      {/*No user message snackbar */}
      <Snackbar
        open={noUser}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <Alert onClose={handleCloseMessage} severity="error">
          You need to login in order to make a purchase.
        </Alert>
      </Snackbar>

      {/*Balance low message snackbar*/}
      <Snackbar
        open={balanceLowMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
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
          horizontal: "center",
          vertical: "top",
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

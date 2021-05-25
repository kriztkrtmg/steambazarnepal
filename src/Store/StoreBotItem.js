import React, { useState } from "react";

//Redux and slices
import { useSelector, useDispatch } from "react-redux";
import { selectUser, notificationCount } from "../features/user/userSlice";
import {
  selectBalance,
  balanceCut,
  selectReward,
  rewardCut,
  rewardUp,
} from "../features/balance/balanceSlice";

import db from "../CONFIG"; //Import firebase firestore database
import firebase from "firebase"; //Only for notification timestamp

//Material-UI imports
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//Css imports
import "./storeBotItem.css";

//Other imports
import NumberFormat from "react-number-format";

function StoreBotItem({
  id,
  image,
  name,
  price,
  hero,
  gameIcon,
  gameName,
  type,
  rarity,
  quality,
}) {
  const user = useSelector(selectUser); // fetching logged user using redux
  const dispatch = useDispatch();
  const balance = useSelector(selectBalance); //fetch balance of user
  const reward = useSelector(selectReward); //fetch reward of user

  const [openBuy, setOpenBuy] = useState(false); //First dialog box opening if user is logged in
  const [openLoginSnackbar, setOpenLoginSnackbar] = useState(false); //Snackbar message opening if user is not logged in
  const [balanceLowMessage, setBalanceLowMessage] = useState(false); //Snackbar message open if balance is lower than price of item
  const [rewardLowMessage, setRewardLowMessage] = useState(false); //Snackbar message open if RP is lower than price of item
  const [successMessage, setSuccessMessage] = useState(false); //Success snackbar message open if user purchase the item

  const purchaseReward = parseInt(0.02 * price).toFixed(2); //calculate reward point of item

  //Check if user is logged in or not - open dialog box if logged in, or open user not logged in snackbar
  const handleOpenBuy = () => {
    user ? setOpenBuy(true) : setOpenLoginSnackbar(true);
  };

  //Default imported function of snackbar alert
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  //Function when user clicked purchase from balance button
  const handleClickOpenBalance = () => {
    if (price > balance) {
      setBalanceLowMessage(true);
    } else {
      const cartItem = db.collection("inventory").doc();
      cartItem.set({
        gameIcon: gameIcon,
        name: name,
        image: image,
        price: price,
        hero: hero,
        rarity: rarity,
        quality: quality,
        gameName: gameName,
        type: type,
      });

      db.collection("sell").doc().set({
        gameIcon: gameIcon,
        name: name,
        image: image,
        price: price,
        hero: hero,
        rarity: rarity,
        quality: quality,
        gameName: gameName,
        type: type,
      });

      dispatch(balanceCut(price));
      dispatch(rewardUp(Number(purchaseReward) || 0));
      setOpenBuy(false);
      setSuccessMessage(true);

      dispatch(notificationCount());

      db.collection("notification").add({
        message: `Item purchased from website store. Balance (Rs) : ${price} /- has been deducted from your account.`,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        image:
          "https://images.vexels.com/media/users/3/200033/isolated/preview/8a79cffb92025393ed5a1c501f4c57ea-online-buy-icon-by-vexels.png",
      });

      db.collection("transaction").add({
        date: firebase.firestore.FieldValue.serverTimestamp(),
        message: "Item purchased from store. ( Balance )",
        signRP: true,
        costRP: Number(purchaseReward),
        signBalance: false,
        costBalance: Number(price),
        walletRP: Number(reward) + Number(purchaseReward),
        walletBalance: Number(balance) - Number(price),
      });
    }
  };

  //Function when user clicked purchase from reward point button
  const handleClickOpenRP = () => {
    if (price > reward) {
      setRewardLowMessage(true);
    } else {
      const cartItem = db.collection("inventory").doc();
      cartItem.set({
        gameIcon: gameIcon,
        name: name,
        image: image,
        price: price,
        hero: hero,
        rarity: rarity,
        quality: quality,
        gameName: gameName,
        type: type,
      });
      dispatch(rewardCut(price));
      dispatch(rewardUp(Number(purchaseReward) || 0));
      setOpenBuy(false);
      setSuccessMessage(true);

      dispatch(notificationCount());

      db.collection("notification").add({
        message: `Item purchased from website store. Reward point (RP) : ${price} has been deducted from your account.`,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        image:
          "https://cdn4.iconfinder.com/data/icons/shopping-kalor/142/buynow-512.png",
      });

      db.collection("transaction").add({
        date: firebase.firestore.FieldValue.serverTimestamp(),
        message: "Item purchased from store. ( Reward Point )",
        signRP: false,
        costRP: Number(price),
        walletRP: Number(reward) - Number(price),
        walletBalance: Number(balance),
      });
    }
  };

  //Function to close dialog and snackbars
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBuy(false);
    setOpenLoginSnackbar(false);
    setRewardLowMessage(false);
    setBalanceLowMessage(false);
    setSuccessMessage(false);
  };

  return (
    <div>
      <div className="storeBotItem" onClick={handleOpenBuy}>
        <img src={image} alt="" />
        <div className="storeBotItem__name">{name}</div>
        <div className="storeBotItem__rarity">
          {rarity} {type}
        </div>
        <p>
          <NumberFormat
            value={price}
            displayType="text"
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"Rs: "}
            suffix={" /-"}
          />
        </p>
        <button className="storeBotItem__buy">Buy Now</button>
      </div>
      {/*First dialog box, when user clicked the item to buy */}
      <Dialog
        open={openBuy}
        onClose={handleCloseMessage}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="buy__dialogTitle">
          <div className="buy__dialogTitleArrange">
            <p>Are you sure you want to buy this item?</p>
            <CloseIcon onClick={handleCloseMessage} />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="buy__dialogTop">
            <div className="buy__dialogContent">
              <img src={image} alt="" />
              <div className="buy__dialogItem">
                {name}
                <h6>
                  {rarity} {type}
                </h6>
                <div className="buy__dialogGameIcon">
                  <img src={gameIcon} alt="" />
                  <p>{gameName}</p>
                </div>
              </div>
            </div>
            <div className="buy__dialogPricing">
              <NumberFormat
                value={price}
                displayType="text"
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                prefix={"Price Rs: "}
                suffix={" /-"}
              />
            </div>
          </div>

          <div className="buy__dialogReward">
            <p>
              <NumberFormat
                value={Number(purchaseReward)}
                displayType="text"
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                prefix={"Reward Point (RP) : "}
              />
            </p>
            <p>2% reward point on purchase.</p>
            <p>Check items on website inventory after purchase.</p>
          </div>
          <div className="buy__button">
            <button className="buy__dialogButton" onClick={handleClickOpenRP}>
              Purchase from RP
            </button>
            <button
              className="buy__dialogButton"
              onClick={handleClickOpenBalance}
            >
              Purchase from balance
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {/*Error snackbar if user clicked the item to buy without logged in */}
      <Snackbar
        open={openLoginSnackbar}
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
      {/*If user wants to buy using RP but the required RP is lower */}
      <Snackbar
        open={rewardLowMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <Alert onClose={handleCloseMessage} severity="error">
          Insufficient Reward point!
        </Alert>
      </Snackbar>
      {/*Error snackbar if the balance is lower than item price */}
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
      {/*Success snackbar after user purchased an item from store */}
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

export default StoreBotItem;

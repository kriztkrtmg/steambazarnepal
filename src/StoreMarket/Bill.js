import React, { useState } from "react";
import "./buysection.css";
import "./dialog.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NumberFormat from "react-number-format";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogFinalConfirm from "./DialogFinalConfirm";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, loginName, loginPhoto } from "../features/user/userSlice";
import { auth, provider } from "../CONFIG";
import db from "../CONFIG";

//import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  selectBalance,
  balanceCut,
  selectReward,
  rewardCut,
  rewardUp,
} from "../features/balance/balanceSlice";

function Bill({ cartItem }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  //---------------------------------------------//
  const [confirmBillOpen, setConfirmBillOpen] = useState(false); //To open bill type of dialog
  const [confirmBillOpenRP, setConfirmBillOpenRP] = useState(false); //To open bill type of dialog
  const [successMessage, setSuccessMessage] = useState(false); //Message at bottom after purchase
  const [noItemMessage, setNoItemMessage] = useState(false); //Message when user clicked purchase without putting item in buy container.
  const [balanceLowMessage, setBalanceLowMessage] = useState(false);
  const [rewardLowMessage, setRewardLowMessage] = useState(false);

  const balance = useSelector(selectBalance);
  const reward = useSelector(selectReward);

  const handleClickOpenBalance = () => {
    if (totalCount() === 0) {
      setNoItemMessage(true);
    } else {
      if (totalPrice() > balance) {
        setBalanceLowMessage(true);
      } else {
        setConfirmBillOpen(true);
      }
    }
  };

  const handleClickOpenRP = () => {
    if (totalCount() === 0) {
      setNoItemMessage(true);
    } else {
      if (totalPrice() > reward) {
        setRewardLowMessage(true);
      } else {
        setConfirmBillOpenRP(true);
      }
    }
  };

  const handleClose = () => {
    setConfirmBillOpen(false);
    setConfirmBillOpenRP(false);
  };
  //-----------------------------------------//

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

  const handleConfirm = () => {
    //Some db stuffs need to be done....make new db collection called inventory...move db collection buy to db collection inventory
    cartItem.map((item) =>
      db.collection("inventory").doc().set({
        gameIcon: item.data.gameIcon,
        name: item.data.name,
        image: item.data.image,
        price: item.data.price,
        quantity: item.data.quantity,
      })
    );

    //Test item on sell container...directly send...just for test....
    cartItem.map((item) =>
      db.collection("sell").doc().set({
        gameIcon: item.data.gameIcon,
        name: item.data.name,
        image: item.data.image,
        price: item.data.price,
        quantity: item.data.quantity,
      })
    );

    //delete item from buy box....
    cartItem.map((item) => db.collection("buy").doc(item.id).delete());

    dispatch(balanceCut(totalPrice()));
    dispatch(rewardUp(Number(purchaseReward) || 0));
    setConfirmBillOpen(false);
    setSuccessMessage(true);
  };

  const handleConfirmRP = () => {
    //Some db stuffs need to be done....make new db collection called inventory...move db collection buy to db collection inventory
    cartItem.map((item) =>
      db.collection("inventory").doc().set({
        gameIcon: item.data.gameIcon,
        name: item.data.name,
        image: item.data.image,
        price: item.data.price,
        quantity: item.data.quantity,
      })
    );

    //Test item on sell container...directly send...just for test....
    cartItem.map((item) =>
      db.collection("sell").doc().set({
        gameIcon: item.data.gameIcon,
        name: item.data.name,
        image: item.data.image,
        price: item.data.price,
        quantity: item.data.quantity,
      })
    );

    //delete item from buy box....
    cartItem.map((item) => db.collection("buy").doc(item.id).delete());

    dispatch(rewardCut(totalPrice()));
    dispatch(rewardUp(Number(purchaseReward) || 0));
    setConfirmBillOpenRP(false);
    setSuccessMessage(true);
  };

  const totalCount = () => {
    let count = 0;
    cartItem.forEach((item) => {
      count += item.data.quantity;
    });
    return count;
  };

  const totalPrice = () => {
    let total = 0;
    cartItem.forEach((item) => {
      total += item.data.quantity * item.data.price;
    });
    return total;
  };

  const purchaseReward = parseInt(0.02 * totalPrice()).toFixed(2);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(false);
    setNoItemMessage(false);
    setBalanceLowMessage(false);
    setRewardLowMessage(false);
  };

  return (
    <div className="storemarket__buyCheckout">
      <div className="checkout__header">
        <ShoppingCartIcon />
        <h4>Bill</h4>
      </div>
      <div className="checkout__description">
        <div className="checkout__descriptionDetails">
          <p>
            Item Count:
            <NumberFormat
              className="checkout__number"
              value={totalCount()}
              displayType="text"
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
            />
          </p>
          <p>
            Total price (Rs):
            <NumberFormat
              className="checkout__number"
              value={totalPrice()}
              displayType="text"
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              suffix={"/-"}
            />
          </p>
        </div>
        <div className="checkout__descriptionConfirm">
          {!user ? (
            <>
              <img
                onClick={handleLogin}
                style={{ cursor: "pointer" }}
                src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png"
                alt="logo"
              />

              <p>You need to login in order to make purchase.</p>
            </>
          ) : (
            <>
              <button
                className="checkout__button"
                onClick={handleClickOpenBalance}
              >
                Purchase from Balance
              </button>
              <button className="checkout__button" onClick={handleClickOpenRP}>
                Purchase from RP
              </button>
              <div className="checkout__descriptionConfirmMessage">
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
                <p>Check items on inventory after purchase.</p>
              </div>
            </>
          )}
          {/*Dialog Box for Purchase through Balance */}
          <Dialog
            open={confirmBillOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to purchase the following items?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {cartItem.map((item) => (
                  <DialogFinalConfirm
                    id={item.id}
                    key={item.id}
                    gameIcon={item.data.gameIcon}
                    name={item.data.name}
                    image={item.data.image}
                    price={item.data.price}
                    quantity={item.data.quantity}
                  />
                ))}
              </DialogContentText>
              <div className="dialog__footer">
                <div className="dialog__footerName">Grand Total</div>
                <div className="dialog__footerAmount">
                  <NumberFormat
                    value={totalPrice()}
                    displayType="text"
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    prefix={"(Rs): "}
                    suffix={"/-"}
                  />
                </div>
              </div>
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
          {/*Dialog Box for Purchase through Reward point */}
          <Dialog
            open={confirmBillOpenRP}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to purchase the following items?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {cartItem.map((item) => (
                  <DialogFinalConfirm
                    id={item.id}
                    key={item.id}
                    gameIcon={item.data.gameIcon}
                    name={item.data.name}
                    image={item.data.image}
                    price={item.data.price}
                    quantity={item.data.quantity}
                  />
                ))}
              </DialogContentText>
              <div className="dialog__footer">
                <div className="dialog__footerName">Grand Total</div>
                <div className="dialog__footerAmount">
                  <NumberFormat
                    value={totalPrice()}
                    displayType="text"
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    prefix={"(Rs): "}
                    suffix={"/-"}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button className="button__cancel" onClick={handleClose}>
                Cancel
              </button>
              <button className="button__confirm" onClick={handleConfirmRP}>
                Confirm
              </button>
            </DialogActions>
          </Dialog>
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
          {/*No item snackbar */}
          <Snackbar
            open={noItemMessage}
            autoHideDuration={6000}
            onClose={handleCloseMessage}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert onClose={handleCloseMessage} severity="error">
              You have not selected any item!
            </Alert>
          </Snackbar>
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
          {/*Reward point low message snackbar*/}
          <Snackbar
            open={rewardLowMessage}
            autoHideDuration={6000}
            onClose={handleCloseMessage}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert onClose={handleCloseMessage} severity="error">
              Insufficient Reward point!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default Bill;

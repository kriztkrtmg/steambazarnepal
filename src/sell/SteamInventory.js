import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";

import { useDispatch } from "react-redux";
import { recharge, rewardUp } from "../features/balance/balanceSlice";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import db from "../CONFIG";

function SteamInventory({ gameIcon, name, image, price, quantity, id }) {
  const dispatch = useDispatch();

  const [sell, setSell] = useState(false); //On clicking an item, opening and closing first dialog box state.....
  const [instantSell, setInstantSell] = useState(false); //Dialog box open after clicking (Ok, Instant sell) button state...
  const [communityDialogOpen, setCommunityDialogOpen] = useState(false); //Dialog box open after clicking sell on community button..
  const instantSellRate = Number(parseFloat(price - price * 0.15).toFixed(2)); //instant Sell price
  const instantReward = Number(parseInt(price * 0.03).toFixed(2)); //instant reward point value

  const [communitySell, setCommunitySell] = useState(0); // You receive: (Seller price input) state

  const [noInputPrice, setNoInputPrice] = useState(false); // Error Snackbar open if user click (Ok, sell on community) button without putting price in You Receive Input field.
  const [itemSetOnCommunity, setItemSetOnCommunity] = useState(false); //Snackbar open after user successfully listed the item in community market.

  const communityBuyerRate =
    Number(communitySell) + Number(communitySell * 0.1); //Buyer Pays: price(10% charge)

  const communityReward = Number(parseInt(communitySell * 0.01).toFixed()); //reward point when selling in community market

  //A material-ui Lab code for snackbar (it's imported from material-ui)
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  /*1:First Dialog box function when clicking an item. */

  //1(a) Opening a dialog box
  const handleSell = () => {
    setSell(true);
  };

  //1(b) Closing a first dialog box
  const handleClose = () => {
    setSell(false);
  };

  /*2: Dialog box function when clicking (Ok, Instant sell) button. */

  //2(a) Opening a dialog box
  const handleInstant = () => {
    setInstantSell(true);
  };

  //2(b) Closing a dialog box (triggered on clicking Cancel button and outside the dialog box)
  const handleCloseInstantSell = () => {
    setInstantSell(false);
  };

  //2(c) Triggered on clicking confirm button in final confirmation dialog box of instant sell choice.
  //This will also close all dialog box...(both first and second)
  const handleInstantConfirm = () => {
    dispatch(recharge(Number(instantSellRate) || 0));
    dispatch(rewardUp(Number(instantReward) || 0));

    db.collection("sell").doc(id).delete();

    setInstantSell(false);
    setSell(false);
  };

  /*3: Dialog box function when clicking (Ok, sell on community) button. */

  //3(a) Opening a dialog box on clicking (Ok, sell on community) button.
  const handleCommunity = () => {
    //generate error snackbar if user forget to input price...
    if (communitySell === 0) {
      setNoInputPrice(true);
    } else {
      setCommunityDialogOpen(true);
    }
  };

  //3(b) Closing a error snackbar
  const handleErrorSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNoInputPrice(false);
  };

  //3(c) Closing a dialog on clicking cancel button as well as outside the dialog box
  const handleCloseCommunitySell = () => {
    setCommunityDialogOpen(false);
  };

  //3(d) Triggered on clicking confirm button in final confirmation dialog box of community sell choice.
  //This will also close all dialog box...(both first and second)
  //This will also trigger a snackbar which tells the item is listed in community market.
  const handleCommunityConfirm = () => {
    db.collection("community").doc(id).set({
      gameIcon: gameIcon,
      image: image,
      name: name,
      price: communityBuyerRate,
      quantity: 1,
    });

    setItemSetOnCommunity(true);
    setCommunityDialogOpen(false);
    setSell(false);

    //db.collection("sell").doc(id).delete();
  };

  //3(e) Closing success snackbar
  const handleSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setItemSetOnCommunity(false);
  };

  //-------------------------------------------------------------------//

  return (
    <div className="SteamInventoryCard">
      <div className="inventoryItem" onClick={handleSell}>
        <div className="inventoryItem__image">
          <img src={image} alt="" />
        </div>
        <h4>
          <NumberFormat
            value={price}
            displayType="text"
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"Rs: "}
          />
        </h4>
        <div className="inventoryItem__gameIcon">
          <img src={gameIcon} alt="" />
        </div>
      </div>
      <div className="inventoryItem__description">{name}</div>
      {/*First dialog box when clicking an item to sell */}
      <Dialog
        open={sell}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="dialog__title">
          <div className="dialog__titleArrange">
            <p>PUT AN ITEM UP FOR SALE</p>
            <CloseIcon onClick={handleClose} />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="dialog__body">
            <div className="dialog__header">
              <div className="item__photo">
                <img src={image} alt="" />
              </div>
              <div className="item__details">
                <div className="item__name">{name}</div>
                <div className="item__gameIcon">
                  <img src={gameIcon} alt="" />
                  <p>Dota2</p>
                </div>
              </div>
            </div>
            <div className="dialog__deals">
              <div className="deals__instantSell">
                <div className="instantSell__rate">
                  <h4>
                    <NumberFormat
                      value={instantSellRate}
                      displayType="text"
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      prefix={"Instant Sell This At Rs: "}
                      suffix={"/-"}
                    />
                  </h4>
                </div>

                <div className="instantSell__reward">
                  <p>
                    <NumberFormat
                      value={instantReward}
                      displayType="text"
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      prefix={"Reward Point (RP) : "}
                    />
                  </p>
                  <p>3% round off RP on instant sell.</p>
                </div>
              </div>
              <div className="deals__communitySell">
                <div className="communitySell__header">Sell on community</div>
                <div className="youReceive">
                  You Receive (Rs) :
                  <input
                    type="number"
                    value={communitySell}
                    onChange={(e) => setCommunitySell(e.target.value)}
                  />
                </div>
                <div className="buyerPays">
                  <p>
                    <NumberFormat
                      value={communityBuyerRate}
                      displayType="text"
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      prefix={"Buyer Pays (Rs) : "}
                      suffix={" /- (includes fees)"}
                    />
                  </p>
                </div>

                <div className="communitySell__reward">
                  <p>
                    <NumberFormat
                      value={communityReward}
                      displayType="text"
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      prefix={"Reward Point (RP) : "}
                    />
                  </p>
                  <p>1% round off RP on community sell.</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="dialog__action">
          <button onClick={handleInstant} color="primary">
            Ok, Instant Sell
          </button>
          <button color="primary" onClick={handleCommunity}>
            OK, Sell On Community
          </button>
        </DialogActions>
      </Dialog>

      {/*Instant sell confirmation dialog box(This dialog box opens when we clicked (ok, Instant sell) button) */}
      <Dialog
        open={instantSell}
        onClose={handleCloseInstantSell}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to instantly sell your item {name} at Rs:{" "}
          {instantSellRate}?
        </DialogTitle>
        <DialogContent>
          You will get Reward Point {instantReward}.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInstantSell} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInstantConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Community sell confirmation dialog box */}
      <Dialog
        open={communityDialogOpen}
        onClose={handleCloseCommunitySell}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to list your item {name} on community market?
        </DialogTitle>
        <DialogContent>
          <p>
            Someone from community will buy your item. Upon successful community
            transaction, you will receive :
          </p>
          <h4>Balance: {communitySell}</h4>
          <h4>Reward point (RP): {communityReward}</h4>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommunitySell} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCommunityConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/*Error snackbar if price is not set by user on community market */}
      <Snackbar
        open={noInputPrice}
        autoHideDuration={6000}
        onClose={handleErrorSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleErrorSnackbar} severity="error">
          You must put your selling price!
        </Alert>
      </Snackbar>
      {/*Success snackbar after user successfully listed item on community market */}
      <Snackbar
        open={itemSetOnCommunity}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleSuccessSnackbar} severity="success">
          Your item is listed on community market
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SteamInventory;

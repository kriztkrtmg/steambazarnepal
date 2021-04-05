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

import db from "../CONFIG";

function SteamInventory({ gameIcon, name, image, price, quantity, id }) {
  const dispatch = useDispatch();

  const [sell, setSell] = useState(false); //First Dialog box to sell item
  const [instantSell, setInstantSell] = useState(false); //Dialog box open after clicking instant sell button...

  //first Dialog box function
  const handleSell = () => {
    setSell(true);
  };

  const handleClose = () => {
    setSell(false);
  };

  const handleCloseInstantSell = () => {
    setInstantSell(false);
  };

  const handleInstant = () => {
    setInstantSell(true);
  };

  const handleInstantConfirm = () => {
    dispatch(recharge(Number(instantSellRate) || 0));
    dispatch(rewardUp(Number(instantReward) || 0));

    db.collection("sell").doc(id).delete();

    setInstantSell(false);
    setSell(false);
  };

  const instantSellRate = parseFloat(price - price * 0.15).toFixed(2); //instant Sell value
  const instantReward = parseFloat(price * 0.03).toFixed(2); //instant reward value

  const [communitySell, setCommunitySell] = useState(); // seller get price....

  const handleCommunitySell = (e) => {
    e.preventDefault();
    setCommunitySell(e.target.value);
  };

  const communityBuyerRate =
    Number(communitySell) + Number(communitySell * 0.1);
  //Community Buyer rate
  const communityReward = parseFloat(communitySell * 0.01).toFixed(2); //community reward

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
                  <p>3% reward point on instant sell.</p>
                </div>
              </div>
              <div className="deals__communitySell">
                <div className="communitySell__header">Sell on community</div>
                <div className="youReceive">
                  You Receive (Rs) :
                  <input
                    type="number"
                    value={communitySell}
                    onChange={handleCommunitySell}
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
                  <p>1% reward point on community sell.</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="dialog__action">
          <button onClick={handleInstant} color="primary">
            Ok, Install Sell
          </button>
          <button color="primary">OK, Sell On Community</button>
        </DialogActions>
      </Dialog>
      {/*Instant sell confirmation dialog box */}
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
    </div>
  );
}

export default SteamInventory;

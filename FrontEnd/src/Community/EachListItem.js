import React, { useState } from "react";

import { notificationCount } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

import NumberFormat from "react-number-format";
import firebase from "firebase";

//Material-UI imports
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//Database import
import db from "../CONFIG";

function EachListItem({
  id,
  image,
  name,
  rarity,
  type,
  time,
  sellPrice,
  getPrice,
}) {
  const dispatch = useDispatch();
  const [openRemove, setOpenRemove] = useState(false); // Asking user to remove item dialog box
  const [itemRemovedFromCommunity, setItemRemovedFromCommunity] =
    useState(false); //Snackbar after user removed item from community active listing...

  //A material-ui Lab code for snackbar (it's imported from material-ui)
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleRemove = () => {
    setOpenRemove(true);
  };

  const handleRemoveClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenRemove(false);
    setItemRemovedFromCommunity(false);
  };

  const handleRemoveConfirm = () => {
    db.collection("inventory").doc(id).set({
      name: name,
      image: image,
      rarity: rarity,
      type: type,
    });

    dispatch(notificationCount());

    db.collection("notification").add({
      message: `You have removed your ${name} from community market listing. Item is moved to website inventory`,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      image:
        "https://pics.freeicons.io/uploads/icons/png/6395404811578889014-512.png",
    });

    db.collection("listing").doc(id).delete();

    setOpenRemove(false);
    setItemRemovedFromCommunity(true);
  };

  return (
    <div className="listing__item">
      <div className="listing__itemTop">
        <img src={image} alt="" />
        <div className="listing__itemName">{name}</div>
        <div className="listing__itemRarity">
          {rarity} {type}
        </div>
      </div>
      <div className="listing__date">
        Listed On: {new Date(time?.toDate()).toLocaleDateString()}
      </div>

      <div className="listing__price">
        <p>
          <NumberFormat
            value={sellPrice}
            displayType="text"
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"Rs:"}
            suffix={"/-"}
          />
        </p>
        <h5>
          <NumberFormat
            value={getPrice}
            displayType="text"
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"(Rs:"}
            suffix={"/-)"}
          />
        </h5>
      </div>
      <button className="listing__remove" onClick={handleRemove}>
        Remove
      </button>
      <Dialog
        open={openRemove}
        onClose={handleRemoveClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="dialog__title">
          Are you sure you want to remove your {name} from community market
          listing?
        </DialogTitle>
        <DialogContent>
          <div style={{ color: "#61c9ce" }}>
            <h4>Your item will be moved to website inventory.</h4>
          </div>
        </DialogContent>
        <DialogActions className="dialog__action">
          <button onClick={handleRemoveClose}>Cancel</button>
          <button onClick={handleRemoveConfirm}>Confirm</button>
        </DialogActions>
      </Dialog>
      {/*Success snackbar after user successfully removed item from community market */}
      <Snackbar
        open={itemRemovedFromCommunity}
        autoHideDuration={6000}
        onClose={handleRemoveClose}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <Alert onClose={handleRemoveClose} severity="success">
          Your item is moved to website inventory
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EachListItem;

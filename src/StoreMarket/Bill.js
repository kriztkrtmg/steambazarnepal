import React from "react";
import "./buysection.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NumberFormat from "react-number-format";

function Bill({ cartItem, getTotalPrice, getCount }) {
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
              value={0}
              displayType="text"
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
            />
          </p>
          <p>
            Total price (Rs):
            <NumberFormat
              className="checkout__number"
              value={0}
              displayType="text"
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              suffix={"/-"}
            />
          </p>
        </div>
        <div className="checkout__descriptionConfirm">
          <button className="checkout__button">Purchase</button>
          <p>Check items on inventory after purchase.</p>
        </div>
      </div>
    </div>
  );
}

export default Bill;

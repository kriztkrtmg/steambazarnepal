import React from "react";
import "./dialog.css";
import NumberFormat from "react-number-format";

function DialogFinalConfirm({
  id,
  key,
  gameIcon,
  name,
  image,
  price,
  quantity,
}) {
  return (
    <div className="dialog__box">
      <div className="dialog__product">
        <div className="dialog__productName">{name}</div>
        <div className="dialog__productDetails">
          <div className="dialog__productQuantity">
            <div>Quantity :</div>
            <div>{quantity}</div>
          </div>
          <div className="dialog__productRate">
            <div>Rate :</div>
            <NumberFormat
              value={price}
              displayType="text"
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
            />
          </div>
          <div className="dialog__productAmount">
            <div>Amount :</div>
            <NumberFormat
              value={quantity * price}
              displayType="text"
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogFinalConfirm;

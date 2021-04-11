import React from "react";
import NumberFormat from "react-number-format";

function CommunityProduct({ name, quantity, price, gameIcon, image }) {
  return (
    <div className="community__product">
      <div className="community__productImgTitle">
        <div className="community__productImage">
          <img src={image} alt="" />
        </div>
        <div className="community__productTitle">
          <h4>{name}</h4>
          <p>Dota 2</p>
        </div>
      </div>
      <div className="community__productQuantity">{quantity}</div>
      <div className="community__productPrice">
        <h4>Starting at:</h4>
        <p>
          <NumberFormat
            value={price}
            displayType="text"
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"Rs: "}
          />
        </p>
      </div>
    </div>
  );
}

export default CommunityProduct;

import React, { useState } from "react";

import NumberFormat from "react-number-format";

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
  const [openRemove, setOpenRemove] = useState(false); // Asking user to remove item dialog box

  const handleRemove = () => {
    setOpenRemove(true);
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
    </div>
  );
}

export default EachListItem;

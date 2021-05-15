import React from "react";
import { Link } from "react-router-dom";

//Redux and slices
import { useDispatch } from "react-redux";
import {
  loadImage,
  loadType,
  loadRarity,
  loadGameName,
  loadHeroName,
  loadGameIcon,
} from "../features/product/productSlice";

//Other imports
import NumberFormat from "react-number-format";

function CommunityProduct({
  name,
  quantity,
  price,
  gameIcon,
  image,
  gameName,
  hero,
  type,
  quality,
  rarity,
}) {
  const dispatch = useDispatch();

  //This will be changed later...Now this is just to send some data to redux and render the selected item after clicking an item from community market------
  const sendImage = () => {
    dispatch(loadImage(image));
    dispatch(loadType(type));
    dispatch(loadRarity(rarity));
    dispatch(loadGameName(gameName));
    dispatch(loadHeroName(hero));
    dispatch(loadGameIcon(gameIcon));
  };
  return (
    <Link to={`/community/${name}`} className="link__to" onClick={sendImage}>
      <div className="community__product">
        <div className="community__productImage">
          <img src={image} alt="" />
          <div className="community__productQuantity">
            Quantity : {quantity}
          </div>
          <div className="product__gameIcon">
            <img src={gameIcon} alt="" />
          </div>
        </div>
        <div className="community__productTitle">
          <h4>{name}</h4>

          <div className="community__productPrice">
            <p>
              <NumberFormat
                value={price}
                displayType="text"
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                prefix={"Starting at (Rs) : "}
                suffix={" /-"}
              />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CommunityProduct;

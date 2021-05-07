import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../CONFIG";
import "./communitySelectItem.css";
import CommunityEachProduct from "./CommunityEachProduct";
import Pagination from "@material-ui/lab/Pagination";

import {
  selectImage,
  selectGame,
  selectHero,
  selectType,
  selectRarity,
  selectGameIcon,
} from "../features/product/productSlice";
import { useSelector } from "react-redux";

function CommunitySelectItem() {
  const image = useSelector(selectImage);
  const gameName = useSelector(selectGame);
  const hero = useSelector(selectHero);
  const type = useSelector(selectType);
  const rarity = useSelector(selectRarity);
  const gameIcon = useSelector(selectGameIcon);
  const { name } = useParams();
  const [itemFetch, setItemFetch] = useState([]);

  /*--------------Pagination---------------*/

  //total number of items in community
  const totalItem = itemFetch.length;

  const [currentPage, setCurrentPage] = useState(1); //Current page of pagination
  const itemPerPage = Number(5); //Number of items in each page

  //Get current items:
  const indexOfLastItem = currentPage * itemPerPage; //get index of last item of every page...
  const indexOfFirstItem = indexOfLastItem - itemPerPage; //index of first item of every page...
  const currentPost = itemFetch.slice(indexOfFirstItem, indexOfLastItem);

  //total pagination pages
  const noOfPage = Number(parseInt(totalItem / itemPerPage)) + Number(1);

  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    db.collection("community")
      .where("name", "==", name)
      .orderBy("price", "asc")
      .onSnapshot((snapshot) =>
        setItemFetch(
          snapshot.docs.map((item) => ({
            id: item.id,
            data: item.data(),
          }))
        )
      );
  }, [name]);

  let result = indexOfLastItem;
  if (indexOfLastItem >= totalItem) {
    result = totalItem;
  } else {
    result = indexOfLastItem;
  }

  return (
    <div className="itemContainer">
      <div className="item__allDetails">
        <div className="item__image">
          <img src={image} alt="" />
        </div>
        <div className="item__description">
          <div className="item__name">
            <h2>{name}</h2>
          </div>
          <div className="item__game">
            <div className="game__logo">
              <img src={gameIcon} alt="" />
            </div>
            <div className="game__title">
              <h5>{gameName}</h5>
              <h5>
                {rarity} {type}
              </h5>
            </div>
          </div>
          <div className="hero__name">Used by : {hero}</div>
        </div>
      </div>
      <div className="item__lists">
        {currentPost.map((item) => (
          <CommunityEachProduct
            id={item.id}
            name={item.data.name}
            price={item.data.price}
            gameIcon={item.data.gameIcon}
            image={item.data.image}
            hero={item.data.hero}
            quality={item.data.quality}
            gameName={item.data.gameName}
            rarity={item.data.rarity}
            type={item.data.type}
          />
        ))}
      </div>

      <div className="community__pagination">
        <div className="pagination__results">
          Showing {indexOfFirstItem + 1}-{result} of {totalItem} results
        </div>
        <div className="pagination__jump">
          <Pagination
            count={noOfPage}
            defaultPage={currentPage}
            boundaryCount={2}
            size="small"
            onChange={handlePagination}
          />
        </div>
      </div>
    </div>
  );
}

export default CommunitySelectItem;

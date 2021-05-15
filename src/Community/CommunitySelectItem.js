import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Import redux and slices
import {
  selectImage,
  selectGame,
  selectHero,
  selectType,
  selectRarity,
  selectGameIcon,
} from "../features/product/productSlice";
import { useSelector } from "react-redux";

//Import database
import db from "../CONFIG";

//Css import
import "./communitySelectItem.css";

//Import components
import CommunityEachProduct from "./CommunityEachProduct";

//Import material-UI
import Pagination from "@material-ui/lab/Pagination";

function CommunitySelectItem() {
  const image = useSelector(selectImage); //Get image
  const gameName = useSelector(selectGame); //Get item name
  const hero = useSelector(selectHero); //Get hero name
  const type = useSelector(selectType); //Get item type
  const rarity = useSelector(selectRarity); //Get item rarity
  const gameIcon = useSelector(selectGameIcon); //Get game icon
  const { name } = useParams(); //Dynamic routing params
  const [itemFetch, setItemFetch] = useState([]); // Get all item of same name------

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

  //Pagination function----
  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };

  //Used in pagination result sentence
  let result = indexOfLastItem;
  if (indexOfLastItem >= totalItem) {
    result = totalItem;
  } else {
    result = indexOfLastItem;
  }

  //Use effect hook----------------------------------
  //Here it loads all the item from same name in an ascending order---------------
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

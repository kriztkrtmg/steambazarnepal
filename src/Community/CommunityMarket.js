import React, { useEffect, useState } from "react";

//Redux and slices
import { useDispatch } from "react-redux";
import { loadGameName } from "../features/product/productSlice";

//Material imports
import Pagination from "@material-ui/lab/Pagination";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import SearchIcon from "@material-ui/icons/Search";

//Css import
import "./community.css";

//Component import
import CommunityProduct from "./CommunityProduct";

//Database Import
import db from "../CONFIG";

function CommunityMarket() {
  const dispatch = useDispatch();

  const [community, setcommunity] = useState([]); //loads item with number of quantity
  const [priceSort, setPriceSort] = useState(false); //Sort price useState
  const [quantitySort, setQuantitySort] = useState(false); //Sort quantity useState

  /*--------------Pagination---------------*/
  const totalItem = community.length; //total number of items in community
  const [currentPage, setCurrentPage] = useState(1); //Current page of pagination
  const itemPerPage = Number(10); //Number of items in each page

  //Get current items:
  const indexOfLastItem = currentPage * itemPerPage; //get index of last item of every page...
  const indexOfFirstItem = indexOfLastItem - itemPerPage; //index of first item of every page...
  const currentPost = community.slice(indexOfFirstItem, indexOfLastItem); //Render only specific part of array

  //total pagination pages
  const noOfPage = Number(parseInt(totalItem / itemPerPage)) + Number(1);

  //Pagination extra----to render a result line-------------
  let result = indexOfLastItem;
  if (indexOfLastItem >= totalItem) {
    result = totalItem;
  } else {
    result = indexOfLastItem;
  }
  //End of pagination----------------------------------------------------------------------------------

  //Use effect hook----------------------------------------------------------
  useEffect(() => {
    db.collection("community").onSnapshot((snapshot) =>
      setcommunity(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  //Filter by game----------------
  //Dota2
  const handleDota2 = () => {
    dispatch(loadGameName("Dota 2"));
    db.collection("community")
      .where("gameName", "==", "Dota 2")
      .onSnapshot((snapshot) =>
        setcommunity(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };
  //Csgo
  const handleCsgo = () => {
    dispatch(loadGameName("Counter-Strike: Global Offensive"));
    db.collection("community")
      .where("gameName", "==", "Counter-Strike: Global Offensive")
      .onSnapshot((snapshot) =>
        setcommunity(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  //sorting price (ascending and descending both)
  const sortPrice = () => {
    setPriceSort(!priceSort);

    priceSort
      ? community.sort((first, second) => {
          return first.data.price - second.data.price;
        })
      : community.sort((first, second) => {
          return second.data.price - first.data.price;
        });
  };
  //Same function as price sorting....currently it does price sort....later on we just change price with quantity in function return part..
  const sortQuantity = () => {
    setQuantitySort(!quantitySort);

    quantitySort
      ? community.sort((first, second) => {
          return first.data.price - second.data.price;
        })
      : community.sort((first, second) => {
          return second.data.price - first.data.price;
        });
  };

  //Pagination function---clicking different page and showing up the items---
  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="community">
      <div className="community__topBar">
        <h1>Community Market</h1>
        <p>
          Buy and sell items with community members for Balance and Reward
          Points.
        </p>
      </div>
      <div className="community__body">
        <div className="community__navbar">
          <div className="community__navbarLeft">
            <div
              className="community__navbarLeftGameFilter"
              onClick={handleDota2}
            >
              <img
                src="https://1.bp.blogspot.com/-GplgZlvkXSc/Uk_3BipvAlI/AAAAAAAAAJE/NIU9Sm2vSVU/s1600/Dota2-Filled.png"
                alt=""
              />
              <div className="gameTitle">Dota2</div>
            </div>
            <div
              className="community__navbarLeftGameFilter"
              onClick={handleCsgo}
            >
              <img
                src="https://www.meme-arsenal.com/memes/d81f1fc73c38e2cfacbd493b5d58509c.jpg"
                alt=""
              />
              <div className="gameTitle">CSGO</div>
            </div>
            <div className="filterPriceQuantity">
              <div className="filterByPrice" onClick={sortPrice}>
                <p>Price</p>
                {priceSort ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </div>
              <div className="filterByPrice" onClick={sortQuantity}>
                <p>Quantity</p>
                {quantitySort ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </div>
            </div>
          </div>
          <div className="community__navbarRight">
            <div className="searchBox">
              <input placeholder="search item" />
            </div>
            <div className="search__icon">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="community__data">
          <div className="community__itemsContainer">
            {currentPost.map((item) => (
              <CommunityProduct
                id={item.id}
                key={item.id}
                gameIcon={item.data.gameIcon}
                name={item.data.name}
                price={item.data.price}
                image={item.data.image}
                quantity={item.data.quantity}
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
                size="small"
                onChange={handlePagination}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityMarket;

import React, { useEffect, useState } from "react";
import "./community.css";
import SearchIcon from "@material-ui/icons/Search";
import CommunityProduct from "./CommunityProduct";
import Pagination from "@material-ui/lab/Pagination";

import { useDispatch } from "react-redux";
import { loadGameName } from "../features/product/productSlice";

import db from "../CONFIG";

function CommunityMarket() {
  const [community, setcommunity] = useState([]); //loads item with number of quantity
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

  /*--------------Pagination---------------*/

  //total number of items in community
  const totalItem = community.length;
  const [sort, setSort] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); //Current page of pagination
  const itemPerPage = Number(10); //Number of items in each page

  //Get current items:
  const indexOfLastItem = currentPage * itemPerPage; //get index of last item of every page...
  const indexOfFirstItem = indexOfLastItem - itemPerPage; //index of first item of every page...
  const currentPost = community.slice(indexOfFirstItem, indexOfLastItem);

  const dispatch = useDispatch();

  //total pagination pages
  const noOfPage = Number(parseInt(totalItem / itemPerPage)) + Number(1);

  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };

  //sorting price (ascending and descending both)

  const sortPrice = () => {
    setSort(!sort);

    sort
      ? community.sort((first, second) => {
          return first.data.price - second.data.price;
        })
      : community.sort((first, second) => {
          return second.data.price - first.data.price;
        });
  };

  let result = indexOfLastItem;
  if (indexOfLastItem >= totalItem) {
    result = totalItem;
  } else {
    result = indexOfLastItem;
  }

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
        <div className="community__filter">
          <div className="community__search">
            <div className="community__searchTitle">Search for Items</div>
            <div className="community__searchInput">
              <input type="text" placeholder="Search" />
              <SearchIcon />
            </div>
          </div>
          <div className="filter__option">
            <div className="community__searchTitle">Sort By</div>
            <div className="filter__byGame">
              <div className="filter__gameLogo" onClick={handleDota2}>
                <img
                  src="https://1.bp.blogspot.com/-GplgZlvkXSc/Uk_3BipvAlI/AAAAAAAAAJE/NIU9Sm2vSVU/s1600/Dota2-Filled.png"
                  alt=""
                />
              </div>
              <div className="filter__gameLogo" onClick={handleCsgo}>
                <img
                  src="https://www.meme-arsenal.com/memes/d81f1fc73c38e2cfacbd493b5d58509c.jpg"
                  alt=""
                />
              </div>
              {/*Rust Logo
              <div className="filter__gameLogo">
                <img src="https://i.imgur.com/znQvBMih.jpg" alt="" />
              </div>
              */}
            </div>

            <div className="filter__byData">
              <button onClick={sortPrice}>Price</button>
              <button>Quantity</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityMarket;

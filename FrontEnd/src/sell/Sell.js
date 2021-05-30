import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

//Css import
import "./sell.css";

//Database import
import db from "../CONFIG";

//Component Imports
import SteamInventory from "./SteamInventory";

//Import Material-UI
import SearchIcon from "@material-ui/icons/Search";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Pagination from "@material-ui/lab/Pagination";

function Sell() {
  const [sellItem, setSellItem] = useState([]); //Load all the steam inventory items(currently loads demo items)
  const [sort, setSort] = useState(false); //Price sorting
  const user = useSelector(selectUser);
  /*----------Pagination-----------------*/
  const [currentPage, setCurrentPage] = useState(1); //Current page of pagination
  const itemPerPage = Number(10); //Number of items in each page
  const totalItem = sellItem.length;
  //Get current items:
  const indexOfLastItem = currentPage * itemPerPage; //get index of last item of every page...
  const indexOfFirstItem = indexOfLastItem - itemPerPage; //index of first item of every page...
  const currentPost = sellItem.slice(indexOfFirstItem, indexOfLastItem);
  //total pagination pages
  const noOfPage = Number(parseInt(totalItem / itemPerPage)) + Number(1);
  /*---------------End of pagination-------------------*/

  /*----------------Functions------------------------------------------------------*/
  //Use effect hook------loads dota2 game item as default(later it will use AppID of 570 and 730 for csgo)
  useEffect(() => {
    db.collection("sell")
      .where("gameName", "==", "Dota 2")
      .onSnapshot((snapshot) =>
        setSellItem(
          snapshot.docs.map((item) => ({
            id: item.id,
            data: item.data(),
          }))
        )
      );
  }, []);

  //Price sorting
  const sortPrice = () => {
    setSort(!sort);
    sort
      ? sellItem.sort((first, second) => {
          return first.data.price - second.data.price;
        })
      : sellItem.sort((first, second) => {
          return second.data.price - first.data.price;
        });
  };

  //Sort game item
  //Dota2
  const handleDota2 = () => {
    setCurrentPage(1);
    db.collection("sell")
      .where("gameName", "==", "Dota 2")
      .onSnapshot((snapshot) =>
        setSellItem(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  //Csgo
  const handleCsgo = () => {
    setCurrentPage(1);
    db.collection("sell")
      .where("gameName", "==", "Counter-Strike: Global Offensive")
      .onSnapshot((snapshot) =>
        setSellItem(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  //Pagination function
  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };

  //Extra work of pagination for a sentence render
  let result = indexOfLastItem;
  if (indexOfLastItem >= totalItem) {
    result = totalItem;
  } else {
    result = indexOfLastItem;
  }

  //End of imports and functions-----------------------------------

  return (
    <>
      {!user ? (
        <div
          style={{
            height: "100vh",
            backgroundColor: "#181230",
            color: "#61c9ce",
            textAlign: "center",
          }}
        >
          <h1>You need to login to sell your item from steam inventory</h1>
        </div>
      ) : (
        <div className="sell">
          <div className="sellHeader">
            <div className="sellHeader__left">
              <StoreRoundedIcon />
              <p>Steam Inventory</p>
            </div>

            <div className="sellHeader__center">
              <div className="filter__byGame" onClick={handleDota2}>
                <img
                  src="https://1.bp.blogspot.com/-GplgZlvkXSc/Uk_3BipvAlI/AAAAAAAAAJE/NIU9Sm2vSVU/s1600/Dota2-Filled.png"
                  alt=""
                />
                <div className="gameTitle">Dota2</div>
              </div>
              <div className="filter__byGame" onClick={handleCsgo}>
                <img
                  src="https://www.meme-arsenal.com/memes/d81f1fc73c38e2cfacbd493b5d58509c.jpg"
                  alt=""
                />
                <div className="gameTitle">CSGO</div>
              </div>
              <div className="filter__byPrice" onClick={sortPrice}>
                <p>Price</p>
                {sort ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </div>
            </div>

            <div className="sellHeader__right">
              <div className="search__box">
                <input placeholder="search item" />
              </div>
              <div className="search__icon">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div className="steamInventory__itemContainer">
            {currentPost.map((item) => (
              <SteamInventory
                id={item.id}
                key={item.id}
                gameIcon={item.data.gameIcon}
                name={item.data.name}
                image={item.data.image}
                price={item.data.price}
                quantity={item.data.quantity}
                hero={item.data.hero}
                quality={item.data.quality}
                gameName={item.data.gameName}
                type={item.data.type}
                rarity={item.data.rarity}
              />
            ))}
          </div>
          <div className="sell__pagination">
            <div className="sell__paginationResult">
              Showing {indexOfFirstItem + 1}-{result} of {totalItem} items
            </div>
            <Pagination
              count={noOfPage}
              page={currentPage}
              size="small"
              onChange={handlePagination}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Sell;

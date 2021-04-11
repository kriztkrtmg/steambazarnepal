import React, { useEffect, useState } from "react";
import "./community.css";
import SearchIcon from "@material-ui/icons/Search";
import CommunityProduct from "./CommunityProduct";
import Pagination from "@material-ui/lab/Pagination";

import db from "../CONFIG";

function CommunityMarket() {
  const [communityProduct, setCommunityProduct] = useState([]);

  useEffect(() => {
    db.collection("community").onSnapshot((snapshot) =>
      setCommunityProduct(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  /*--------------Pagination---------------*/

  //total number of items in community
  const totalItem = communityProduct.length;
  const [sort, setSort] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); //Current page of pagination
  const itemPerPage = Number(5); //Number of items in each page

  //Get current items:
  const indexOfLastItem = currentPage * itemPerPage; //get index of last item of every page...
  const indexOfFirstItem = indexOfLastItem - itemPerPage; //index of first item of every page...
  const currentPost = communityProduct.slice(indexOfFirstItem, indexOfLastItem);

  //total pagination pages
  const noOfPage = Number(parseInt(totalItem / itemPerPage)) + Number(1);

  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };

  //sorting price (ascending and descending both)
  const sortPrice = () => {
    setSort(!sort);

    sort
      ? db
          .collection("community")
          .orderBy("price", "asc")
          .onSnapshot((snapshot) =>
            setCommunityProduct(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          )
      : db
          .collection("community")
          .orderBy("price", "desc")
          .onSnapshot((snapshot) =>
            setCommunityProduct(
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
          <div className="community__header">
            <div className="name">Name</div>
            <div className="quantity">Quantity</div>
            <div className="price" onClick={sortPrice}>
              Price
            </div>
          </div>
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
              />
            ))}
          </div>
          <div className="community__pagination">
            <div className="pagination__results">
              Showing {indexOfFirstItem + 1}-{indexOfLastItem} of {totalItem}{" "}
              results
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
        <div className="community__search">
          <div className="community__searchTitle">Search for items</div>
          <div className="community__searchInput">
            <input type="text" placeholder="Search" />
            <SearchIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityMarket;

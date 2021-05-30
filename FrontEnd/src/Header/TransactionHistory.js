import React, { useEffect, useState } from "react";

import TransactionDetail from "./TransactionDetail";

import db from "../CONFIG";
import "./transactionHistory.css";

function TransactionHistory() {
  const [transactionData, setTransactionData] = useState([]); //store all transaction history data

  /*--------------Pagination---------------*/
  const [currentPage, setCurrentPage] = useState(1); //Current page
  const itemPerPage = Number(50); //Number of extra item load on each click

  //Get current items:
  const indexOfLastItem = currentPage * itemPerPage; //get index of last item of every page...

  //index of first item of every page...we need first transaction item always...
  const indexOfFirstItem = 0; //If we need middle part of page then 0 will be replaced by indexOfLastItem-itemPerPage...

  const currentPost = transactionData.slice(indexOfFirstItem, indexOfLastItem); //Render only specific part of array

  const totalItem = transactionData.length;
  const totalItemPagination = currentPost.length;

  const handlePagination = (event) => {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    db.collection("transaction")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) =>
        setTransactionData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="transaction__body">
      <div className="transaction__header">
        <div className="transaction__headerDate">Date</div>
        <div className="transaction__headerDescription">Description</div>
        <div className="transaction__headerChange">
          <div className="transaction__change">Change</div>
          <div className="transaction__changeRB">
            <div className="transaction__changeRP">RP</div>
            <div className="transaction__changeBalance">Balance</div>
          </div>
        </div>
        <div className="transaction__headerWallet">
          <div className="transaction__wallet">Wallet</div>
          <div className="transaction__walletRB">
            <div className="transaction__walletRP">RP</div>
            <div className="transaction__walletBalance">Balance</div>
          </div>
        </div>
      </div>
      <div className="transaction__history">
        {currentPost.map((item) => (
          <TransactionDetail
            id={item.id}
            key={item.id}
            date={item.data.date}
            message={item.data.message}
            signRP={item.data.signRP}
            costRP={item.data.costRP}
            signBalance={item.data.signBalance}
            costBalance={item.data.costBalance}
            walletRP={item.data.walletRP}
            walletBalance={item.data.walletBalance}
          />
        ))}
        <div className="transaction__pagination">
          {totalItem !== totalItemPagination && (
            <button className="transaction__btn" onClick={handlePagination}>
              Load More Transaction
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;

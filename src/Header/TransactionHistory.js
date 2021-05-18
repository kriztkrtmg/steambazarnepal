import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionDetail from "./TransactionDetail";

import db from "../CONFIG";

function TransactionHistory() {
  const [transactionData, setTransactionData] = useState([]); //store all transaction history data

  /*--------------Pagination---------------*/
  const [currentPage, setCurrentPage] = useState(1); //Current page
  const itemPerPage = Number(10); //Number of extra item load on each click

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
    <React.Fragment>
      <div>
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
      </div>
      <TransactionPagination>
        {totalItem !== totalItemPagination && (
          <ButtonTransaction onClick={handlePagination}>
            Load More Transaction
          </ButtonTransaction>
        )}
      </TransactionPagination>
    </React.Fragment>
  );
}

export default TransactionHistory;

const TransactionPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonTransaction = styled.button`
  position: relative;
  height: 40px;
  background-color: #0d0c1b;
  color: #61c9ce;
  border: none;
  cursor: pointer;
  outline-width: 0;
  padding: 10px;
  border-radius: 5px;

  :hover {
    background-color: #1a4055;
  }
`;

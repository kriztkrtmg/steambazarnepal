import React, { useEffect, useState } from "react";
import TransactionDetail from "./TransactionDetail";

import db from "../CONFIG";

function TransactionHistory() {
  const [transactionData, setTransactionData] = useState([]); //store all transaction history data

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
    <div>
      {transactionData.map((item) => (
        <TransactionDetail
          id={item.id}
          key={item.id}
          date={item.data.date}
          message={item.data.message}
          signRP={item.data.signRP}
          costRP={item.data.costRP}
          signBalance={item.data.signBalance}
          costBalance={item.data.costBalance}
        />
      ))}
    </div>
  );
}

export default TransactionHistory;

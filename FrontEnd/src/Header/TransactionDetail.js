import React from "react";
import "./transactionDetail.css";
import NumberFormat from "react-number-format";

function TransactionDetail({
  date,
  message,
  costRP,
  costBalance,
  signRP,
  signBalance,
  walletRP,
  walletBalance,
}) {
  return (
    <div>
      <div className="transaction__historyDetail">
        <div className="transaction__historyDate">
          {new Date(date?.toDate()).toLocaleDateString()}
        </div>
        <div className="transaction__historyDescription">{message}</div>
        <div className="transaction__costRP">
          <NumberFormat
            value={costRP}
            displayType="text"
            prefix={`${signRP ? "+" : "-"}`}
          />
        </div>
        <div className="transaction__costBalance">
          <NumberFormat
            value={costBalance}
            displayType="text"
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={`${signBalance ? "+" : "-"}Rs: `}
            suffix={" /-"}
          />
        </div>
        <div className="transaction__remainingRP">
          <NumberFormat value={walletRP} displayType="text" />
        </div>
        <div className="transaction__remainingBalance">
          <NumberFormat
            value={walletBalance}
            displayType="text"
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"Rs: "}
            suffix={" /-"}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionDetail;

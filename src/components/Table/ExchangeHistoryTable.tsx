import React from 'react';
import moment from "moment";
import { ExchangeRateHistory } from "../../types";

interface ExchangeHistoryTableProps {
  exchangeHistory: ExchangeRateHistory[];
}

const ExchangeHistoryTable: React.FC<ExchangeHistoryTableProps> = ({
  exchangeHistory,
}) => {
  return (
    <table className="exchange-history-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Exchange rate</th>
        </tr>
      </thead>
      <tbody>
        {exchangeHistory.map(({ rate, date }, index) => (
          <tr key={index}>
            <td>{moment(date).format("DD/MM/YYYY")}</td>
            <td>{rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExchangeHistoryTable;

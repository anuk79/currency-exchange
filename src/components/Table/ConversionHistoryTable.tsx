import React from "react";
import { CurrencyExchangeHistory } from "../../types";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import "./table.scss";

interface TableProps {
  data: CurrencyExchangeHistory[];
  onView: (
    from: string,
    to: string,
    amount: number,
    convertedAmount: number,
    exchangeRate: number
  ) => void;
  onDelete: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ data, onView, onDelete }) => {
  return (
    <table className="conversion-history-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Event</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({ id, date, from, to, amount, convertedAmount, exchangeRate }) => (
            <tr key={id}>
              <td>{moment(date).format("DD/MM/YYYY [@] HH:mm")}</td>
              <td>{`Converted an amount of ${amount} from ${from} to ${to}`}</td>
              <td>
                <div className="table-btn-container">
                  <button
                    className="view-btn"
                    onClick={() =>
                      onView(from, to, amount, convertedAmount, exchangeRate)
                    }
                  >
                    <RemoveRedEyeIcon />
                    <span>View</span>
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(id)}>
                    <DeleteForeverIcon />
                    <span>Delete from History</span>
                  </button>
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;

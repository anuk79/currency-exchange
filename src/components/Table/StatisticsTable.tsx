import React from 'react';
import { Statistics } from "../../types";

interface StatisticsTableProps {
  statistics: Statistics;
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ statistics }) => {
  return (
    <table className="statistics-table">
      <thead>
        <tr>
          <th>Statistics</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(statistics).map((key, index) => (
          <tr key={index}>
            <td>{key}</td>
            <td>{statistics[key].toFixed(6)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatisticsTable;

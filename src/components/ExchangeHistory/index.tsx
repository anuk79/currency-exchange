import React, { useState, useEffect } from "react";
import { ExchangeRateHistory } from "../../types";
import { getHistoricalExchangeRate } from "../../utils/data";
import {
  DURATION_SELECT_OPTIONS,
  TABLE_VIEW,
  CHART_VIEW,
} from "../../utils/constants";
import {
  getDateNDaysAgo,
  getDateString,
  getStatistics,
} from "../../utils/helpers";
import Dropdown from "../Common/Dropdown";
import Radio from "../Common/Radio";
import Chart from "../Chart";
import ExchangeHistoryTable from "../Table/ExchangeHistoryTable";
import StatisticsTable from "../Table/StatisticsTable";
import "./exchangeHistory.scss";

type ViewType = typeof TABLE_VIEW | typeof CHART_VIEW;

interface ExchangeHistoryProps {
  baseCurrencyCode: string;
  toCurrencyCode: string;
  exchangeRate: number;
}

const ExchangeHistory: React.FC<ExchangeHistoryProps> = ({
  baseCurrencyCode,
  toCurrencyCode,
  exchangeRate,
}) => {
  const [exchangeHistory, setExchangeHistory] = useState(
    [] as ExchangeRateHistory[]
  );
  const [duration, setDuration] = useState(DURATION_SELECT_OPTIONS[0]);
  const [viewType, setViewType] = useState<ViewType>(TABLE_VIEW);

  useEffect(() => {
    const endDate = getDateString(new Date());
    const startDate = getDateString(getDateNDaysAgo(duration.value - 1));
    getHistoricalExchangeRate(
      startDate,
      endDate,
      baseCurrencyCode,
      toCurrencyCode
    ).then((data) => {
      const result = Object.keys(data).map((key) => ({
        date: key,
        rate: data[key][toCurrencyCode] as number,
      }));
      setExchangeHistory(result);
    });
  }, [exchangeRate, duration]);

  const updateDuration = (value: number | string) => {
    setDuration(
      DURATION_SELECT_OPTIONS.filter((option) => option.value == value)[0]
    );
  };
  const statistics = getStatistics(exchangeHistory);

  return (
    <section className="exchange-history-container">
      <h3>Exchange History</h3>
      <form>
        <Dropdown
          label="Duration"
          options={DURATION_SELECT_OPTIONS}
          value={duration.value}
          onSelect={updateDuration}
        />
        <div className="view-options">
          <Radio
            value={TABLE_VIEW}
            label="Table"
            checked={viewType === TABLE_VIEW}
            onChange={() => setViewType(TABLE_VIEW)}
          />
          <Radio
            value={CHART_VIEW}
            label="Chart"
            checked={viewType === CHART_VIEW}
            onChange={() => setViewType(CHART_VIEW)}
          />
        </div>
      </form>

      {viewType === TABLE_VIEW ? (
        <div className="exchange-table-container">
          <ExchangeHistoryTable exchangeHistory={exchangeHistory} />
          <StatisticsTable statistics={statistics} />
        </div>
      ) : (
        <div className="exchange-chart-container">
          <Chart
            data={exchangeHistory.map((h) => h.rate)}
            label="Date VS Exchange Rate"
          />
          <Chart data={Object.values(statistics)} label="Date VS Statistics" />
        </div>
      )}
    </section>
  );
};

export default ExchangeHistory;

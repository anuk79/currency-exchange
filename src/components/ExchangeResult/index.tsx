import React from "react";
import { Currency } from "../../types";
import "./exchangeResult.scss";

interface ExchangeResultProps {
  to: Currency;
  from: Currency;
  exchangeRate: number;
}

const ExchangeResult: React.FC<ExchangeResultProps> = ({
  to,
  from,
  exchangeRate,
}) => {
  return (
    <section className="exchange-result-container">
      <div className="exchange-result">
        <span>{`${from.rate} ${from.name}`}</span>
        <span>=</span>
        <span>{`${to.rate} ${to.name}`}</span>
      </div>
      <div className="exchange-info">
        <div>
          <span>{`1 ${from.name}`}</span>
          <span>=</span>
          <span>{`${exchangeRate} ${to.name}`}</span>
        </div>
        <div>
          <span>{`1 ${to.name}`}</span>
          <span>=</span>
          <span>{`${(1 / exchangeRate).toFixed(6)} ${from.name}`}</span>
        </div>
      </div>
    </section>
  );
};

export default ExchangeResult;

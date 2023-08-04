import React from "react";
import Dropdown from "../Common/Dropdown";
import { DropdownOption } from "../../types";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import "./currencyConverter.scss";

interface CurrencyConverterFormProps {
  amount: number;
  setAmount: (value: number) => void;
  fromCurrency: string;
  toCurrency: string;
  currencyOptions: DropdownOption[];
  handleCurrencySelect: (key: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  swapCurrencies: () => void;
}

const CurrencyConverterForm: React.FC<CurrencyConverterFormProps> = ({
  handleSubmit,
  currencyOptions,
  amount,
  setAmount,
  fromCurrency,
  toCurrency,
  handleCurrencySelect,
  swapCurrencies,
}) => {
  return (
    <form className="currency-converter-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          min={1}
          value={+amount}
          required={true}
          onChange={(e) => setAmount(e.target.valueAsNumber)}
        />
      </div>
      <Dropdown
        label="From"
        options={currencyOptions}
        value={fromCurrency}
        onSelect={(value) => handleCurrencySelect("from", value)}
      />
      <button
        className="swap-btn"
        type="button"
        onClick={swapCurrencies}
        aria-label="Swap currencies"
      >
        <CompareArrowsIcon />
      </button>
      <Dropdown
        label="To"
        options={currencyOptions}
        value={toCurrency}
        onSelect={(value) => handleCurrencySelect("to", value)}
      />
      <button type="submit">Convert</button>
    </form>
  );
};

export default CurrencyConverterForm;

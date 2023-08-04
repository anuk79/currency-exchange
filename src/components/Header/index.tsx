import React from "react";
import CurrencyExchangeIcon from "../Common/CurrencyExchangeIcon";
import {
  CurrencyConverterTab,
  ConversionHistoryTab,
  TabOptions,
} from "../../types/index.d";

interface HeaderProps {
  handleClick: (tab: TabOptions) => void;
  heading: string;
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ heading, handleClick, activeTab }) => {
  return (
    <header className="app-header">
      <div>
        <h1>
          <CurrencyExchangeIcon />
          <span>{heading}</span>
        </h1>
        <div>
          <button
            className={`${activeTab == CurrencyConverterTab ? "active" : ""}`}
            onClick={() => handleClick(CurrencyConverterTab)}
          >
            Currency Converter
          </button>
          <button
            className={`${activeTab == ConversionHistoryTab ? "active" : ""}`}
            onClick={() => handleClick(ConversionHistoryTab)}
          >
            View Conversion History
          </button>
        </div>
        <a href="/">Logout</a>
      </div>
    </header>
  );
};

export default Header;

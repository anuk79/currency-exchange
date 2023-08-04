declare module "react-sparklines";

export const CurrencyConverterTab = "CurrencyConverter";
export const ConversionHistoryTab = "ConversionHistory";

export type TabOptions =
  | typeof CurrencyConverterTab
  | typeof ConversionHistoryTab;

export type Currency = {
  name: string;
  rate: number;
};

export type CurrencyConverterState = {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  exchangeRate: number;
};

export type DropdownOption = {
  label: string;
  value: string;
};

export type CurrencyExchangeHistory = {
  id: string;
  from: string;
  to: string;
  amount: number;
  date: string;
  exchangeRate: number;
  convertedAmount: number;
};

export type ExchangeRateHistory = {
  rate: number;
  date: string;
};

export type Statistics = { [key: string]: number };

import React, { useState, useEffect, useRef } from "react";
import ExchangeResult from "../ExchangeResult";
import ExchangeHistory from "../ExchangeHistory";
import CurrencyConverterForm from "./CurrencyConverterForm";
import { getLatestExchangeRates, convertCurrency } from "../../utils/data";
import {
  CURRENCY_EXCHANGE_LOCAL_STORAGE_KEY,
  EUR,
  USD,
} from "../../utils/constants";
import useLocalStorage from "../../utils/useLocalStorage";
import { generateId } from "../../utils/helpers";
import {
  CurrencyExchangeHistory,
  DropdownOption,
  CurrencyConverterState,
} from "../../types";

interface CurrencyConverterProps {
  defaultValues: CurrencyConverterState;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  defaultValues,
}) => {
  const [currencyRates, setCurrencyRates] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(defaultValues.amount);
  const [fromCurrency, setFromCurrency] = useState<string>(defaultValues.from);
  const [toCurrency, setToCurrency] = useState<string>(defaultValues.to);
  const [convertedAmount, setConvertedAmount] = useState<number>(
    defaultValues.convertedAmount
  );
  const [exchangeRate, setExchangeRate] = useState<number>(
    defaultValues.exchangeRate
  );
  const [currencyExchangeHistory, setCurrencyExchangeHistory] = useLocalStorage(
    CURRENCY_EXCHANGE_LOCAL_STORAGE_KEY,
    [] as CurrencyExchangeHistory[]
  );
  const currencyOptionsRef = useRef<DropdownOption[]>([]);

  currencyOptionsRef.current = Object.keys(currencyRates).map((key) => ({
    label: key,
    value: key,
  }));

  useEffect(() => {
    getLatestExchangeRates().then((data) => {
      setCurrencyRates(data);
      const keys = Object.keys(data);
      setFromCurrency(keys.find((key) => key === EUR) || keys[0]);
      setToCurrency(keys.find((key) => key === USD) || keys[1]);
    });
  }, []);

  const handleCurrencySelect = (key: string, value: string) => {
    if (key === "from") {
      setFromCurrency(value);
    } else {
      setToCurrency(value);
    }
    setConvertedAmount(0);
    setExchangeRate(0);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(0);
    setExchangeRate(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    convertCurrency(fromCurrency, toCurrency, amount).then((data) => {
      setConvertedAmount(data.result);
      setExchangeRate(data.info.rate);
      setCurrencyExchangeHistory([
        ...currencyExchangeHistory,
        {
          date: new Date().toISOString(),
          from: fromCurrency,
          to: toCurrency,
          amount: amount,
          id: generateId(),
          convertedAmount: data.result,
          exchangeRate: data.info.rate,
        },
      ]);
    });
  };

  return (
    <section>
      <h2> I want to convert </h2>
      <CurrencyConverterForm
        amount={amount}
        setAmount={setAmount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        currencyOptions={currencyOptionsRef.current}
        handleCurrencySelect={handleCurrencySelect}
        swapCurrencies={swapCurrencies}
        handleSubmit={handleSubmit}
      />
      <div>
        {!!convertedAmount && (
          <ExchangeResult
            to={{ name: toCurrency, rate: convertedAmount }}
            from={{ name: fromCurrency, rate: amount }}
            exchangeRate={exchangeRate}
          />
        )}
      </div>
      <div>
        {!!exchangeRate && (
          <ExchangeHistory
            baseCurrencyCode={fromCurrency}
            toCurrencyCode={toCurrency}
            exchangeRate={exchangeRate}
          />
        )}
      </div>
    </section>
  );
};

export default CurrencyConverter;

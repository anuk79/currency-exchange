
import React, { useContext } from "react";
import ConversionHistoryTable from "../Table/ConversionHistoryTable";
import useLocalStorage from "../../utils/useLocalStorage";
import CurrencyConverterContext from "../../context/CurrencyConverterContext";
import { CURRENCY_EXCHANGE_LOCAL_STORAGE_KEY } from "../../utils/constants";
import { CurrencyExchangeHistory } from "../../types";

const ConversionHistory: React.FC = () => {
  const [conversionHistory, setConversionHistory] = useLocalStorage(
    CURRENCY_EXCHANGE_LOCAL_STORAGE_KEY,
    [] as CurrencyExchangeHistory[]
  );
  const { updateCurrencyConverterState } = useContext(CurrencyConverterContext);

  const deleteEntryFromLocalStorage = (id: string) => {
    const newConversionHistory = conversionHistory.filter(
      (entry) => entry.id !== id
    );
    setConversionHistory(newConversionHistory);
  };

  const viewConversionHistory = (
    from: string,
    to: string,
    amount: number,
    convertedAmount: number,
    exchangeRate: number
  ) => {
    updateCurrencyConverterState({
      from,
      to,
      amount,
      convertedAmount,
      exchangeRate,
    });
  };

  return (
    <section>
      <h2>Conversion History</h2>
      <ConversionHistoryTable
        data={conversionHistory}
        onView={viewConversionHistory}
        onDelete={deleteEntryFromLocalStorage}
      />
    </section>
  );
};

export default ConversionHistory;

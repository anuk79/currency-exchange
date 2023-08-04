import { useState } from 'react'
import CurrencyConverter from "./components/CurrencyConverter";
import ConversionHistory from "./components/ConversionHistory";
import Header from "./components/Header";
import CurrencyConverterContext from "./context/CurrencyConverterContext";
import {
  TabOptions,
  CurrencyConverterTab,
  CurrencyConverterState,
} from "./types/index.d";
import "./App.scss";

function App() {
  const [activeTab, setActiveTab] = useState<TabOptions>(CurrencyConverterTab);
  const [currencyConverterState, setCurrencyConverterState] =
    useState<CurrencyConverterState>({
      from: "",
      to: "",
      amount: 1,
      convertedAmount: 0,
      exchangeRate: 0,
    });

  const handleTabClick = (tab: TabOptions) => setActiveTab(tab);

  const updateCurrencyConverterState = (data: CurrencyConverterState) => {
    setCurrencyConverterState(data);
    setActiveTab(CurrencyConverterTab);
  };

  return (
    <>
      <Header
        heading="CurrencyExchange"
        handleClick={handleTabClick}
        activeTab={activeTab}
      />
      <main>
        <CurrencyConverterContext.Provider
          value={{ updateCurrencyConverterState }}
        >
          {activeTab === "CurrencyConverter" && (
            <CurrencyConverter defaultValues={currencyConverterState} />
          )}
          {activeTab === "ConversionHistory" && <ConversionHistory />}
        </CurrencyConverterContext.Provider>
      </main>
    </>
  );
}

export default App;

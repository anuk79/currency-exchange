const BASE_URL = "https://api.exchangerate.host";

export const getLatestExchangeRates = async () => {
  const response = await fetch(`${BASE_URL}/latest`);
  const data = await response.json();
  return data.rates;
}

export const convertCurrency = async (from: string, to: string, amount: number) => {
  const response = await fetch(`${BASE_URL}/convert?from=${from}&to=${to}&amount=${amount}`);
  const data = await response.json();
  return data;
}

export const getHistoricalExchangeRate = async (
  startDate: string,
  endDate: string,
  baseCurrency: string,
  toCurrency: string
) => {
  const response = await fetch(
    `${BASE_URL}/timeseries?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&symbols=${toCurrency},${baseCurrency}`
  );
  const data = await response.json();
  return data.rates;
};


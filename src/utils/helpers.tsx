import { ExchangeRateHistory, Statistics } from "../types/index.d";

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const getDateNDaysAgo = (n: number) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - n);
  return currentDate;
};

export const getDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const getStatistics = (data: ExchangeRateHistory[]): Statistics => {
  const rates = data.map(({ rate }) => rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const avg = rates.reduce((acc, rate) => acc + rate, 0) / rates.length;
  return { Lowest: min, Highest: max, Average: avg };
};

import { useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const initialStoredValue = localStorage.getItem(key);
  const initialParsedValue = initialStoredValue
    ? JSON.parse(initialStoredValue)
    : initialValue;

  const [storedValue, setStoredValue] =
    useState<T>(initialParsedValue);

  const updateStoredValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, updateStoredValue];
}

export default useLocalStorage;

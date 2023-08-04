import { createContext } from "react";

import { CurrencyConverterState } from "../types/index.d";

const CurrencyConverterContext = createContext({
  updateCurrencyConverterState: (
    /*eslint-disable-line @typescript-eslint/no-unused-vars */ data: CurrencyConverterState
  ) => {},
});

export default CurrencyConverterContext;

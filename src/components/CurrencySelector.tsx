import React from "react";

type CurrencySelectorProps = {
  currencyList: any;
  amountLabel: string;
  amount: string;
  selectedCurrency: string;
  currencyLabel: string;
  onAmountChange: (value: string, isSource: boolean) => void;
  isSource: boolean;
  onCurrencyChange: (value: string, isSource: boolean) => void;
};

const CurrencySelector = ({
  currencyList,
  amountLabel,
  amount,
  selectedCurrency,
  currencyLabel,
  isSource,
  onAmountChange,
  onCurrencyChange,
}: CurrencySelectorProps) => {
  return (
    <div className="flex xs:flex-col lg:flex-row border-8 border-yellow-500 border-t-0">
      <div className="p-4 border-r-8 border-r-yellow-500">
        <p className="text-gray-400">{amountLabel}</p>
        <input
          className="outline-0"
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value, isSource)}
        />
      </div>
      <div className="p-4">
        <p className="text-gray-400">{currencyLabel}</p>
        <select
          value={selectedCurrency}
          className="text-xl"
          onChange={(e) => onCurrencyChange(e.target.value, isSource)}
        >
          {Object.keys(currencyList).map((currency) => (
            <option value={currency} key={currency}>
              {currencyList[currency]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencySelector;

import React from "react";

type ExchangeProps = {
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: string;
  targetAmount: string;
};

const ExchangeInfo = ({
  sourceCurrency,
  targetCurrency,
  sourceAmount,
  targetAmount,
}: ExchangeProps) => {
  return (
    <div className="p-4 border-8 border-yellow-500 bg-sky-600 text-white">
      <p>
        {sourceAmount} {sourceCurrency} Equals
      </p>
      <p className="text-2xl font-bold">
        {targetAmount} {targetCurrency}
      </p>
    </div>
  );
};

export default ExchangeInfo;

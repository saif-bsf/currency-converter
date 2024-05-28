import { useEffect, useState } from "react";
import ExchangeInfo from "./ExchangeInfo";
import CurrencySelector from "./CurrencySelector";
import useCurrencies from "../utils/useCurrencies";
import useRates from "../utils/useRates";

const CurrencyConverter = () => {
  const { currencies, isError: currencyError } = useCurrencies();
  const { rates, isError: ratesError, getRates } = useRates();
  const [sourceAmount, setSourceAmount] = useState("10");
  const [targetAmount, setTargetAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("AED");
  const [convertTrigger, setConvertTrigger] = useState({
    from: "source",
    amount: Number(sourceAmount),
  });

  useEffect(() => {
    const performInitialConvertion = async () => {
      const convertedAmount = await convertCurrency(
        convertTrigger.amount,
        sourceCurrency,
        targetCurrency
      );
      setTargetAmount(convertedAmount);
    };
    performInitialConvertion();
  }, []);

  useEffect(() => {
    const performConversion = async () => {
      if (convertTrigger.from == "source") {
        const convertedAmount = await convertCurrency(
          convertTrigger.amount,
          sourceCurrency,
          targetCurrency
        );
        setTargetAmount(convertedAmount);
      } else {
        const convertedAmount = await convertCurrency(
          convertTrigger.amount,
          targetCurrency,
          sourceCurrency
        );
        setSourceAmount(convertedAmount);
      }
    };
    performConversion();
  }, [convertTrigger]);

  const convertCurrency = async (
    sourceAmount: number,
    sourceCurrency: string,
    targetCurrency: string
  ) => {
    return getRates().then(() => {
      console.log(rates[targetCurrency]);
      let result = Number(sourceAmount) * Number(rates[targetCurrency]);
      result = result / Number(rates[sourceCurrency]);
      return result.toFixed(2).toString();
    });
  };

  const handleAmountChange = (value: string, isSource: boolean) => {
    if (isSource) {
      setSourceAmount(value);
      setConvertTrigger({ from: "source", amount: Number(value) });
    } else {
      setTargetAmount(value);
      setConvertTrigger({ from: "target", amount: Number(value) });
    }
  };

  const handleCurrencyChange = (value: string, isSource: boolean) => {
    if (isSource) {
      setSourceCurrency(value);
      setConvertTrigger({ from: "source", amount: Number(sourceAmount) });
    } else {
      setTargetCurrency(value);
      setConvertTrigger({ from: "target", amount: Number(targetAmount) });
    }
  };

  if (currencyError || ratesError)
    return <h1 className="text-3xl">Something Went Wrong!!</h1>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl text-center font-bold text-sky-600">
        Currency Converter
      </h1>
      <div>
        <ExchangeInfo
          sourceAmount={sourceAmount}
          targetAmount={targetAmount}
          targetCurrency={targetCurrency}
          sourceCurrency={sourceCurrency}
        />
        <CurrencySelector
          amountLabel="Amount 1"
          amount={sourceAmount}
          currencyLabel="Currency 1"
          currencyList={currencies}
          isSource={true}
          selectedCurrency={sourceCurrency}
          onAmountChange={handleAmountChange}
          onCurrencyChange={handleCurrencyChange}
        />
        <CurrencySelector
          amountLabel="Amount 2"
          amount={targetAmount}
          currencyLabel="Currency 2"
          currencyList={currencies}
          isSource={false}
          selectedCurrency={targetCurrency}
          onAmountChange={handleAmountChange}
          onCurrencyChange={handleCurrencyChange}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;

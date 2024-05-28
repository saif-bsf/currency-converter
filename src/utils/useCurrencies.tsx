import { useEffect, useState } from "react";
import { CURRENCIES_API } from "./constants";

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCurrencies();
  }, []);

  const getCurrencies = async () => {
    try {
      const data = await fetch(CURRENCIES_API);
      const json = await data.json();
      setCurrencies(json.value);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return { currencies, isError };
};

export default useCurrencies;

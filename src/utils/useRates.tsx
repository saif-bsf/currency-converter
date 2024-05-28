import { useEffect, useState } from "react";
import { RATES_API } from "./constants";

type RatesType = {
  [key: string]: string;
};

const useRates = () => {
  const [rates, setRates] = useState<RatesType>({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getRates();
  }, []);

  const getRates = async () => {
    try {
      const data = await fetch(RATES_API);
      const json = await data.json();
      setRates(json?.value?.rates);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return { rates, isError, getRates };
};

export default useRates;

import axios from "axios";
import { useEffect, useState } from "react";

const useApi = () => {
  const [currencyMapping, setCurrencyMapping] = useState({});
  const [currencies, setCurrencies] = useState({});
  const [currencyCode, setcurrencyCode] = useState("hkd");

  const fetchCurrency = async () => {
    try {
      const responseCurrencyTypes = await axios.get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
      );
      const newCurrencies = buildMainDictionary(responseCurrencyTypes.data);
      console.log(
        "🚀 ~ file: useCurrencyApi.jsx:18 ~ fetchCurrency ~ responseCurrencyTypes.data",
        responseCurrencyTypes.data
      );
      setCurrencyMapping(newCurrencies);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRates = async () => {
    try {
      const responseRates = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyCode}.json`
      );
      const newCurrencyRates = responseRates.data[currencyCode];
      console.log(
        "🚀 ~ file: useCurrencyApi.jsx:31 ~ fetchRates ~ responseRates.data[currencyCode]",
        responseRates.data[currencyCode]
      );
      const newDicWithRates = addNewRatesToDictionary(
        currencyMapping,
        newCurrencyRates
      );

      setCurrencies(newDicWithRates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      fetchCurrency();
      fetchRates();
    }
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  return {
    currencyMapping,
    currencies,
    setcurrencyCode,
  };
};

export default useApi;

import axios from "axios";
import { useEffect, useState } from "react";

const useCurrencyApi = () => {
  const [currencies, setCurrencies] = useState({});
  const [inputCurrency, setInputCurrency] = useState("hkd");
  const [inputAmount, setInputAmount] = useState(1);
  const [pageIndex, setPageIndex] = useState("h");
  const [page, setPage] = useState([]);

  const fetchCurrency = async () => {
    try {
      const responseCurrencyTypes = await axios.get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
      );
      const newCurrencies = buildMainDictionary(responseCurrencyTypes.data);
      setCurrencies(newCurrencies);
      console.log(
        "🚀 ~ file: useCurrencyApi.jsx:35 ~ useCurrencyApi ~ currencies",
        currencies
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRates = async (_inputCurrency) => {
    try {
      const responseRates = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${_inputCurrency}.json`
      );
      const newCurrencyRates = responseRates.data[_inputCurrency];

      const newDicWithRates = addNewRatesToDictionary(
        currencies,
        newCurrencyRates
      );

      setCurrencies(newDicWithRates);
      console.log(
        "🚀 ~ file: useCurrencyApi.jsx:35 ~ useCurrencyApi ~ currencies",
        currencies
      );
    } catch (error) {
      console.log(error);
    }
  };

  const buildMainDictionary = (_currencyTypes) => {
    //-------------------------------------------------------------------------
    // Build a dictionary with keys based on first letter of currency code
    // Each key will contain an array of object where the code's first letter
    //  correspont to the key. See example bellow...
    //
    //   a: [{code: asd, ...}, {code: atg, ...}, {code: amd, ...}]
    //   b: [{code: bts, ...}, {code: bkl, ...}, {code: bvg, ...}]
    //
    //-------------------------------------------------------------------------
    let paginatedObj = {};

    Object.keys(_currencyTypes).forEach((key) => {
      const firstLetter = key.charAt(0);
      const newEntry = {
        code: key,
        fullName: _currencyTypes[key],
        rate: 0,
        value: 0,
      };
      // if key does not exist => add new array with item
      if (!(firstLetter in paginatedObj)) {
        paginatedObj = {
          ...paginatedObj,
          [firstLetter]: [newEntry],
        };
      } else {
        //if key exist => add using spread
        const existArr = paginatedObj[firstLetter];
        const newArr = [...existArr, newEntry];
        paginatedObj[firstLetter] = newArr;
      }
    });
    return paginatedObj;
  };

  const addNewRatesToDictionary = (_dic, _rates) => {
    Object.keys(_dic).forEach((key) => {
      _dic[key].forEach((item) => {
        item.rate = _rates[item.code];
      });
    });
    return _dic;
  };

  const buildPage = () => {
    const currArray = [...currencies[pageIndex]];
    const newCalculation = currArray.map((item) => {
      const calcVal = (inputAmount * item.rate).toFixed(2);
      return { ...item, value: calcVal };
    });
    setPage(newCalculation);
  };

  const onClickLetterBtn = (key) => {
    setPageIndex(key);
    buildPage();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currencyInputValue = event.target.searchInput.value;
    const amountInputValue = event.target.valueInput.value;
    if (currencyInputValue !== inputCurrency) {
      fetchRates(currencyInputValue);
    }
    setInputAmount(amountInputValue);
    setInputCurrency(currencyInputValue);
    buildPage();
  };

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      fetchCurrency();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, []);

  return {
    page,
    currencies,
    onClickLetterBtn,
    handleSubmit,
  };
};

export default useCurrencyApi;

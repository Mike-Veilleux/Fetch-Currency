import axios from "axios";
import { useEffect, useState } from "react";

const useCurrencyApi = () => {
  const [currencyTypes, setCurrencyTypes] = useState({});
  const [currencyRates, setCurrencyRates] = useState({});
  const [inputCurrency, setInputCurrency] = useState("hkd");
  const [inputAmount, setInputAmount] = useState(1);
  const [page, setPage] = useState([]);
  const [pagesDictionary, setPagesDictionary] = useState({});
  const [trafficState, setTrafficState] = useState({
    isLoading: true,
    error: null,
  });

  const fetchCurrencyData = async () => {
    try {
      setTrafficState({ ...trafficState, isLoading: true });
      const responseTypes = await axios.get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
      );

      const responseRates = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${inputCurrency}.json`
      );
      setTrafficState({ ...trafficState, isLoading: false });

      const newCurrencyTypes = responseTypes.data;
      const newCurrencyRates = responseRates.data[inputCurrency];
      const newPagesDictionary = buildPagesDictionary(
        newCurrencyTypes,
        newCurrencyRates,
        inputAmount
      );

      setCurrencyTypes(newCurrencyTypes);
      setCurrencyRates(newCurrencyRates);
      setPagesDictionary(newPagesDictionary);
    } catch (error) {
      setTrafficState({ ...trafficState, error: error });
      console.log(error);
    }
  };

  // const fetchCurrencyRates = async (_inputCurrency) => {
  //   try {
  //     setTrafficState({ ...trafficState, isLoading: true });
  //     const responseRates = await axios.get(
  //       `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${_inputCurrency}.json`
  //     );
  //     setCurrencyRates(response.data[_inputCurrency]);
  //     setTrafficState({ ...trafficState, isLoading: false });
  //     //return responseRates.data[_inputCurrency];
  //   } catch (error) {
  //     setTrafficState({ ...trafficState, error: error });
  //     console.log(error);
  //   }
  // };

  const buildPagesDictionary = (
    _currencyTypes,
    _currencyRates,
    _inputAmount
  ) => {
    let safeValue = 1;
    if (_inputAmount !== 0) safeValue = _inputAmount;
    //merge raw fetch data and calculate the value on the userinput
    const dataArray = Object.keys(_currencyRates).map((key) => {
      const currCode = key;
      const calcValue = Number(_currencyRates[key] * safeValue).toFixed(2);
      const fullName = _currencyTypes[key];
      return {
        code: currCode,
        fullName: fullName,
        value: calcValue,
      };
    });
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
    dataArray.forEach((item) => {
      const firstLetter = item.code.charAt(0);

      const newEntry = {
        code: item.code,
        fullName: item.fullName,
        value: item.value,
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

  const onclickLetterBtn = (key) => {
    const newPagesDictionary = pagesDictionary[key];
    setPage(newPagesDictionary);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currencyInputValue = event.target.searchInput.value;
    const amountInputValue = event.target.valueInput.value;
    setInputAmount(amountInputValue);
    setInputCurrency(currencyInputValue);
  };

  useEffect(() => {
    let isApiSubscribed = true;
    fetchCurrencyData();
    return () => (isApiSubscribed = false);
  }, [inputCurrency]);

  return {
    trafficState,
    currencyTypes,
    currencyRates,
    inputAmount,
    page,
    pagesDictionary,
    onclickLetterBtn,
    buildPagesDictionary,
    handleSubmit,
    setPage,
  };
};

export default useCurrencyApi;

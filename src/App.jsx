import CurrencyRates from "./components/CurrencyRates";
import LetterSelectorButtons from "./components/LetterSelectorButtons";
import Navbar from "./components/Navbar";
import useCurrencyApi from "./hooks/useCurrencyApi";

function App() {
  const currencyApi = useCurrencyApi();
  return (
    <div className="container">
      <Navbar {...currencyApi} />
      <LetterSelectorButtons {...currencyApi} />
      <CurrencyRates {...currencyApi} />
    </div>
  );
}

export default App;

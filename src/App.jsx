import { useState } from "react";
import { InputBox } from "./Components/components.js";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [convertedFrom, setConvertedFrom] = useState("usd");
  const [convertedTo, setConvertedTo] = useState("bdt");

  const currencyInfo = useCurrencyInfo(convertedFrom);
  const options = Object.keys(currencyInfo);

  const handleSwapCurrency = () => {
    setConvertedFrom(convertedTo);
    setConvertedTo(convertedFrom);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const handleCovertCurrency = () => {
    setConvertedAmount(amount * currencyInfo[convertedTo]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(
          "https://images.pexels.com/photos/1006060/pexels-photo-1006060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCovertCurrency();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(currency) => setConvertedFrom(currency)}
                selectCurrency={convertedFrom}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                onClick={handleSwapCurrency}
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-yellow-800		 text-white px-2 py-1"
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                onCurrencyChange={(convcurrency) =>
                  setConvertedTo(convcurrency)
                }
                currencyOptions={options}
                selectCurrency={convertedTo}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-800	 text-white px-4 py-3 rounded-lg"
            >
              Convert {convertedFrom.toUpperCase()} To{" "}
              {convertedTo.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

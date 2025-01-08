import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [currency, setCurrency] = useState([]);
  const [rate, setRate] = useState({});
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [result, setResult] = useState(null);

   const apiUrl="https://api.currencyapi.com/v3/latest?apikey=cur_live_UoKE7y00okG5wDrUan8fEW4R7dpXEAOkRjVZzNDG"
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setRate(data.data);
        setCurrency(Object.keys(data.data));
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    }

    fetchData();
  }, []);

  const handleConvert = () => {
    let fromRate = 1;
    let toRate = 1;
  
    if (rate[fromCurrency] && rate[fromCurrency].value) {
      fromRate = rate[fromCurrency].value;
    }
    if (rate[toCurrency] && rate[toCurrency].value) {
      toRate = rate[toCurrency].value;
    }
  
    const convertedAmount = (amount / fromRate) * toRate;
  
    setResult(convertedAmount);
  };
  
  
  
  return (
    <div className="app-container">
      <h1>Currency Converter</h1>
      <div className="converter-box">
        <div className="input-group">
          <label htmlFor="from">From:</label>
          <select onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="">Select Currency</option>
            {currency.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="to">To:</label>
          <select onChange={(e) => setToCurrency(e.target.value)}>
            <option value="">Select Currency</option>
            {currency.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={() => (fromCurrency && toCurrency && amount ? handleConvert() : alert("Please fill all fields"))}
        >
          Convert
        </button>
        {result && (
          <h2>Converted Amount: {result} {toCurrency}</h2>
        )}
      </div>
    </div>
  );
}

export default App;

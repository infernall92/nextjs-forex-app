'use client';

// import { fetchExchangeRates } from "../GlobalRedux/Slices/exchangeRatesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../GlobalRedux/store";


// import { useEffect } from "react";

// export default function Rates() {

//     const dispatch = useDispatch<AppDispatch>();
//     const { rates, currencies, status, error } = useSelector((state: RootState) => state.exchangeRates);

    
// useEffect(()=> {
//     dispatch(fetchExchangeRates())
// }, [dispatch])

//     return <div>
//         <h1>RATES PAGE</h1>
        
//     </div>
// }

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from '../GlobalRedux/Slices/exchangeRatesSlice';
import { RootState, AppDispatch } from '../GlobalRedux/store';

import classes from "./page.module.css"
import Link from 'next/link';
import Error from '../error';

const RatesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rates, currencies, status, error } = useSelector((state: RootState) => state.exchangeRates);
  
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    (resolve) => setTimeout(resolve, 2000)
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount(amount * rate);
    }
    setIsChanged(false);
  };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

  if (status === 'failed') {
    return <Error />
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Currency Converter</h1>
      <form className={classes.form} onSubmit={handleConvert}>
        <div className={classes.formGroup}>
          <label className={classes.label}>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {setAmount(Number(e.target.value)); setIsChanged(true)}}
            className={classes.input}
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => {setFromCurrency(e.target.value); setIsChanged(true)}}
            className={classes.select}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>To:</label>
          <select
            value={toCurrency}
            onChange={(e) => {setToCurrency(e.target.value); setIsChanged(true)}}
            className={classes.select}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={classes.button}>Convert</button>
      </form>
      {convertedAmount !== null && (
        <div className={classes.result}>
          {!isChanged && <h2>{amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}</h2>}
        </div>
      )}
      <p><Link href='/'>Go Back</Link></p>
    </div>
  );
};

export default RatesPage;

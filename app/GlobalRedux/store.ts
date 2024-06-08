'use client';

import { Dispatch } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import exchangeRatesReducer from "./Slices/exchangeRatesSlice";

export const store = configureStore({
    reducer: {
        exchangeRates: exchangeRatesReducer
    }
})

interface UnknownAction {
    type: string;
    payload?: any;
  }

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
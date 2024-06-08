import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ExchangeRatesState {
  rates: { [key: string]: number };
  currencies: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExchangeRatesState = {
  rates: {},
  currencies: [],
  status: 'idle',
  error: null,
};

export const fetchExchangeRates = createAsyncThunk(
  'exchangeRates/fetchExchangeRates',
  async () => {
    const response = await fetch('https://v6.exchangerate-api.com/v6/8ab185c4e6a7a29cc40f1432/latest/USD');
    if (!response.ok) {
      throw new Error('Failed to fetch exchange ratesAsdaSDasd');
    }
    const data = await response.json();
    console.log(data);
    return data;
  }
);

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rates = action.payload.conversion_rates;
        state.currencies = Object.keys(action.payload.conversion_rates);
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default exchangeRatesSlice.reducer;

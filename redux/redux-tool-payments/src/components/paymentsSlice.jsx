// paymentsSlice.js
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// --- 1. Async Thunk: Tạo thanh toán mới ---
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, thunkAPI) => {
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (res.status === 402) {
        return thunkAPI.rejectWithValue('Tài khoản không đủ tiền');
      }

      if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData.message || 'Lỗi không xác định');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// --- 2. Initial State ---
const initialState = {
  list: [],
  isLoading: false,
  error: null
};

// --- 3. Slice ---
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default paymentsSlice.reducer;

// --- 4. Selectors ---
export const selectPayments = (state) => state.payments.list;

export const selectSuccessfulPayments = createSelector(
  [selectPayments],
  (payments) => payments.filter((p) => p.status === 'SUCCESS')
);

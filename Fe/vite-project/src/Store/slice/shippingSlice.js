import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios'; 

// Async thunk to fetch shipping data
export const fetchShipping = createAsyncThunk(
  'shipping/fetchShipping',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/shipping?populate=data.svg', {
        skipAuth: true,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch shipping data'
      );
    }
  }
);

const shippingSlice = createSlice({
  name: 'shipping',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipping.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchShipping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shippingSlice.reducer;
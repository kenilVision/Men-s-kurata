// src/Store/slice/navBarSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const fetchNavBar = createAsyncThunk('navBar/fetchNavBar', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/nav-bar?populate=*',{
  skipAuth: true,
});
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const navBarSlice = createSlice({
  name: 'navBar',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavBar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNavBar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNavBar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default navBarSlice.reducer;

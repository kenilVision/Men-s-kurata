import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios'; 

// Async thunk to fetch header data
export const fetchHeader = createAsyncThunk(
  'header/fetchHeader',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/header?populate=*',{
  skipAuth: true,
});
      return res.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch header');
    }
  }
);

const headerSlice = createSlice({
  name: 'header',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default headerSlice.reducer;

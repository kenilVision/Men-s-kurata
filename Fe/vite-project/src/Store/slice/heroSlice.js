import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';


export const fetchHeroBySlug = createAsyncThunk(
  'hero/fetchHeroBySlug',
  async (slug, thunkAPI) => {
    try {
        console.log("Fetching hero with slug:", slug);
      const res = await axiosInstance.get(`/heroes?filters[slug][$eq]=${slug}&populate=*`, {
        skipAuth: true,
      });
      console.log("Response data:", res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch hero data'
      );
    }
  }
);

const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    data: null,
    loading: false,
    error: null,
    currentSlug: null, 
  },
  reducers: {

    resetHero: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.currentSlug = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroBySlug.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentSlug = action.meta.arg; 
      })
      .addCase(fetchHeroBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHeroBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentSlug = null;
      });
  },
});

export const { resetHero } = heroSlice.actions;
export default heroSlice.reducer;
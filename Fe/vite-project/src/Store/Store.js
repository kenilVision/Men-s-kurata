import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userReducer';
import headerSlice from './slice/headerSlice';
import navBarReducer from './slice/navBarSlice';
import heroSlice from './slice/heroSlice';
import shipping from './slice/shippingSlice';

const store = configureStore({
    reducer:{
        user: userReducer,
        header: headerSlice ,
        navBar: navBarReducer,
        hero :heroSlice,
        shipping: shipping,
    }
});


export default store
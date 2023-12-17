import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    categories: [],
    products: [],
    orders: [],
    shippingMethods: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setShippingMethods: (state, action) => {
      state.shippingMethods = action.payload;
    },
  },
});

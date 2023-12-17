import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "cart",
  initialState: {
    customerName: "",
    customerPhoneNumber: "",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    deliveryNotes: null,
    isGift: false,
    recipientName: "",
    recipientPhoneNumber: "",
    distance: 0,
    shippingCost: 0,
    itemsTotal: 0,
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);

      // Calculate items total price
      state.itemsTotal = state.items?.reduce((total, item) => total + item.price * item.qty || 0, 0);
    },

    setItemWishes: (state, action) => {
      const existItem = state.items.find((item) => item.productId === action.payload?.productId);

      if (existItem) {
        existItem.wishes = action.payload?.wishes;
      }
    },

    increaseItemQty: (state, action) => {
      const existItem = state.items.find((item) => item.productId === action.payload.productId);

      if (existItem) {
        existItem.qty += action.payload.qty;
      }

      // Calculate items total price
      state.itemsTotal = state.items?.reduce((total, item) => total + item.price * item.qty || 0, 0);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);

      // Calculate items total price
      state.itemsTotal = state.items?.reduce((total, item) => total + item.price * item.qty || 0, 0);
    },

    setDeliveryInfor: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };

      return state;
    },

    clearDeliveryInfor: (state) => {
      state = {
        ...state,
        customerName: "",
        customerPhoneNumber: "",
        deliveryDate: "",
        deliveryTime: "",
        address: "",
        deliveryNotes: null,
        isGift: false,
        recipientName: "",
        recipientPhoneNumber: "",
        distance: 0,
        shippingCost: 0,
      };

      return state;
    },

    clearAddress: (state) => {
      state = {
        ...state,
        address: "",
        distance: 0,
        shippingCost: 0,
      };

      return state;
    },

    clearCart: (state) => {
      state = {
        customerName: "",
        customerPhoneNumber: "",
        deliveryDate: "",
        deliveryTime: "",
        address: "",
        deliveryNotes: null,
        isGift: false,
        recipientName: "",
        recipientPhoneNumber: "",
        distance: 0,
        shippingCost: 0,
        itemsTotal: 0,
        items: [],
      };

      return state;
    },
  },
});

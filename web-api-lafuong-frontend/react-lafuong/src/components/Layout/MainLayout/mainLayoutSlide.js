import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "mainLayout",
  initialState: {
    isOpenMenu: false,
    isOpenCart: false,
    cartStep: "cart",
    isOpenWishesModal: false,
    selectedCartItem: {
      productId: 0,
      wishes: "",
    },
  },
  reducers: {
    closeMenu: (state) => {
      state.isOpenMenu = false;
    },

    openMenu: (state) => {
      state.isOpenMenu = true;
    },

    closeCart: (state) => {
      state.isOpenCart = false;
    },

    openCart: (state) => {
      state.isOpenCart = true;
    },

    openCartDelivery: (state) => {
      state.cartStep = "delivery";
    },

    openCartDetail: (state) => {
      state.cartStep = "cart";
    },

    openWishesModal: (state, action) => {
      state.isOpenWishesModal = true;

      state.selectedCartItem.productId = action.payload.productId || 0;
      state.selectedCartItem.wishes = action.payload.wishes || "";
    },

    closeWishesModal: (state) => {
      state.isOpenWishesModal = false;
      state.selectedCartItem = {
        productId: 0,
        wishes: "",
      };
    },

    wishesInputChange: (state, action) => {
      state.selectedCartItem.wishes = action.payload;
    },
  },
});

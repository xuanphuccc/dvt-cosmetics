import cartSlice from "@/components/Layout/MainLayout/Cart/cartSlice";
import mainLayoutSlide from "@/components/Layout/MainLayout/mainLayoutSlide";
import globalSlice from "@/redux/globalSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    mainLayout: mainLayoutSlide.reducer,
    cart: cartSlice.reducer,
    global: globalSlice.reducer,
  },
});

// export default store;

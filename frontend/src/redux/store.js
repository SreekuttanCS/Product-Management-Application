import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    product: productReducer,
  },
});

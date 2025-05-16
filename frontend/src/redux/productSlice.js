import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeComponent: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setActiveComponent: (state, action) => {
      state.activeComponent = action.payload;
    },
    resetActiveComponent: (state) => {
      state.activeComponent = null;
    },
  },
});

export const { setActiveComponent, resetActiveComponent } =
  productSlice.actions;

export const selectActiveComponent = (state) => state.product.activeComponent;

export default productSlice.reducer;

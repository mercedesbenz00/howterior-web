const { createSlice } = require("@reduxjs/toolkit");

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cartInfoList: [],
    cartSeq: 0,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCart(state, action) {
      state.cartInfoList = action.payload;
    },
    resetCart(state) {
      state.cartInfoList = [];
      state.cartSeq = 0;
    },
    addToCart(state, action) {
      state.cartSeq = state.cartSeq + 1;
      state.cartInfoList.push({ cartSeq: state.cartSeq, ...action.payload });
    },
    updateToCart(state, action) {
      const isInCart = state.cartInfoList.findIndex(
        (item) => item.cartSeq === action.payload.cartSeq
      );
      if (isInCart > -1) {
        state.cartInfoList[isInCart] = action.payload;
      } else {
        state.cartInfoList.push(action.payload);
      }
    },
    deleteFromCart(state, action) {
      state.cartInfoList = state.cartInfoList.filter(
        (item) => item.cartSeq !== action.payload
      );
    },
  },
});

export const {
  setProducts,
  setCart,
  addToCart,
  resetCart,
  updateToCart,
  deleteFromCart,
} = productSlice.actions;
export default productSlice.reducer;

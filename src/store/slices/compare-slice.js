import cogoToast from "cogo-toast";
const { createSlice } = require("@reduxjs/toolkit");

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    compareItems: [],
  },
  reducers: {
    addToCompare(state, action) {
      state.compareItems.push(action.payload);
      cogoToast.success("Added To compare", { position: "bottom-left" });
    },
    deleteFromCompare(state, action) {
      state.compareItems = state.compareItems.filter(
        (item) => item.id !== action.payload
      );
      cogoToast.error("Removed From Compare", { position: "bottom-left" });
    },
  },
});

export const { addToCompare, deleteFromCompare } = compareSlice.actions;
export default compareSlice.reducer;

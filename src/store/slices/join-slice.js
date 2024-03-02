import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorMessage } from "./message-slice";

import AuthService from "../../services/auth.service";

export const registerUser = createAsyncThunk(
  "join/registerUser",
  async (joinData, thunkAPI) => {
    try {
      return await AuthService.register(joinData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  agreeRequiredTerms: false,
  joinInfo: {
    agree_use: false,
    agree_marketing: false,
    agree_location: false,
    sex: "M",
  },
  joinSuccess: false,
};
const joinSlice = createSlice({
  name: "join",
  initialState,
  reducers: {
    setJoinInfo(state, action) {
      state.joinInfo = action.payload;
    },
    setAgreeRequiredTerms(state, action) {
      state.agreeRequiredTerms = action.payload;
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state) => {
      state.joinSuccess = true;
    },
    [registerUser.rejected]: (state) => {
      state.joinSuccess = false;
    },
  },
});

export const { setJoinInfo, setAgreeRequiredTerms } = joinSlice.actions;
const { reducer } = joinSlice;
export default reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorMessage, setShowAlert } from "./message-slice";
import { processErrorCode } from "./auth-slice";

import MemberService from "../../services/member.service";

export const getMyProfile = createAsyncThunk(
  "profile/getMyProfile",
  async (thunkAPI) => {
    try {
      const response = await MemberService.getMyProfile();
      if (response.data.success) {
        return response.data.data;
      } else {
        if (response.data.alert) {
          thunkAPI.dispatch(setErrorMessage(response.data.errMsg));
          thunkAPI.dispatch(setShowAlert(true));
        }
        thunkAPI.dispatch(processErrorCode(response.data.errCode));
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setErrorMessage(message));
      thunkAPI.dispatch(setShowAlert(true));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const changeMyProfile = createAsyncThunk(
  "profile/changeMyProfile",
  async (reqData, thunkAPI) => {
    try {
      const response = await MemberService.changeMyProfile(reqData);
      if (response.data.success) {
        thunkAPI.dispatch(getMyProfile());
        return response.data.data;
      } else {
        if (response.data.alert) {
          thunkAPI.dispatch(setErrorMessage(response.data.errMsg));
          thunkAPI.dispatch(setShowAlert(true));
        }
        thunkAPI.dispatch(processErrorCode(response.data.errCode));
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setErrorMessage(message));
      thunkAPI.dispatch(setShowAlert(true));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
    },
  },
  extraReducers: {
    [getMyProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
    [getMyProfile.rejected]: (state) => {
      state.profile = null;
    },
  },
});

export const { clearProfile } = profileSlice.actions;
const { reducer } = profileSlice;
export default reducer;

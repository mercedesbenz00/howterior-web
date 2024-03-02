import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorMessage } from "./message-slice";

import AuthService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const socialLogin = createAsyncThunk(
  "auth/socialLogin",
  async ({ platform }, thunkAPI) => {
    try {
      await AuthService.socialLogin(platform);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const sendSMS = createAsyncThunk(
  "auth/sendSMS",
  async ({ phone }, thunkAPI) => {
    try {
      return await AuthService.sendSMS(phone);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const processErrorCode = createAsyncThunk(
  "auth/processErrorMsg",
  async (errCode) => {
    if (errCode === "502") {
      await AuthService.logout();
    }
  }
);

const initialState = {
  isLoggedIn: user ? true : false,
  user: user || null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, auth_token: action.payload };
      }
    },
    setJoinInfo(state, action) {
      state.joinInfo = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { refreshToken, setJoinInfo } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;

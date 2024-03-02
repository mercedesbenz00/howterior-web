import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorMessage, setShowAlert } from "./message-slice";
import { processErrorCode } from "./auth-slice";

import BubbleService from "../../services/bubble.service";
import CommonService from "../../services/common.service";

export const getBubbleProcessList = createAsyncThunk(
  "bubble/getBubbleProcessList",
  async (thunkAPI) => {
    try {
      const response = await BubbleService.getBubbleProcessList();
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

export const getMyBubbleList = createAsyncThunk(
  "bubble/getMyBubbleList",
  async (filterData, thunkAPI) => {
    try {
      const response = await BubbleService.getMyBubbleList(filterData);
      if (response.data.success) {
        thunkAPI.dispatch(
          setBubTotalCount(response.data.data?.pageVo?.totalCount)
        );
        return response.data.data?.list;
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

export const saveBubbleQuote = createAsyncThunk(
  "bubble/saveBubbleQuote",
  async (reqData, thunkAPI) => {
    try {
      const response = await BubbleService.saveBubbleQuote(reqData);
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

export const getBubbleQuoteCheckResult = createAsyncThunk(
  "bubble/getBubbleQuoteCheckResult",
  async (reqData, thunkAPI) => {
    try {
      const response = await BubbleService.getBubbleQuoteCheckResult(reqData);
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

export const getBubbleRangeList = createAsyncThunk(
  "bubble/getBubbleRangeList",
  async (thunkAPI) => {
    try {
      const response = await CommonService.getCodeList("BUB_RANGE");
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

export const saveBubbleChk = createAsyncThunk(
  "bubble/saveBubbleChk",
  async (seqId, thunkAPI) => {
    try {
      const response = await BubbleService.saveBubbleChk(seqId);
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

const initialState = {
  bubProcessList: [],
  bubQuoteReqeust: null,
  bubQuoteResult: null,
  bubQuoteCheckEntities: [],
  bubRangeList: [],
  bubList: [],
  bubTotalCount: 0,
};

const bubbleSlice = createSlice({
  name: "bubble",
  initialState,
  reducers: {
    setBubTotalCount(state, action) {
      state.bubTotalCount = action.payload;
    },
    setButQuoteResult(state, action) {
      state.bubQuoteResult = action.payload;
    },
  },
  extraReducers: {
    [getBubbleProcessList.fulfilled]: (state, action) => {
      state.bubProcessList = action.payload;
    },
    [getBubbleProcessList.rejected]: (state) => {
      state.bubProcessList = [];
    },
    [getMyBubbleList.fulfilled]: (state, action) => {
      state.bubList = action.payload;
    },
    [getMyBubbleList.rejected]: (state) => {
      state.bubList = [];
    },
    [saveBubbleQuote.fulfilled]: (state, action) => {
      state.bubQuoteResult = action.payload?.bubEntity || null;
    },
    [saveBubbleQuote.rejected]: (state) => {
      state.bubQuoteResult = null;
    },
    [getBubbleQuoteCheckResult.fulfilled]: (state, action) => {
      state.bubQuoteCheckEntities = action.payload?.bubInfoEntities || [];
    },
    [getBubbleQuoteCheckResult.rejected]: (state) => {
      state.bubQuoteCheckEntities = [];
    },
    [getBubbleRangeList.fulfilled]: (state, action) => {
      state.bubRangeList = action.payload || [];
    },
    [getBubbleRangeList.rejected]: (state) => {
      state.bubRangeList = [];
    },
  },
});

export const { setBubTotalCount, setButQuoteResult } = bubbleSlice.actions;
const { reducer } = bubbleSlice;
export default reducer;

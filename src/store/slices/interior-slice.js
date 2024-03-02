import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorMessage, setShowAlert } from "./message-slice";
import { resetCart, addToCart } from "./product-slice";
import { processErrorCode } from "./auth-slice";

import InteriorService from "../../services/interior.service";

export const getAreaList = createAsyncThunk(
  "interior/getAreaList",
  async (areaType, thunkAPI) => {
    try {
      const response = await InteriorService.getAreaList(areaType);
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

export const getMyInteriorList = createAsyncThunk(
  "interior/getMyInteriorList",
  async (filterData, thunkAPI) => {
    try {
      const response = await InteriorService.getMyInteriorList(filterData);
      if (response.data.success) {
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

export const getProcessList = createAsyncThunk(
  "interior/getProcessList",
  async (thunkAPI) => {
    try {
      const response = await InteriorService.getProcessList();
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

export const getProcessAreaJoinList = createAsyncThunk(
  "interior/getProcessAreaJoinList",
  async (reqData, thunkAPI) => {
    try {
      const response = await InteriorService.getProcessAreaJoin(reqData);
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

export const saveInteriorReqeust = createAsyncThunk(
  "interior/saveInteriorReqeust",
  async (reqData, thunkAPI) => {
    try {
      const response = await InteriorService.saveInteriorReqeust(reqData);
      if (response.data.success) {
        thunkAPI.dispatch(resetCart());
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

export const updateInteriorReqeust = createAsyncThunk(
  "interior/updateInteriorReqeust",
  async (reqData, thunkAPI) => {
    try {
      const response = await InteriorService.updateInteriorReqeust(reqData);
      if (response.data.success) {
        thunkAPI.dispatch(resetCart());
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

const convertProcessEntitiesToCartList = (processEntities) => {
  const cartItems = [];
  for (const processEntity of processEntities) {
    const { estProcessAreaEntities, ...processEntityValues } = processEntity;
    const cartItem = {
      ...processEntityValues,
      areaList: [],
    };
    for (const areaEntity of estProcessAreaEntities) {
      const { estProcessProductEntities, ...areaEntityValues } = areaEntity;
      const cartAreaListItem = {
        ...areaEntityValues,
      };
      for (const productEntity of estProcessProductEntities) {
        cartAreaListItem.product = productEntity;
        cartItem.areaList.push(JSON.parse(JSON.stringify(cartAreaListItem)));
      }
    }

    cartItems.push(cartItem);
  }

  return cartItems;
};
export const getInteriorDetail = createAsyncThunk(
  "interior/getInteriorDetail",
  async (reqData, thunkAPI) => {
    try {
      const response = await InteriorService.readInteriorDetail(reqData);
      thunkAPI.dispatch(resetCart());
      if (response.data.success) {
        let interiorDetail = response.data.data;
        let processEntities = interiorDetail?.estProcessEntities || [];
        let cartItems = convertProcessEntitiesToCartList(processEntities);
        for (const cartItem of cartItems) {
          thunkAPI.dispatch(addToCart(cartItem));
        }
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
  interiorProcessList: [],
  interiorAreaList: [],
  processAreaJoinList: [],
  interiorRequest: {
    estAreaEntities: [],
    grade: "B",
    type: "L",
    balcony_yns: "Y",
  },
  interiorList: [],
  interiorTotalCount: 0,
  progressInteriorList: [],
  progressInteriorTotalCount: 0,
};

const interiorSlice = createSlice({
  name: "interior",
  initialState,
  reducers: {
    localSaveInteriorReqeust(state, action) {
      state.interiorRequest = action.payload;
    },
    initializeProcessAreaJoinList(state) {
      state.processAreaJoinList = [];
    },
    initializeInteriorRequest(state) {
      state.interiorRequest = JSON.parse(
        JSON.stringify(initialState.interiorRequest)
      );
    },
    setInteriorTotalCount(state, action) {
      state.interiorTotalCount = action.payload;
    },
    setProgressInteriorTotalCount(state, action) {
      state.progressInteriorTotalCount = action.payload;
    },
  },
  extraReducers: {
    [getAreaList.fulfilled]: (state, action) => {
      state.interiorAreaList = action.payload;
    },
    [getAreaList.rejected]: (state) => {
      state.interiorAreaList = [];
    },
    [getProcessList.fulfilled]: (state, action) => {
      state.interiorProcessList = action.payload;
    },
    [getProcessList.rejected]: (state) => {
      state.interiorProcessList = [];
    },
    [getProcessAreaJoinList.fulfilled]: (state, action) => {
      state.processAreaJoinList = action.payload;
    },
    [getProcessAreaJoinList.rejected]: (state) => {
      state.processAreaJoinList = [];
    },
    [saveInteriorReqeust.fulfilled]: (state) => {
      state.interiorRequest = JSON.parse(
        JSON.stringify(initialState.interiorRequest)
      );
    },
    [saveInteriorReqeust.rejected]: () => {},

    [updateInteriorReqeust.fulfilled]: (state) => {
      state.interiorRequest = JSON.parse(
        JSON.stringify(initialState.interiorRequest)
      );
    },
    [updateInteriorReqeust.rejected]: () => {},
    [getMyInteriorList.fulfilled]: (state, action) => {
      let items = action.payload;

      state.interiorList = items.filter((item) => item.temp_yn !== "Y");
      state.progressInteriorList = items.filter((item) => item.temp_yn === "Y");
      state.interiorTotalCount = state.interiorList.length;
      state.progressInteriorTotalCount = state.progressInteriorList.length;
    },
    [getMyInteriorList.rejected]: (state) => {
      state.interiorList = [];
      state.progressInteriorList = [];
    },
    [getInteriorDetail.fulfilled]: (state, action) => {
      let interiorDetail =
        action.payload ||
        JSON.parse(JSON.stringify(initialState.interiorRequest));
      // delete interiorDetail.estProcessEntities;
      // delete interiorDetail.memberEntity;
      state.interiorRequest = interiorDetail;
    },
    [getInteriorDetail.rejected]: (state) => {
      state.interiorRequest = JSON.parse(
        JSON.stringify(initialState.interiorRequest)
      );
    },
  },
});

export const {
  localSaveInteriorReqeust,
  initializeProcessAreaJoinList,
  setInteriorTotalCount,
  initializeInteriorRequest,
} = interiorSlice.actions;
const { reducer } = interiorSlice;
export default reducer;

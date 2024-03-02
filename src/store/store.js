import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth-slice";
import joinReducer from "./slices/join-slice";
import messageReducer from "./slices/message-slice";
import interiorReducer from "./slices/interior-slice";
import bubbleReducer from "./slices/bubble-slice";
import profileReducer from "./slices/profile-slice";
import productReducer from "./slices/product-slice";
import currencyReducer from "./slices/currency-slice";
import cartReducer from "./slices/cart-slice";
import compareReducer from "./slices/compare-slice";
import wishlistReducer from "./slices/wishlist-slice";

const persistConfig = {
  key: "howterior",
  version: 1.1,
  storage,
  whitelist: ["auth"],
};

export const rootReducer = combineReducers({
  auth: authReducer,
  join: joinReducer,
  message: messageReducer,
  interior: interiorReducer,
  bubble: bubbleReducer,
  product: productReducer,
  currency: currencyReducer,
  cart: cartReducer,
  compare: compareReducer,
  wishlist: wishlistReducer,
  profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import uiReducer from "./reducers/uiReducer";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  ui: uiReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

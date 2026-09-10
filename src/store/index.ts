import { configureStore } from "@reduxjs/toolkit";
import verificationReducer from "./slices/verificationSlice";
import documentReducer from "./slices/documentSlice";
import selfieReducer from "./slices/selfieSlice";
import uiReducer from "./slices/uiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      verification: verificationReducer,
      document: documentReducer,
      selfie: selfieReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

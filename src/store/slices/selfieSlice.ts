import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SelfieState {
  previewUrl: string | null;
  facingMode: "user" | "environment";
  cameraError: string | null;
  livenessMessage: string | null;
}

const initialState: SelfieState = {
  previewUrl: null,
  facingMode: "user",
  cameraError: null,
  livenessMessage: null,
};

const selfieSlice = createSlice({
  name: "selfie",
  initialState,
  reducers: {
    setSelfiePreview(state, action: PayloadAction<string | null>) {
      state.previewUrl = action.payload;
    },
    setFacingMode(state, action: PayloadAction<"user" | "environment">) {
      state.facingMode = action.payload;
    },
    setCameraError(state, action: PayloadAction<string | null>) {
      state.cameraError = action.payload;
    },
    setLivenessMessage(state, action: PayloadAction<string | null>) {
      state.livenessMessage = action.payload;
    },
    clearSelfiePreview(state) {
      state.previewUrl = null;
      state.livenessMessage = null;
    },
    resetSelfie() {
      return initialState;
    },
  },
});

export const {
  setSelfiePreview,
  setFacingMode,
  setCameraError,
  setLivenessMessage,
  clearSelfiePreview,
  resetSelfie,
} = selfieSlice.actions;

export default selfieSlice.reducer;

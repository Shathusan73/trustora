import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  mobileMenuOpen: boolean;
  isSubmitting: boolean;
}

const initialState: UiState = {
  mobileMenuOpen: false,
  isSubmitting: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    setIsSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload;
    },
    resetUi() {
      return initialState;
    },
  },
});

export const { setMobileMenuOpen, setIsSubmitting, resetUi } = uiSlice.actions;

export default uiSlice.reducer;

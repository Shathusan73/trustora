import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type VerificationFlowStatus =
  | "idle"
  | "starting"
  | "document_uploading"
  | "document_processing"
  | "selfie_capture"
  | "verifying"
  | "verified"
  | "failed"
  | "review_required";

export interface VerificationState {
  verificationId: string | null;
  currentStep: number;
  status: VerificationFlowStatus;
  error: string | null;
  resultMessage: string | null;
  consentAccepted: boolean;
}

const initialState: VerificationState = {
  verificationId: null,
  currentStep: 0,
  status: "idle",
  error: null,
  resultMessage: null,
  consentAccepted: false,
};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setConsentAccepted(state, action: PayloadAction<boolean>) {
      state.consentAccepted = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setStatus(state, action: PayloadAction<VerificationFlowStatus>) {
      state.status = action.payload;
    },
    setVerificationId(state, action: PayloadAction<string | null>) {
      state.verificationId = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setResultMessage(state, action: PayloadAction<string | null>) {
      state.resultMessage = action.payload;
    },
    resetVerification() {
      return initialState;
    },
  },
});

export const {
  setConsentAccepted,
  setCurrentStep,
  setStatus,
  setVerificationId,
  setError,
  setResultMessage,
  resetVerification,
} = verificationSlice.actions;

export default verificationSlice.reducer;

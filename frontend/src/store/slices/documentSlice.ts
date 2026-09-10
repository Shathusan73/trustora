import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DocumentType } from "@/lib/api/types";

export type DocumentIntelligenceSummary = {
  detectedType?: string | null;
  extractedName?: string | null;
  captureOk: boolean;
  tamperRisk: string;
  needsReview: boolean;
  warnings: string[];
};

export interface DocumentState {
  documentType: DocumentType;
  fileName: string | null;
  previewUrl: string | null;
  mimeType: string | null;
  processingMessage: string | null;
  intelligence: DocumentIntelligenceSummary | null;
}

const initialState: DocumentState = {
  documentType: "Passport",
  fileName: null,
  previewUrl: null,
  mimeType: null,
  processingMessage: null,
  intelligence: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocumentType(state, action: PayloadAction<DocumentType>) {
      state.documentType = action.payload;
    },
    setDocumentPreview(
      state,
      action: PayloadAction<{
        fileName: string;
        previewUrl: string;
        mimeType: string;
      }>
    ) {
      state.fileName = action.payload.fileName;
      state.previewUrl = action.payload.previewUrl;
      state.mimeType = action.payload.mimeType;
    },
    setProcessingMessage(state, action: PayloadAction<string | null>) {
      state.processingMessage = action.payload;
    },
    setDocumentIntelligence(
      state,
      action: PayloadAction<DocumentIntelligenceSummary | null>
    ) {
      state.intelligence = action.payload;
    },
    clearDocumentPreview(state) {
      state.fileName = null;
      state.previewUrl = null;
      state.mimeType = null;
      state.processingMessage = null;
    },
    resetDocument() {
      return initialState;
    },
  },
});

export const {
  setDocumentType,
  setDocumentPreview,
  setProcessingMessage,
  setDocumentIntelligence,
  clearDocumentPreview,
  resetDocument,
} = documentSlice.actions;

export default documentSlice.reducer;

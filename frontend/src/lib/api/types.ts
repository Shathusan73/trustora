export type ApiError = {
  code: string;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: ApiError | null;
};

export type DocumentType =
  | "Passport"
  | "NationalId"
  | "DrivingLicence"
  | "Other";

export type VerificationStatus =
  | "idle"
  | "starting"
  | "document_uploading"
  | "document_processing"
  | "selfie_capture"
  | "verifying"
  | "verified"
  | "failed"
  | "review_required";

export type StartVerificationData = {
  verificationId: string;
  status?: string;
  message?: string;
};

export type DocumentUploadData = {
  verificationId: string;
  status?: string;
  message?: string;
  documentType?: DocumentType;
  faceCount?: number;
  detectedType?: DocumentType | string;
  extractedName?: string | null;
  captureOk?: boolean;
  tamperRisk?: string;
  needsReview?: boolean;
  warnings?: string[];
};

export type SelfieUploadData = {
  verificationId: string;
  status?: string;
  message?: string;
};

export type VerifyData = {
  verificationId: string;
  status: string;
  message?: string;
};

export type VerificationResultData = {
  verificationId: string;
  status: "verified" | "failed" | "review_required" | string;
  message?: string;
  resultMessage?: string;
};

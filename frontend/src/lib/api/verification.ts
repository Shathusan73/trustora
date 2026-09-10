import { apiRequest } from "./client";
import type {
  DocumentUploadData,
  SelfieUploadData,
  StartVerificationData,
  VerificationResultData,
  VerifyData,
} from "./types";

export async function startVerification(consentAccepted: boolean) {
  return apiRequest<StartVerificationData>("/api/verification/start", {
    method: "POST",
    body: JSON.stringify({ consentAccepted }),
  });
}

export async function uploadDocument(
  verificationId: string,
  file: File
) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<DocumentUploadData>(
    `/api/verification/${verificationId}/document`,
    {
      method: "POST",
      body: formData,
    }
  );
}

export async function uploadSelfie(verificationId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<SelfieUploadData>(
    `/api/verification/${verificationId}/selfie`,
    {
      method: "POST",
      body: formData,
    }
  );
}

export async function runVerification(verificationId: string) {
  return apiRequest<VerifyData>(`/api/verification/${verificationId}/verify`, {
    method: "POST",
  });
}

export async function getVerificationResult(verificationId: string) {
  return apiRequest<VerificationResultData>(
    `/api/verification/${verificationId}/result`,
    {
      method: "GET",
    }
  );
}

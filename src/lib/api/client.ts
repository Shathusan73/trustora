import type { ApiError, ApiResponse } from "./types";

/**
 * Empty = same-origin (Vercel rewrites /api/* → backend).
 * Avoid http:// API URLs on the HTTPS Vercel site (browsers block mixed content).
 */
const DEFAULT_API_URL = "";

export function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (configured !== undefined && configured !== "") return configured;
  return DEFAULT_API_URL;
}

export class ApiClientError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = "UNKNOWN", status = 0) {
    super(message);
    this.name = "ApiClientError";
    this.code = code;
    this.status = status;
  }
}

async function parseJsonSafe(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Accept camelCase (ASP.NET default) or PascalCase (legacy middleware). */
function normalizeApiResponse<T>(raw: unknown): ApiResponse<T> | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const success = o.success ?? o.Success;
  const data = (o.data ?? o.Data ?? null) as T | null;
  const errRaw = (o.error ?? o.Error ?? null) as Record<string, unknown> | null;

  let error: ApiError | null = null;
  if (errRaw && typeof errRaw === "object") {
    error = {
      code: String(errRaw.code ?? errRaw.Code ?? "REQUEST_FAILED"),
      message: String(
        errRaw.message ??
          errRaw.Message ??
          "Something went wrong. Please try again."
      ),
    };
  }

  if (typeof success !== "boolean" && !error && data == null && !responseLooksLikeEnvelope(o)) {
    return null;
  }

  return {
    success: Boolean(success),
    data,
    error,
  };
}

function responseLooksLikeEnvelope(o: Record<string, unknown>): boolean {
  return (
    "success" in o ||
    "Success" in o ||
    "error" in o ||
    "Error" in o ||
    "data" in o ||
    "Data" in o
  );
}

function normalizeDataKeys<T>(data: T): T {
  if (!data || typeof data !== "object" || Array.isArray(data)) return data;
  const o = data as Record<string, unknown>;
  if ("verificationId" in o || !("VerificationId" in o)) return data;
  return {
    ...o,
    verificationId: o.VerificationId,
    status: o.status ?? o.Status,
    message: o.message ?? o.Message,
    faceCount: o.faceCount ?? o.FaceCount,
    detectedType: o.detectedType ?? o.DetectedType,
    extractedName: o.extractedName ?? o.ExtractedName,
    captureOk: o.captureOk ?? o.CaptureOk,
    tamperRisk: o.tamperRisk ?? o.TamperRisk,
    needsReview: o.needsReview ?? o.NeedsReview,
    warnings: o.warnings ?? o.Warnings,
    resultMessage: o.resultMessage ?? o.ResultMessage,
  } as T;
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        ...(init?.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiClientError(
      "Unable to reach the verification service. Check your connection and try again.",
      "NETWORK_ERROR",
      0
    );
  }

  const raw = await parseJsonSafe(response);
  const payload = normalizeApiResponse<T>(raw);

  if (!payload) {
    throw new ApiClientError(
      response.ok
        ? "Unexpected empty response from the server."
        : `Server error (${response.status}). The API may be misconfigured or unavailable.`,
      "INVALID_RESPONSE",
      response.status
    );
  }

  if (!payload.success || !response.ok) {
    const message =
      payload.error?.message ||
      (response.status === 500
        ? "Server error (500). Check deploy database, Gemini, and storage settings."
        : "Something went wrong. Please try again.");
    throw new ApiClientError(
      message,
      payload.error?.code || "REQUEST_FAILED",
      response.status
    );
  }

  return normalizeDataKeys(payload.data as T);
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  RefreshCcw,
  SwitchCamera,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { FaceGuide } from "./FaceGuide";
import { LivenessCheck } from "./LivenessCheck";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearSelfiePreview,
  setCameraError,
  setFacingMode,
  setLivenessMessage,
  setSelfiePreview,
} from "@/store/slices/selfieSlice";
import { setCurrentStep, setError, setStatus } from "@/store/slices/verificationSlice";
import { setIsSubmitting } from "@/store/slices/uiSlice";
import { uploadSelfie } from "@/lib/api/verification";
import { ApiClientError } from "@/lib/api/client";
import { cn } from "@/lib/utils";

export function SelfieCapture() {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const blobRef = useRef<Blob | null>(null);
  const [ready, setReady] = useState(false);

  const { previewUrl, facingMode, cameraError } = useAppSelector((s) => s.selfie);
  const { verificationId, error } = useAppSelector((s) => s.verification);
  const intelligence = useAppSelector((s) => s.document.intelligence);
  const isSubmitting = useAppSelector((s) => s.ui.isSubmitting);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setReady(false);
  }, []);

  const startCamera = useCallback(async () => {
    dispatch(setCameraError(null));
    stopCamera();

    if (!navigator.mediaDevices?.getUserMedia) {
      dispatch(
        setCameraError(
          "Camera access is not supported in this browser. Try a modern desktop or mobile browser."
        )
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setReady(true);
        dispatch(
          setLivenessMessage(
            "Align your face inside the guide. Ensure good lighting and remove sunglasses."
          )
        );
      }
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        dispatch(
          setCameraError(
            "Camera permission was denied. Allow camera access in your browser settings and try again."
          )
        );
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        dispatch(setCameraError("No camera was found on this device."));
      } else {
        dispatch(
          setCameraError("Unable to start the camera. Check permissions and try again.")
        );
      }
    }
  }, [dispatch, facingMode, stopCamera]);

  useEffect(() => {
    if (!previewUrl) {
      void startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [facingMode, previewUrl, startCamera, stopCamera]);

  const previewUrlRef = useRef<string | null>(null);
  previewUrlRef.current = previewUrl;

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      stopCamera();
    };
  }, [stopCamera]);

  function capture() {
    const video = videoRef.current;
    if (!video || !ready) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        blobRef.current = blob;
        const url = URL.createObjectURL(blob);
        dispatch(setSelfiePreview(url));
        stopCamera();
        dispatch(setLivenessMessage("Review your capture. Retake if the face is unclear."));
      },
      "image/jpeg",
      0.92
    );
  }

  function retake() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    blobRef.current = null;
    dispatch(clearSelfiePreview());
  }

  function switchCamera() {
    dispatch(setFacingMode(facingMode === "user" ? "environment" : "user"));
  }

  async function handleContinue() {
    if (!verificationId) {
      dispatch(setError("Missing verification session. Restart from consent."));
      return;
    }
    if (!blobRef.current) {
      dispatch(setError("Please capture your face photo before continuing."));
      return;
    }

    dispatch(setIsSubmitting(true));
    dispatch(setError(null));

    try {
      const file = new File([blobRef.current], "selfie.jpg", {
        type: "image/jpeg",
      });
      await uploadSelfie(verificationId, file);
      dispatch(setCurrentStep(3));
      dispatch(setStatus("verifying"));
    } catch (err) {
      const message =
        err instanceof ApiClientError
          ? err.message
          : "Biometric upload failed. Please try again.";
      dispatch(setError(message));
    } finally {
      dispatch(setIsSubmitting(false));
    }
  }

  return (
    <Card className="relative overflow-hidden border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-elevated)]/90 via-[var(--surface)]/95 to-[var(--background-elevated)]/95 backdrop-blur-2xl">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/[0.05] blur-3xl"
        aria-hidden
      />

      <CardContent className="space-y-6 p-6 sm:p-8">
        {intelligence &&
        (intelligence.extractedName ||
          intelligence.detectedType ||
          intelligence.warnings.length > 0 ||
          intelligence.needsReview) ? (
          <Alert
            variant={intelligence.needsReview ? "warning" : "info"}
            className="text-sm"
            title="Document check"
          >
            <div className="space-y-1">
              {intelligence.detectedType ? (
                <p>
                  Detected document: <strong>{intelligence.detectedType}</strong>
                  {intelligence.extractedName
                    ? ` · ${intelligence.extractedName}`
                    : null}
                </p>
              ) : null}
              {intelligence.needsReview ? (
                <p>This document is flagged for additional review after face match.</p>
              ) : null}
              {intelligence.warnings.map((w) => (
                <p key={w}>{w}</p>
              ))}
            </div>
          </Alert>
        ) : null}
        <LivenessCheck />

        {/* Biometric Camera Viewport */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-black shadow-2xl sm:aspect-video">
          {previewUrl ? (
            <div className="relative h-full w-full">
              {/* Captured Preview */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Captured selfie preview"
                className="h-full w-full object-cover"
              />

              {/* Verified Capture Badge Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/70 px-3 py-1 text-xs text-emerald-400 backdrop-blur-md">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Biometric Capture Locked</span>
                </div>
                <div className="rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] text-[var(--muted-strong)] backdrop-blur-md">
                  Passive Liveness OK
                </div>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                playsInline
                muted
                className="h-full w-full object-cover"
                style={{ transform: facingMode === "user" ? "scaleX(-1)" : undefined }}
              />
              <FaceGuide />

              {/* Real-time Camera HUD Top Overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] text-white backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>3D Liveness Active</span>
                </div>
                <div className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] text-[var(--muted)] backdrop-blur-md">
                  {facingMode === "user" ? "Front Camera" : "Rear Camera"}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Camera or Upload Error */}
        {(cameraError || error) && (
          <Alert variant="danger" title="Biometric Camera Issue">
            {cameraError || error}
          </Alert>
        )}

        {/* Controls */}
        <div className="space-y-4 pt-1">
          {!previewUrl ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Primary Shutter Button */}
              <Button
                type="button"
                size="lg"
                onClick={capture}
                disabled={!ready}
                className="group relative h-13 flex-1 overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-base font-semibold text-black shadow-[0_8px_30px_rgba(110,231,183,0.25)] hover:shadow-[0_12px_40px_rgba(110,231,183,0.35)] hover:brightness-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <Camera className="h-5 w-5" aria-hidden />
                  <span>Capture Biometric Face</span>
                </span>
              </Button>

              {/* Secondary Options */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="h-13 px-4"
                  onClick={switchCamera}
                  title="Switch Front/Rear Camera"
                >
                  <SwitchCamera className="h-4 w-4" aria-hidden />
                  <span className="hidden sm:inline">Flip</span>
                </Button>
                {cameraError && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-13"
                    onClick={() => void startCamera()}
                  >
                    Retry Camera
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="h-13 gap-2"
                onClick={retake}
              >
                <RefreshCcw className="h-4 w-4" aria-hidden />
                <span>Retake Capture</span>
              </Button>

              <Button
                type="button"
                size="lg"
                className="group relative h-13 flex-1 overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-base font-semibold text-black shadow-[0_8px_30px_rgba(110,231,183,0.25)] hover:shadow-[0_12px_40px_rgba(110,231,183,0.35)] hover:brightness-105"
                onClick={handleContinue}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing Biometrics...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Continue to AI Verification</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* Biometric Privacy Callout */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-[var(--muted)]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Face geometry is processed in memory and never stored permanently.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

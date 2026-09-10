# Trustora

Premium AI-powered identity and face verification platform.

## Architecture

```text
frontend/   Next.js (App Router) + Redux Toolkit + Framer Motion
backend/    ASP.NET Core clean architecture
  Api/ Application/ Domain/ Infrastructure/ AI/ Tests/
docker/     Dockerfiles for local development
```

Verification pipeline (server-side only):

```text
Document/Selfie → Face Detection → Landmarks → Alignment → Embedding → Comparison + Liveness → Decision
```

Embeddings and raw biometric images are never returned to the frontend.

## Brand

**Trustora** — Identity Verification

## Prerequisites

- Node.js 20+
- .NET 10 SDK
- Neon PostgreSQL (production DB)
- Cloudinary account (recommended for secure temp storage)

## Quick start

### 1. Environment

Copy `.env.example` to a local env file and fill secrets. Never commit real credentials.

Frontend:

```bash
cd frontend
cp .env.local.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5080
```

Backend local secrets (`backend/Api/appsettings.Development.Local.json`, gitignored):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=...; Database=trustora; Username=...; Password=...; SSL Mode=Require; Trust Server Certificate=true"
  },
  "Storage": {
    "Provider": "cloudinary",
    "Cloudinary": {
      "CloudName": "...",
      "ApiKey": "...",
      "ApiSecret": "...",
      "Folder": "trustora/verification",
      "AccessMode": "authenticated"
    }
  }
}
```

### 2. Database (Neon)

```bash
cd backend
dotnet ef database update --project Infrastructure/Trustora.Infrastructure.csproj --startup-project Api/Trustora.Api.csproj
```

In Development, the API also applies migrations on startup when a Postgres connection string is set.

### 3. Run API

```bash
cd backend/Api
dotnet run --urls http://localhost:5080
```

Swagger: `http://localhost:5080/swagger`

### 4. Run frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`

## Face matching (free, local ONNX)

Trustora uses **FaceAiSharp** (SCRFD detection + ArcFace embeddings) via `Microsoft.ML.OnnxRuntime`. Models ship with the NuGet package — **no paid cloud Face API** and no mock always-success path.

| Same person (cosine ≥ `SimilarityThreshold`, default 0.42) | `VERIFIED` |
| Different people (≤ ~0.28) | `FAILED` |
| Borderline (review band) | `REVIEW_REQUIRED` |

Liveness v1 is **passive** image-quality heuristics (not ML anti-spoof).

Ensure the API host has the `Microsoft.ML.OnnxRuntime` native assets (referenced from the AI project).

## Document intelligence (Gemini)

Optional **Google Gemini** vision analysis runs after document face detection:

- Classify document type
- Extract name / DOB / ID number (when readable)
- Flag poor capture → fail (`DOCUMENT_QUALITY_LOW`)
- Flag high tamper risk → fail (`DOCUMENT_TAMPER_SUSPECTED`)
- Medium tamper or type mismatch → `DocumentNeedsReview` → final status `REVIEW_REQUIRED` even if faces match

Config (`Gemini` section / env):

```
Gemini__Enabled=true
Gemini__ApiKey=YOUR_GOOGLE_AI_STUDIO_KEY
Gemini__Model=gemini-2.0-flash
```

If the API key is missing, document intelligence is skipped and face matching continues alone.

## Storage providers

| Provider | Config | Notes |
|----------|--------|-------|
| `local` | `Storage__Provider=local` | Temp disk under `Storage__TempPath` |
| `cloudinary` | `Storage__Provider=cloudinary` | Authenticated (non-public) uploads; deleted after verification |

Identity documents are never exposed via public URLs.

## API overview

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/verification/start` | Start session (requires consent) |
| POST | `/api/verification/{id}/document` | Upload ID document |
| POST | `/api/verification/{id}/selfie` | Upload selfie |
| POST | `/api/verification/{id}/verify` | Run liveness + comparison |
| GET | `/api/verification/{id}/result` | Get result (no embeddings) |

Response envelope:

```json
{ "success": true, "data": {}, "error": null }
```

## Decision thresholds

Configured under `FaceVerification` (not exposed to clients):

- `SimilarityThreshold` — VERIFIED
- `ReviewThreshold` — REVIEW_REQUIRED band
- `FailureThreshold` — hard fail band
- `LivenessThreshold`

Calibrate against the selected recognition model and real validation data.

## Security & privacy

- MIME + magic-byte validation, size and dimension checks
- Rate limiting on start/upload/verify
- Session expiration
- Temp images deleted after verification
- Structured audit events without images/embeddings
- Secrets via environment / local config only

## Testing

```bash
cd backend
dotnet test
```

## Docker

```bash
docker compose up --build
```

## Project layout

See `frontend/` and `backend/` for full source. Primary user routes: `/`, `/verify`, `/privacy`, `/terms`.

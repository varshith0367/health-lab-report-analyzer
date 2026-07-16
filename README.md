# Health Lab Report Analyzer & Tracker

An end-to-end, high-fidelity full-stack web application that translates raw medical laboratory reports (PDFs, scans, and image uploads) into visually intuitive health dashboards, biomarker thresholds, and longitudinal trend lines.

## Production Deployment Instructions

This application is fully production-ready and can be deployed instantly to Render, Heroku, or any standard Node.js container hosting platform.

### Environment Setup

Create the following environment variables on your hosting provider:

1. **`GEMINI_API_KEY`**: Obtain a standard Gemini API Key from Google AI Studio.
2. **`PASSWORD_SALT`**: Specify a secure, random string (e.g., 32-character hex) to serve as the PBKDF2 hashing salt for securing user credentials.
3. **`NODE_ENV`**: Set to `production` to compile optimized frontend bundles and enable static distribution.
4. **`PORT`**: Automatically handled by most hosting environments (e.g., Render binds to this dynamically).

### Deploying on Render

To deploy using our custom Blueprint specification:

1. Connect your GitHub repository to Render.
2. Select the blueprint instance or create a new **Web Service**.
3. Choose the **Node** runtime.
4. Set the build command to `npm install && npm run build`.
5. Set the start command to `npm run start`.
6. Add your environment variables in the **Environment** settings panel.


## Technical Architecture & Core Pipelines

```
Upload (PDF/Image) 
  → Multi-modal OCR Extraction (Gemini 3.5 Flash) 
  → JSON Validation & Schema Calibration 
  → Relational Storage (database.json)
  → Dynamic Trend Synthesis (Recharts Visualizations)
  → Secure Patient Control Deck & Export-to-PDF
```

### 1. Document Extraction & OCR Pipeline
- **Multimodal ingestion**: Accepts PDF, PNG, JPG, and JPEG. Files are handled client-side via FileReader, converted to raw base64 arrays, and routed to the Express service.
- **Multimodal AI Pathology**: Employs **Gemini 3.5 Flash** server-side, utilizing specialized pathologist system instructions and a strict strict JSON schema structure.
- **Auto-Correction & Validate**: Validates output boundaries. Includes a robust 3-try retry logic if any format discrepancies occur.

### 2. Clinical Biomarker Safe-Range Mapping
- **Range Parsing**: Parses reference limits (e.g., `70 - 99`, `< 130`, `> 50`) dynamically.
- **Interactive Gauges**: Computes percentage offsets and renders color-coded horizontal slider bars indicating whether biomarker measurements are High, Low, or optimal.

### 3. Longitudinal Trend Analysis
- **Chronological Alignment**: Aggregates historic data across all saved lab reports chronologically.
- **Fluctuation Modeling**: Models biomarker progression slopes and speed, warning users when multi-point velocity is climbing, stable, or falling.

### 4. Patient Account Security & Session Management
- **Stateless Session Control**: Standard cookie session states signed server-side via custom cryptographic salts.
- **Password Hashing**: Implements standard cryptographic hashing (PBKDF2 with Node's native `crypto` module), bypassing complex native binding errors.

---

## Folder Structure

```
├── database.json            # Auto-generated database storage file
├── metadata.json            # AI Studio app metadata configurations
├── package.json             # Core dependencies & full-stack bundle scripts
├── server.ts                # Entry-point Express server & Vite development gateway
├── tsconfig.json            # Strict TypeScript compiler configurations
├── vite.config.ts           # Vite asset & compiler bundle settings
└── src/
    ├── App.tsx              # React SPA controller & router views
    ├── index.css            # Custom typography (Space Grotesk, Inter, Mono)
    ├── main.tsx             # DOM entry point
    ├── types.ts             # Strict TypeScript data schemas (User, Report, Biomarker)
    ├── components/
    │   ├── Layout.tsx       # Smooth framer-motion page entry transitions
    │   ├── Navbar.tsx       # Interactive top header navigation index
    │   ├── ReportUploader.tsx # Drag-and-drop uploader with loading progress
    │   ├── BiomarkerCard.tsx  # Interactive biomarkers card with range sliders
    │   └── TrendChart.tsx   # Recharts trend curves and slope trackers
    └── server/
        ├── auth.ts          # Session validator & cookie parsers
        ├── db.ts            # High-performance local JSON-file adapter
        └── gemini.ts        # Gemini AI PDF OCR & Pathology pipeline
```

---

## Production Compilation & Deployment

This workspace is fully aligned with production container configurations:

- **Build Script**: `npm run build`
  - Compiles standard React client assets to `dist/`.
  - Bundles the Express `server.ts` into a standalone CommonJS `dist/server.cjs` file via `esbuild`.
- **Start Script**: `npm run start`
  - Instantly launches the pre-compiled Express service on `0.0.0.0:3000` for smooth container ingress.

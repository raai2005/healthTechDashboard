# Tech.Care — Patient Dashboard

> **Coalition Technologies Front-End Skills Test**
> Convert an Adobe XD design into a working, single-page responsive dashboard that displays patient data fetched from a REST API.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Design Reference](#design-reference)
3. [API Reference](#api-reference)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Component Architecture](#component-architecture)
7. [Design System & Tokens](#design-system--tokens)
8. [Data Flow](#data-flow)
9. [Key Implementation Details](#key-implementation-details)
10. [Getting Started](#getting-started)
11. [Build & Submission](#build--submission)
12. [Scope & Out-of-Scope](#scope--out-of-scope)

---

## Project Overview

| Item           | Detail                                                                            |
| -------------- | --------------------------------------------------------------------------------- |
| **Objective**  | Convert Adobe XD template → HTML/React, populate via API                          |
| **Template**   | [Adobe XD Link](https://xd.adobe.com/view/3f9ab587-7536-4db8-a7dd-64d474e10867-6ac9/?hints=off) |
| **API Docs**   | [Postman Docs](https://documenter.getpostman.com/view/11861104/2sA35G42ve)        |
| **Target Patient** | **Jessica Taylor** — only her data needs to be rendered                       |
| **Charting**   | [Chart.js](https://www.chartjs.org/) via `react-chartjs-2`                        |

---

## Design Reference

The Adobe XD template defines a **three-column desktop layout** with responsive mobile behaviour:

### Desktop Layout (≥ 1024 px)

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]   Overview  [Patients]  Schedule  Message  Transactions  │
│                                         Dr. Jose Simmons  ⚙ ⋮    │
├────────────┬──────────────────────────────┬──────────────────────┤
│            │                              │                      │
│  Patients  │   Diagnosis History          │   [Profile Photo]    │
│  (sidebar) │                              │   Jessica Taylor     │
│            │   ┌─ Blood Pressure ───────┐ │                      │
│  Emily W.  │   │  Line Chart            │ │   Date Of Birth      │
│  Ryan J.   │   │  (Systolic / Diastolic)│ │   August 23, 1996    │
│  Brandon M.│   │  Last 6 months         │ │                      │
│ [Jessica T]│   └────────────────────────┘ │   Gender             │
│  Samantha  │                              │   Female             │
│  Ashley M. │   ┌──────┬──────┬──────┐     │                      │
│  Olivia B. │   │Resp  │Temp  │Heart │     │   Contact Info.      │
│  Tyler D.  │   │Rate  │      │Rate  │     │   (415) 555-1234     │
│  Kevin A.  │   │20bpm │98.6°F│78bpm │     │                      │
│  Dylan T.  │   └──────┴──────┴──────┘     │   Emergency Contacts │
│  Nathan E. │                              │   (415) 555-5678     │
│  Mike N.   │   Diagnostic List            │                      │
│            │   ┌────────┬────────┬─────┐  │   Insurance Provider │
│            │   │Problem │Desc    │Stat │  │   Sunrise Health     │
│            │   │--------│--------│-----│  │                      │
│            │   │Hyper.. │Chronic │Under│  │   [Show All Info]    │
│            │   │Type 2..│Insulin │Cured│  │                      │
│            │   │Asthma  │Recurr. │Inac.│  ├──────────────────────┤
│            │   └────────┴────────┴─────┘  │   Lab Results        │
│            │                              │   Blood Tests    ↓   │
│            │                              │   CT Scans       ↓   │
│            │                              │   Radiology      ↓   │
│            │                              │   X-Rays         ↓   │
│            │                              │   Urine Test     ↓   │
└────────────┴──────────────────────────────┴──────────────────────┘
```

### Mobile Layout (< 1024 px)

- **Sidebar** is hidden; patients accessible via a slide-out **drawer** (hamburger / patients icon).
- **Patient summary card** shows at top (photo, name, age, alert badges).
- **Vital cards** render in a **2 × 2 compact grid** above the chart.
- **Profile** section collapses into an **accordion** toggle.
- **Lab Results** uses an **accordion** per item.

---

## API Reference

### Endpoint

```
GET https://fedskillstest.coalitiontechnologies.workers.dev
```

### Authentication

HTTP Basic Auth:

| Field      | Value          |
| ---------- | -------------- |
| `username` | `coalition`    |
| `password` | `skills-test`  |

### Response Shape

Returns `Array<Patient>`. Each patient object:

```jsonc
{
  "name": "Jessica Taylor",            // string
  "gender": "Female",                   // "Male" | "Female"
  "age": 28,                            // number
  "profile_picture": "https://…/4.png", // URL string
  "date_of_birth": "1996-08-23",        // date string (varies: "8/23/1996" or ISO)
  "phone_number": "(415) 555-1234",     // string
  "emergency_contact": "(415) 555-5678",// string
  "insurance_type": "Sunrise Health Assurance", // string

  "diagnosis_history": [
    {
      "month": "March",                 // full month name
      "year": 2024,                     // 4-digit year
      "blood_pressure": {
        "systolic":  { "value": 160, "levels": "Higher than Average" },
        "diastolic": { "value": 78,  "levels": "Lower than Average" }
      },
      "heart_rate":       { "value": 78,   "levels": "Lower than Average" },
      "respiratory_rate": { "value": 20,   "levels": "Normal" },
      "temperature":      { "value": 98.6, "levels": "Normal" }
    }
    // ... additional months (newest first)
  ],

  "diagnostic_list": [
    {
      "name": "Hypertension",
      "description": "Chronic high blood pressure",
      "status": "Under Observation"      // "Under Observation" | "Cured" | "Inactive"
    }
    // ... additional diagnostics
  ],

  "lab_results": [
    "Blood Tests",
    "CT Scans",
    "Radiology Reports",
    "X-Rays",
    "Urine Test"
  ]
}
```

### Important Notes on API Data

- `diagnosis_history` is sorted **newest → oldest**; the chart displays the **last 6 months reversed** (oldest → newest, left → right).
- `date_of_birth` format may vary between `"M/D/YYYY"` and ISO `"YYYY-MM-DD"` across patients — the `formatDate()` helper in `Profile.jsx` handles this.
- The `levels` field in vitals uses one of: `"Normal"`, `"Higher than Average"`, `"Lower than Average"`.

---

## Tech Stack

| Technology         | Version  | Purpose                                         |
| ------------------ | -------- | ----------------------------------------------- |
| **React**          | 19.x     | UI framework                                    |
| **Vite**           | 8.x      | Build tool & dev server                         |
| **Tailwind CSS**   | 4.x      | Utility-first styling (via `@tailwindcss/vite`) |
| **Chart.js**       | 4.x      | Blood pressure line chart                       |
| **react-chartjs-2**| 5.x      | React wrapper for Chart.js                      |
| **Axios**          | 1.x      | HTTP client with Basic Auth support             |
| **Manrope**        | —        | Google Font (400–800 weights)                   |

---

## Project Structure

```
patient-dashboard/
├── index.html                  # HTML entry point (loads Manrope font, root div)
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite + React + Tailwind plugin config
│
├── public/
│   ├── favicon.svg             # Browser tab icon
│   ├── icons.svg               # Inline SVG icon sprite
│   └── assets/                 # Static images & icons
│       ├── logo.svg            #   Tech.Care brand logo
│       ├── avatar.png          #   Dr. Jose Simmons avatar
│       ├── search.png          #   Search icon
│       ├── home.svg            #   Nav: Overview
│       ├── group.svg           #   Nav: Patients
│       ├── calendar.svg        #   Nav: Schedule
│       ├── chat.svg            #   Nav: Message
│       ├── creditcard.svg      #   Nav: Transactions
│       ├── gear.svg            #   Settings icon
│       ├── elipses.svg         #   More menu (…)
│       ├── download.png        #   Chart dropdown caret
│       ├── HeartBPM.png        #   Heart rate vital icon
│       ├── respiratory_rate.png#   Respiratory rate icon
│       ├── temperature.png     #   Temperature icon
│       ├── BirthIcon.svg       #   Profile: DOB icon
│       ├── FemaleIcon.svg      #   Profile: Gender icon
│       ├── PhoneIcon.svg       #   Profile: Phone/Emergency icon
│       └── InsuranceIcon.svg   #   Profile: Insurance icon
│
├── src/
│   ├── main.jsx                # React root (StrictMode)
│   ├── index.css               # Tailwind import, design tokens, custom utilities
│   ├── App.css                 # Legacy Vite boilerplate styles (unused)
│   ├── App.jsx                 # Root component — data fetching & layout
│   │
│   ├── services/
│   │   └── api.js              # Axios instance (baseURL + Basic Auth)
│   │
│   ├── components/
│   │   ├── Header.jsx          # Top navigation bar (logo, nav, doctor profile)
│   │   ├── Sidebar.jsx         # Left patient list (desktop & drawer mode)
│   │   ├── PatientDrawer.jsx   # Mobile slide-out overlay wrapping Sidebar
│   │   ├── PatientSummary.jsx  # Mobile-only patient card with alert badges
│   │   ├── Dashboard.jsx       # Center column: chart + vital cards + diagnostics
│   │   ├── DiagnosticList.jsx  # Table of diagnoses (cards on mobile, table on desktop)
│   │   ├── Profile.jsx         # Right column: patient profile & demographics
│   │   └── LabResults.jsx      # Right column: downloadable lab results list
│   │
│   └── assets/
│       ├── hero.png            # (Unused boilerplate)
│       ├── react.svg           # (Unused boilerplate)
│       └── vite.svg            # (Unused boilerplate)
│
└── dist/                       # Production build output (vite build)
    ├── index.html
    ├── favicon.svg
    ├── icons.svg
    └── assets/                 # Hashed JS/CSS bundles + copied static assets
```

---

## Component Architecture

```
App
├── Header                     (nav bar — static, no interaction logic needed)
│
├── Sidebar                    (desktop only — patient list, highlight selected)
│
├── PatientSummary             (mobile only — quick glance card)
│
├── Dashboard
│   ├── BloodPressureChart     (Chart.js line chart — systolic/diastolic)
│   ├── CompactBPCard          (mobile — BP summary tile)
│   ├── CompactVitalCard ×3    (mobile — heart/temp/resp tiles)
│   ├── VitalCard ×3           (desktop — large vital tiles w/ trend icons)
│   └── DiagnosticList         (table/cards of diagnoses)
│
├── Profile                    (demographics — expandable on mobile)
│
├── LabResults                 (list with download icons — accordion on mobile)
│
└── PatientDrawer              (mobile overlay — reuses Sidebar component)
```

### Props Flow

```
App (state: patients[], selectedPatient, loading, error)
 │
 ├─► Header          props: { onOpenPatients }
 ├─► Sidebar         props: { patients, selectedPatient, onSelect }
 ├─► PatientSummary  props: { patient }
 ├─► Dashboard       props: { patient }
 ├─► Profile         props: { patient }
 ├─► LabResults      props: { results: patient.lab_results }
 └─► PatientDrawer   props: { isOpen, onClose, patients, selectedPatient, onSelect }
```

---

## Design System & Tokens

Defined in `src/index.css` via Tailwind's `@theme` directive:

### Colors

| Token              | Value     | Usage                              |
| ------------------ | --------- | ---------------------------------- |
| `--color-primary`  | `#01F0D0` | Active nav pill, CTA buttons       |
| `--color-primary-light` | `#D8FCF7` | Selected patient row bg       |
| `--color-dark`     | `#072635` | Primary text, headings             |
| `--color-gray-text`| `#707070` | Secondary/muted text               |
| `--color-bg`       | `#F6F7F8` | Page background, card backgrounds  |
| `--color-systolic` | `#E66FD2` | Systolic chart line (pink)         |
| `--color-diastolic`| `#8C6FE6` | Diastolic chart line (purple)      |
| `--color-bp-bg`    | `#F4F0FA` | Blood pressure chart container bg  |
| `--color-respiratory-bg` | `#E0F3FA` | Respiratory rate card bg     |
| `--color-temperature-bg` | `#FFE6E9` | Temperature card bg          |
| `--color-heart-bg` | `#FFE6F1` | Heart rate card bg                 |

### Typography

| Property   | Value                              |
| ---------- | ---------------------------------- |
| Font       | **Manrope** (Google Fonts)         |
| Weights    | 400, 500, 600, 700, 800            |
| Fallbacks  | `system-ui`, `sans-serif`          |

### Layout Dimensions

| Token                      | Value    | Usage                        |
| -------------------------- | -------- | ---------------------------- |
| `--height-diagnostic-list` | `172px`  | Desktop diagnostic scroll    |
| `--height-lab-results`     | `200px`  | Desktop lab results scroll   |
| `--height-patient-list`    | `812px`  | Desktop sidebar scroll       |

### Custom Scrollbar

Applied via `.scrollbar-thin` utility class — 6 px wide, dark thumb (`#072635`), transparent track.

---

## Data Flow

```
                                    ┌─────────────────────┐
                                    │  Coalition API      │
                                    │  (Basic Auth)       │
                                    └────────┬────────────┘
                                             │ GET /
                                             ▼
                                  ┌──────────────────────────┐
                                  │  api.js (Axios instance) │
                                  │  baseURL + auth headers  │
                                  └────────────┬─────────────┘
                                               │ response.data
                                               ▼
                                  ┌──────────────────────────┐
                                  │  App.jsx                 │
                                  │  ┌─ patients[]           │
                                  │  ├─ selectedPatient      │◄─── .find("Jessica Taylor")
                                  │  ├─ loading              │
                                  │  └─ error                │
                                  └────────────┬─────────────┘
                                               │ props
                        ┌──────────────────────┼─────────────────────┐
                        ▼                      ▼                     ▼
                  Left Column          Center Column          Right Column
                  (Sidebar)            (Dashboard)            (Profile + Labs)
```

### Key Behaviours

1. **On mount** → `fetchPatients()` calls `api.get("/")` → stores full array.
2. **Auto-select** → `Jessica Taylor` is found and set as `selectedPatient`.
3. **Patient switching** → clicking a sidebar row calls `onSelect(patient)` → updates `selectedPatient` → all child components re-render.
4. **Loading / Error** → Full-screen centered states with appropriate messages.

---

## Key Implementation Details

### Blood Pressure Chart (`Dashboard.jsx`)

- **Library**: Chart.js 4 + `react-chartjs-2`
- **Registered modules**: `CategoryScale`, `LinearScale`, `PointElement`, `LineElement`, `Filler`, `Tooltip`
- **Data preparation**:
  - Takes the first 6 entries from `diagnosis_history` (most recent), then reverses for chronological order
  - Labels formatted as `"Oct, 2023"` (3-letter month + year)
- **Styling**:
  - Systolic line: `#E66FD2` (pink)
  - Diastolic line: `#8C6FE6` (purple)
  - Y-axis: 60–180, step 20
  - Bezier tension: `0.4` (smooth curves)
  - Grid: horizontal only, color `#CBC8D4`
  - Point radius: 5, hover radius: 6

### Vital Cards

- **Desktop**: 3 large cards (`VitalCard`) in a `grid-cols-3` layout with 96 × 96 px icons, trend arrows.
- **Mobile**: 2 × 2 compact grid (`CompactBPCard` + `CompactVitalCard` × 3) shown above the chart.
- **Trend Arrows**: `TrendIcon` renders SVG triangle — `up` for "Higher", `down` for "Lower", hidden for "Normal".

### Responsive Breakpoints

| Breakpoint | Tailwind Prefix | Layout Change                                      |
| ---------- | --------------- | -------------------------------------------------- |
| < 640 px   | (default)       | Single column, compact spacing                     |
| ≥ 640 px   | `sm:`           | Slightly larger padding, larger chart height       |
| ≥ 1024 px  | `lg:`           | Three-column layout, desktop header, vitals grid   |
| ≥ 1280 px  | `xl:`           | Wider sidebar, pill-shaped header                  |

### Profile Section (`Profile.jsx`)

- **Desktop**: Full profile card — large circular avatar (200 × 200), demographics list, "Show All Information" button.
- **Mobile**: Collapsible accordion — toggle with chevron, expands to show same demographics.
- **Date formatting**: `formatDate()` handles `"M/D/YYYY"` format → `toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })`.

### Diagnostic List (`DiagnosticList.jsx`)

- **Desktop**: CSS Grid table (`grid-cols-[1.1fr_1.6fr_0.9fr]`) with header row and scrollable body.
- **Mobile**: Stacked card layout, each card showing name, description, and status.
- **Scrolling**: Constrained to `172px` height on desktop via `.scroll-diagnostic-3`.

### Lab Results (`LabResults.jsx`)

- **Desktop**: Simple scrollable list (constrained to `200px`) with hover state and download icon per row.
- **Mobile**: Accordion pattern — tap to expand, reveals download button.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or pnpm / yarn)

### Install & Run

```bash
# Navigate to project
cd patient-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **`http://localhost:5173`**.

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — includes `index.html` and hashed bundles in `dist/assets/`.

### Preview Production Build

```bash
npm run preview
```

---

## Build & Submission

### Submission Checklist

- [x] **Source files included** — all `.jsx`, `.css`, `.js` files (not just minified bundles)
- [x] **HTML file included** — `index.html` at project root & `dist/index.html` after build
- [x] **Jessica Taylor data displayed** — auto-selected on page load
- [x] **Blood Pressure chart** — Chart.js line chart with systolic/diastolic over 6 months
- [x] **Vital signs cards** — Respiratory Rate, Temperature, Heart Rate with status labels
- [x] **Diagnostic List** — table on desktop, cards on mobile
- [x] **Patient Profile** — avatar, name, DOB, gender, phone, emergency contact, insurance
- [x] **Lab Results** — scrollable list with download icons
- [x] **Responsive design** — mobile-first with desktop three-column layout
- [x] **API integration** — live data from Coalition Technologies API with Basic Auth

### Creating the ZIP

```bash
# From the parent directory of patient-dashboard
# Include source + build, exclude node_modules
zip -r patient-dashboard-submission.zip patient-dashboard/ -x "patient-dashboard/node_modules/*"
```

Or on **Windows PowerShell**:

```powershell
Compress-Archive -Path .\patient-dashboard\* -DestinationPath .\patient-dashboard-submission.zip
# Note: manually exclude node_modules or delete it first
```

---

## Scope & Out-of-Scope

### ✅ In Scope

| Feature                       | Status      |
| ----------------------------- | ----------- |
| Jessica Taylor data display   | Implemented |
| Blood Pressure line chart     | Implemented |
| Vital signs cards             | Implemented |
| Diagnostic list table/cards   | Implemented |
| Patient profile sidebar       | Implemented |
| Lab results list              | Implemented |
| Responsive layout             | Implemented |
| API GET with Basic Auth       | Implemented |
| Patient list sidebar          | Implemented |
| Patient switching             | Implemented |
| Mobile drawer for patients    | Implemented |

### ❌ Out of Scope (per instructions)

| Feature                                     | Reason                                            |
| ------------------------------------------- | ------------------------------------------------- |
| Search button logic & interaction           | Explicitly excluded — decorative only             |
| Settings gear dropdown                      | Explicitly excluded — no template interaction     |
| Ellipsis (…) menu interaction               | Explicitly excluded — no template interaction     |
| "Show All Information" button logic         | No target page defined in template                |
| Download button file logic                  | No actual files to download                       |
| "Last 6 months" dropdown filter             | Static display only                               |
| Nav item routing (Overview, Schedule, etc.) | Single-page display only                          |

---

## Notes for Reviewers

1. **Best Practices Applied**:
   - Semantic HTML (`<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`)
   - Accessible attributes (`aria-label`, `aria-hidden`, `alt` texts)
   - Component-based architecture with clear separation of concerns
   - No prop drilling beyond one level — flat component tree

2. **Design Fidelity**:
   - Colors, fonts, spacing, and border radii match the Adobe XD template
   - Chart styling (line colors, curve tension, grid, axis) follows the reference
   - Scrollbar styling matches the dark thin-thumb pattern from the template
   - Three-column layout with exact column widths (`367px` sidebar, `367px` profile)

3. **Performance**:
   - Single API call on mount, no polling
   - Chart.js tree-shaken (only required modules registered)
   - Vite production build with code splitting and asset hashing

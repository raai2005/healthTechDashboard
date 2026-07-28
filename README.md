# Tech.Care Patient Dashboard

A responsive healthcare dashboard built from the Coalition Technologies Adobe XD design. It fetches live patient data from the Coalition Patient Data API and displays health metrics, diagnosis history, and profile details for **Jessica Taylor**.

---

## Objective

The goal of this project is to:

1. **Convert the Adobe XD template** into a functional, pixel-accurate web UI.
2. **Integrate the Coalition Technologies Patient Data API** to populate the dashboard with real data.
3. **Visualize patient health data** — especially blood pressure trends over the last 6 months using Chart.js.
4. **Focus on Jessica Taylor** as the primary patient, per the skills test requirements.
5. **Avoid unnecessary interactions** (search logic, settings dropdowns, menu actions) that are not part of the design.

This is a single-page application that presents a doctor's view of a patient's medical dashboard.

---

## What Is Done

### UI Sections

| Section | Location | Description |
|---------|----------|-------------|
| **Header** | Top | Tech.Care logo, navigation (Overview, Patients, Schedule, Message, Transactions), Dr. Jose Simmons profile |
| **Patient List** | Left sidebar | Scrollable list of all patients with search icon; selected patient highlighted in teal |
| **Diagnosis History** | Center | Blood pressure line chart, systolic/diastolic stats, vital sign cards |
| **Patient Profile** | Right sidebar | Photo, personal info, insurance, emergency contacts |

### Features Implemented

- Live API integration with Basic Authentication
- Auto-selection of **Jessica Taylor** on page load
- Interactive blood pressure chart (Systolic & Diastolic, last 6 months)
- Vital signs cards: Respiratory Rate, Temperature, Heart Rate
- Loading and error states
- Custom scrollbar styling for patient list
- Responsive layout using Tailwind CSS

### Intentionally Not Implemented

Per the skills test guidelines, the following were **not** built:

- Search button functionality
- Settings (gear) dropdown
- Three-dot menu interactions
- "Last 6 months" dropdown logic

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 (functional components + hooks) |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Charts** | Chart.js + react-chartjs-2 |
| **HTTP Client** | Axios |
| **Font** | Manrope (Google Fonts) |

---

## How It Works

### Architecture Overview

```
App.jsx
├── Fetches patient data from API on mount
├── Sets Jessica Taylor as selected patient
└── Renders layout:
    ├── Header.jsx          → Static navbar
    ├── Sidebar.jsx         → Patient list (all patients)
    ├── Dashboard.jsx       → Chart and vitals
    └── Profile.jsx         → Patient details
```

### Data Flow

1. **On load**, `App.jsx` calls `GET https://fedskillstest.coalitiontechnologies.workers.dev/` with Basic Auth.
2. The response is an array of patient objects. The app finds **Jessica Taylor** and sets her as `selectedPatient`.
3. **Sidebar** receives the full patient list for display; clicking a patient updates the selection.
4. **Dashboard** reads from `patient.diagnosis_history`:
   - Latest record → vitals and BP stats
   - Last 6 months → chart data
5. **Profile** reads profile fields for the patient detail panel.

### API Data Mapping

| API Field | UI Usage |
|-----------|----------|
| `profile_picture` | Patient photo in sidebar and profile |
| `name`, `gender`, `age` | Patient list and profile header |
| `date_of_birth` | Formatted as "August 23, 1996" |
| `phone_number`, `emergency_contact` | Contact info rows |
| `insurance_type` | Insurance provider row |
| `diagnosis_history[0]` | Latest vitals and BP stats |
| `diagnosis_history` (6 items) | Blood pressure chart |

### Project Structure

```
patient-dashboard/
├── public/
│   └── assets/              # Icons, logos, vital sign images
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Top navigation bar
│   │   ├── Sidebar.jsx      # Patient list
│   │   ├── Dashboard.jsx    # Chart and vitals
│   │   └── Profile.jsx      # Patient details
│   ├── services/
│   │   └── api.js           # Axios instance with Basic Auth
│   ├── App.jsx              # Main layout and data fetching
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind + custom theme
├── index.html
├── vite.config.js
└── package.json
```

---

## Running the Project

### Prerequisites

- **Node.js** 18+ (recommended)
- **npm** (comes with Node.js)

### Installation

```bash
# Navigate to the project folder
cd patient-dashboard

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production Build

```bash
npm run build
```

Output is written to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the built app locally for testing.

### Lint

```bash
npm run lint
```

---

## API Reference

| Property | Value |
|----------|-------|
| **Endpoint** | `https://fedskillstest.coalitiontechnologies.workers.dev` |
| **Method** | GET |
| **Authentication** | Basic Auth |
| **Username** | `coalition` |
| **Password** | `skills-test` |
| **Documentation** | [Postman API Docs](https://documenter.getpostman.com/view/11861104/2sA35G42ve) |

Credentials are configured in `src/services/api.js`.

---

## Design Reference

- **Adobe XD Template:** [View Design](https://xd.adobe.com/view/121254c9-532f-4772-a1ba-dfe529a96b39-4741/)
- **Chart Library:** [Chart.js](https://www.chartjs.org/)

### Color Palette

| Usage | Hex |
|-------|-----|
| Primary (teal) | `#01F0D0` |
| Selected row | `#D8FCF7` |
| Dark text | `#072635` |
| Gray text | `#707070` |
| Background | `#F6F7F8` |
| Systolic (chart) | `#E66FD2` |
| Diastolic (chart) | `#8C6FE6` |
| Blood pressure card | `#F4F0FA` |

---

## Screenshots

> Add screenshots of the running dashboard here after deployment or local run.

Suggested captures:

1. Full dashboard view (header + 3 columns)
2. Blood pressure chart close-up
3. Vital signs cards

---

## Notes

- The app displays data for **Jessica Taylor** by default. Other patients appear in the sidebar list and can be selected, but the skills test focuses on Jessica Taylor only.
- Assets (icons, images) are stored in `public/assets/`.
- Tailwind theme variables are defined in `src/index.css` under `@theme`.

---

## License

This project was built as part of the Coalition Technologies front-end skills assessment.

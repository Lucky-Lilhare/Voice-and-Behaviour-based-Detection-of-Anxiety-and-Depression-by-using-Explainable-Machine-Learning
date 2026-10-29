# Voice and Behaviour-based Detection of Anxiety and Depression Using Explainable Machine Learning (Nexora Platform)

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-Backend-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Fast%20Build-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![XAI](https://img.shields.io/badge/Explainable_AI-SHAP%20%2F%20LIME-FF6F00)](https://github.com/slundberg/shap)
[![Standard](https://img.shields.io/badge/Compliance-IEEE%207000%20%7C%20HIPAA-0052CC)](#clinical-governance--ethics)

**Nexora** is an academic and clinical neurotechnology platform for non-invasive, objective screening of anxiety and depressive states. It synthesizes dual-stream sensory inputs—synchronized acoustic speech prosody and affective facial Action Units (FACS)—coupled with SHAP (Shapley Additive exPlanations) for transparent, auditable clinical decision support.

---

## 🌟 Key Capabilities

- **Dual-Stream Sensory Pipeline**:
  - **Acoustic Prosody Stream**: In-browser client-side Digital Signal Processing (DSP) extracting fundamental frequency ($F_0$), micro-tremor pitch jitter, shimmer amplitude perturbation, pause ratios, and Mel-Frequency Cepstral Coefficients (MFCCs) conforming to the Geneva Minimalistic Acoustic Parameter Set (**eGeMAPS**).
  - **Behavioral Facial Dynamics**: Real-time 468 landmark facial mesh tracking via MediaPipe Vision to quantify Facial Action Coding System (**FACS**) units (AU04 Brow Lowerer, AU12 Zygomaticus, eye blink frequency, ocular gaze fixation, and 3D head pose stability).
- **Explainable Machine Learning (XAI)**:
  - Transparent feature attribution waterfall charts using **SHAP** and **LIME** to explain every assessment score quantitatively.
  - Zero "black-box" clinical ambiguity.
- **Interactive In-Browser DSP Sandbox**:
  - Live microphone test using browser-native Web Audio API (`AudioContext`, `AnalyserNode`) with real-time waveform visualization.
  - Fallback synthetic speech simulation for testing without microphone hardware.
- **Host Admin Portal with Secure Authentication**:
  - Protected admin dashboard (`/admin`) requiring username & password verification.
  - Live visitor telemetry (total visits, new vs. returning visitors).
  - Categorized management of User Enquiries, Feedback, and Issue Reports.
  - Formatted tabular database view matching MongoDB collections.
- **Academic Research & Clinical Evidence Hub (`/research`)**:
  - Peer-reviewed thesis credentials and benchmark comparisons against clinical datasets:
    - **DAIC-WOZ** (USC ICT, 88.4% Sensitivity, 0.89 AUC-ROC)
    - **AVEC 2019** (0.86 Pearson CCC)
    - **E-DAIC** (87.1% F1-score)
- **Guided Wellness & 24/7 Crisis Support**:
  - Integrated 4-7-8 and box breathing relaxation tools.
  - Instant access to emergency mental health helplines (988 Lifeline, Kiran Helpline India, Tele-MANAS).

---

## 🏗️ Repository Architecture

The project is structured with a decoupled, modular architecture:

```text
├── Backend/                    # Node.js / Express Backend & MongoDB API
│   ├── index.js                # Express REST API, Mongoose Models & Routes
│   ├── package.json            # Backend dependencies
│   ├── .env.example            # Backend environment configuration template
│   └── .env                    # (Ignored) Local MongoDB URI & secrets
│
├── Frontend/                   # React 19 + Vite + Tailwind CSS Client
│   ├── src/
│   │   ├── components/         # Reusable UI components & modals
│   │   │   ├── Navbar.jsx      # Navigation bar with live AI status
│   │   │   ├── Footer.jsx      # Research links and crisis hotline
│   │   │   ├── LiveVoiceBiomarkerSandbox.jsx # Real-time Web Audio DSP
│   │   │   └── ...
│   │   ├── pages/              # Application views & routes
│   │   │   ├── LandingPage.jsx # Hero, sandbox, FAQ, compliance
│   │   │   ├── ResearchPage.jsx# Clinical datasets & thesis evidence
│   │   │   ├── AdminPortalPage.jsx # Protected host admin console
│   │   │   ├── AssessmentPage.jsx  # Live screening session
│   │   │   └── ...
│   │   ├── context/            # Authentication & Assessment providers
│   │   ├── data/               # Academic feature definitions & datasets
│   │   └── hooks/              # Telemetry & visitor tracking hooks
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite config with /api proxy to backend
│
├── package.json                # Root workspaces scripts
├── .gitignore                  # Security-first git exclusion rules
└── README.md                   # Project documentation
```

---

## 🚀 Quickstart & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or local MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/Lucky-Lilhare/Voice-and-Behaviour-based-Detection-of-Anxiety-and-Depression-by-using-Explainable-Machine-Learning.git
cd Voice-and-Behaviour-based-Detection-of-Anxiety-and-Depression-by-using-Explainable-Machine-Learning
```

### 2. Configure Environment Variables
Create a `.env` file in the `Backend/` directory (or copy `.env.example`):

```bash
cp Backend/.env.example Backend/.env
```

Edit `Backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nexora?retryWrites=true&w=majority
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

### 3. Install Dependencies
Install dependencies for both frontend and backend using root workspaces:
```bash
npm install
npm install --prefix Backend
npm install --prefix Frontend
```

### 4. Run Development Servers

**Run the Backend (Port 5000):**
```bash
npm run backend
# or: node Backend/index.js
```

**Run the Frontend (Port 5173):**
```bash
npm run frontend
# or: npm run dev --prefix Frontend
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Security & Clinical Governance

- **Client-Side Edge Computing**: All Fast Fourier Transforms (FFT) and computer vision inference execute on-device in the user's browser. Raw audio and video streams are **never transmitted** or stored on servers.
- **Zero-Retention Biometrics**: Conforms to **GDPR Article 9** (Special Category Biometric Data) and **HIPAA** security standards.
- **Explainable Decision Support**: Adheres to **IEEE 7000-2021** standards for ethical, transparent AI systems.
- **Medical Disclaimer**: Nexora is an adjunctive research and decision support system (FDA SaMD Tier 1). It is not a substitute for clinical diagnosis by a licensed psychiatrist or psychologist.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

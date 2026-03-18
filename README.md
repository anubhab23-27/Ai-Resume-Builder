# 🤖 AI Resume Builder

An AI-powered Resume Builder web application that helps users create professional, ATS-friendly resumes using AI and modern web technologies.

This project is a **full-stack application** with a React frontend and a Strapi backend, enhanced with an interactive landing page using Spline for a modern UI experience.

---

## 🚀 Live Demo

🌐 **Frontend:** https://ai-resume-builder-cjbb.onrender.com
<br>
⚙️ **Backend:** https://ai-resume-strapi-backend-40ld.onrender.com

---

## 🧠 Features

* ✨ AI-powered resume generation
* 📝 Create, edit, and manage resumes
* 👤 User authentication (Clerk)
* 📄 Dynamic resume sections
* 👁️ Real-time preview
* 📥 Download resume as PDF
* 🎨 Interactive landing page using Spline
* ⚡ Fully responsive design

---

## 🛠️ Tech Stack

### Frontend (`Ai_resume_builder`)

* React (Vite)
* Tailwind CSS
* Shadcn UI
* Spline (3D UI integration)

### Backend (`strapi_backend`)

* Strapi
* Node.js

### Authentication

* Clerk

### AI Integration

* OpenAI / Gemini API

---

## 📂 Project Structure

```id="p7l2yo"
Ai-Resume-Builder
│
├── Ai_resume_builder   # Frontend (React App)
├── strapi_backend      # Backend (Strapi CMS)
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash id="p3q4w8"
git clone https://github.com/anubhab23-27/Ai-Resume-Builder.git
cd Ai-Resume-Builder
```

---

## 🔹 Frontend Setup

```bash id="h6g2k1"
cd Ai_resume_builder
npm install
npm run dev
```

Runs on:

```id="g1v8b3"
http://localhost:5173
```

---

## 🔹 Backend Setup

```bash id="f9x2m4"
cd strapi_backend
npm install
npm run develop
```

Runs on:

```id="r8t5y2"
http://localhost:1337
```

---

## 🔑 Environment Variables

### Frontend (`Ai_resume_builder/.env`)

```id="d3k9n7"
VITE_CLERK_PUBLISHABLE_KEY=
VITE_STRAPI_API_KEY = 
VITE_GOOGLE_AI_API_KEY = 
VITE_BASE_URL = https://ai-resume-strapi-backend-40ld.onrender.com
```

### Backend (`strapi_backend/.env`)

```id="z5y1c8"

# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
ENCRYPTION_KEY=

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=
DATABASE_PORT=5432
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=true
DATABASE_FILENAME=
JWT_SECRET=
```

---

## 🌐 How It Works

1. User signs in via Clerk
2. Interacts with a modern landing page enhanced using Spline
3. Inputs resume details
4. AI generates optimized content
5. Data is stored in Strapi backend
6. Resume is previewed and downloadable

---

## 📌 Highlights

* 🔥 Full-stack project (React + Strapi)
* 🎨 Modern UI with Spline 3D integration
* 🤖 AI-powered functionality
* 📱 Responsive and user-friendly

---


## 👨‍💻 Author

**Anubhab Ghosh**
B.Tech CSE (AI & ML)

🔗 GitHub: https://github.com/anubhab23-27
<br>
🔗 LinkedIn: www.linkedin.com/in/anubhab-ghosh-aiml23
---

## ⭐ Support

If you like this project:

⭐ Star this repo
🍴 Fork it
📢 Share it

---


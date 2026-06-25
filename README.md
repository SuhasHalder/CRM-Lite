# CRM Lite — Sales CRM

A full-stack Sales CRM built for small teams. Manage leads, visualize your pipeline, assign tasks and follow-ups, and track team performance — with separate **Admin** and **User** dashboards.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Frontend Routes](#frontend-routes)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [User Roles](#user-roles)
- [Available Scripts](#available-scripts)
- [Deploying to Vercel](#deploying-to-vercel)

---

## Overview

| Layer      | Technology                          | Port  |
|------------|-------------------------------------|-------|
| Frontend   | Next.js 16, React 19, Tailwind CSS 4 | 3000  |
| Backend    | Node.js, Express, TypeScript        | 4000  |
| Database   | MongoDB (local or Atlas)            | —     |
| Auth       | JWT (JSON Web Tokens)               | —     |

The frontend talks to the backend REST API at `http://localhost:4000/api/v1`.

---

## Tech Stack

### Frontend (`/frontend`)
- **Next.js 16** — App Router, server/client components
- **React 19** — UI library
- **Tailwind CSS 4** — Styling
- **Axios** — HTTP client with JWT interceptors
- **React Hook Form** — Form handling
- **React Icons** — Icon library

### Backend (`/backend`)
- **Express 4** — REST API server
- **Mongoose 8** — MongoDB ODM
- **Zod** — Request validation
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT authentication
- **TypeScript** — Type-safe backend code

---

## Features

| Feature | Description |
|---------|-------------|
| **Lead Management** | Create, view, update, and delete sales leads |
| **Kanban Pipeline** | Visualize deals across stages: New → Contacted → Qualified → Proposal → Won |
| **Tasks & Follow-ups** | Assign tasks with due dates and mark them complete |
| **Analytics Dashboard** | Admin overview of leads, tasks, users, and conversion rates |
| **Role-Based Access** | Separate Admin and User views with JWT-protected routes |
| **Authentication** | Register, login, and session management via JWT |
| **Reminder Cron** | Background job for task due-date reminders |

---

## Project Structure

```
SalesCRM/
├── README.md                 # Project documentation (this file)
├── start.sh                  # Bash script to start backend + frontend together
├── .gitignore                # Root ignore rules
│
├── backend/                  # Express REST API
│   ├── .env                  # Environment variables (not committed)
│   ├── .env.example          # Example env template
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts         # Entry point — connects DB and starts server
│       ├── app.ts            # Express app, middleware, route mounting
│       │
│       ├── config/
│       │   ├── db.ts         # MongoDB connection
│       │   ├── env.ts        # Environment variable loader & validation
│       │   └── jwt.ts        # JWT sign/verify helpers
│       │
│       ├── models/
│       │   ├── index.ts      # Model exports
│       │   ├── user.model.ts # User schema (name, email, password, role)
│       │   ├── lead.model.ts # Lead schema (title, company, value, status, stage)
│       │   ├── task.model.ts # Task schema (title, dueDate, isDone, assignedTo)
│       │   └── pipeline.model.ts
│       │
│       ├── middlewares/
│       │   ├── auth.middleware.ts    # JWT verification
│       │   ├── role.middleware.ts    # Admin/user role checks
│       │   ├── validate.middleware.ts# Zod request validation
│       │   └── error.middleware.ts   # Global error handler
│       │
│       ├── utils/
│       │   ├── apiError.ts     # Custom API error class
│       │   ├── catchAsync.ts   # Async route wrapper
│       │   └── sendResponse.ts # Standardized JSON responses
│       │
│       ├── types/
│       │   └── express.d.ts    # Express Request type extensions
│       │
│       ├── cron/
│       │   └── reminder.cron.ts # Scheduled task reminder job
│       │
│       ├── scripts/
│       │   └── seedSalesData.ts # Seed sample leads, tasks, users
│       │
│       ├── user/               # User-facing API (sales reps)
│       │   ├── controllers/
│       │   │   ├── auth.controller.ts
│       │   │   ├── lead.controller.ts
│       │   │   ├── task.controller.ts
│       │   │   └── pipeline.controller.ts
│       │   ├── routes/
│       │   │   ├── auth.route.ts
│       │   │   ├── lead.route.ts
│       │   │   ├── task.route.ts
│       │   │   └── pipeline.route.ts
│       │   ├── services/
│       │   │   ├── auth.service.ts
│       │   │   ├── lead.service.ts
│       │   │   ├── task.service.ts
│       │   │   └── pipeline.service.ts
│       │   └── validations/
│       │       ├── auth.validation.ts
│       │       ├── lead.validation.ts
│       │       └── task.validation.ts
│       │
│       └── admin/              # Admin-only API
│           ├── controllers/
│           │   ├── analytics.controller.ts
│           │   ├── lead.controller.ts
│           │   ├── task.controller.ts
│           │   └── user.controller.ts
│           ├── routes/
│           │   ├── analytics.route.ts
│           │   ├── lead.route.ts
│           │   ├── task.route.ts
│           │   └── user.route.ts
│           ├── services/
│           │   ├── analytics.service.ts
│           │   ├── lead.service.ts
│           │   ├── task.service.ts
│           │   └── user.service.ts
│           └── validations/
│               ├── lead.validation.ts
│               ├── task.validation.ts
│               └── user.validation.ts
│
└── frontend/                 # Next.js web application
    ├── .env.local            # Frontend env (API URL)
    ├── .gitignore
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── postcss.config.mjs
    ├── eslint.config.mjs
    │
    ├── public/               # Static assets
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    │
    └── src/
        ├── app/              # Next.js App Router pages
        │   ├── layout.tsx    # Root layout, fonts, metadata
        │   ├── page.tsx      # Landing page (marketing)
        │   ├── globals.css   # Global styles & Tailwind
        │   ├── favicon.ico
        │   │
        │   ├── login/
        │   │   └── page.tsx    # Login page
        │   ├── register/
        │   │   └── page.tsx    # Registration page
        │   │
        │   ├── user/           # Sales rep dashboard
        │   │   ├── dashboard/page.tsx
        │   │   ├── leads/page.tsx
        │   │   ├── pipeline/page.tsx
        │   │   ├── tasks/page.tsx
        │   │   ├── followups/page.tsx
        │   │   └── profile/page.tsx
        │   │
        │   └── admin/          # Admin dashboard
        │       ├── dashboard/page.tsx
        │       ├── leads/page.tsx
        │       ├── pipeline/page.tsx
        │       ├── tasks/page.tsx
        │       ├── followups/page.tsx
        │       ├── analytics/page.tsx
        │       ├── users/page.tsx
        │       └── profile/page.tsx
        │
        ├── components/
        │   ├── user/
        │   │   ├── UserLayout.tsx   # User shell (sidebar + navbar)
        │   │   ├── UserSidebar.tsx  # User navigation menu
        │   │   └── UserNavbar.tsx   # User top bar + sign out
        │   └── admin/
        │       ├── AdminLayout.tsx  # Admin shell
        │       ├── AdminSidebar.tsx # Admin navigation menu
        │       └── AdminNavbar.tsx  # Admin top bar + sign out
        │
        └── lib/
            ├── api.ts        # Axios client + JWT interceptors
            ├── api-error.ts  # API error message helper
            ├── auth.ts       # localStorage auth helpers (get user, logout)
            └── types.ts      # Shared TypeScript interfaces (User, Lead, Task)
```

---

## Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **MongoDB** — local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster

---

## Installation

### 1. Clone or copy the project

Place the project folder on your machine. No Git remote is required.

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

See [Environment Variables](#environment-variables) below.

---

## Environment Variables

### Backend — `backend/.env`

Copy from `backend/.env.example`:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/sales_crm
JWT_SECRET=your_strong_secret_here
JWT_EXPIRES_IN=7d

# Optional — helps MongoDB Atlas SRV on restrictive networks
# DNS_SERVERS=8.8.8.8,1.1.1.1
```

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: `5000` in code, `4000` in example) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | No | Token expiry (default: `7d`) |
| `DNS_SERVERS` | No | Comma-separated DNS IPs for Atlas SRV lookups |

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

---

## Running the Project

### Option A — Run separately (recommended for development)

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
Server starts at **http://localhost:4000**

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
App opens at **http://localhost:3000**

### Option B — Windows PowerShell

```powershell
# Backend
Set-Location "path\to\SalesCRM\backend"
npm run dev

# Frontend (new terminal)
Set-Location "path\to\SalesCRM\frontend"
npm run dev
```

### Option C — Bash script (Linux / macOS / Git Bash)

```bash
chmod +x start.sh
./start.sh
```

Builds the backend, then starts both services.

### Seed sample data (optional)

```bash
cd backend
npm run seed:sales
```

### Health check

```bash
curl http://localhost:4000/health
```

Expected response:
```json
{ "success": true, "message": "Sales CRM backend is running" }
```

---

## Frontend Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing / marketing page |
| `/login` | Public | Sign in |
| `/register` | Public | Create account |
| `/user/dashboard` | User | Personal stats overview |
| `/user/leads` | User | Manage assigned leads |
| `/user/pipeline` | User | Kanban pipeline view |
| `/user/tasks` | User | Task list |
| `/user/followups` | User | Scheduled follow-ups |
| `/user/profile` | User | Account profile |
| `/admin/dashboard` | Admin | Team overview stats |
| `/admin/leads` | Admin | All team leads |
| `/admin/pipeline` | Admin | Team pipeline |
| `/admin/tasks` | Admin | All tasks |
| `/admin/followups` | Admin | Team follow-ups |
| `/admin/analytics` | Admin | Conversion & pipeline analytics |
| `/admin/users` | Admin | Team member management |
| `/admin/profile` | Admin | Admin profile |

After login, users with role `admin` are redirected to `/admin/dashboard`; all others go to `/user/dashboard`.

---

## API Endpoints

Base URL: `http://localhost:4000/api/v1`

Protected routes require header: `Authorization: Bearer <token>`

### Auth (public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/user/auth/register` | Register a new user |
| `POST` | `/user/auth/login` | Login and receive JWT |

### User — Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/user/leads` | Get current user's leads |
| `GET` | `/user/leads/:id` | Get lead by ID |
| `POST` | `/user/leads` | Create a lead |
| `PUT` | `/user/leads/:id` | Update a lead |
| `DELETE` | `/user/leads/:id` | Delete a lead |

### User — Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/user/tasks` | Get current user's tasks |
| `GET` | `/user/tasks/:id` | Get task by ID |
| `POST` | `/user/tasks` | Create a task |
| `PUT` | `/user/tasks/:id` | Update a task |
| `PATCH` | `/user/tasks/:id/complete` | Mark task as done |
| `DELETE` | `/user/tasks/:id` | Delete a task |

### User — Pipeline

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/user/pipelines` | Get pipeline data |
| `GET` | `/user/pipelines/stage/leads?stage=<stage>` | Get leads by stage |
| `PATCH` | `/user/pipelines/:leadId/stage` | Move lead to a new stage |

### Admin — Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/users` | List all users |
| `GET` | `/admin/users/:id` | Get user by ID |
| `PUT` | `/admin/users/:id` | Update user |
| `DELETE` | `/admin/users/:id` | Delete user |

### Admin — Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/leads` | List all leads |
| `GET` | `/admin/leads/:id` | Get lead by ID |
| `PUT` | `/admin/leads/:id` | Update lead |
| `DELETE` | `/admin/leads/:id` | Delete lead |

### Admin — Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/tasks` | List all tasks |
| `PUT` | `/admin/tasks/:id` | Update task |

### Admin — Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/analytics/overview` | Total leads, users, tasks, won deals |
| `GET` | `/admin/analytics/conversion` | Conversion metrics by stage |
| `GET` | `/admin/analytics/pipeline-health` | Stage distribution and values |

---

## Database Models

### User
| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Full name |
| `email` | String | Unique email (lowercase) |
| `password` | String | Hashed with bcrypt |
| `role` | String | `"admin"` or `"user"` (default: `"user"`) |

### Lead
| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Lead/deal title |
| `company` | String | Company name |
| `contactEmail` | String | Optional contact email |
| `value` | Number | Deal value in USD |
| `status` | String | e.g. `new`, `contacted`, `qualified`, `won` |
| `stage` | String | Pipeline stage |
| `owner` | ObjectId | Reference to User |

### Task
| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Task title |
| `description` | String | Optional details |
| `dueDate` | Date | Optional due date |
| `isDone` | Boolean | Completion status |
| `assignedTo` | ObjectId | Reference to User |
| `lead` | ObjectId | Optional reference to Lead |

---

## User Roles

| Role | Dashboard | Permissions |
|------|-----------|-------------|
| **user** | `/user/*` | Manage own leads, tasks, pipeline, and profile |
| **admin** | `/admin/*` | View and manage all users, leads, tasks, and analytics |

---

## Available Scripts

### Backend (`/backend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload (ts-node-dev) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production server |
| `npm run lint` | Type-check without emitting files |
| `npm run seed:sales` | Insert sample users, leads, and tasks |

### Frontend (`/frontend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server on port 3000 |
| `npm run build` | Create production build |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Architecture Overview

```
┌─────────────────┐         REST API          ┌─────────────────┐
│   Next.js App   │  ──────────────────────►  │  Express API    │
│   (port 3000)   │  ◄──────────────────────  │  (port 4000)    │
│                 │      JSON + JWT           │                 │
└─────────────────┘                           └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │    MongoDB      │
                                              │  (Atlas/local)  │
                                              └─────────────────┘
```

---

## Deploying to Vercel

Vercel hosts the **frontend only**. The Express backend must be deployed separately (e.g. Render, Railway, Fly.io).

### Why you may see `404: NOT_FOUND`

This project is a **monorepo**. The Next.js app lives in the `frontend/` folder, not the repository root. If Vercel's **Root Directory** is left blank, it deploys the wrong folder and `/` returns 404.

### Verified locally

- `frontend/src/app/page.tsx` exists (home page `/`)
- `npm run build` inside `frontend/` succeeds and lists route `/`

### Vercel settings (required)

In **Vercel → Project → Settings → General**:

| Setting | Value |
|---------|-------|
| **Root Directory** | `frontend` |
| **Framework Preset** | Next.js |
| **Build Command** | *(default)* `next build` |
| **Output Directory** | *(leave empty)* |
| **Install Command** | *(default)* `npm install` |

Then go to **Deployments → Redeploy** (use "Redeploy with existing Build Cache" unchecked for a clean build).

### Environment variables (Vercel)

In **Settings → Environment Variables**, add:

| Name | Example value |
|------|----------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com/api/v1` |

Use your **live backend URL**, not `localhost`. Without this, the site loads but login/API calls fail.

### Backend deployment (separate)

Deploy `backend/` to a Node host and set these env vars there:

- `PORT` (often set by the host)
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

### GitHub checklist

Before redeploying, confirm your repo contains:

```
SalesCRM/
├── frontend/
│   ├── package.json
│   └── src/app/page.tsx
└── backend/
```

Push latest code to the branch Vercel watches (usually `main`).

---

## License

Private project — for local and internal use.

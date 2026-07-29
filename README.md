# 🚀 NexusERP - Mini ERP + CRM Operations Portal

NexusERP is a full-stack, production-ready Mini ERP + CRM Operations Portal designed specifically for wholesale and distribution businesses. Built with **Node.js, Express, TypeScript, Supabase PostgreSQL, React, Tailwind CSS, Lucide React, Cloudinary, Docker, and GitHub Actions**.

---

## 🌟 Key Features

* **Multi-Role Access Control (RBAC):**
  * `ADMIN`: Full access to customer CRM, inventory, challans, and system audit logs.
  * `SALES`: Customer lead management, follow-up notes drawer, draft & confirm sales challans.
  * `WAREHOUSE`: Stock IN / OUT adjustments, Cloudinary image uploads, stock movement logs.
  * `ACCOUNTS`: Financial oversight, read-only view of sales challans, customer directory, and stock audit trails.
* **Atomic Stock Deduction (PostgreSQL Transactions):**
  * Prevents inventory overselling during sales challan confirmation using `BEGIN`, `SELECT ... FOR UPDATE`, and automatic rollback if stock is insufficient.
* **Cloudinary Product Catalog:**
  * Direct binary upload of product images to Cloudinary CDN via Multer memory storage.
* **Dynamic Theme System:**
  * Persistent Light/Dark theme context synced across both public landing pages and internal dashboard views.
* **AWS Cloud Upgrade Roadmap:**
  * Architectural documentation for future enterprise expansion to AWS S3, Aurora Serverless, and AWS Lambda.

---

## 🔑 Demo Login Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@nexuserp.com` | `Admin123!` |
| **Sales** | `sales@nexuserp.com` | `Sales123!` |
| **Warehouse** | `warehouse@nexuserp.com` | `Warehouse123!` |
| **Accounts** | `accounts@nexuserp.com` | `Accounts123!` |

---

## 🛠️ Step-by-Step Deployment & Setup Guide

### 1. Database Setup (Supabase PostgreSQL)
1. Log in to [Supabase Console](https://supabase.com) and create a new free-tier project.
2. Navigate to **SQL Editor** in your Supabase dashboard.
3. Open [`database/schema.sql`](file:///c:/Users/KIIT/Desktop/Project/NexusERP/database/schema.sql) from this repository, copy its contents, and execute it to create all tables, ENUM types, and relations.
4. Open [`database/seed.sql`](file:///c:/Users/KIIT/Desktop/Project/NexusERP/database/seed.sql) and execute it to seed initial demo accounts and catalog items.
5. Copy your project connection string from **Project Settings > Database > URI**.

---

### 2. Media Storage Setup (Cloudinary)
1. Sign up for a free account at [Cloudinary](https://cloudinary.com).
2. Go to your Cloudinary Dashboard and retrieve:
   * **Cloud Name**
   * **API Key**
   * **API Secret**

---

### 3. Backend REST API Deployment (Render)
1. Push this repository to your GitHub account.
2. Sign in to [Render](https://render.com) and click **New > Web Service**.
3. Connect your GitHub repository and select the `/backend` root directory.
4. Configure build settings:
   * **Environment:** `Node`
   * **Build Command:** `npm run build`
   * **Start Command:** `node dist/server.js`
5. Add Environment Variables in Render:
   * `DATABASE_URL`: Your Supabase connection URI
   * `JWT_SECRET`: A secure random string
   * `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name
   * `CLOUDINARY_API_KEY`: Your Cloudinary API Key
   * `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret
6. Click **Deploy Web Service** and copy your live Render service URL (e.g., `https://nexuserp-api.onrender.com`).

---

### 4. Frontend Web App Deployment (Vercel)
1. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Select your GitHub repository and set the Root Directory to `frontend`.
3. Add Environment Variable:
   * `VITE_API_URL`: Your backend API URL (e.g., `https://nexuserp-api.onrender.com/api`)
4. Click **Deploy**.

---

### 5. Local Development with Docker Compose

To run the complete stack locally (Local PostgreSQL + Express API + React Nginx Web Server):

```bash
docker-compose up --build
```

Access the frontend app at `http://localhost` and backend health check at `http://localhost:5000/health`.

---

## 📁 Repository Directory Structure

```
NexusERP/
├── database/
│   ├── schema.sql                 # Supabase PostgreSQL DDL
│   └── seed.sql                   # Demo users, products & customers
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── src/                       # Express Controllers, Routes & Middleware
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── src/                       # React Views, Contexts, Services & Components
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions CI/CD Pipeline
├── docker-compose.yml
├── .gitignore
└── README.md
```

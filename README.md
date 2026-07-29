# NexusERP - Mini ERP + CRM Operations Portal

NexusERP is a full-stack, production-ready Mini ERP + CRM Operations Portal designed specifically for wholesale and distribution businesses. Built with **Node.js, Express, TypeScript, Supabase PostgreSQL, React, Tailwind CSS, Lucide React, Cloudinary, Docker, and GitHub Actions**.

---

## Key Features

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

## Demo Login Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@nexuserp.com` | `Admin123!` |
| **Sales** | `sales@nexuserp.com` | `Sales123!` |
| **Warehouse** | `warehouse@nexuserp.com` | `Warehouse123!` |
| **Accounts** | `accounts@nexuserp.com` | `Accounts123!` |

---

## Repository Directory Structure

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

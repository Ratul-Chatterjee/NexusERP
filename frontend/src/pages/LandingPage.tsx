import React from 'react';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import {
  Users,
  Package,
  FileText,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Cloud,
  CheckCircle2,
  Server,
  Lock,
  Github,
  BarChart3,
  Globe,
  Layers,
  TrendingUp,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';

const StatCard: React.FC<{ value: string; label: string; color: string }> = ({ value, label, color }) => (
  <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${color} bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm`}>
    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{value}</span>
    <span className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-center">{label}</span>
  </div>
);

const FeatureIcon: React.FC<{ icon: React.ReactNode; color: string }> = ({ icon, color }) => (
  <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 flex-shrink-0`}>
    {icon}
  </div>
);

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        {/* Background decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-200 dark:border-blue-800 rounded-full opacity-50" />
        <div className="absolute top-10 right-10 w-20 h-20 border border-teal-200 dark:border-teal-800 rounded-full opacity-50" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Logo Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <img src="/logo.png" alt="NexusERP" className="w-8 h-8 rounded-lg" />
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">NexusERP v1.0</span>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-8">
            <Zap className="w-4 h-4 text-teal-500" />
            <span>Next-Gen Wholesale Operations Portal</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Streamline Inventory, CRM &amp; Sales Challans in{' '}
            <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 dark:from-blue-400 dark:via-teal-400 dark:to-green-400 bg-clip-text text-transparent">
              One Unified Workspace
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            NexusERP is a production-ready Mini ERP + CRM portal built for wholesale & distribution businesses.
            Real-time stock movement tracking, multi-role RBAC security, atomic sales challan transactions,
            and Cloudinary media management - all in one sleek dashboard.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <span>Launch Operations Portal</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/Ratul-Chatterjee/NexusERP"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </a>
          </div>
        </div>
      </section>

      {/* Product Snapshot */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-14 pb-14 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-teal-500/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
                <Database className="w-4 h-4" /> Live operational snapshot
              </div>
              <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Built for daily warehouse, sales, and finance operations</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                NexusERP keeps the entire wholesale workflow in one place: lead capture, product maintenance, stock movement logs,
                challan creation, and audit-friendly reporting across every role.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { icon: <Users className="w-5 h-5" />, label: 'CRM follow-ups', value: 'Lead to active' },
                  { icon: <Package className="w-5 h-5" />, label: 'Inventory visibility', value: 'Low stock alerts' },
                  { icon: <FileText className="w-5 h-5" />, label: 'Sales flow', value: 'Draft to confirm' },
                  { icon: <Server className="w-5 h-5" />, label: 'Deployment stack', value: 'Render + Vercel' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 p-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center">
                      {item.icon}
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 font-bold">{item.label}</p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-700/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-teal-300">Operations</span>
                <Globe className="w-5 h-5 text-teal-300" />
              </div>
              <p className="mt-6 text-4xl font-black">4</p>
              <p className="mt-2 text-sm text-slate-300">Distinct roles with role-aware navigation and API permissions.</p>
              <div className="mt-8 space-y-3">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-[92%] bg-gradient-to-r from-blue-500 to-teal-400" /></div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-[76%] bg-gradient-to-r from-teal-500 to-green-400" /></div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-[64%] bg-gradient-to-r from-indigo-500 to-blue-400" /></div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs font-bold">
                <Layers className="w-4 h-4" /> Product layers
              </div>
              <ul className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-3"><TrendingUp className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span>Responsive dashboard shell that adapts from mobile drawers to desktop sidebars.</span></li>
                <li className="flex gap-3"><Lock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /><span>JWT auth, bcrypt password hashing, and role-based API protection.</span></li>
                <li className="flex gap-3"><Cloud className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" /><span>Cloudinary image handling for product media with a path to AWS S3.</span></li>
              </ul>
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/60">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Deployment</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">Vercel frontend + Render API + Supabase PostgreSQL</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Strip */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="4" label="User Roles & RBAC" color="border-blue-200 dark:border-blue-800" />
          <StatCard value="6" label="Core REST API Modules" color="border-teal-200 dark:border-teal-800" />
          <StatCard value="100%" label="Free Tier Deployed" color="border-green-200 dark:border-green-800" />
          <StatCard value="Unlimited" label="Stock Audit Trail" color="border-purple-200 dark:border-purple-800" />
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Powered By</p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { name: 'React 18', color: 'text-blue-500' },
            { name: 'TypeScript', color: 'text-blue-700' },
            { name: 'Node.js + Express', color: 'text-green-600' },
            { name: 'Supabase PostgreSQL', color: 'text-teal-600' },
            { name: 'Cloudinary CDN', color: 'text-violet-600' },
            { name: 'Vercel + Render', color: 'text-slate-700 dark:text-slate-300' },
            { name: 'Tailwind CSS', color: 'text-sky-500' },
          ].map((tech) => (
            <span key={tech.name} className={`text-sm font-bold ${tech.color}`}>
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Core Operational Pillars</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Built specifically for high-volume wholesale workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
              color: 'bg-blue-500/10',
              title: 'Customer CRM Lifecycle',
              desc: 'Track retail, wholesale, and distributor leads. Log follow-up notes, GST details, and schedule follow-ups with a full customer directory.',
            },
            {
              icon: <Package className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
              color: 'bg-teal-500/10',
              title: 'Real-Time Stock Audit',
              desc: 'Low-stock alert thresholds, location bin mapping, direct Cloudinary product image CDN uploads, and full movement logs.',
            },
            {
              icon: <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
              color: 'bg-purple-500/10',
              title: 'Atomic Sales Challans',
              desc: 'Multi-item challan creation with PostgreSQL atomic FOR UPDATE locking to prevent overselling inventory during high-concurrency operations.',
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />,
              color: 'bg-green-500/10',
              title: 'Role-Based Access Control',
              desc: 'Fine-grained RBAC with 4 roles (Admin, Sales, Warehouse, Accounts). JWT-secured API endpoints with bcrypt password hashing.',
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
              color: 'bg-orange-500/10',
              title: 'Financial Audit Dashboard',
              desc: 'Accounts team gets a read-only financial oversight view with full challan history, customer directory, and stock audit trail access.',
            },
            {
              icon: <Cpu className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
              color: 'bg-rose-500/10',
              title: 'Production-Ready Architecture',
              desc: 'Deployed on Render (Node.js) + Vercel (React) + Supabase (PostgreSQL) + Cloudinary CDN. Full CI/CD via GitHub Actions.',
            },
          ].map((f) => (
            <div key={f.title} className="p-7 rounded-3xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <FeatureIcon icon={f.icon} color={f.color} />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How NexusERP Works</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">A seamless workflow from onboarding to order fulfillment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Login with Role', desc: 'Secure JWT authentication routes each user to their permitted operations.', icon: <Lock className="w-6 h-6" /> },
              { step: '02', title: 'Manage Customers', desc: 'Sales reps add leads, track follow-ups, and update customer lifecycle stages.', icon: <Users className="w-6 h-6" /> },
              { step: '03', title: 'Control Inventory', desc: 'Warehouse team updates stock levels, uploads product images via Cloudinary.', icon: <Package className="w-6 h-6" /> },
              { step: '04', title: 'Confirm Challans', desc: 'Atomic DB transactions deduct stock when Sales Challans are confirmed - zero oversell risk.', icon: <FileText className="w-6 h-6" /> },
            ].map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center mb-4 shadow-lg">
                  {s.icon}
                </div>
                <span className="absolute top-3 right-4 text-xs font-black text-slate-200 dark:text-slate-700">{s.step}</span>
                <h4 className="font-bold text-slate-900 dark:text-white">{s.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Access Matrix */}
      <section id="roles" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Role Access Control Breakdown</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Granular RBAC ensures security and operational clarity across teams.</p>
        </div>

        <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/60 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="p-4 sm:p-5">Role</th>
                  <th className="p-4 sm:p-5">CRM Customers</th>
                  <th className="p-4 sm:p-5">Product Catalog</th>
                  <th className="p-4 sm:p-5">Stock IN / OUT</th>
                  <th className="p-4 sm:p-5">Sales Challans</th>
                  <th className="p-4 sm:p-5">System Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { role: 'Admin', color: 'text-blue-600 dark:text-blue-400', cells: ['Full Access', 'Full Access', 'Full Access', 'Full Access', 'Full Control'] },
                  { role: 'Sales', color: 'text-teal-600 dark:text-teal-400', cells: ['Manage Leads & Notes', 'Read Only', 'No Access', 'Create & Confirm', 'No Access'] },
                  { role: 'Warehouse', color: 'text-amber-600 dark:text-amber-400', cells: ['No Access', 'Add/Edit Stock & Media', 'Stock Receipt & Dispatch', 'Read & Confirm Dispatch', 'View Logs'] },
                  { role: 'Accounts', color: 'text-purple-600 dark:text-purple-400', cells: ['Read Only', 'Read Only', 'Read Only', 'Read Only', 'Audit Logs'] },
                ].map((row) => (
                  <tr key={row.role} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className={`p-4 sm:p-5 font-bold ${row.color} flex items-center gap-2`}>
                      <ShieldCheck className="w-4 h-4" /> {row.role}
                    </td>
                    {row.cells.map((c, i) => (
                      <td key={i} className="p-4 sm:p-5 text-slate-600 dark:text-slate-300 whitespace-nowrap">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-600 via-teal-500 to-green-500 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 rounded-3xl" />
          <div className="relative z-10">
            <img src="/logo.png" alt="NexusERP" className="w-16 h-16 mx-auto mb-4 rounded-2xl shadow-lg" />
            <h2 className="text-3xl font-extrabold">Ready to Explore?</h2>
            <p className="mt-3 text-white/80 text-base max-w-lg mx-auto">
              Login with the demo credentials to access all 4 role dashboards. No signup required.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
              {[
                { role: 'Admin', email: 'admin@nexuserp.com', pass: 'Admin123!' },
                { role: 'Sales', email: 'sales@nexuserp.com', pass: 'Sales123!' },
                { role: 'Warehouse', email: 'warehouse@nexuserp.com', pass: 'Warehouse123!' },
                { role: 'Accounts', email: 'accounts@nexuserp.com', pass: 'Accounts123!' },
              ].map((d) => (
                <div key={d.role} className="bg-white/20 rounded-xl p-3 text-xs backdrop-blur-sm border border-white/30 text-left">
                  <p className="font-bold">{d.role}</p>
                  <p className="opacity-75 mt-0.5 truncate">{d.pass}</p>
                </div>
              ))}
            </div>
            <Link
              to="/login"
              className="mt-8 inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Open Portal Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* AWS Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-6">
              <Cloud className="w-4 h-4" /> Enterprise Upgrade Roadmap
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">AWS Cloud Architecture Expansion</h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              NexusERP is engineered for seamless transition to Amazon Web Services (AWS) as distribution volume grows to enterprise scale:
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {[
                { label: 'AWS S3 & CloudFront:', desc: 'Enterprise object storage with CDN distribution for product blueprints & invoice PDFs.' },
                { label: 'AWS Aurora PostgreSQL Serverless:', desc: 'Multi-region auto-scaling database with read replicas for zero downtime.' },
                { label: 'AWS Lambda & SQS:', desc: 'Asynchronous PDF generation, email notifications, and automated low-stock re-order triggers.' },
              ].map((item) => (
                <li key={item.label} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span><strong>{item.label}</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="NexusERP" className="w-9 h-9 rounded-xl" />
            <div>
              <span className="font-extrabold text-lg bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                NexusERP
              </span>
              <p className="text-xs text-slate-400 dark:text-slate-500">Mini ERP + CRM Operations Portal</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
            <a
              href="https://github.com/Ratul-Chatterjee/NexusERP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-medium"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <Link to="/login" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-medium">
              Portal
            </Link>
          </div>

          {/* Made by */}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Made by{' '}
            <a
              href="https://github.com/Ratul-Chatterjee"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Ratul Chatterjee
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};




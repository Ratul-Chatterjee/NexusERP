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
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-8 animate-pulse">
            <Zap className="w-4 h-4 text-blue-500" />
            <span>Next-Gen Wholesale Operations Portal</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Streamline Inventory, CRM &amp; Sales Challans in{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              One Unified Workspace
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            NexusERP provides real-time stock movement tracking, multi-role security (Admin, Sales, Warehouse, Accounts), atomic sales challan transactions, and Cloudinary media management for modern distribution businesses.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <span>Launch Operations Portal</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#roles"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 glass-panel hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-2xl transition-all duration-200"
            >
              Explore Role Matrix
            </a>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Core Operational Pillars</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Built specifically for high-volume wholesale workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Customer CRM Lifecycle</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
              Track retail, wholesale, and distributor leads. Log follow-up notes, GST details, and schedule follow-ups.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-6">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Real-Time Stock Audit</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
              Low-stock alert thresholds, location bin mapping, direct Cloudinary product image uploads, and movement logs.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Atomic Sales Challans</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
              Multi-item challan creation with PostgreSQL atomic FOR UPDATE locking to prevent overselling inventory.
            </p>
          </div>
        </div>
      </section>

      {/* Role Access Matrix Section */}
      <section id="roles" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Role Access Control Breakdown</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Granular RBAC ensures security and operational clarity across teams.</p>
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/60 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="p-4 sm:p-6">Role</th>
                  <th className="p-4 sm:p-6">CRM Customers</th>
                  <th className="p-4 sm:p-6">Product Catalog</th>
                  <th className="p-4 sm:p-6">Stock IN / OUT</th>
                  <th className="p-4 sm:p-6">Sales Challans</th>
                  <th className="p-4 sm:p-6">System Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Admin
                  </td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Full Access</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Full Access</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Full Access</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Full Access</td>
                  <td className="p-4 sm:p-6 text-emerald-600 dark:text-emerald-400 font-semibold">Full Control</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-indigo-600 dark:text-indigo-400">Sales</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Manage Leads &amp; Notes</td>
                  <td className="p-4 sm:p-6 text-slate-500">Read Only</td>
                  <td className="p-4 sm:p-6 text-slate-500">No Access</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Create &amp; Confirm</td>
                  <td className="p-4 sm:p-6 text-slate-500">No Access</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-amber-600 dark:text-amber-400">Warehouse</td>
                  <td className="p-4 sm:p-6 text-slate-500">No Access</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Add/Edit Stock &amp; Media</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Stock Receipt &amp; Dispatch</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Read &amp; Confirm Dispatch</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">View Logs</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-purple-600 dark:text-purple-400">Accounts</td>
                  <td className="p-4 sm:p-6 text-slate-500">Read Only</td>
                  <td className="p-4 sm:p-6 text-slate-500">Read Only</td>
                  <td className="p-4 sm:p-6 text-slate-500">Read Only</td>
                  <td className="p-4 sm:p-6 text-slate-500">Read Only</td>
                  <td className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">Audit Logs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AWS Integration Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-6">
              <Cloud className="w-4 h-4" /> Enterprise Upgrade Roadmap
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">AWS Cloud Architecture Expansion</h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              NexusERP is engineered for seamless transition to Amazon Web Services (AWS) as distribution volume grows to enterprise scale:
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>AWS S3 &amp; CloudFront:</strong> Enterprise object storage with CDN distribution for product blueprints &amp; invoice PDFs.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>AWS Aurora PostgreSQL Serverless:</strong> Multi-region auto-scaling database with read replicas for zero downtime.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>AWS Lambda &amp; SQS:</strong> Asynchronous PDF generation, email notifications, and automated low-stock re-order triggers.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

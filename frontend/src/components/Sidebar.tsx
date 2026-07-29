import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Package, FileText, Activity, ShieldCheck, X, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: 'CRM Customers',
      path: '/dashboard/customers',
      icon: Users,
      roles: ['ADMIN', 'SALES', 'ACCOUNTS'],
    },
    {
      label: 'Inventory Products',
      path: '/dashboard/products',
      icon: Package,
      roles: ['ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS'],
    },
    {
      label: 'Sales Challans',
      path: '/dashboard/challans',
      icon: FileText,
      roles: ['ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS'],
    },
    {
      label: 'Stock Audit Logs',
      path: '/dashboard/stock-logs',
      icon: Activity,
      roles: ['ADMIN', 'WAREHOUSE', 'ACCOUNTS'],
    },
  ];

  const allowedItems = navItems.filter((item) => user && item.roles.includes(user.role));

  const NavContent = () => (
    <>
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 px-1 pb-2 border-b border-slate-200 dark:border-slate-700">
          <img src="/logo.png" alt="NexusERP" className="w-8 h-8 rounded-lg object-contain" />
          <span className="font-extrabold text-base bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            NexusERP
          </span>
        </div>

        {/* User Card */}
        <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
            {user?.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user?.name}</h4>
            <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> {user?.role}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <span className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Operations Menu
          </span>
          <nav className="mt-3 space-y-1">
            {allowedItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md shadow-blue-500/25 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-200'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-teal-500/20 text-xs text-slate-600 dark:text-slate-400">
        <p className="font-semibold text-slate-800 dark:text-slate-200">Supabase + Cloudinary</p>
        <p className="mt-1">Real-time inventory locks & audit logs active.</p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-lg flex items-center justify-center"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside className={`lg:hidden fixed left-0 top-0 z-40 h-full w-72 glass-panel border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 glass-panel border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)] p-4 flex-col justify-between">
        <NavContent />
      </aside>
    </>
  );
};

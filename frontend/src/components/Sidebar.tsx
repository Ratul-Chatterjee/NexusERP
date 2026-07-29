import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Package, FileText, Activity, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

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

  return (
    <aside className="w-64 shrink-0 glass-panel border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* User Card */}
        <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
            {user?.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user?.name}</h4>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> {user?.role}
            </p>
          </div>
        </div>

        {/* Navigation Section */}
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
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-200'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-xs text-slate-600 dark:text-slate-400">
        <p className="font-semibold text-slate-800 dark:text-slate-200">Supabase + Cloudinary</p>
        <p className="mt-1">Real-time inventory locks & audit logs active.</p>
      </div>
    </aside>
  );
};

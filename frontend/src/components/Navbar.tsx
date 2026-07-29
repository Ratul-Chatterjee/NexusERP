import React from 'react';
import { Sun, Moon, LogOut, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
          <img src="/logo.png" alt="NexusERP Logo" className="w-9 h-9 rounded-xl object-contain" />
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 dark:from-blue-400 dark:via-teal-400 dark:to-green-400 bg-clip-text text-transparent">
              NexusERP
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300">
              Operations Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all duration-200"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-2 sm:space-x-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.name}</span>
                <span className="text-xs font-medium text-teal-600 dark:text-teal-400 flex items-center justify-end gap-1">
                  <Shield className="w-3 h-3" /> {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-all duration-200"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link
                to="/login"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="px-3 sm:px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200"
              >
                Launch Portal
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

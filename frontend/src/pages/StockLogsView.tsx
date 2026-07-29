import React, { useState, useEffect } from 'react';
import { StockLog } from '../types';
import { getStockLogs } from '../services/api';
import { StatCard } from '../components/StatCard';
import { Activity, ArrowUpRight, ArrowDownLeft, Calendar, User, Package } from 'lucide-react';

export const StockLogsView: React.FC = () => {
  const [logs, setLogs] = useState<StockLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');

  const fetchLogsList = async () => {
    try {
      setLoading(true);
      const data = await getStockLogs({ movement_type: typeFilter });
      setLogs(data);
    } catch (error) {
      console.error('Error fetching stock movement logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogsList();
  }, [typeFilter]);

  const totalLogs = logs.length;
  const inLogs = logs.filter((l) => l.movement_type === 'IN').length;
  const outLogs = logs.filter((l) => l.movement_type === 'OUT').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Stock Movement Audit Trail</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Complete, immutable log of inventory receipts (IN) and dispatch movements (OUT).
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Movement Events" value={totalLogs} icon={Activity} color="purple" />
        <StatCard title="Stock Receipts (IN)" value={inLogs} icon={ArrowUpRight} color="emerald" />
        <StatCard title="Order Dispatches (OUT)" value={outLogs} icon={ArrowDownLeft} color="rose" />
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Movement Type Filter</span>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
        >
          <option value="">All Movements</option>
          <option value="IN">IN (Receipts)</option>
          <option value="OUT">OUT (Dispatches)</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/60 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Product SKU &amp; Name</th>
                <th className="p-4">Movement Type</th>
                <th className="p-4">Quantity Changed</th>
                <th className="p-4">Reason / Reference</th>
                <th className="p-4">Logged By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Loading stock audit logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No stock movements recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                      {new Date(log.created_at).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{log.product_name || 'Product'}</div>
                      <div className="text-xs text-slate-400 font-mono">{log.product_sku}</div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                          log.movement_type === 'IN'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {log.movement_type === 'IN' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownLeft className="w-3.5 h-3.5" />}
                        {log.movement_type}
                      </span>
                    </td>

                    <td
                      className={`p-4 font-extrabold text-base ${
                        log.movement_type === 'IN' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {log.movement_type === 'IN' ? `+${log.quantity_changed}` : `-${log.quantity_changed}`}
                    </td>

                    <td className="p-4 text-xs text-slate-700 dark:text-slate-300 font-medium">{log.reason}</td>

                    <td className="p-4 text-xs text-slate-500 dark:text-slate-400">
                      {log.created_by_name || 'System / Automated'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

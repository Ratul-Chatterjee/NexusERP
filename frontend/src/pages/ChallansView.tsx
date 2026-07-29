import React, { useState, useEffect } from 'react';
import { Challan, Customer, Product } from '../types';
import { getChallans, createChallan, confirmChallan, cancelChallan, getCustomers, getProducts } from '../services/api';
import { StatCard } from '../components/StatCard';
import { FileText, Plus, CheckCircle2, XCircle, Clock, ShoppingCart, Trash2, X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ChallansView: React.FC = () => {
  const [challans, setChallans] = useState<Challan[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  // Modal Builder State
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [lineItems, setLineItems] = useState<Array<{ product_id: string; quantity: number }>>([]);
  const [builderError, setBuilderError] = useState('');

  const { user } = useAuth();

  const fetchChallansList = async () => {
    try {
      setLoading(true);
      const data = await getChallans({ status: statusFilter });
      setChallans(data);
    } catch (error) {
      console.error('Error fetching challans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallansList();
  }, [statusFilter]);

  const handleOpenBuilder = async () => {
    try {
      const [cData, pData] = await Promise.all([getCustomers({ status: 'ACTIVE' }), getProducts()]);
      setCustomers(cData);
      setProducts(pData);
      setSelectedCustomerId(cData[0]?.id || '');
      setLineItems([{ product_id: pData[0]?.id || '', quantity: 1 }]);
      setBuilderError('');
      setIsBuilderOpen(true);
    } catch (err) {
      console.error('Error opening challan builder:', err);
    }
  };

  const handleAddLineItem = () => {
    if (products.length > 0) {
      setLineItems([...lineItems, { product_id: products[0].id, quantity: 1 }]);
    }
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: 'product_id' | 'quantity', value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const handleCreateChallanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBuilderError('');

    if (!selectedCustomerId) {
      setBuilderError('Please select a customer.');
      return;
    }
    if (lineItems.length === 0) {
      setBuilderError('Add at least one line item.');
      return;
    }

    try {
      await createChallan({
        customer_id: selectedCustomerId,
        items: lineItems,
      });
      setIsBuilderOpen(false);
      fetchChallansList();
    } catch (err: any) {
      setBuilderError(err.response?.data?.message || 'Error creating sales challan.');
    }
  };

  const handleConfirm = async (id: string) => {
    try {
      await confirmChallan(id);
      fetchChallansList();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to confirm challan.');
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelChallan(id);
      fetchChallansList();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to cancel challan.');
    }
  };

  const totalCount = challans.length;
  const draftCount = challans.filter((c) => c.status === 'DRAFT').length;
  const confirmedCount = challans.filter((c) => c.status === 'CONFIRMED').length;

  // Calculate total price preview in builder
  const calculateBuilderTotal = () => {
    return lineItems.reduce((sum, item) => {
      const prod = products.find((p) => p.id === item.product_id);
      return sum + (prod ? Number(prod.unit_price) * item.quantity : 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Sales Challans &amp; Dispatch</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create sales challans with automatic PostgreSQL row-locking stock deduction.
          </p>
        </div>

        {(user?.role === 'ADMIN' || user?.role === 'SALES') && (
          <button
            onClick={handleOpenBuilder}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center space-x-2 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Sales Challan</span>
          </button>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Sales Challans" value={totalCount} icon={FileText} color="blue" />
        <StatCard title="Pending Drafts" value={draftCount} icon={Clock} color="amber" />
        <StatCard title="Confirmed Dispatches" value={confirmedCount} icon={CheckCircle2} color="emerald" />
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Challan Register</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="DRAFT">DRAFT</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/60 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4">Challan # &amp; Date</th>
                <th className="p-4">Customer Snapshot</th>
                <th className="p-4">Items Summary</th>
                <th className="p-4">Total Qty</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Loading sales challans...
                  </td>
                </tr>
              ) : challans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No sales challans recorded yet.
                  </td>
                </tr>
              ) : (
                challans.map((challan) => (
                  <tr key={challan.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white font-mono">{challan.challan_number}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {new Date(challan.created_at).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {challan.customer_snapshot?.business_name || 'N/A'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Contact: {challan.customer_snapshot?.name} ({challan.customer_snapshot?.mobile})
                      </div>
                    </td>

                    <td className="p-4 text-xs space-y-1">
                      {challan.items && challan.items.length > 0 ? (
                        challan.items.map((item, idx) => (
                          <div key={idx} className="text-slate-700 dark:text-slate-300">
                            • {item.product_name} <span className="font-bold">x {item.quantity}</span> @ ${item.unit_price}
                          </div>
                        ))
                      ) : (
                        <span className="text-slate-400">Item details unavailable</span>
                      )}
                    </td>

                    <td className="p-4 font-bold text-slate-900 dark:text-white">{challan.total_quantity} units</td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          challan.status === 'CONFIRMED'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : challan.status === 'DRAFT'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {challan.status}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      {challan.status === 'DRAFT' && (
                        <>
                          <button
                            onClick={() => handleConfirm(challan.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
                          >
                            Confirm &amp; Deduct Stock
                          </button>
                          <button
                            onClick={() => handleCancel(challan.id)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 text-slate-600 dark:text-slate-400 hover:text-rose-600 font-semibold text-xs rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Challan Builder Modal */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Interactive Sales Challan Builder</h3>
              <button onClick={() => setIsBuilderOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {builderError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{builderError}</span>
              </div>
            )}

            <form onSubmit={handleCreateChallanSubmit} className="space-y-6 text-xs">
              {/* Select Customer */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select Customer</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.business_name}) - {c.type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Line Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Challan Line Items</label>
                  <button
                    type="button"
                    onClick={handleAddLineItem}
                    className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Product Line
                  </button>
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {lineItems.map((item, idx) => {
                    const prod = products.find((p) => p.id === item.product_id);
                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3"
                      >
                        <div className="flex-1">
                          <select
                            value={item.product_id}
                            onChange={(e) => handleItemChange(idx, 'product_id', e.target.value)}
                            className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          >
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name} (Stock: {p.current_stock}) - ${p.unit_price}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="w-24">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(idx, 'quantity', parseInt(e.target.value, 10))}
                            className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center font-bold"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveLineItem(idx)}
                          className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex justify-between items-center text-sm font-extrabold text-blue-900 dark:text-blue-200">
                <span>Estimated Challan Total:</span>
                <span>${calculateBuilderTotal().toFixed(2)}</span>
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsBuilderOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
                >
                  Create Draft Challan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

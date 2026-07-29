import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProducts, createProduct, updateProduct, createStockLog } from '../services/api';
import { StatCard } from '../components/StatCard';
import { Package, AlertTriangle, Plus, Search, Filter, MapPin, Upload, X, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProductsView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [lowStockFilter, setLowStockFilter] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Stock Adjust Modal State
  const [stockModalProduct, setStockModalProduct] = useState<Product | null>(null);
  const [adjustQty, setAdjustQty] = useState(1);
  const [movementType, setMovementType] = useState<'IN' | 'OUT'>('IN');
  const [reason, setReason] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Industrial Hardware',
    unit_price: '0.00',
    current_stock: '0',
    min_stock_alert: '5',
    location: '',
    image_url: '',
  });

  const { user } = useAuth();

  const fetchProductsList = async () => {
    try {
      setLoading(true);
      const data = await getProducts({
        search,
        category: categoryFilter,
        low_stock: lowStockFilter,
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, [search, categoryFilter, lowStockFilter]);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setSelectedFile(null);
    setFormData({
      name: '',
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Industrial Hardware',
      unit_price: '49.99',
      current_stock: '25',
      min_stock_alert: '5',
      location: 'Aisle 1, Bin A',
      image_url: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setSelectedFile(null);
    setFormData({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      unit_price: String(prod.unit_price),
      current_stock: String(prod.current_stock),
      min_stock_alert: String(prod.min_stock_alert),
      location: prod.location,
      image_url: prod.image_url || '',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          ...formData,
          unit_price: parseFloat(formData.unit_price),
          current_stock: parseInt(formData.current_stock, 10),
          min_stock_alert: parseInt(formData.min_stock_alert, 10),
        });
      } else {
        const bodyFormData = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
          bodyFormData.append(key, val);
        });
        if (selectedFile) {
          bodyFormData.append('image', selectedFile);
        }
        await createProduct(bodyFormData);
      }
      setIsModalOpen(false);
      fetchProductsList();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleStockAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockModalProduct) return;
    try {
      await createStockLog({
        product_id: stockModalProduct.id,
        quantity_changed: adjustQty,
        movement_type: movementType,
        reason,
      });
      setStockModalProduct(null);
      setReason('');
      fetchProductsList();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error adjusting stock level.');
    }
  };

  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.current_stock <= p.min_stock_alert).length;
  const totalStockUnits = products.reduce((acc, p) => acc + Number(p.current_stock), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Inventory &amp; Product Catalog</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time stock control, Cloudinary media upload, and bin location tracking.
          </p>
        </div>

        {(user?.role === 'ADMIN' || user?.role === 'WAREHOUSE') && (
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center space-x-2 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Catalog SKUs" value={totalProducts} icon={Package} color="blue" />
        <StatCard title="Low Stock Alerts" value={lowStockCount} icon={AlertTriangle} color="rose" />
        <StatCard title="Total Stock Units" value={totalStockUnits} icon={MapPin} color="purple" />
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKU, name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        <div className="flex w-full sm:w-auto items-center gap-3">
          <button
            onClick={() => setLowStockFilter(!lowStockFilter)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors border ${
              lowStockFilter
                ? 'bg-rose-500 text-white border-rose-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Low Stock Only</span>
          </button>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter Category..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 text-center text-slate-400">Loading inventory catalog...</div>
        ) : products.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-400">No products match your current filters.</div>
        ) : (
          products.map((prod) => {
            const isLowStock = prod.current_stock <= prod.min_stock_alert;

            return (
              <div
                key={prod.id}
                className={`glass-panel p-5 rounded-3xl border transition-all hover:shadow-md flex flex-col justify-between ${
                  isLowStock ? 'border-rose-500/50 bg-rose-500/5' : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-40 w-full rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4 border border-slate-200/60 dark:border-slate-700/60">
                    {prod.image_url ? (
                      <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-semibold text-xs">
                        No Image Uploaded
                      </div>
                    )}

                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-900/80 text-white font-mono text-[10px]">
                      {prod.sku}
                    </div>

                    {isLowStock && (
                      <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center gap-1 shadow-md animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> Low Stock
                      </div>
                    )}
                  </div>

                  {/* Title & Category */}
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{prod.name}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span>{prod.category}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {prod.location}
                    </span>
                  </div>

                  {/* Price & Stock Stats */}
                  <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400">Unit Price</span>
                      <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                        ${Number(prod.unit_price).toFixed(2)}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Stock Balance</span>
                      <p
                        className={`text-lg font-extrabold ${
                          isLowStock ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {prod.current_stock} <span className="text-xs font-medium text-slate-400">units</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {(user?.role === 'ADMIN' || user?.role === 'WAREHOUSE') && (
                  <div className="mt-5 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setStockModalProduct(prod);
                        setAdjustQty(1);
                        setMovementType('IN');
                        setReason('Stock Receipt');
                      }}
                      className="flex-1 py-1.5 px-2 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs rounded-xl hover:bg-emerald-600/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" /> Adjust Stock
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(prod)}
                      className="py-1.5 px-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      Edit SKU
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Product (Cloudinary)'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Unit Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.unit_price}
                    onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={formData.current_stock}
                    onChange={(e) => setFormData({ ...formData, current_stock: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Min Alert Limit</label>
                  <input
                    type="number"
                    required
                    value={formData.min_stock_alert}
                    onChange={(e) => setFormData({ ...formData, min_stock_alert: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Warehouse Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {!editingProduct && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Upload Product Image (Cloudinary CDN)
                  </label>
                  <div className="flex items-center space-x-3">
                    <label className="flex-1 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 text-center cursor-pointer hover:border-blue-500 transition-colors">
                      <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">
                        {selectedFile ? selectedFile.name : 'Choose File...'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
                >
                  Save Product SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {stockModalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Manual Stock IN / OUT</h3>
                <p className="text-xs text-blue-500 font-semibold">{stockModalProduct.name}</p>
              </div>
              <button onClick={() => setStockModalProduct(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStockAdjustSubmit} className="space-y-4 text-xs">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setMovementType('IN')}
                  className={`flex-1 py-2.5 rounded-xl font-bold border transition-colors flex items-center justify-center gap-1 ${
                    movementType === 'IN'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" /> Stock IN (+ Receipt)
                </button>

                <button
                  type="button"
                  onClick={() => setMovementType('OUT')}
                  className={`flex-1 py-2.5 rounded-xl font-bold border transition-colors flex items-center justify-center gap-1 ${
                    movementType === 'OUT'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" /> Stock OUT (- Dispatch)
                </button>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Reason / Reference</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Supplier Delivery PO #9021 or Damage Audit"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setStockModalProduct(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

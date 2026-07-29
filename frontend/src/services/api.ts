import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor to attach Authorization JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexuserp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nexuserp_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const loginApi = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Customer Service
export const getCustomers = async (params?: { status?: string; type?: string; search?: string }) => {
  const response = await api.get('/customers', { params });
  return response.data;
};

export const createCustomer = async (data: any) => {
  const response = await api.post('/customers', data);
  return response.data;
};

export const updateCustomer = async (id: string, data: any) => {
  const response = await api.put(`/customers/${id}`, data);
  return response.data;
};

export const addCustomerNotes = async (id: string, data: { notes: string; follow_up_date?: string }) => {
  const response = await api.post(`/customers/${id}/notes`, data);
  return response.data;
};

// Product Service
export const getProducts = async (params?: { category?: string; search?: string; low_stock?: boolean }) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const createProduct = async (formData: FormData) => {
  const response = await api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateProduct = async (id: string, data: any) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

// Stock Log Service
export const getStockLogs = async (params?: { movement_type?: string; product_id?: string }) => {
  const response = await api.get('/stock-logs', { params });
  return response.data;
};

export const createStockLog = async (data: {
  product_id: string;
  quantity_changed: number;
  movement_type: 'IN' | 'OUT';
  reason: string;
}) => {
  const response = await api.post('/stock-logs', data);
  return response.data;
};

// Sales Challan Service
export const getChallans = async (params?: { status?: string; customer_id?: string }) => {
  const response = await api.get('/challans', { params });
  return response.data;
};

export const createChallan = async (data: {
  customer_id: string;
  items: Array<{ product_id: string; quantity: number }>;
}) => {
  const response = await api.post('/challans', data);
  return response.data;
};

export const confirmChallan = async (id: string) => {
  const response = await api.patch(`/challans/${id}/confirm`);
  return response.data;
};

export const cancelChallan = async (id: string) => {
  const response = await api.patch(`/challans/${id}/cancel`);
  return response.data;
};

export default api;

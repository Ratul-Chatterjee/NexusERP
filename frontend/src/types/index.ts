export type UserRole = 'ADMIN' | 'SALES' | 'WAREHOUSE' | 'ACCOUNTS';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type CustomerType = 'RETAIL' | 'WHOLESALE' | 'DISTRIBUTOR';
export type CustomerStatus = 'LEAD' | 'ACTIVE' | 'INACTIVE';

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  business_name: string;
  gst_number?: string;
  type: CustomerType;
  address: string;
  status: CustomerStatus;
  follow_up_date?: string;
  notes?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unit_price: number;
  current_stock: number;
  min_stock_alert: number;
  location: string;
  image_url?: string;
  created_at: string;
}

export type MovementType = 'IN' | 'OUT';

export interface StockLog {
  id: string;
  product_id: string;
  product_name?: string;
  product_sku?: string;
  quantity_changed: number;
  movement_type: MovementType;
  reason: string;
  created_by?: string;
  created_by_name?: string;
  created_at: string;
}

export type ChallanStatus = 'DRAFT' | 'CONFIRMED' | 'CANCELLED';

export interface ChallanItem {
  id?: string;
  challan_id?: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
}

export interface Challan {
  id: string;
  challan_number: string;
  customer_id: string;
  customer_snapshot: Partial<Customer>;
  total_quantity: number;
  status: ChallanStatus;
  created_by?: string;
  created_by_name?: string;
  created_at: string;
  items?: ChallanItem[];
}

// Auth & User Types
export interface User {
  id: string
  email: string
  full_name: string
  role_id: string
  clinic_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Role {
  id: string
  name: string
  label: string
  description?: string
  category: 'CORE' | 'LAB' | 'CLINIC' | 'LOGISTICS'
  is_system: boolean
  created_at: string
}

export interface Permission {
  id: string
  code: string
  name: string
  description?: string
  category: string
  created_at: string
}

export interface View {
  id: string
  code: string
  name: string
  path: string
  icon?: string
  parent_id?: string
  order_index: number
  created_at: string
}

export interface RolePermission {
  role_id: string
  permission_id: string
  can_create: boolean
  can_read: boolean
  can_update: boolean
  can_delete: boolean
}

export interface RoleView {
  role_id: string
  view_id: string
}

export interface UserPermission {
  user_id: string
  permission_id: string
  can_create: boolean
  can_read: boolean
  can_update: boolean
  can_delete: boolean
}

export interface UserView {
  user_id: string
  view_id: string
}

// Clinic Types
export interface Clinic {
  id: string
  name: string
  code: string
  address?: string
  phone?: string
  email?: string
  is_active: boolean
  created_at: string
}

export interface ClinicStaff {
  id: string
  clinic_id: string
  user_id: string
  is_primary: boolean
  created_at: string
}

// Patient Types
export interface Patient {
  id: string
  clinic_id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  date_of_birth?: string
  address?: string
  medical_notes?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Lab Types
export interface LabStage {
  id: string
  name: string
  code: string
  order_index: number
  is_active: boolean
  created_at: string
}

export interface LabOrder {
  id: string
  order_number: string
  clinic_id: string
  patient_id: string
  doctor_id: string
  current_stage_id: string
  status: 'draft' | 'pending' | 'in_progress' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface LabOrderItem {
  id: string
  order_id: string
  product_code: string
  description: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
}

export interface LabOrderHistory {
  id: string
  order_id: string
  stage_id: string
  user_id: string
  action: string
  notes?: string
  created_at: string
}

// Dev Quick Login User
export interface DevUser {
  email: string
  password: string
  label: string
}

// Auth Store
export interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => Promise<void>
}

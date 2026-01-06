-- DentalFlow 2.0 Initial Schema Migration

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ROLES & PERMISSIONS SYSTEM
-- =============================================

-- Roles table
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) UNIQUE NOT NULL,
  label VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(20) NOT NULL CHECK (category IN ('CORE', 'LAB', 'CLINIC', 'LOGISTICS')),
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permissions table
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Views table (menu items/pages)
CREATE TABLE views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  path VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  parent_id UUID REFERENCES views(id),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role-Permission relationship (CRUD matrix)
CREATE TABLE role_permissions (
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  can_create BOOLEAN DEFAULT false,
  can_read BOOLEAN DEFAULT false,
  can_update BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  PRIMARY KEY (role_id, permission_id)
);

-- Role-View relationship
CREATE TABLE role_views (
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  view_id UUID REFERENCES views(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, view_id)
);

-- Users table (extends Supabase auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role_id UUID REFERENCES roles(id),
  clinic_id UUID,
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User-specific permission overrides
CREATE TABLE user_permissions (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  can_create BOOLEAN DEFAULT false,
  can_read BOOLEAN DEFAULT false,
  can_update BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  PRIMARY KEY (user_id, permission_id)
);

-- User-specific view overrides
CREATE TABLE user_views (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  view_id UUID REFERENCES views(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, view_id)
);

-- =============================================
-- CLINICS
-- =============================================

CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE clinic_staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(clinic_id, user_id)
);

-- =============================================
-- PATIENTS
-- =============================================

CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  date_of_birth DATE,
  address TEXT,
  medical_notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ODONTOGRAMA (DENTAL CHART)
-- =============================================

CREATE TABLE dental_findings_catalog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(7),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE dental_chart (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  tooth_number INTEGER NOT NULL CHECK (tooth_number BETWEEN 11 AND 48),
  finding_id UUID REFERENCES dental_findings_catalog(id),
  surface VARCHAR(10),
  notes TEXT,
  recorded_by UUID REFERENCES users(id),
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- LAB SYSTEM
-- =============================================

-- Lab Stages (10 KAMBA stages)
CREATE TABLE lab_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lab Materials
CREATE TABLE lab_material_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lab_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_type_id UUID REFERENCES lab_material_types(id),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(100) UNIQUE NOT NULL,
  unit_price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lab Configuration
CREATE TABLE lab_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lab Orders
CREATE TABLE lab_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  clinic_id UUID REFERENCES clinics(id),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES users(id),
  current_stage_id UUID REFERENCES lab_stages(id),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE lab_order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES lab_orders(id) ON DELETE CASCADE,
  product_code VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lab_order_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES lab_orders(id) ON DELETE CASCADE,
  stage_id UUID REFERENCES lab_stages(id),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lab_correlatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id),
  year INTEGER NOT NULL,
  last_number INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(clinic_id, year)
);

-- =============================================
-- LOGISTICS
-- =============================================

CREATE TABLE logistics_routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE logistics_stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES logistics_routes(id) ON DELETE CASCADE,
  clinic_id UUID REFERENCES clinics(id),
  order_index INTEGER NOT NULL,
  estimated_time_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ODOO INTEGRATION
-- =============================================

CREATE TABLE odoo_sync_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  odoo_id INTEGER,
  action VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE odoo_field_mapping (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL,
  local_field VARCHAR(100) NOT NULL,
  odoo_field VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- FINANCIAL
-- =============================================

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  unit_price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  clinic_id UUID REFERENCES clinics(id),
  patient_id UUID REFERENCES patients(id),
  order_id UUID REFERENCES lab_orders(id),
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  due_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  reference VARCHAR(100),
  notes TEXT,
  paid_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_clinic_id ON users(clinic_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_patients_clinic_id ON patients(clinic_id);
CREATE INDEX idx_dental_chart_patient_id ON dental_chart(patient_id);
CREATE INDEX idx_lab_orders_clinic_id ON lab_orders(clinic_id);
CREATE INDEX idx_lab_orders_patient_id ON lab_orders(patient_id);
CREATE INDEX idx_lab_orders_status ON lab_orders(status);
CREATE INDEX idx_lab_orders_current_stage_id ON lab_orders(current_stage_id);
CREATE INDEX idx_invoices_clinic_id ON invoices(clinic_id);
CREATE INDEX idx_invoices_patient_id ON invoices(patient_id);
CREATE INDEX idx_invoices_status ON invoices(status);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE views ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE dental_findings_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE dental_chart ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_material_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_order_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_correlatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE logistics_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE logistics_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE odoo_sync_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE odoo_field_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (authenticated users can read their own data)
-- More specific policies should be added based on roles and permissions

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can read roles and permissions
CREATE POLICY "Authenticated users can read roles" ON roles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read permissions" ON permissions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read views" ON views
  FOR SELECT TO authenticated USING (true);

-- Clinic-specific access policies
CREATE POLICY "Users can read their clinic data" ON clinics
  FOR SELECT TO authenticated USING (
    id IN (SELECT clinic_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can read their clinic's patients" ON patients
  FOR SELECT TO authenticated USING (
    clinic_id IN (SELECT clinic_id FROM users WHERE id = auth.uid())
  );

-- =============================================
-- TRIGGERS
-- =============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clinics_updated_at BEFORE UPDATE ON clinics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lab_orders_updated_at BEFORE UPDATE ON lab_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lab_materials_updated_at BEFORE UPDATE ON lab_materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

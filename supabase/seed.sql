-- DentalFlow 2.0 Seed Data

-- =============================================
-- ROLES (16 roles)
-- =============================================

INSERT INTO roles (name, label, description, category, is_system) VALUES
-- CORE
('super_admin', 'Super Administrador', 'Acceso completo al sistema', 'CORE', true),

-- LAB
('lab_admin', 'Administrador de Laboratorio', 'Gestión completa del laboratorio', 'LAB', true),
('lab_coordinator', 'Coordinador de Laboratorio', 'Coordina operaciones del laboratorio', 'LAB', true),
('lab_design', 'Diseñador', 'Diseño de prótesis y aparatos', 'LAB', true),
('lab_yesos', 'Técnico de Yesos', 'Manejo de modelos de yeso', 'LAB', true),
('lab_nesting', 'Técnico de Nesting', 'Preparación para manufactura', 'LAB', true),
('lab_man', 'Técnico de Manufactura', 'Producción y manufactura', 'LAB', true),
('lab_qa', 'Control de Calidad', 'Inspección y QA', 'LAB', true),
('lab_billing', 'Facturación de Laboratorio', 'Gestión de facturación', 'LAB', true),

-- CLINIC
('clinic_admin', 'Administrador de Clínica', 'Gestión completa de la clínica', 'CLINIC', true),
('doctor', 'Doctor/Odontólogo', 'Atención de pacientes', 'CLINIC', true),
('assistant', 'Asistente Dental', 'Apoyo en consultas', 'CLINIC', true),
('pharmacy', 'Farmacia', 'Gestión de medicamentos', 'CLINIC', true),

-- LOGISTICS
('logistics_admin', 'Administrador de Logística', 'Gestión de logística', 'LOGISTICS', true),
('logistics_intake', 'Recepción de Laboratorio', 'Recepción de órdenes', 'LOGISTICS', true),
('logistics_messenger', 'Mensajero', 'Entregas y recolecciones', 'LOGISTICS', true);

-- =============================================
-- LAB STAGES (10 KAMBA stages)
-- =============================================

INSERT INTO lab_stages (name, code, order_index) VALUES
('Clínica', 'CLINIC', 1),
('Ingresos', 'INTAKE', 2),
('Yesos', 'PLASTER', 3),
('Diseño', 'DESIGN', 4),
('Aprobación Cliente', 'APPROVAL', 5),
('Nesting', 'NESTING', 6),
('Manufactura (MAN)', 'MANUFACTURING', 7),
('Control de Calidad (QA)', 'QA', 8),
('Facturación (Billing)', 'BILLING', 9),
('Entrega (Delivery)', 'DELIVERY', 10);

-- =============================================
-- PERMISSIONS
-- =============================================

INSERT INTO permissions (code, name, category) VALUES
-- Patients
('patient.manage', 'Gestionar Pacientes', 'Patients'),
('patient.view', 'Ver Pacientes', 'Patients'),

-- Dental Chart
('dental_chart.manage', 'Gestionar Odontograma', 'Dental Chart'),
('dental_chart.view', 'Ver Odontograma', 'Dental Chart'),

-- Lab Orders
('lab_order.create', 'Crear Órdenes de Lab', 'Lab Orders'),
('lab_order.manage', 'Gestionar Órdenes de Lab', 'Lab Orders'),
('lab_order.view', 'Ver Órdenes de Lab', 'Lab Orders'),

-- Users
('user.manage', 'Gestionar Usuarios', 'Users'),
('user.view', 'Ver Usuarios', 'Users'),

-- Roles
('role.manage', 'Gestionar Roles', 'Roles'),
('role.view', 'Ver Roles', 'Roles'),

-- Clinics
('clinic.manage', 'Gestionar Clínicas', 'Clinics'),
('clinic.view', 'Ver Clínicas', 'Clinics'),

-- Billing
('billing.manage', 'Gestionar Facturación', 'Billing'),
('billing.view', 'Ver Facturación', 'Billing'),

-- Reports
('report.view', 'Ver Reportes', 'Reports'),
('report.export', 'Exportar Reportes', 'Reports');

-- =============================================
-- VIEWS (Navigation)
-- =============================================

INSERT INTO views (code, name, path, icon, order_index) VALUES
('dashboard', 'Dashboard', '/dashboard', 'LayoutDashboard', 1),
('patients', 'Pacientes', '/dashboard/patients', 'Users', 2),
('dental_chart', 'Odontograma', '/dashboard/dental-chart', 'FileText', 3),
('lab_orders', 'Órdenes Lab', '/dashboard/lab-orders', 'Beaker', 4),
('billing', 'Facturación', '/dashboard/billing', 'CreditCard', 5),
('clinics', 'Clínicas', '/dashboard/clinics', 'Building2', 6),
('users', 'Usuarios', '/dashboard/users', 'Users', 7),
('roles', 'Roles', '/dashboard/roles', 'ShieldCheck', 8),
('permissions', 'Permisos', '/dashboard/permissions', 'ShieldCheck', 9),
('settings', 'Configuración', '/dashboard/settings', 'Settings', 10);

-- =============================================
-- DEFAULT CLINICS
-- =============================================

INSERT INTO clinics (name, code, address, phone, email) VALUES
('Clínica Dental 1', 'CLINIC001', 'Av. Principal 123', '555-0001', 'clinic1@dentalflow.com'),
('Clínica Dental 2', 'CLINIC002', 'Calle Secundaria 456', '555-0002', 'clinic2@dentalflow.com');

-- =============================================
-- DENTAL FINDINGS CATALOG
-- =============================================

INSERT INTO dental_findings_catalog (code, name, description, color, requires_lab) VALUES
-- Clinical Procedures (NO require lab)
('SANO', 'Sano', 'Diente sano sin hallazgos', '#ffffff', false),
('CARIES', 'Caries', 'Caries dental', '#ef4444', false),
('AMALGAMA', 'Amalgama', 'Obturación con amalgama', '#6b7280', false),
('RESINA', 'Resina', 'Obturación con resina/composite', '#93c5fd', false),
('ENDODONCIA', 'Endodoncia', 'Tratamiento de conducto', '#f97316', false),
('EXTRACCION', 'Extracción', 'Extracción dental', '#dc2626', false),
('SELLANTE', 'Sellante', 'Sellante de fosas y fisuras', '#86efac', false),
('FRACTURA', 'Fractura', 'Fractura dental', '#991b1b', false),
('AUSENTE', 'Ausente', 'Diente ausente', '#9ca3af', false),

-- Laboratory & Prosthesis (REQUIRE lab order)
('CORONA', 'Corona', 'Corona dental', '#eab308', true),
('CARILLA', 'Carilla', 'Carilla dental', '#facc15', true),
('PUENTE', 'Puente', 'Puente dental', '#ca8a04', true),
('INCRUSTACION', 'Incrustación', 'Incrustación dental', '#d97706', true),
('PERNO', 'Perno Colado', 'Perno y muñón colado', '#78350f', true),
('PROTESIS_TOTAL', 'Prótesis Total', 'Prótesis total removible', '#8b5cf6', true),
('PROTESIS_REMOVIBLE', 'P. Removible', 'Prótesis parcial removible', '#a78bfa', true),
('GUARDA', 'Guarda', 'Guarda oclusal', '#10b981', true),
('ALINEADOR', 'Alineador', 'Alineador ortodóntico', '#06b6d4', true),
('RETENEDOR', 'Retenedor', 'Retenedor ortodóntico', '#0ea5e9', true),
('IMPLANTE', 'Implante', 'Implante dental', '#3b82f6', true);

-- =============================================
-- LAB MATERIAL TYPES
-- =============================================

INSERT INTO lab_material_types (name, code, description) VALUES
('Resina', 'RESIN', 'Materiales de resina'),
('Metal', 'METAL', 'Metales y aleaciones'),
('Cerámica', 'CERAMIC', 'Materiales cerámicos'),
('Yeso', 'PLASTER', 'Yesos y modelos');

-- =============================================
-- SERVICES
-- =============================================

INSERT INTO services (name, code, description, unit_price, category) VALUES
('Limpieza Dental', 'SVC001', 'Limpieza dental completa', 50.00, 'Preventiva'),
('Extracción Simple', 'SVC002', 'Extracción de diente simple', 75.00, 'Cirugía'),
('Obturación', 'SVC003', 'Obturación/Empaste', 60.00, 'Restaurativa'),
('Corona Cerámica', 'SVC004', 'Corona de cerámica', 400.00, 'Prótesis'),
('Implante Dental', 'SVC005', 'Implante dental completo', 1200.00, 'Implantología'),
('Endodoncia', 'SVC006', 'Tratamiento de conducto', 250.00, 'Endodoncia');

-- =============================================
-- ROLE-VIEW ASSIGNMENTS
-- =============================================

-- Super Admin - All views
INSERT INTO role_views (role_id, view_id)
SELECT r.id, v.id FROM roles r, views v WHERE r.name = 'super_admin';

-- Clinic Admin - Clinical views
INSERT INTO role_views (role_id, view_id)
SELECT r.id, v.id FROM roles r, views v 
WHERE r.name = 'clinic_admin' 
AND v.code IN ('dashboard', 'patients', 'dental_chart', 'lab_orders', 'billing', 'users', 'settings');

-- Doctor - Core clinical views
INSERT INTO role_views (role_id, view_id)
SELECT r.id, v.id FROM roles r, views v 
WHERE r.name = 'doctor' 
AND v.code IN ('dashboard', 'patients', 'dental_chart', 'lab_orders', 'settings');

-- Lab Admin - Lab views
INSERT INTO role_views (role_id, view_id)
SELECT r.id, v.id FROM roles r, views v 
WHERE r.name = 'lab_admin' 
AND v.code IN ('dashboard', 'lab_orders', 'billing', 'users', 'settings');

-- Lab Technician roles - Basic lab views
INSERT INTO role_views (role_id, view_id)
SELECT r.id, v.id FROM roles r, views v 
WHERE r.name IN ('lab_design', 'lab_yesos', 'lab_nesting', 'lab_man', 'lab_qa') 
AND v.code IN ('dashboard', 'lab_orders', 'settings');

-- =============================================
-- ROLE-PERMISSION ASSIGNMENTS (CRUD)
-- =============================================

-- Super Admin - All permissions (full CRUD)
INSERT INTO role_permissions (role_id, permission_id, can_create, can_read, can_update, can_delete)
SELECT r.id, p.id, true, true, true, true FROM roles r, permissions p WHERE r.name = 'super_admin';

-- Clinic Admin - Clinical permissions
INSERT INTO role_permissions (role_id, permission_id, can_create, can_read, can_update, can_delete)
SELECT r.id, p.id, true, true, true, true FROM roles r, permissions p 
WHERE r.name = 'clinic_admin' 
AND p.code IN ('patient.manage', 'dental_chart.manage', 'lab_order.create', 'lab_order.view', 'billing.manage', 'user.view');

-- Doctor - Core clinical access
INSERT INTO role_permissions (role_id, permission_id, can_create, can_read, can_update, can_delete)
SELECT r.id, p.id, true, true, true, false FROM roles r, permissions p 
WHERE r.name = 'doctor' 
AND p.code IN ('patient.manage', 'dental_chart.manage', 'lab_order.create', 'lab_order.view');

-- Lab Admin - Lab management
INSERT INTO role_permissions (role_id, permission_id, can_create, can_read, can_update, can_delete)
SELECT r.id, p.id, true, true, true, true FROM roles r, permissions p 
WHERE r.name = 'lab_admin' 
AND p.code IN ('lab_order.manage', 'billing.manage', 'user.view');

-- Lab technicians - View and update orders
INSERT INTO role_permissions (role_id, permission_id, can_create, can_read, can_update, can_delete)
SELECT r.id, p.id, false, true, true, false FROM roles r, permissions p 
WHERE r.name IN ('lab_design', 'lab_yesos', 'lab_nesting', 'lab_man', 'lab_qa') 
AND p.code = 'lab_order.manage';

-- =============================================
-- LAB CONFIGURATIONS
-- =============================================

INSERT INTO lab_configurations (key, value, description) VALUES
('default_stage', 'CLINIC', 'Etapa por defecto para nuevas órdenes'),
('auto_numbering', 'true', 'Numeración automática de órdenes'),
('require_approval', 'true', 'Requiere aprobación de cliente'),
('notification_email', 'lab@dentalflow.com', 'Email para notificaciones');

-- =============================================
-- NOTE: DEV USERS
-- =============================================
-- Dev users will be created via Supabase Auth in the application
-- Then linked to this users table
-- 
-- Required dev users:
-- 1. admin@dentalflow.com (super_admin)
-- 2. dr.julio@clinica1.com (doctor)
-- 3. dr.celeste@clinica1.com (doctor)
-- 4. lab.admin@dentalflow.com (lab_admin)
-- 5. tecnico@dentalflow.com (lab_man)

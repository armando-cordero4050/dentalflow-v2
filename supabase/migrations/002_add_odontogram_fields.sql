-- Add requires_lab field to dental_findings_catalog
ALTER TABLE dental_findings_catalog ADD COLUMN requires_lab BOOLEAN DEFAULT false;

-- Add lab_order_id to dental_chart to link findings with lab orders
ALTER TABLE dental_chart ADD COLUMN lab_order_id UUID REFERENCES lab_orders(id) ON DELETE SET NULL;

-- Add extended fields to lab_orders for wizard data
ALTER TABLE lab_orders ADD COLUMN material VARCHAR(100);
ALTER TABLE lab_orders ADD COLUMN material_type VARCHAR(100);
ALTER TABLE lab_orders ADD COLUMN configuration VARCHAR(255);
ALTER TABLE lab_orders ADD COLUMN shade VARCHAR(50);
ALTER TABLE lab_orders ADD COLUMN shipping_type VARCHAR(50);
ALTER TABLE lab_orders ADD COLUMN delivery_date DATE;
ALTER TABLE lab_orders ADD COLUMN is_express BOOLEAN DEFAULT false;
ALTER TABLE lab_orders ADD COLUMN shipping_notes TEXT;

-- Update dental_findings_catalog with requires_lab for existing records
UPDATE dental_findings_catalog SET requires_lab = false WHERE code IN ('SANO', 'CARIES', 'OBTURADO', 'FRACTURA', 'AUSENTE', 'ENDODONCIA');
UPDATE dental_findings_catalog SET requires_lab = true WHERE code IN ('CORONA', 'IMPLANTE');

-- Add clinic_settings table for clinic configuration
CREATE TABLE IF NOT EXISTS clinic_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  legal_name TEXT,
  logo_url TEXT,
  slogan TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'Guatemala',
  postal_code TEXT,
  phone TEXT,
  phone_secondary TEXT,
  email TEXT,
  website TEXT,
  tax_id TEXT,
  tax_regime TEXT,
  commercial_registry TEXT,
  prescription_header TEXT,
  prescription_footer TEXT,
  order_terms TEXT,
  invoice_notes TEXT,
  facebook TEXT,
  instagram TEXT,
  whatsapp TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(clinic_id)
);

-- Add index for faster lookups
CREATE INDEX idx_clinic_settings_clinic_id ON clinic_settings(clinic_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clinic_settings_updated_at BEFORE UPDATE ON clinic_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

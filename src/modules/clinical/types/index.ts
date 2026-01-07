// =============================================
// TOOTH TYPES - FDI Numbering System
// =============================================

export type ToothNumber = 
  // Permanent teeth - Adults (32 teeth)
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18  // Upper Right (Quadrant 1)
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28  // Upper Left (Quadrant 2)
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38  // Lower Left (Quadrant 3)
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48  // Lower Right (Quadrant 4)
  // Deciduous teeth - Children (20 teeth)
  | 51 | 52 | 53 | 54 | 55  // Upper Right (Quadrant 5)
  | 61 | 62 | 63 | 64 | 65  // Upper Left (Quadrant 6)
  | 71 | 72 | 73 | 74 | 75  // Lower Left (Quadrant 7)
  | 81 | 82 | 83 | 84 | 85; // Lower Right (Quadrant 8)

// =============================================
// TOOTH SURFACES
// =============================================

export type SurfaceId = 'vestibular' | 'lingual' | 'mesial' | 'distal' | 'oclusal';

export interface ToothSurface {
  id: SurfaceId;
  name: string;
  abbr: string;
  path: string;
  description: string;
}

// =============================================
// DENTAL FINDINGS
// =============================================

export interface Finding {
  id: string;
  code: string;
  name: string;
  description?: string;
  color: string;
  requiresLab: boolean;
}

export interface ToothFinding {
  id: string;
  patientId: string;
  toothNumber: ToothNumber;
  findingId: string;
  surface: SurfaceId;
  notes?: string;
  labOrderId?: string;
  recordedBy: string;
  recordedAt: string;
  createdAt: string;
  // Joined data
  finding?: Finding;
}

// =============================================
// ODONTOGRAM STATE
// =============================================

export interface OdontogramSelection {
  toothNumber: ToothNumber | null;
  surface: SurfaceId | null;
}

export interface DentalChartData {
  [key: string]: {
    toothNumber: ToothNumber;
    surfaces: {
      [key in SurfaceId]?: {
        findingId: string;
        color: string;
        name: string;
        requiresLab: boolean;
        labOrderId?: string;
      };
    };
  };
}

// =============================================
// WIZARD TYPES
// =============================================

export interface WizardMaterial {
  base: string;
  type: string;
  configuration: string;
  price: number;
}

export interface WizardItem {
  id: string;
  toothNumber: ToothNumber;
  surface: SurfaceId;
  findingCode: string;
  findingName: string;
  shade?: string;
  notes?: string;
}

export interface WizardShipping {
  type: 'pickup' | 'courier' | 'digital';
  deliveryDate: Date;
  isExpress: boolean;
  notes?: string;
}

export interface WizardState {
  material: WizardMaterial | null;
  items: WizardItem[];
  shipping: WizardShipping | null;
  currentStep: number;
  isOpen: boolean;
}

// =============================================
// ACTION INPUTS
// =============================================

export interface SaveFindingInput {
  patientId: string;
  toothNumber: ToothNumber;
  surface: SurfaceId;
  findingId: string;
  notes?: string;
  recordedBy: string;
}

export interface CreateLabOrderInput {
  patientId: string;
  clinicId: string;
  doctorId: string;
  material: string;
  materialType: string;
  configuration: string;
  shade?: string;
  shippingType: string;
  deliveryDate: Date;
  isExpress: boolean;
  shippingNotes?: string;
  notes?: string;
  items: {
    productCode: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}

// =============================================
// ACTION RESULTS
// =============================================

export interface ActionResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

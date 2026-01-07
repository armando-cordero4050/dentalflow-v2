import type { ToothNumber, ToothSurface, Finding } from '../types';

// =============================================
// FDI TOOTH NUMBERING SYSTEM
// =============================================

export const ADULT_TEETH = {
  upperRight: [18, 17, 16, 15, 14, 13, 12, 11] as ToothNumber[],
  upperLeft: [21, 22, 23, 24, 25, 26, 27, 28] as ToothNumber[],
  lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38] as ToothNumber[],
  lowerRight: [48, 47, 46, 45, 44, 43, 42, 41] as ToothNumber[],
};

export const CHILD_TEETH = {
  upperRight: [55, 54, 53, 52, 51] as ToothNumber[],
  upperLeft: [61, 62, 63, 64, 65] as ToothNumber[],
  lowerLeft: [71, 72, 73, 74, 75] as ToothNumber[],
  lowerRight: [85, 84, 83, 82, 81] as ToothNumber[],
};

// =============================================
// TOOTH SURFACES (5 per tooth)
// =============================================

export const SURFACES: ToothSurface[] = [
  {
    id: 'vestibular',
    name: 'Vestibular',
    abbr: 'V',
    path: 'M 0,0 L 40,0 L 28,12 L 12,12 Z', // Top triangle
    description: 'Cara externa (hacia mejilla/labio)',
  },
  {
    id: 'lingual',
    name: 'Lingual',
    abbr: 'L',
    path: 'M 0,40 L 40,40 L 28,28 L 12,28 Z', // Bottom triangle
    description: 'Cara interna (hacia lengua/paladar)',
  },
  {
    id: 'mesial',
    name: 'Mesial',
    abbr: 'M',
    path: 'M 0,0 L 12,12 L 12,28 L 0,40 Z', // Left triangle
    description: 'Cara hacia la línea media',
  },
  {
    id: 'distal',
    name: 'Distal',
    abbr: 'D',
    path: 'M 40,0 L 40,40 L 28,28 L 28,12 Z', // Right triangle
    description: 'Cara alejada de la línea media',
  },
  {
    id: 'oclusal',
    name: 'Oclusal',
    abbr: 'O',
    path: 'M 12,12 L 28,12 L 28,28 L 12,28 Z', // Center square
    description: 'Superficie de masticación',
  },
];

// =============================================
// DENTAL FINDINGS CATALOG
// =============================================

// Clinical Procedures (NO require lab)
export const CLINICAL_FINDINGS: Finding[] = [
  { id: 'healthy', code: 'SANO', name: 'Sano', color: '#ffffff', requiresLab: false, description: 'Diente sano sin hallazgos' },
  { id: 'caries', code: 'CARIES', name: 'Caries', color: '#ef4444', requiresLab: false, description: 'Caries dental' },
  { id: 'amalgam', code: 'AMALGAMA', name: 'Amalgama', color: '#6b7280', requiresLab: false, description: 'Obturación con amalgama' },
  { id: 'composite', code: 'RESINA', name: 'Resina', color: '#93c5fd', requiresLab: false, description: 'Obturación con resina/composite' },
  { id: 'endodoncia', code: 'ENDODONCIA', name: 'Endodoncia', color: '#f97316', requiresLab: false, description: 'Tratamiento de conducto' },
  { id: 'extraccion', code: 'EXTRACCION', name: 'Extracción', color: '#dc2626', requiresLab: false, description: 'Extracción dental' },
  { id: 'sellante', code: 'SELLANTE', name: 'Sellante', color: '#86efac', requiresLab: false, description: 'Sellante de fosas y fisuras' },
  { id: 'fractura', code: 'FRACTURA', name: 'Fractura', color: '#991b1b', requiresLab: false, description: 'Fractura dental' },
  { id: 'ausente', code: 'AUSENTE', name: 'Ausente', color: '#9ca3af', requiresLab: false, description: 'Diente ausente' },
];

// Laboratory & Prosthesis (REQUIRE lab order)
export const LAB_FINDINGS: Finding[] = [
  { id: 'corona', code: 'CORONA', name: 'Corona', color: '#eab308', requiresLab: true, description: 'Corona dental' },
  { id: 'carilla', code: 'CARILLA', name: 'Carilla', color: '#facc15', requiresLab: true, description: 'Carilla dental' },
  { id: 'puente', code: 'PUENTE', name: 'Puente', color: '#ca8a04', requiresLab: true, description: 'Puente dental' },
  { id: 'incrustacion', code: 'INCRUSTACION', name: 'Incrustación', color: '#d97706', requiresLab: true, description: 'Incrustación dental' },
  { id: 'perno', code: 'PERNO', name: 'Perno Colado', color: '#78350f', requiresLab: true, description: 'Perno y muñón colado' },
  { id: 'protesis_total', code: 'PROTESIS_TOTAL', name: 'Prótesis Total', color: '#8b5cf6', requiresLab: true, description: 'Prótesis total removible' },
  { id: 'protesis_removible', code: 'PROTESIS_REMOVIBLE', name: 'P. Removible', color: '#a78bfa', requiresLab: true, description: 'Prótesis parcial removible' },
  { id: 'guarda', code: 'GUARDA', name: 'Guarda', color: '#10b981', requiresLab: true, description: 'Guarda oclusal' },
  { id: 'alineador', code: 'ALINEADOR', name: 'Alineador', color: '#06b6d4', requiresLab: true, description: 'Alineador ortodóntico' },
  { id: 'retenedor', code: 'RETENEDOR', name: 'Retenedor', color: '#0ea5e9', requiresLab: true, description: 'Retenedor ortodóntico' },
  { id: 'implante', code: 'IMPLANTE', name: 'Implante', color: '#3b82f6', requiresLab: true, description: 'Implante dental' },
];

// All findings combined
export const ALL_FINDINGS: Finding[] = [...CLINICAL_FINDINGS, ...LAB_FINDINGS];

// =============================================
// WIZARD MATERIALS
// =============================================

export const MATERIALS = {
  bases: [
    { value: 'zirconia', label: 'Zirconia' },
    { value: 'pmma', label: 'PMMA' },
    { value: 'metal', label: 'Metal' },
    { value: 'ceramic', label: 'Cerámica' },
    { value: 'resin', label: 'Resina' },
  ],
  types: {
    zirconia: [
      { value: 'translucent', label: 'Translúcida' },
      { value: 'high_strength', label: 'Alta Resistencia' },
      { value: 'multilayer', label: 'Multicapa' },
    ],
    pmma: [
      { value: 'temp', label: 'Temporal' },
      { value: 'long_term', label: 'Largo Plazo' },
    ],
    metal: [
      { value: 'cr_co', label: 'Cromo-Cobalto' },
      { value: 'gold', label: 'Oro' },
    ],
    ceramic: [
      { value: 'feldspathic', label: 'Feldespática' },
      { value: 'lithium', label: 'Disilicato de Litio' },
    ],
    resin: [
      { value: 'composite', label: 'Composite' },
      { value: 'bis_acryl', label: 'Bis-Acryl' },
    ],
  },
  configurations: [
    { value: 'crown_anterior', label: 'Corona Anterior' },
    { value: 'crown_posterior', label: 'Corona Posterior' },
    { value: 'bridge_3_units', label: 'Puente 3 Unidades' },
    { value: 'bridge_4_units', label: 'Puente 4+ Unidades' },
    { value: 'veneer', label: 'Carilla' },
    { value: 'inlay', label: 'Incrustación' },
    { value: 'denture_full', label: 'Prótesis Total' },
    { value: 'denture_partial', label: 'Prótesis Parcial' },
  ],
};

// =============================================
// SHADE GUIDE (VITA)
// =============================================

export const VITA_SHADES = [
  'A1', 'A2', 'A3', 'A3.5', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4',
  'D2', 'D3', 'D4',
];

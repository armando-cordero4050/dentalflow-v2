// =============================================
// LAB STAGE TYPES (KAMBA)
// =============================================

export interface LabStage {
  id: string;
  name: string;
  code: string;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
}

export interface KambaStage {
  code: string;
  name: string;
  color: string;
  icon: string;
}

export const KAMBA_STAGES: KambaStage[] = [
  { code: 'CLINIC', name: '1. Clínica', color: '#FEF3C7', icon: 'FileText' },
  { code: 'INTAKE', name: '2. Ingresos', color: '#DBEAFE', icon: 'Inbox' },
  { code: 'PLASTER', name: '3. Yesos', color: '#E0E7FF', icon: 'Box' },
  { code: 'DESIGN', name: '4. Diseño', color: '#FCE7F3', icon: 'Pencil' },
  { code: 'APPROVAL', name: '5. Apro Cliente', color: '#FEF9C3', icon: 'UserCheck' },
  { code: 'NESTING', name: '6. Nesting', color: '#D1FAE5', icon: 'Grid3x3' },
  { code: 'MANUFACTURING', name: '7. MAN', color: '#FFEDD5', icon: 'Cog' },
  { code: 'QA', name: '8. QA', color: '#E0F2FE', icon: 'CheckCircle' },
  { code: 'BILLING', name: '9. Billing', color: '#F3E8FF', icon: 'Receipt' },
  { code: 'DELIVERY', name: '10. Delivery', color: '#DCFCE7', icon: 'Truck' },
];

// =============================================
// LAB ORDER TYPES
// =============================================

export interface LabOrder {
  id: string;
  orderNumber: string;
  clinicId: string;
  patientId: string;
  doctorId: string;
  currentStageId: string;
  status: 'draft' | 'pending' | 'in_progress' | 'completed' | 'cancelled';
  material?: string;
  materialType?: string;
  configuration?: string;
  shade?: string;
  shippingType?: string;
  deliveryDate?: string;
  isExpress?: boolean;
  shippingNotes?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  // Joined data
  clinic?: { name: string; code: string };
  patient?: { firstName: string; lastName: string };
  doctor?: { fullName: string };
  currentStage?: LabStage;
  items?: LabOrderItem[];
}

export interface LabOrderItem {
  id: string;
  orderId: string;
  productCode: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
}

export interface LabOrderHistory {
  id: string;
  orderId: string;
  stageId: string;
  userId: string;
  action: string;
  notes?: string;
  createdAt: string;
  // Joined data
  stage?: LabStage;
  user?: { fullName: string };
}

// =============================================
// KAMBA BOARD TYPES
// =============================================

export interface KambaBoardColumn {
  stage: KambaStage;
  orders: LabOrder[];
}

export interface OrderFilters {
  clinicId?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

// =============================================
// ACTION INPUTS
// =============================================

export interface UpdateOrderStageInput {
  orderId: string;
  newStageId: string;
  userId: string;
  notes?: string;
}

export interface CreateOrderHistoryInput {
  orderId: string;
  stageId: string;
  userId: string;
  action: string;
  notes?: string;
}

import { create } from 'zustand';
import type { WizardMaterial, WizardItem, WizardShipping } from '../types';

interface WizardStoreState {
  // Wizard state
  isOpen: boolean;
  currentStep: number;
  
  // Data
  material: WizardMaterial | null;
  items: WizardItem[];
  shipping: WizardShipping | null;
  notes: string;
  
  // Context
  patientId: string | null;
  clinicId: string | null;
  doctorId: string | null;
  
  // Actions
  openWizard: (patientId: string, clinicId: string, doctorId: string) => void;
  closeWizard: () => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  setMaterial: (material: WizardMaterial) => void;
  addItem: (item: WizardItem) => void;
  removeItem: (itemId: string) => void;
  updateItem: (itemId: string, updates: Partial<WizardItem>) => void;
  setShipping: (shipping: WizardShipping) => void;
  setNotes: (notes: string) => void;
  
  reset: () => void;
}

const initialState = {
  isOpen: false,
  currentStep: 0,
  material: null,
  items: [],
  shipping: null,
  notes: '',
  patientId: null,
  clinicId: null,
  doctorId: null,
};

export const useWizardStore = create<WizardStoreState>((set) => ({
  ...initialState,
  
  openWizard: (patientId, clinicId, doctorId) => set({
    ...initialState,
    isOpen: true,
    patientId,
    clinicId,
    doctorId,
  }),
  
  closeWizard: () => set({ isOpen: false }),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, 3),
  })),
  
  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0),
  })),
  
  setMaterial: (material) => set({ material }),
  
  addItem: (item) => set((state) => ({
    items: [...state.items, item],
  })),
  
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter((item) => item.id !== itemId),
  })),
  
  updateItem: (itemId, updates) => set((state) => ({
    items: state.items.map((item) =>
      item.id === itemId ? { ...item, ...updates } : item
    ),
  })),
  
  setShipping: (shipping) => set({ shipping }),
  
  setNotes: (notes) => set({ notes }),
  
  reset: () => set(initialState),
}));

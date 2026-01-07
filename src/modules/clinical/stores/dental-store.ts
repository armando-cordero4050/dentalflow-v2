import { create } from 'zustand';
import type { ToothNumber, SurfaceId, ToothFinding, Finding } from '../types';

interface DentalStoreState {
  // Selection state
  selectedTooth: ToothNumber | null;
  selectedSurface: SurfaceId | null;
  
  // Dialog state
  isDialogOpen: boolean;
  selectedFinding: Finding | null;
  
  // Findings data
  findings: ToothFinding[];
  
  // Patient context
  patientId: string | null;
  
  // Actions
  setSelectedTooth: (tooth: ToothNumber | null) => void;
  setSelectedSurface: (surface: SurfaceId | null) => void;
  setDialogOpen: (open: boolean) => void;
  setSelectedFinding: (finding: Finding | null) => void;
  setFindings: (findings: ToothFinding[]) => void;
  addFinding: (finding: ToothFinding) => void;
  removeFinding: (findingId: string) => void;
  setPatientId: (patientId: string | null) => void;
  reset: () => void;
}

const initialState = {
  selectedTooth: null,
  selectedSurface: null,
  isDialogOpen: false,
  selectedFinding: null,
  findings: [],
  patientId: null,
};

export const useDentalStore = create<DentalStoreState>((set) => ({
  ...initialState,
  
  setSelectedTooth: (tooth) => set({ selectedTooth: tooth }),
  
  setSelectedSurface: (surface) => set({ selectedSurface: surface }),
  
  setDialogOpen: (open) => set({ isDialogOpen: open }),
  
  setSelectedFinding: (finding) => set({ selectedFinding: finding }),
  
  setFindings: (findings) => set({ findings }),
  
  addFinding: (finding) => set((state) => ({
    findings: [...state.findings, finding],
  })),
  
  removeFinding: (findingId) => set((state) => ({
    findings: state.findings.filter((f) => f.id !== findingId),
  })),
  
  setPatientId: (patientId) => set({ patientId }),
  
  reset: () => set(initialState),
}));

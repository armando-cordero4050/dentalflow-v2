'use client';

import React from 'react';
import type { ToothNumber, DentalChartData } from '../../types';
import { SURFACES, ADULT_TEETH, CHILD_TEETH } from '../../constants/dental';
import { ToothSurfaceComponent } from './tooth-surface';
import { useDentalStore } from '../../stores/dental-store';

interface ToothChartProps {
  mode: 'adult' | 'child';
  chartData: DentalChartData;
}

export function ToothChart({ mode, chartData }: ToothChartProps) {
  const { setSelectedTooth, setSelectedSurface, setDialogOpen } = useDentalStore();
  
  const teeth = mode === 'adult' ? ADULT_TEETH : CHILD_TEETH;
  
  const handleSurfaceClick = (toothNumber: ToothNumber, surfaceId: string) => {
    setSelectedTooth(toothNumber);
    setSelectedSurface(surfaceId as any);
    setDialogOpen(true);
  };
  
  const renderTooth = (toothNumber: ToothNumber, index: number) => {
    const toothData = chartData[toothNumber];
    
    return (
      <svg
        key={toothNumber}
        width="50"
        height="50"
        viewBox="0 0 40 40"
        className="border border-gray-300 rounded"
      >
        {SURFACES.map((surface) => {
          const surfaceData = toothData?.surfaces[surface.id];
          const color = surfaceData?.color || '#ffffff';
          
          return (
            <ToothSurfaceComponent
              key={surface.id}
              surface={surface}
              color={color}
              onClick={() => handleSurfaceClick(toothNumber, surface.id)}
            />
          );
        })}
        
        {/* Tooth number label */}
        <text
          x="20"
          y="20"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fill="#666666"
          pointerEvents="none"
        >
          {toothNumber}
        </text>
      </svg>
    );
  };
  
  return (
    <div className="space-y-4">
      {/* Upper Jaw */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600">Maxilar Superior</div>
        <div className="flex justify-center gap-1">
          {/* Upper Right */}
          <div className="flex gap-1">
            {teeth.upperRight.map((tooth, index) => renderTooth(tooth, index))}
          </div>
          
          {/* Divider */}
          <div className="w-4 border-l-2 border-gray-400" />
          
          {/* Upper Left */}
          <div className="flex gap-1">
            {teeth.upperLeft.map((tooth, index) => renderTooth(tooth, index))}
          </div>
        </div>
      </div>
      
      {/* Lower Jaw */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600">Maxilar Inferior</div>
        <div className="flex justify-center gap-1">
          {/* Lower Left */}
          <div className="flex gap-1">
            {teeth.lowerLeft.map((tooth, index) => renderTooth(tooth, index))}
          </div>
          
          {/* Divider */}
          <div className="w-4 border-l-2 border-gray-400" />
          
          {/* Lower Right */}
          <div className="flex gap-1">
            {teeth.lowerRight.map((tooth, index) => renderTooth(tooth, index))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import type { ToothSurface } from '../../types';
import { cn } from '@/lib/utils';

interface ToothSurfaceProps {
  surface: ToothSurface;
  color?: string;
  onClick?: () => void;
  className?: string;
}

export function ToothSurfaceComponent({ surface, color = '#ffffff', onClick, className }: ToothSurfaceProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <g
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('cursor-pointer transition-opacity', className)}
      style={{ opacity: isHovered ? 0.8 : 1 }}
    >
      <path
        d={surface.path}
        fill={color}
        stroke="#000000"
        strokeWidth="1"
        className="transition-all"
      />
      {isHovered && (
        <title>{surface.name} - {surface.description}</title>
      )}
    </g>
  );
}

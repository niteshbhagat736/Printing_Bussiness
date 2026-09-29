import React from 'react';
import type { OrderStatus } from '@/lib/types';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/utils';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  return (
    <span
      className="badge"
      style={{
        ...STATUS_COLORS[status].split(' ').reduce((acc, cls) => {
          // Map Tailwind-like strings to inline styles
          return acc;
        }, {}),
        fontSize: size === 'sm' ? '0.7rem' : '0.75rem',
        padding: size === 'sm' ? '0.2rem 0.5rem' : '0.25rem 0.75rem',
        background: getStatusBg(status),
        color: getStatusText(status),
        border: `1px solid ${getStatusBorder(status)}`,
        borderRadius: 9999,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function getStatusBg(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    quote_requested: '#fef9c3',
    quote_sent: '#dbeafe',
    quote_approved: '#e0e7ff',
    design_confirmed: '#f3e8ff',
    in_production: '#ffedd5',
    ready: '#dcfce7',
    completed: '#f3f4f6',
    cancelled: '#fee2e2',
  };
  return map[status];
}

function getStatusText(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    quote_requested: '#a16207',
    quote_sent: '#1d4ed8',
    quote_approved: '#4338ca',
    design_confirmed: '#7c3aed',
    in_production: '#c2410c',
    ready: '#16a34a',
    completed: '#4b5563',
    cancelled: '#dc2626',
  };
  return map[status];
}

function getStatusBorder(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    quote_requested: '#fde047',
    quote_sent: '#93c5fd',
    quote_approved: '#a5b4fc',
    design_confirmed: '#d8b4fe',
    in_production: '#fdba74',
    ready: '#86efac',
    completed: '#d1d5db',
    cancelled: '#fca5a5',
  };
  return map[status];
}

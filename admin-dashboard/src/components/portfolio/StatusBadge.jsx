import React from 'react';

const STATUS_VARIANTS = {
  // Contact statuses
  new: 'bg-primary',
  read: 'bg-secondary',
  replied: 'bg-success',
  archived: 'bg-dark',
  
  // Certification statuses
  in_progress: 'bg-warning text-dark',
  completed: 'bg-success',
  planned: 'bg-info',
  
  // Project statuses
  draft: 'bg-secondary',
  published: 'bg-success',
};

export default function StatusBadge({ status }) {
  const variant = STATUS_VARIANTS[status] || 'bg-light text-dark';
  const label = String(status || '').replace('_', ' ').toUpperCase();
  
  return (
    <span className={`badge ${variant}`}>
      {label}
    </span>
  );
}

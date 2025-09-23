'use client';

import { X } from 'lucide-react';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
}
export type AlertType = 'success' | 'error' | 'warning' | 'info';

export default function Alert({ type, message, onClose }: AlertProps) {
  const colors: Record<AlertType, string> = {
    success: 'bg-[#7ED957] text-white',   // Verde
    error: 'bg-[#E63946] text-white',     // Rojo coral
    warning: 'bg-[#FFA23C] text-white',   // Naranja
    info: 'bg-[#3DD9D6] text-white',      // Celeste
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-80 transition-all duration-300 ${colors[type]}`}
    >
      <span className="font-medium">{message}</span>
      <button onClick={onClose}>
        <X className="w-5 h-5 ml-3 opacity-80 hover:opacity-100" />
      </button>
    </div>
  );
}

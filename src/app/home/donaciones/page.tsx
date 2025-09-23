// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

import { PieChart } from '@mui/x-charts/PieChart';
import DonationModal from '@/app/home/donaciones/components/DonationModal';
import { useState } from 'react';
export default function Donaciones() {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 justify-start min-h-screen py-20">
        <div className="flex flex-col gap-2 text-center">
            <h1 className="text-5xl font-bold text-[#3DD9D6]">Apoya a Nuestra Causa</h1>
            <p className="text-lg text-gray-600">Tu donación nos permite seguir rescatando y cuidando a más animales.</p>
        </div>
        <div className="flex gap-8 justify-center text-center mx-20">
          <div className="flex flex-col gap-2 w-1/2 text-left">
            <h1 className="text-5xl font-bold text-[#3DD9D6]">Cómo se invierte tu ayuda?</h1>
            <p className="text-lg text-gray-600">Cada contribución es vital. Con tu apoyo, podemos proporcionar alimento, atención veterinaria, refugio y programas de esterilización. Este gráfico muestra cómo distribuimos los recursos para maximizar el impacto de cada donación en el bienestar de nuestros animales.</p>
            <button className="mt-4 px-6 py-3 w-fit bg-[#3DD9D6] text-white hover:bg-[#3DD9D6] rounded-full transition"
             onClick={() => setOpen(true)}>
              Hacer donación
            </button>
          </div>
          <article className="rounded-2xl border border-secondary-200 bg-white p-4 shadow-sm">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 2000000.00, label: 'Alimento y suministros' },
                  { id: 1, value: 500000.00, label: 'Atención veterinaria' },
                  { id: 2, value: 300000.00, label: 'Mantenimiento del refugio' },
                  { id: 3, value: 200000.00, label: 'Programas de esterilización' },
                ],
                innerRadius: 30,
                paddingAngle: 2,
                cornerRadius: 3,
              },
            ]}
            height={260}
            />
        </article>
        </div>
        <DonationModal
          isOpen={open}
          onClose={() => setOpen(false)}
          amount={20}
          onSuccess={(res) => {
            // mostrar alert global, recargar datos, etc.
            console.log('donation success', res);
          }}
        />
    </div>
  );
}

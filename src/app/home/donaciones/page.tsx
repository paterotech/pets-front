// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Catalogo() {

  return (
    <div className="flex flex-col items-center gap-8 justify-start min-h-screen py-20">
        <div className="flex flex-col gap-2 text-center">
            <h1 className="text-5xl font-bold text-[#006d6d]">Apoya a Nuestra Causa</h1>
            <p className="text-lg text-gray-600">Tu donación nos permite seguir rescatando y cuidando a más animales.</p>
        </div>
        <div className="flex gap-8 justify-center text-center mx-20">
          <div className="flex flex-col gap-2 w-1/2 text-left">
            <h1 className="text-5xl font-bold text-[#006d6d]">Cómo se invierte tu ayuda?</h1>
            <p className="text-lg text-gray-600">Cada contribución es vital. Con tu apoyo, podemos proporcionar alimento, atención veterinaria, refugio y programas de esterilización. Este gráfico muestra cómo distribuimos lso recursos para maximizar el impacto de cada donación en el bienestar de nuestros animales.</p>
          </div>
          <div className="flex flex-col gap-2 w-1/2 text-right">
            <h1 className="text-5xl font-bold text-[#006d6d]">Cómo se invierte tu ayuda?</h1>
            <p className="text-lg text-gray-600">Cada contribución es vital. Con tu apoyo, podemos proporcionar alimento, atención veterinaria, refugio y programas de esterilización. Este gráfico muestra cómo distribuimos lso recursos para maximizar el impacto de cada donación en el bienestar de nuestros animales.</p>
          </div>
        </div>
    </div>
  );
}

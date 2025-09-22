// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';

export default function Catalogo() {


  const itemsNav = useMemo(
    () => [
        { id:1 ,name: 'Max', years: 2, description:"tetestesteste" ,icon: 'dog' },
        { id:2 ,name: 'Teo', years: 3, description:"tetestesteste" ,icon: 'dog' },
        { id:3 ,name: 'Zeus', years: 4, description:"tetestesteste" ,icon: 'dog' },
        { id:4 ,name: 'Luna', years: 4, description:"tetestesteste" ,icon: 'cat' },
        { id:5 ,name: 'Estrella', years: 1, description:"tetestesteste" ,icon: 'cat' },
      ],
    []
  );
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col gap-4 text-center">
            <h1 className="text-7xl font-bold text-[#3DD9D6]">Encuentra a tu amigo fiel</h1>
            <p className="text-xl text-gray-600">Explora los perfiles de las mascotas que esperan un hogar.</p>
            <div className="flex space-x-4 justify-center">
              <button className="bg-[#3DD9D6] text-white text-lg font-semibold px-4 py-2 rounded-full">Todos</button>
              <button className="bg-[#3DD9D6] text-white text-lg font-semibold px-4 py-2 rounded-full">Perros</button>
              <button className="bg-[#3DD9D6] text-white text-lg font-semibold px-4 py-2 rounded-full">Gatos</button>
            </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itemsNav.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <Image src={`/${item.icon}.png`} alt={item.name} width={300} height={200} className="rounded-lg mb-4" />
              <h2 className="text-[#FFD93D] text-2xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600">Edad: {item.years} años</p>
              <p className="text-gray-600">{item.description}</p>
              <button className="bg-orange-400 text-white text-lg font-semibold px-4 py-2 rounded-full mt-4">Ver perfil</button>
            </div>
          ))}
        </div>
    </div>
  );
}

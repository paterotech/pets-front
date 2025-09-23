// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useAlert } from '@/app/context/AlertContext';
import { useLoader } from '@/app/context/LoaderContext';

export default function Catalogo() {
  const { showAlert } = useAlert();
  const { showLoader, hideLoader } = useLoader();
  const [ filtersItems, setFiltersItems ]  = useState<any>([
    { id:1 ,name: 'Todos', selected: true },
    { id:2 ,name: 'Perros', selected: false },
    { id:3 ,name: 'Gatos', selected: false },
  ]);

  const itemsNav = useMemo(
    () => [
        { id:1 ,name: 'Max', years: 2, description:"tetestesteste" ,icon: 'dog' },
        { id:2 ,name: 'Teo', years: 3, description:"tetestesteste" ,icon: 'dog' },
        { id:3 ,name: 'Zeus', years: 4, description:"tetestesteste" ,icon: 'dog' },
        { id:4 ,name: 'Luna', years: 4, description:"tetestesteste" ,icon: 'cat' },
        { id:5 ,name: 'Estrella', years: 1, description:"tetestesteste" ,icon: 'cat' },
        { id:6 ,name: 'Niña', years: 1, description:"tetestestestead asdasd asd asd " ,icon: 'cat' },
      ],
    []
  );  

  const handleClick = () => {
    showLoader();
    setTimeout(() => {
      hideLoader();
      showAlert('success', 'Datos cargados correctamente 🎉');
    }, 3000);
  };
  const handleFilterClick = (id: number) => {
    // Aquí puedes manejar la lógica de filtrado
    filtersItems.forEach( (item:any) => item.selected = (item.id === id));
    setFiltersItems([...filtersItems]);
    console.log(`Filtrar por ID: ${id}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col gap-2 text-center mt-10">
            <h1 className="text-6xl font-bold text-[#3DD9D6]">Encuentra a tu amigo fiel</h1>
            <p className="text-xl text-gray-600">Explora los perfiles de las mascotas que esperan un hogar.</p>
            <div className="flex space-x-4 justify-center">
              {filtersItems.map((item: any) => (
                <button key={item.id} className={`bg-[#3DD9D6] text-white text-lg font-semibold px-4 py-2 rounded-full ${item.selected ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                  onClick={() => handleFilterClick(item.id)} >
                  {item.name}
                </button>
              ))}
            </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {itemsNav.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <Image src={`/${item.icon}.png`} alt={item.name} width={250} height={150} className="rounded-lg mb-4" />
              <h2 className="text-[#FFD93D] text-2xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600">Edad: {item.years} años</p>
              <p className="text-gray-600">{item.description}</p>
              <button className="bg-orange-400 text-white text-lg font-semibold px-4 py-2 rounded-full mt-4"
              onClick={handleClick}
              >Ver perfil</button>
            </div>
          ))}
        </div>
    </div>
  );
}

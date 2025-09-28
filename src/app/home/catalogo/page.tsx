'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useAlert } from '@/app/context/AlertContext';
import { useLoader } from '@/app/context/LoaderContext';
import PetProfileModal from './componets/PetProfileModal';

export default function Catalogo() {
  const { showAlert } = useAlert();
  const { showLoader, hideLoader } = useLoader();
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [filtersItems, setFiltersItems] = useState<any>([
    { id: 1, name: 'Todos', selected: true },
    { id: 2, name: 'Perros', selected: false },
    { id: 3, name: 'Gatos', selected: false },
  ]);

  const itemsNav = useMemo(
    () => [
      { id: 1, name: 'Max', years: 2, description: "Juguetón y cariñoso. Busca familia activa.", icon: 'dog' },
      { id: 2, name: 'Teo', years: 3, description: "Tranquilo y fiel. Ideal para compañía.", icon: 'dog' },
      { id: 3, name: 'Zeus', years: 4, description: "Energético y protector. Le encanta jugar.", icon: 'dog' },
      { id: 4, name: 'Luna', years: 4, description: "Dócil y tierna. Perfecta para niños.", icon: 'cat' },
      { id: 5, name: 'Estrella', years: 1, description: "Curiosa y activa. Muy sociable.", icon: 'cat' },
      { id: 6, name: 'Niña', years: 1, description: "Dulce y tranquila. Busca un hogar amoroso.", icon: 'cat' },
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
    filtersItems.forEach((item: any) => item.selected = (item.id === id));
    setFiltersItems([...filtersItems]);
  };

  // Filtrado de mascotas según filtro seleccionado
  const filteredPets = useMemo(() => {
    const selected = filtersItems.find((f: any) => f.selected)?.name;
    if (selected === 'Todos') return itemsNav;
    if (selected === 'Perros') return itemsNav.filter((i) => i.icon === 'dog');
    if (selected === 'Gatos') return itemsNav.filter((i) => i.icon === 'cat');
    return itemsNav;
  }, [filtersItems, itemsNav]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-[#e0f7fa] to-[#f8fafc]">
      <div className="flex flex-col gap-2 text-center mt-16">
        <h1 className="text-5xl font-extrabold text-[#3DD9D6] drop-shadow-lg">Encuentra a tu amigo fiel</h1>
        <p className="text-xl text-gray-600 mb-4">Explora los perfiles de las mascotas que esperan un hogar.</p>
        <div className="flex flex-wrap gap-3 justify-center mb-2">
          {filtersItems.map((item: any) => (
            <button
              key={item.id}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border-2 hover:cursor-pointer ${
                item.selected
                  ? 'bg-[#3DD9D6] border-[#3DD9D6] text-white shadow'
                  : 'bg-white border-[#3DD9D6] text-[#3DD9D6] hover:bg-[#e0f7fa]'
              }`}
              onClick={() => handleFilterClick(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {filteredPets.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in"
          >
            <Image
              src={`/${item.icon}.png`}
              alt={item.name}
              width={220}
              height={140}
              className="rounded-lg mb-4 object-cover"
            />
            <h2 className="text-[#FFD93D] text-2xl font-bold mb-1">{item.name}</h2>
            <p className="text-gray-600 mb-1">Edad: {item.years} años</p>
            <p className="text-gray-500 mb-3">{item.description}</p>
            <button
              className="bg-[#FFD93D] text-[#2D2D2D] font-semibold px-6 py-2 rounded-full mt-2 shadow hover:bg-[#ffe066] transition-all hover:cursor-pointer"
              onClick={() => {
                setSelectedPet(item);
                setModalOpen(true);
              }}
            >
              Ver perfil
            </button>
          </div>
        ))}
      </div>
      <PetProfileModal
        open={modalOpen}
        pet={selectedPet}
        onClose={() => setModalOpen(false)}
      />
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
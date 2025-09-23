// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { useLoader } from '@/app/context/LoaderContext';

export default function Navbar() {

    const { showLoader, hideLoader } = useLoader();

    const itemsNav = useMemo(
    () => [
        { id:1 ,name: 'Catálogo', href: '/home/catalogo' },
        { id:2 ,name: 'Donaciones', href: '/home/donaciones' },
        { id:3 ,name: 'Cómo adoptar', href: '/home/como-adoptar' },
        { id:4 ,name: 'Blogs', href: '/home/blogs' },
        { id:5 ,name: 'Contacto', href: '/home/contacto' },
        // { name: 'Iniciar sesión', href: '/auth/login' },
      ],
    []
  );

  const handleClick = () => {
    showLoader();
    setTimeout(() => {
      hideLoader();
    }, 3000);
  };

  return (
    <nav className="w-full bg-[#fdfdfb] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.png" // Coloca tu logo en public/logo.png
            alt="PetConnect logo"
            width={80}
            height={80}
          />
          <div className="flex flex-col leading-4">
            <span className="text-xl font-semibold text-[#3DD9D6]">
              PetConnect
            </span>
            <span className="text-xs text-gray-600 tracking-wide">
              COLOMBIA
            </span>
          </div>
        </div>

        {/* Menu */}
        <div className="flex gap-6 text-[#2D2D2D] font-medium">
            {itemsNav.map((item) => (
                <Link 
                    key={item.id} 
                    href={item.href} 
                    className="hover:text-[#3DD9D6]"
                    onClick={handleClick}
                >
                  <span className='text-sm md:text-base'>
                    {item.name}
                  </span>
                </Link>
            ))}     
        </div>
      </div>
    </nav>
  );
}

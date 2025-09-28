'use client';

import Image from 'next/image';
import BlogModal from './components/BlogModa';
import { useState } from 'react';

const blogs = [
  {
    id: 1,
    title: 'Campaña de Esterilización',
    description: 'Ayuda a controlar la población animal y mejora la calidad de vida de perros y gatos. Participa en nuestra jornada mensual de esterilización.',
    image: '/blogs/esterilizacion.jpg',
  },
  {
    id: 2,
    title: 'Adopta, No Compres',
    description: 'Descubre historias de adopción y conoce por qué adoptar es la mejor opción para ti y para una mascota que espera un hogar.',
    image: '/blogs/adopta.jpg',
  },
  {
    id: 3,
    title: 'Jornada de Vacunación',
    description: 'Protege a tu mascota y a la comunidad. Únete a nuestras campañas gratuitas de vacunación cada trimestre.',
    image: '/blogs/vacunacion.jpg',
  },
  {
    id: 4,
    title: 'Voluntariado PetConnect',
    description: 'Sé parte del cambio. Conoce cómo puedes ayudar como voluntario en nuestros refugios y eventos.',
    image: '/blogs/voluntariado.jpg',
  },
  {
    id: 5,
    title: 'Donaciones que Salvan Vidas',
    description: 'Tu aporte es fundamental para seguir rescatando y cuidando animales en situación de calle. ¡Conoce cómo donar!',
    image: '/blogs/donaciones.jpg',
  },
  {
    id: 6,
    title: 'Educación y Tenencia Responsable',
    description: 'Aprende sobre el cuidado responsable de mascotas y participa en nuestros talleres educativos.',
    image: '/blogs/educacion.jpg',
  },
];

export default function Campañas() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-[#e0f7fa] to-[#f8fafc]">
      <div className="text-center mt-16 mb-8">
        <h1 className="text-[#3DD9D6] font-extrabold text-4xl md:text-5xl drop-shadow-lg mb-2">Campañas y Noticias</h1>
        <p className="text-lg text-gray-600">Infórmate y participa en nuestras campañas por el bienestar animal.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden animate-fade-in"
          >
            <div className="relative w-full h-48">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-[#3DD9D6] mb-2">{blog.title}</h2>
              <p className="text-gray-700 mb-4 flex-1">{blog.description}</p>
              <button
                className="mt-auto bg-[#3DD9D6] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#2BB2B0] transition"
                onClick={() => {
                  setSelectedBlog(blog);
                  setModalOpen(true);
                }}
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
      <BlogModal
        open={modalOpen}
        blog={selectedBlog}
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
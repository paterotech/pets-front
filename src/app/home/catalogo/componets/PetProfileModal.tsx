import Image from 'next/image';

interface PetProfileModalProps {
  open: boolean;
  pet: {
    name: string;
    years: number;
    description: string;
    icon: string;
  } | null;
  onClose: () => void;
}

export default function PetProfileModal({ open, pet, onClose }: PetProfileModalProps) {
  if (!open || !pet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-[#3DD9D6] text-xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <Image
            src={`/${pet.icon}.png`}
            alt={pet.name}
            width={220}
            height={140}
            className="rounded-lg mb-4 object-cover"
          />
          <h2 className="text-3xl font-bold text-[#3DD9D6] mb-2">{pet.name}</h2>
          <p className="text-gray-600 mb-1">Edad: {pet.years} años</p>
          <p className="text-gray-500 text-center">{pet.description}</p>
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
}
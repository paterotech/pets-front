import Image from 'next/image';

interface BlogModalProps {
  open: boolean;
  blog: {
    title: string;
    description: string;
    image: string;
  } | null;
  onClose: () => void;
}

export default function BlogModal({ open, blog, onClose }: BlogModalProps) {
  if (!open || !blog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-[#3DD9D6] text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="flex flex-col items-center p-6">
          <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-[#3DD9D6] mb-2 text-center">{blog.title}</h2>
          <p className="text-gray-700 text-center">{blog.description}</p>
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97);}
          to { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
}
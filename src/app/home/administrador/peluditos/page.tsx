import { useState } from "react";
import { PawPrint, Edit2, Trash2, PlusCircle, Save } from "lucide-react";

export default function CrudPeluditos() {
  const mascotasMock = [
    { id: 1, nombre: 'Max', especie: 'Perro', edad: 2 },
    { id: 2, nombre: 'Luna', especie: 'Gato', edad: 4 },
  ];
  const [mascotas, setMascotas] = useState(mascotasMock);
  const [form, setForm] = useState({ nombre: '', especie: '', edad: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (!form.nombre || !form.especie || !form.edad) return;
    setMascotas([
      ...mascotas,
      { id: Date.now(), nombre: form.nombre, especie: form.especie, edad: Number(form.edad) },
    ]);
    setForm({ nombre: '', especie: '', edad: '' });
  };

  const handleEdit = (mascota: any) => {
    setEditId(mascota.id);
    setForm({ nombre: mascota.nombre, especie: mascota.especie, edad: mascota.edad.toString() });
  };

  const handleUpdate = () => {
    setMascotas(
      mascotas.map((m: any) =>
        m.id === editId ? { ...m, ...form, edad: Number(form.edad) } : m
      )
    );
    setEditId(null);
    setForm({ nombre: '', especie: '', edad: '' });
  };

  const handleDelete = (id: number) => setMascotas(mascotas.filter((m: any) => m.id !== id));

  return (
    <section className="p-8 bg-white/90 rounded-2xl shadow-xl mb-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <PawPrint className="text-[#3DD9D6] w-8 h-8" />
        <h2 className="text-2xl font-bold text-[#3DD9D6]">Gestión de Peluditos</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border border-[#3DD9D6] text-[#2D2D2D] rounded px-3 py-2 focus:ring-2 focus:ring-[#3DD9D6] outline-none transition"
        />
        <input
          name="especie"
          value={form.especie}
          onChange={handleChange}
          placeholder="Especie"
          className="border border-[#3DD9D6] text-[#2D2D2D] rounded px-3 py-2 focus:ring-2 focus:ring-[#3DD9D6] outline-none transition"
        />
        <input
          name="edad"
          value={form.edad}
          onChange={handleChange}
          placeholder="Edad"
          type="number"
          min={0}
          className="border border-[#3DD9D6] text-[#2D2D2D] rounded px-3 py-2 focus:ring-2 focus:ring-[#3DD9D6] outline-none transition"
        />
        {editId ? (
          <button
            onClick={handleUpdate}
            className="flex items-center gap-2 bg-[#FFD93D] text-[#2D2D2D] px-4 py-2 rounded font-semibold shadow hover:bg-[#ffe066] transition"
          >
            <Save size={18} /> Guardar
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#3DD9D6] text-white px-4 py-2 rounded font-semibold shadow hover:bg-[#2BB2B0] transition"
          >
            <PlusCircle size={18} /> Agregar
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border mt-4 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#e0f7fa] text-[#2D2D2D]">
              <th className="p-3">Nombre</th>
              <th className="p-3">Especie</th>
              <th className="p-3">Edad</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.map((m: any) => (
              <tr key={m.id} className="text-[#2D2D2D] border-t hover:bg-[#f8fafc] transition">
                <td className="p-3">{m.nombre}</td>
                <td className="p-3">{m.especie}</td>
                <td className="p-3">{m.edad}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="flex items-center gap-1 text-[#3DD9D6] hover:underline hover:text-[#2BB2B0] transition"
                  >
                    <Edit2 size={16} /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="flex items-center gap-1 text-[#E63946] hover:underline hover:text-[#b91c1c] transition"
                  >
                    <Trash2 size={16} /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </section>
  );
}
import { useState } from "react";
import { PawPrint, Edit2, Trash2, PlusCircle, Save } from "lucide-react";

export default function CrudBlogs() {
  const blogsMock = [
    { id: 1, title: 'Blog 1', summary: 'preusba', content: "asdad" },
    { id: 2, title: 'Blog 2', summary: 'Gato', content: "asdasd" },
  ];
  const [blogs, setBlogs] = useState(blogsMock);
  const [form, setForm] = useState({ title: '', summary: '', content: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (!form.title || !form.summary || !form.content) return;
    setBlogs([
      ...blogs,
      { id: Date.now(), title: form.title, summary: form.summary, content: form.content },
    ]);
    setForm({ title: '', summary: '', content: '' });
  };

  const handleEdit = (mascota: any) => {
    setEditId(mascota.id);
    setForm({ title: mascota.title, summary: mascota.summary, content: mascota.content });
  };

  const handleUpdate = () => {
    setBlogs(
      blogs.map((m: any) =>
        m.id === editId ? { ...m, ...form, content: form.content } : m
      )
    );
    setEditId(null);
    setForm({ title: '', summary: '', content: '' });
  };

  const handleDelete = (id: number) => setBlogs(blogs.filter((m: any) => m.id !== id));

  return (
    <section className="p-8 bg-white/90 rounded-2xl shadow-xl mb-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <PawPrint className="text-[#3DD9D6] w-8 h-8" />
        <h2 className="text-2xl font-bold text-[#3DD9D6]">Gestión de Blogs</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          name="titulo"
          value={form.title}
          onChange={handleChange}
          placeholder="Titulo"
          className="border border-[#3DD9D6] text-[#2D2D2D] rounded px-3 py-2 focus:ring-2 focus:ring-[#3DD9D6] outline-none transition"
        />
        <input
          name="Resumen"
          value={form.summary}
          onChange={handleChange}
          placeholder="Resumen"
          className="border border-[#3DD9D6] text-[#2D2D2D] rounded px-3 py-2 focus:ring-2 focus:ring-[#3DD9D6] outline-none transition"
        />
        <input
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Contenido"
          type="text"
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
              <th className="p-3">Titulo</th>
              <th className="p-3">Resumen</th>
              <th className="p-3">Contenido</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((m: any) => (
              <tr key={m.id} className="text-[#2D2D2D] border-t hover:bg-[#f8fafc] transition">
                <td className="p-3">{m.title}</td>
                <td className="p-3">{m.summary}</td>
                <td className="p-3">{m.content}</td>
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
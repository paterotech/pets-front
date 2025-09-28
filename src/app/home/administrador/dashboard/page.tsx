import { BarChart } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Dashboard() {
  // Datos simulados
  const mascotas = [
    { id: 1, nombre: 'Max', especie: 'Perro', edad: 2 },
    { id: 2, nombre: 'Luna', especie: 'Gato', edad: 4 },
    { id: 3, nombre: 'Zeus', especie: 'Perro', edad: 3 },
    { id: 4, nombre: 'Estrella', especie: 'Gato', edad: 1 },
  ];
  const solicitudes = [
    { id: 1, nombre: 'Juan Pérez', mascota: 'Max', estado: 'Pendiente' },
    { id: 2, nombre: 'Ana Gómez', mascota: 'Luna', estado: 'Aceptada' },
    { id: 3, nombre: 'Carlos Ruiz', mascota: 'Zeus', estado: 'Rechazada' },
    { id: 4, nombre: 'Laura Torres', mascota: 'Estrella', estado: 'Pendiente' },
  ];

  // Cálculos
  const totalMascotas = mascotas.length;
  const totalSolicitudes = solicitudes.length;
  const solicitudesPendientes = solicitudes.filter(s => s.estado === 'Pendiente').length;
  const solicitudesAceptadas = solicitudes.filter(s => s.estado === 'Aceptada').length;
  const solicitudesRechazadas = solicitudes.filter(s => s.estado === 'Rechazada').length;
  const perros = mascotas.filter(m => m.especie === 'Perro').length;
  const gatos = mascotas.filter(m => m.especie === 'Gato').length;

  return (
    <section className="p-8 bg-white/90 rounded-2xl shadow-xl mb-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-[#3DD9D6] mb-6">Dashboard de Administración</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#e0f7fa] rounded-xl p-6 flex flex-col items-center shadow">
          <span className="text-4xl font-bold text-[#3DD9D6]">{totalMascotas}</span>
          <span className="text-gray-700 mt-2">Mascotas registradas</span>
        </div>
        <div className="bg-[#fff5e6] rounded-xl p-6 flex flex-col items-center shadow">
          <span className="text-4xl font-bold text-[#FFA23C]">{totalSolicitudes}</span>
          <span className="text-gray-700 mt-2">Solicitudes totales</span>
        </div>
        <div className="bg-[#e8fbe6] rounded-xl p-6 flex flex-col items-center shadow">
          <span className="text-4xl font-bold text-[#7ED957]">{solicitudesAceptadas}</span>
          <span className="text-gray-700 mt-2">Solicitudes aceptadas</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-4 shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold text-[#3DD9D6] mb-2">Mascotas por especie</h3>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: perros, label: 'Perros' },
                  { id: 1, value: gatos, label: 'Gatos' },
                ],
                innerRadius: 40,
                paddingAngle: 2,
                cornerRadius: 4,
              },
            ]}
            height={220}
            
          />
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold text-[#3DD9D6] mb-2">Estado de solicitudes</h3>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Pendientes', 'Aceptadas', 'Rechazadas'] }]}
            series={[
              { data: [solicitudesPendientes, solicitudesAceptadas, solicitudesRechazadas], color: '#3DD9D6' },
            ]}
            height={220}
          />
        </div>
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
'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("" as string | null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Simula una llamada a una API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirige al usuario o maneja la sesión
        console.log('Login exitoso:', data);
        window.location.href = '/dashboard'; // Redirección simple
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Ocurrió un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-8 bg-white rounded-lg shadow-lg max-w-md w-96 mx-auto">
            <div className='flex justify-center'>
               <Image
                  src="/Logo.png"
                  alt="PetConnect logo"
                  width={100}
                  height={100}
                />
            </div>
            <div className='flex flex-col gap-2 mb-4'>
                <h2 className="text-2xl font-semibold text-center text-slate-800">Bienvenido 👋</h2>
                <h4 className="text-base text-center text-gray-500">Por favor ingresar a tu cuenta</h4>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <div className="mb-4">
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                    className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md text-slate-800 focus:outline-none focus:ring-[#2BB2B0] focus:border-[#2BB2B0]"
                />
            </div>
            
            <div className="mb-4">
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Contraseña"
                    className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md text-slate-800 focus:outline-none focus:ring-[#2BB2B0] focus:border-[#2BB2B0]"
                />
            </div>
            <div className='flex items-center justify-between gap-2 mb-4'>
                <div className='flex items-center'>
                    <input type="checkbox" name="rememberMe" id="rememberMe" className='w-4 h-4 text-[#2BB2B0] focus:ring-[#2BB2B0] checked:bg-[#2BB2B0] checked:border-[#2BB2B0] checked:ring-[#2BB2B0]'/>
                    <span className='text-sm text-gray-500 ml-2'>Recordarme</span>
                </div>
                <a href="/auth/forgot-password" className="text-sm text-[#2BB2B0] hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            
            <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-2 px-4 mb-4 rounded-lg font-semibold transition duration-200 ${
                loading ? 'bg-gray-500' : 'bg-[#3DD9D6] hover:bg-[#2BB2B0]'
                }`}
            >
                {loading ? 'Cargando...' : 'Ingresar'}
            </button>
            <div>
                <p className="text-base text-center text-gray-500">¿Nuevo en la plataforma? <a href="/auth/register" className="text-[#2BB2B0] hover:underline">Crear una cuenta</a></p>
            </div>
        </form>
    </div>
  );
}
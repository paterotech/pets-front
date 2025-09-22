'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registro exitoso:', data);
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Error al registrar');
      }
    } catch (err) {
      setError('Ocurrió un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-lg max-w-md w-96 mx-auto"
      >
        <div className='flex justify-center'>
            <Image
              src="/Logo.png"
              alt="PetConnect logo"
              width={100}
              height={100}
            />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-2xl font-semibold text-center text-slate-800">
            Crear cuenta ✨
          </h2>
          <h4 className="text-base text-center text-gray-500">
            Regístrate para comenzar
          </h4>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nombre completo"
            className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md text-slate-800 focus:outline-none focus:ring-[#3DD9D6] focus:border-[#3DD9D6]"
          />
        </div>

        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md text-slate-800 focus:outline-none focus:ring-[#3DD9D6] focus:border-[#3DD9D6]"
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Contraseña"
            className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md text-slate-800 focus:outline-none focus:ring-[#3DD9D6] focus:border-[#3DD9D6]"
          />
        </div>

        <div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirmar contraseña"
            className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md text-slate-800 focus:outline-none focus:ring-[#3DD9D6] focus:border-[#3DD9D6]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 px-4 rounded-lg font-semibold transition duration-200 ${
            loading ? 'bg-gray-500' : 'bg-[#3DD9D6] hover:bg-[#2BB2B0]'
          }`}
        >
          {loading ? 'Cargando...' : 'Registrarme'}
        </button>

        <div>
          <p className="text-base text-center text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <a href="/auth/login" className="text-[#3DD9D6] hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

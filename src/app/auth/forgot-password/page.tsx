'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Te hemos enviado un enlace para restablecer tu contraseña 📩');
      } else {
        setError(data.message || 'No pudimos procesar tu solicitud');
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
            Recuperar contraseña 🔑
          </h2>
          <h4 className="text-base text-center text-gray-500">
            Ingresa tu correo y te enviaremos instrucciones
          </h4>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-600 text-sm text-center">{message}</p>}

        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Tu correo electrónico"
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
          {loading ? 'Enviando...' : 'Enviar enlace'}
        </button>

        <div>
          <p className="text-base text-center text-gray-500">
            ¿Recordaste tu contraseña?{' '}
            <a href="/auth/login" className="text-[#2BB2B0] hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

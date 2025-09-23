// components/DonationModal.tsx
'use client';
import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  amount?: number; // monto opcional a mostrar
  onSuccess?: (data: any) => void; // callback si quieres manejar respuesta del servidor
};

export default function DonationModal({ isOpen, onClose, amount, onSuccess }: Props) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // reset cuando se cierra
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setName('');
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  // --- Helpers de formato y validación ---
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 19); // 19 por tarjetas (some 19)
    // agrupar en 4s
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  const luhnCheck = (cc: string) => {
    const digits = cc.replace(/\D/g, '');
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0 && digits.length >= 12; // valida longitud mínima
  };

  const validExpiry = (value: string) => {
    const m = value.replace(/\s/g, '').split('/');
    if (m.length !== 2) return false;
    const mm = parseInt(m[0], 10);
    const yy = parseInt(m[1], 10);
    if (isNaN(mm) || isNaN(yy)) return false;
    if (mm < 1 || mm > 12) return false;
    // asumir formato YY
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // YY
    const currentMonth = now.getMonth() + 1;
    if (yy < currentYear) return false;
    if (yy === currentYear && mm < currentMonth) return false;
    return true;
  };

  const validCvc = (value: string) => {
    const d = value.replace(/\D/g, '');
    return d.length >= 3 && d.length <= 4;
  };

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const rawCard = cardNumber.replace(/\s/g, '');
    if (!luhnCheck(rawCard)) {
      setError('Número de tarjeta inválido');
      return;
    }
    if (!validExpiry(expiry)) {
      setError('Fecha de expiración inválida');
      return;
    }
    if (!validCvc(cvc)) {
      setError('CVC inválido');
      return;
    }
    if (!name.trim()) {
      setError('Ingresa el nombre del titular');
      return;
    }

    setLoading(true);

    try {
      // Aquí deberías:
      // 1) Enviar los datos a tu backend que llame al proveedor de pagos (Stripe, PayU, etc.)
      // 2) O tokenizar con el SDK del proveedor en cliente y enviar token al backend.
      // Por seguridad NUNCA enviar raw card + cvc directamente a tu servidor sin TLS y sin
      // cumplir normas PCI si no usas un proveedor (mejor tokenizar en cliente).

      // Ejemplo simulando petición:
      const resp = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber: rawCard,
          expiry,
          cvc,
          name,
          amount: amount ?? null,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setError(data?.message || 'Error procesando el pago');
      } else {
        // éxito
        if (onSuccess) onSuccess(data);
        onClose();
      }
    } catch (err) {
      setError('Error de red. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="donation-modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => !loading && onClose()}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-xl z-10">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 id="donation-modal-title" className="text-lg font-semibold text-[#2d2d2d]">
                Donar {amount ? `- $${amount}` : ''}
              </h3>
              <p className="text-sm text-gray-600">Ingresa los datos de tu tarjeta</p>
            </div>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => !loading && onClose()}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
              <input
                inputMode="numeric"
                autoComplete="cc-number"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 1234 1234 1234"
                className="mt-1 block w-full p-3 border text-gray-900 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DD9D6]"
                required
                maxLength={23}
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Expiración (MM/YY)</label>
                <input
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  className="mt-1 block w-full p-3 border text-gray-900 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DD9D6]"
                  required
                  maxLength={5}
                />
              </div>

              <div style={{ width: '110px' }}>
                <label className="block text-sm font-medium text-gray-700">CVC</label>
                <input
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  className="mt-1 block w-full p-3 border text-gray-900 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DD9D6]"
                  required
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre en la tarjeta</label>
              <input
                autoComplete="cc-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="mt-1 block w-full p-3 border text-gray-900 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DD9D6]"
                required
              />
            </div>

            {error && <p className="text-sm text-[#E63946]">{error}</p>}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => !loading && onClose()}
              className="px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md font-semibold text-white ${
                loading ? 'bg-gray-400' : 'bg-[#3DD9D6] hover:bg-[#2BB2B0]'
              }`}
            >
              {loading ? 'Procesando...' : `Donar${amount ? ` $${amount}` : ''}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { KeyRound, ArrowRight, Lock } from 'lucide-react';

type Props = {
  onUnlock: () => void;
};

const VALID_KEY = 'H1234';

export default function LoginScreen({ onUnlock }: Props) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (key.trim().length === 0) {
      setError('Introduce la clave de acceso.');
      return;
    }

    if (key.trim() !== VALID_KEY) {
      setError('Clave incorrecta. Acceso denegado.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onUnlock();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid effect */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-[#12121a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Logo — stylized H */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
              <span className="text-white font-bold text-3xl leading-none select-none">H</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              PROJECT <span className="text-cyan-400">H</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Key
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="password"
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Introduce tu clave de acceso"
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-400 to-teal-500 text-[#0a0a0f] font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
              ) : (
                <>
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

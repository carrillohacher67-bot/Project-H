import { useState } from 'react';
import {
  X,
  Minus,
  Crosshair,
  Ruler,
  Eye,
  Palette,
  Power,
  Check,
  GitCompare,
  Target,
  Compass,
  Move,
} from 'lucide-react';
import type { PanelConfig } from '@/App';

type Props = {
  config: PanelConfig;
  setConfig: (c: PanelConfig) => void;
  onLock: () => void;
};

type ToggleKey =
  | 'longLines'
  | 'precisionGuides'
  | 'doubleBounceLines'
  | 'impactPoint'
  | 'angleRuler';

const COLORS = [
  { name: 'Cyan', value: '#22d3ee' },
  { name: 'Verde', value: '#22c55e' },
  { name: 'Rojo', value: '#ef4444' },
  { name: 'Amarillo', value: '#eab308' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Blanco', value: '#f8fafc' },
];

export default function OverlayPanel({ config, setConfig, onLock }: Props) {
  const [minimized, setMinimized] = useState(false);

  const toggle = (key: ToggleKey) =>
    setConfig({ ...config, [key]: !config[key] });

  const guideStyle = {
    color: config.lineColor,
    opacity: config.opacity / 100,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Simulated game background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(#1a3a3a 1px, transparent 1px), linear-gradient(90deg, #1a3a3a 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/40 to-[#0a0a0f]/80" />

      {/* === Visual guides — always visible when their toggle is ON, even when panel is minimized ===
           Lines extend horizontally in 16:9 billiard table proportions */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* 16:9 billiard table frame — guides are contained within this proportion */}
        <div
          className="relative"
          style={{
            width: 'min(100vw, 177.78vh)',
            height: 'min(56.25vw, 100vh)',
            opacity: config.opacity / 100,
          }}
        >
          {/* Long lines — main horizontal center line + vertical center line spanning the table */}
          {config.longLines && (
            <div className="absolute inset-0 transition-opacity duration-300">
              {/* Horizontal center line — main axis */}
              <div
                className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
                style={{ backgroundColor: config.lineColor }}
              />
              {/* Vertical center line */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                style={{ backgroundColor: config.lineColor }}
              />
            </div>
          )}

          {/* Precision guides — crosshair at center of the table */}
          {config.precisionGuides && (
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
              <Crosshair
                className="w-14 h-14"
                style={{ color: config.lineColor }}
              />
            </div>
          )}

          {/* Double bounce lines — two horizontal dashed lines at 1/3 and 2/3 height */}
          {config.doubleBounceLines && (
            <div className="absolute inset-0 transition-opacity duration-300">
              <div
                className="absolute top-1/3 left-0 right-0 h-px border-t border-dashed"
                style={{ borderColor: config.lineColor }}
              />
              <div
                className="absolute top-2/3 left-0 right-0 h-px border-t border-dashed"
                style={{ borderColor: config.lineColor }}
              />
            </div>
          )}

          {/* Impact point — central dot with ring at table center */}
          {config.impactPoint && (
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            >
              <div
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: config.lineColor }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: config.lineColor }}
                />
              </div>
            </div>
          )}

          {/* Angle ruler — protractor arc with diagonal lines at table center */}
          {config.angleRuler && (
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
              <div className="relative w-32 h-32">
                <div
                  className="absolute inset-0 rounded-full border-2 border-dashed"
                  style={{ borderColor: config.lineColor }}
                />
                <div
                  className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-bottom rotate-45"
                  style={{ backgroundColor: config.lineColor, height: '100%' }}
                />
                <div
                  className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-bottom -rotate-45"
                  style={{ backgroundColor: config.lineColor, height: '100%' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating overlay panel */}
      <div
        className={`absolute top-6 right-6 z-50 transition-all duration-300 ${
          minimized ? 'w-[50px] h-[50px]' : 'w-80'
        }`}
        style={{ opacity: minimized ? 1 : config.opacity / 100 }}
      >
        {minimized ? (
          <button
            onClick={() => setMinimized(false)}
            className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-green-500 to-blue-500 shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 border border-white/20"
            title="Expandir panel"
          >
            <span className="text-white font-bold text-lg leading-none select-none">H</span>
          </button>
        ) : (
        <div className="bg-[#12121a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header / Title bar — simulates draggable overlay window */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#1a1a2e] to-[#12121a] border-b border-white/10 cursor-grab">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
              <span className="text-white text-sm font-semibold tracking-wide">
                PROJECT <span className="text-cyan-400">H</span>
              </span>
              <span className="text-gray-600 text-xs ml-1">Overlay</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(!minimized)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white/5 hover:text-white transition-colors"
                title="Minimizar"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={onLock}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                title="Cerrar sesión"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Permission banner — simulates draw-over-other-apps */}
          <div className="px-4 py-2 bg-green-500/5 border-b border-white/5 flex items-center gap-2">
            <Move className="w-3.5 h-3.5 text-green-400" />
            <p className="text-green-400/80 text-[10px] font-medium">
              Permiso activo: Mostrar sobre otras apps
            </p>
          </div>

          {/* Body */}
          <div className="p-4 space-y-5 max-h-[60vh] overflow-y-auto">
            {/* Toggles */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Ruler className="w-3 h-3" />
                Opciones de línea
              </h3>

              <ToggleRow
                icon={<Ruler className="w-4 h-4" />}
                label="Líneas largas"
                sub="Long lines"
                active={config.longLines}
                onToggle={() => toggle('longLines')}
              />
              <ToggleRow
                icon={<Crosshair className="w-4 h-4" />}
                label="Guías de precisión"
                sub="Precision guides"
                active={config.precisionGuides}
                onToggle={() => toggle('precisionGuides')}
              />
              <ToggleRow
                icon={<GitCompare className="w-4 h-4" />}
                label="Líneas dobles de rebote"
                sub="Double bounce lines"
                active={config.doubleBounceLines}
                onToggle={() => toggle('doubleBounceLines')}
              />
              <ToggleRow
                icon={<Target className="w-4 h-4" />}
                label="Punto de impacto"
                sub="Impact point"
                active={config.impactPoint}
                onToggle={() => toggle('impactPoint')}
              />
              <ToggleRow
                icon={<Compass className="w-4 h-4" />}
                label="Regla de ángulos"
                sub="Angle ruler"
                active={config.angleRuler}
                onToggle={() => toggle('angleRuler')}
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Opacity slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3 h-3" />
                  Opacidad del overlay
                </h3>
                <span className="text-cyan-400 text-xs font-bold tabular-nums">
                  {config.opacity}%
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={config.opacity}
                  onChange={(e) =>
                    setConfig({ ...config, opacity: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-[#0a0a0f] rounded-full appearance-none cursor-pointer accent-cyan-400
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400
                    [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-400/40
                    [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Color picker */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3 h-3" />
                Color de líneas
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() =>
                      setConfig({ ...config, lineColor: c.value })
                    }
                    className={`relative aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                      config.lineColor === c.value
                        ? 'border-white scale-110'
                        : 'border-white/10'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  >
                    {config.lineColor === c.value && (
                      <Check
                        className="absolute inset-0 m-auto w-3.5 h-3.5 text-black drop-shadow"
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-gray-500 text-xs">
                Actual: <span style={{ color: config.lineColor }}>{COLORS.find((c) => c.value === config.lineColor)?.name}</span>
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Close / power */}
            <button
              onClick={onLock}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl py-2.5 text-sm font-medium transition-all"
            >
              <Power className="w-4 h-4" />
              Cerrar panel
            </button>
          </div>
        </div>
        )}
      </div>

      {/* Status indicator bottom-left */}
      <div className="absolute bottom-6 left-6 z-40 flex items-center gap-2 text-gray-600 text-xs">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Overlay activo
      </div>
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  sub,
  active,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            active
              ? 'bg-cyan-400/15 text-cyan-400'
              : 'bg-white/5 text-gray-600'
          }`}
        >
          {icon}
        </div>
        <div>
          <p className="text-white text-sm leading-tight">{label}</p>
          <p className="text-gray-600 text-[10px] leading-tight">{sub}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
          active ? 'bg-cyan-400' : 'bg-white/10'
        }`}
        role="switch"
        aria-checked={active}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
            active ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  );
}

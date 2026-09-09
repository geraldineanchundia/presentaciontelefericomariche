import { ArrowRight, CheckCircle2, Shield, Wrench, Zap, Clock, Users, Mountain, Building2 } from 'lucide-react';
import { playClickSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import maricheCablecar from '../../assets/images/mariche_cablecar_1788659996661.jpg';

interface SlideHeroProps {
  onStartPresentation: () => void;
}

export function SlideHero({ onStartPresentation }: SlideHeroProps) {
  const { isLight } = useTheme();

  return (
    <div className={`relative min-h-[calc(100vh-140px)] flex flex-col justify-center overflow-hidden rounded-2xl border p-6 md:p-12 transition-colors duration-300 backdrop-blur-xl shadow-2xl ${
      isLight
        ? 'bg-white/75 border-slate-200/90 text-slate-900'
        : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
    }`}>
      
      {/* Background with Generated Cable Car Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={maricheCablecar}
          alt="Teleférico Palo Verde - Mariche en operación"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center filter saturate-150 transform scale-105 transition-all duration-10000 hover:scale-100 ${
            isLight ? 'opacity-35' : 'opacity-55'
          }`}
        />
        <div className={`absolute inset-0 transition-colors duration-300 ${
          isLight
            ? 'bg-gradient-to-r from-white/95 via-white/80 to-white/50'
            : 'bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50'
        }`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl">
        
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gray-500/15 border border-gray-500/30 text-gray-500">
            GENERAL TRADE • INGENIERÍA ESPECIALIZADA
          </span>
        </div>

        {/* Main Headline */}
        <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          Sistema Teleférico Urbano <br />
          <span className="text-blue-700 dark:text-blue-400">
            Palo Verde - Mariche
          </span>
        </h1>

        <p className={`text-base sm:text-xl max-w-3xl font-bold leading-relaxed mb-4 ${
          isLight ? 'text-slate-700' : 'text-slate-300'
        }`}>
          Ingeniería, Reactivación y Sostenibilidad
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 mb-10">
          <button
            id="hero-explore-3d-btn"
            onClick={() => {
              playClickSound();
              onStartPresentation();
            }}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Iniciar Presentación & Simulador 3D</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Key System Metrics Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 pt-6 border-t ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        }`}>
          
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-slate-800/50 border-slate-700/60'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1 text-white">
              <Clock className="w-4 h-4 text-red-300" />
              <span>TIEMPO DE VIAJE</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">17.5 min</div>
            <div className="text-[11px] text-white font-semibold mt-1">Frente a 120-150 min por la Carretera Petare-Fila de Mariche</div>
          </div>

          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-slate-800/50 border-slate-700/60'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1 text-white">
              <Mountain className="w-4 h-4 text-gray-400" />
              <span>LONGITUD TRAZA</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">4.79 km</div>
            <div className="text-[11px] mt-1 text-white">Desnivel vertical: +310 m</div>
          </div>

          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-slate-800/50 border-slate-700/60'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1 text-white">
              <Users className="w-4 h-4 text-red-300" />
              <span>BENEFICIARIOS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">125,000+</div>
            <div className="text-[11px] mt-1 text-white">La Dolorita y Filas de Mariche</div>
          </div>

          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-slate-800/50 border-slate-700/60'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1 text-white">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>CAPACIDAD MÁX</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">3,000</div>
            <div className="text-[11px] text-white font-semibold mt-1">Pasajeros / hora / sentido</div>
          </div>

          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-slate-800/50 border-slate-700/60'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1 text-white">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>TORRES DE ACERO</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">32</div>
            <div className="text-[11px] text-white font-semibold mt-1">pilonas (hasta 38m altura)</div>
          </div>

        </div>

      </div>

    </div>
  );
}

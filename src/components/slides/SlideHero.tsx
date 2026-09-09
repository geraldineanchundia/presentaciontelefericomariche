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



        {/* Key System Metrics Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 pt-6 border-t ${
          isLight ? 'border-slate-200/90' : 'border-slate-800/80'
        }`}>
          
          {/* 1. TIEMPO DE VIAJE */}
          <div className={`p-4 rounded-xl border backdrop-blur-md transition-all ${
            isLight 
              ? 'bg-white/95 border-rose-200/90 shadow-sm shadow-rose-100/50 hover:border-rose-300' 
              : 'bg-slate-800/60 border-slate-700/70 hover:border-rose-500/40'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1">
              <Clock className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <span className={`font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                TIEMPO DE VIAJE
              </span>
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${
              isLight ? 'text-rose-600' : 'text-rose-400'
            }`}>
              17.5 min
            </div>
            <div className={`text-[11px] font-medium mt-1 leading-snug ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              Frente a 120-150 min por la Carretera Petare-Fila de Mariche
            </div>
          </div>

          {/* 2. LONGITUD TRAZA */}
          <div className={`p-4 rounded-xl border backdrop-blur-md transition-all ${
            isLight 
              ? 'bg-white/95 border-blue-200/90 shadow-sm shadow-blue-100/50 hover:border-blue-300' 
              : 'bg-slate-800/60 border-slate-700/70 hover:border-blue-500/40'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1">
              <Mountain className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span className={`font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                LONGITUD TRAZA
              </span>
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${
              isLight ? 'text-blue-700' : 'text-blue-400'
            }`}>
              4.79 km
            </div>
            <div className={`text-[11px] font-medium mt-1 ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              Desnivel vertical: +310 m
            </div>
          </div>

          {/* 3. TRASLADO DIARIO DE USUARIOS */}
          <div className={`p-4 rounded-xl border backdrop-blur-md transition-all ${
            isLight 
              ? 'bg-white/95 border-amber-200/90 shadow-sm shadow-amber-100/50 hover:border-amber-300' 
              : 'bg-slate-800/60 border-slate-700/70 hover:border-amber-500/40'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1">
              <Users className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span className={`font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                TRASLADO DIARIO DE USUARIOS
              </span>
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${
              isLight ? 'text-amber-600' : 'text-amber-400'
            }`}>
              35,000+
            </div>
            <div className={`text-[11px] font-semibold mt-1 ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>
              La Dolorita y Filas de Mariche
            </div>
            <div className={`text-[10px] sm:text-[11px] mt-0.5 ${
              isLight ? 'text-slate-600 font-medium' : 'text-slate-400'
            }`}>
              De una Población de 125.000+ Habitantes
            </div>
          </div>

          {/* 4. CAPACIDAD MÁX */}
          <div className={`p-4 rounded-xl border backdrop-blur-md transition-all ${
            isLight 
              ? 'bg-white/95 border-emerald-200/90 shadow-sm shadow-emerald-100/50 hover:border-emerald-300' 
              : 'bg-slate-800/60 border-slate-700/70 hover:border-emerald-500/40'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1">
              <Zap className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className={`font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                CAPACIDAD MÁX
              </span>
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${
              isLight ? 'text-emerald-700' : 'text-emerald-400'
            }`}>
              3,000
            </div>
            <div className={`text-[11px] font-medium mt-1 ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              Pasajeros / hora / sentido
            </div>
          </div>

          {/* 5. TORRES DE ACERO */}
          <div className={`p-4 rounded-xl border backdrop-blur-md transition-all ${
            isLight 
              ? 'bg-white/95 border-indigo-200/90 shadow-sm shadow-indigo-100/50 hover:border-indigo-300' 
              : 'bg-slate-800/60 border-slate-700/70 hover:border-indigo-500/40'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono mb-1">
              <Building2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span className={`font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                TORRES DE ACERO
              </span>
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${
              isLight ? 'text-indigo-700' : 'text-indigo-400'
            }`}>
              32
            </div>
            <div className={`text-[11px] font-medium mt-1 ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              pilonas (hasta 38m altura)
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

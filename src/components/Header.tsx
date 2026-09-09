import { useState } from 'react';
import { 
  Cable, 
  Layers, 
  Presentation, 
  FileText, 
  Activity,
  Sun,
  Moon
} from 'lucide-react';
import { toggleAudioMute, playClickSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { GeneralTradeLogo } from './GeneralTradeLogo';

interface HeaderProps {
  viewMode: 'presentation' | 'dashboard';
  setViewMode: (mode: 'presentation' | 'dashboard') => void;
  currentSlideNum: number;
  totalSlides: number;
}

export function Header({
  viewMode,
  setViewMode,
  currentSlideNum,
  totalSlides
}: HeaderProps) {
  const [muted, setMuted] = useState(false);
  const { isLight, toggleTheme } = useTheme();

  const handleToggleSound = () => {
    const isNowMuted = toggleAudioMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      playClickSound();
    }
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl px-4 lg:px-8 py-3 transition-colors duration-300 ${
      isLight
        ? 'bg-white/80 border-b border-slate-200/90 shadow-sm text-slate-900'
        : 'bg-slate-900/50 border-b border-slate-700/50 text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & System Title */}
        <div className="flex items-center gap-4">
          {/* Official General Trade Logo + Subtitle underneath */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className={`px-3 py-2 rounded-xl border flex items-center justify-center transition-all ${
              isLight
                ? 'bg-white border-slate-200 shadow-sm'
                : 'bg-white/95 border-white/20 shadow-md shadow-black/20'
            }`}>
              <GeneralTradeLogo variant="original" size="sm" />
            </div>
            <div className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-tight text-center sm:text-left leading-tight space-y-0.5 text-white`}>
              <div>• SERVICIOS DE INGENIERÍA</div>
              <div>• TRANSPORTE POR CABLE</div>
              <div>• SISTEMAS FERROVIARIOS</div>
            </div>
          </div>

          <div className={`h-12 w-px hidden sm:block ${isLight ? 'bg-slate-200' : 'bg-slate-700/60'}`} />

          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-[11px] font-mono font-bold uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                EXPEDIENTE TÉCNICO
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-bold tracking-tight leading-tight">
              <div className={isLight ? 'text-slate-900' : 'text-white'}>Sistema Teleférico Urbano</div>
              <div className="text-blue-700 dark:text-blue-400">Palo Verde - Mariche</div>
            </h1>
          </div>
        </div>



        {/* Actions & Mode switch */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Switcher Button (Translucent vs Light) */}
          <button
            id="theme-toggle-btn"
            onClick={() => {
              playClickSound();
              toggleTheme();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200/90 border-slate-300 text-slate-800 shadow-sm'
                : 'bg-slate-800/60 hover:bg-slate-700/60 border-slate-700/70 text-amber-300'
            }`}
            title={isLight ? 'Cambiar a Fondo Translúcido Suave' : 'Cambiar a Fondo Claro Ejecutivo'}
          >
            {isLight ? <Moon className="w-3.5 h-3.5 text-slate-700" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span className={`hidden sm:inline font-mono ${!isLight ? 'text-white' : ''}`}>
              {isLight ? 'Tema Claro' : 'Translúcido'}
            </span>
          </button>

          {/* Mode Switcher */}
          <div className={`flex items-center p-1 rounded-xl border transition-colors ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/60 border-slate-700/60'
          }`}>
            <button
              id="mode-presentation-btn"
              onClick={() => {
                playClickSound();
                setViewMode('presentation');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'presentation'
                  ? 'bg-blue-700 text-white font-bold shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Modo Presentación Diapositiva a Diapositiva"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-white">Presentación</span>
              {viewMode === 'presentation' && (
                <span className="px-1.5 py-0.2 text-[10px] rounded bg-white/20 text-white font-bold ml-1">
                  {currentSlideNum}/{totalSlides}
                </span>
              )}
            </button>

            <button
              id="mode-dashboard-btn"
              onClick={() => {
                playClickSound();
                setViewMode('dashboard');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'dashboard'
                  ? 'bg-blue-700 text-white font-bold shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Modo Centro de Control & Módulos Completos"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-white">Centro de Control</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}

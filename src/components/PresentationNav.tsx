import { useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  BookOpen 
} from 'lucide-react';
import { SlideInfo } from '../types';
import { playClickSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface PresentationNavProps {
  slides: SlideInfo[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  showNotes: boolean;
  onToggleNotes: () => void;
}

export function PresentationNav({
  slides,
  currentSlideIndex,
  onSelectSlide,
  isFullscreen,
  onToggleFullscreen,
  showNotes,
  onToggleNotes,
}: PresentationNavProps) {
  const currentSlide = slides[currentSlideIndex];
  const { isLight } = useTheme();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        playClickSound();
        onSelectSlide(Math.min(slides.length - 1, currentSlideIndex + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        playClickSound();
        onSelectSlide(Math.max(0, currentSlideIndex - 1));
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        onToggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slides.length, onSelectSlide, onToggleFullscreen]);

  return (
    <nav className={`px-4 py-3 sticky bottom-0 z-30 shadow-2xl backdrop-blur-xl border-t transition-colors duration-300 ${
      isLight 
        ? 'bg-white/85 border-slate-200/90 text-slate-800' 
        : 'bg-slate-900/60 border-slate-700/50 text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Current slide details */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-500 font-mono text-xs font-bold flex items-center justify-center">
              {String(currentSlide.number).padStart(2, '0')}
            </span>
            <div className="truncate max-w-[240px] sm:max-w-sm">
              <div className={`text-xs font-semibold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>{currentSlide.title}</div>
              <div className={`text-[11px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{currentSlide.subtitle}</div>
            </div>
          </div>

          <div className={`text-[11px] font-mono md:hidden ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
            {currentSlideIndex + 1} / {slides.length}
          </div>
        </div>

        {/* Slide Selector Mini-pills */}
        <div className={`hidden lg:flex items-center gap-1.5 overflow-x-auto py-1 px-2 rounded-xl border ${
          isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
        }`}>
          {slides.map((s, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <button
                key={s.id}
                id={`slide-nav-pill-${idx}`}
                onClick={() => {
                  playClickSound();
                  onSelectSlide(idx);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30 ring-1 ring-amber-300'
                    : isLight 
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={`${s.number}. ${s.title}`}
              >
                <span>{s.number}</span>
                <span className="hidden xl:inline text-[11px] font-sans font-medium">
                  {s.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Playback Controls & Utility buttons */}
        <div className="flex items-center gap-2">
          {/* Technical Notes / Overview Toggle */}
          <button
            id="nav-notes-btn"
            onClick={() => {
              playClickSound();
              onToggleNotes();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              showNotes
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-500 font-semibold'
                : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-slate-800/60 hover:bg-slate-700/60 border-slate-700 text-slate-300'
            }`}
            title="Mostrar / Ocultar notas de ingeniería del presentador"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notas</span>
          </button>

          {/* Prev / Next buttons */}
          <div className={`flex items-center gap-1 rounded-xl p-0.5 border ${
            isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950/50 border-slate-800'
          }`}>
            <button
              id="nav-prev-btn"
              disabled={currentSlideIndex === 0}
              onClick={() => {
                playClickSound();
                onSelectSlide(Math.max(0, currentSlideIndex - 1));
              }}
              className={`p-1.5 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer ${
                isLight ? 'text-slate-700 hover:bg-slate-200' : 'text-slate-300 hover:bg-slate-800'
              }`}
              title="Diapositiva anterior (Flecha Izquierda)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className={`px-2 text-xs font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {currentSlideIndex + 1}/{slides.length}
            </span>
            <button
              id="nav-next-btn"
              disabled={currentSlideIndex === slides.length - 1}
              onClick={() => {
                playClickSound();
                onSelectSlide(Math.min(slides.length - 1, currentSlideIndex + 1));
              }}
              className={`p-1.5 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer ${
                isLight ? 'text-slate-700 hover:bg-slate-200' : 'text-slate-300 hover:bg-slate-800'
              }`}
              title="Diapositiva siguiente (Flecha Derecha / Espacio)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            id="nav-fullscreen-btn"
            onClick={onToggleFullscreen}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-slate-800/60 hover:bg-slate-700/60 border-slate-700 text-slate-300'
            }`}
            title={isFullscreen ? 'Salir de pantalla completa (F)' : 'Modo Pantalla Completa (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </nav>
  );
}

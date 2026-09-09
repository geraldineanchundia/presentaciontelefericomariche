import { useState } from 'react';
import { 
  Mountain, 
  Cpu, 
  Activity, 
  HeartHandshake, 
  Images, 
  Wrench, 
  Calendar, 
  FileText, 
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SlideMap3D } from './slides/SlideMap3D';
import { SlideComponents } from './slides/SlideComponents';
import { SlideRestoration } from './slides/SlideRestoration';
import { SlideGallery } from './slides/SlideGallery';
import { SlideGeneralTrade } from './slides/SlideGeneralTrade';
import { playClickSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface DashboardViewProps {
  onSwitchToPresentation: (slideIndex: number) => void;
}

export function DashboardView({ onSwitchToPresentation }: DashboardViewProps) {
  const { isLight } = useTheme();
  const [activeSection, setActiveSection] = useState<'all' | '3d' | 'components' | 'restoration' | 'gallery' | 'gt'>('all');

  const navItems = [
    { id: 'all', label: '01 Visión', icon: TrendingUp },
    { id: '3d', label: '02 Simulador', icon: Mountain },
    { id: 'components', label: '03 Anatomía', icon: Cpu },
    { id: 'restoration', label: '04 Urgencia e Impacto', icon: Activity },
    { id: 'gt', label: '05 General', icon: Wrench },
    { id: 'gallery', label: '06 Galería', icon: Images },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Navigation Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {navItems.map((item) => {
          const isSelected = activeSection === item.id;
          const IconComp = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                playClickSound();
                setActiveSection(item.id as typeof activeSection);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md ${
                isSelected
                  ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/20'
                  : isLight
                  ? 'bg-white/80 text-slate-700 hover:text-slate-950 border border-slate-200 hover:border-slate-300 shadow-sm'
                  : 'bg-slate-900/50 text-slate-300 hover:text-white border border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Selected Sections */}
      <div className="space-y-8">
        
        {(activeSection === 'all' || activeSection === '3d') && (
          <section id="section-3d" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-500 font-bold uppercase tracking-wider">Módulo 01: Topografía & Torres</span>
              <button
                onClick={() => onSwitchToPresentation(1)}
                className={`text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                  isLight ? 'text-slate-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <span>Ver en pantalla completa de presentación</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <SlideMap3D />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'components') && (
          <section id="section-components" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">Módulo 02: Desglose de Componentes</span>
              <button
                onClick={() => onSwitchToPresentation(2)}
                className={`text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                  isLight ? 'text-slate-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <span>Ver en modo presentación</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <SlideComponents />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'restoration') && (
          <section id="section-restoration" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-rose-500 font-bold uppercase tracking-wider">Módulo 03: Movilidad Urbana & Retorno de Inversión</span>
              <button
                onClick={() => onSwitchToPresentation(3)}
                className={`text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                  isLight ? 'text-slate-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <span>Ver en modo presentación</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <SlideRestoration />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'gt') && (
          <section id="section-gt" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-wider">Módulo 05: Soluciones General Trade</span>
              <button
                onClick={() => onSwitchToPresentation(4)}
                className={`text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                  isLight ? 'text-slate-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <span>Ver en modo presentación</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <SlideGeneralTrade />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'gallery') && (
          <section id="section-gallery" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-500 font-bold uppercase tracking-wider">Módulo 06: Archivo Fotográfico Histórico</span>
              <button
                onClick={() => onSwitchToPresentation(5)}
                className={`text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                  isLight ? 'text-slate-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <span>Ver en modo presentación</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <SlideGallery />
          </section>
        )}

      </div>

    </div>
  );
}
